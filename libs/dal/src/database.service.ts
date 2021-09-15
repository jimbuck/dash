import { Service } from 'typedi';
import throttle from 'lodash/throttle';
import type { DebouncedFunc } from 'lodash';

import { Writeable, NOOP } from '@dash/utils';

import { Low } from './database/lowdb';
import { YAMLFile, JSONFile, BSONFile, Memory } from './database/adapters';
import { Board, Tile, Plugin } from './models';

export interface DatabaseOptions {
	filename?: string;
	throttle?: false | number;
}

@Service()
export class DatabaseService  {

	private _options: DatabaseOptions
	private _db: Low<Writeable<Omit<DatabaseService, 'connect' | 'saveChanges' | 'disconnect'|'registerPlugin' | 'plugins'>>>;

	public get boards(): Board[] { return this._db.data.boards; }
	public get tiles(): Tile[] { return this._db.data.tiles; }
	public readonly plugins: Plugin[] = [];

	public saveChanges: DebouncedFunc<() => Promise<void>>;

	public async connect(options: DatabaseOptions): Promise<void> {
		this._options = Object.assign({ filename: 'db.yaml', throttle: false }, options);

		this.saveChanges = this._options.throttle
			? throttle(() => this._db.write(), this._options.throttle, { trailing: true })
			: Object.assign(() => this._db.write(), { cancel: NOOP, flush: async () => this._db.write() });

		this._db = new Low(
			(this._options.filename.endsWith('.yaml') || this._options.filename.endsWith('.yml')) ? new YAMLFile(this._options.filename)
				: this._options.filename.endsWith('.json') ? new JSONFile(this._options.filename)
					: this._options.filename.endsWith('.bson') ? new BSONFile(this._options.filename)
						: new Memory(),
		);

		// Initialize the database
		await this._db.read();

		// Add seed data (remove if you don't want a seeded database)
		if (this._db.data) {
			this._db.data.boards = (this._db.data.boards ?? []).map(b => new Board(b));
			this._db.data.tiles = (this._db.data.tiles ?? []).map(t => new Tile(t));

			return;
		}

		this._db.data ??= {
			boards: [
				new Board({ id: '1', name: 'Board 1', description: 'This is a board.', lastUpdated: new Date() }),
				new Board({ id: '2', name: 'Board 2', lastUpdated: new Date() }),
				new Board({ id: '3', name: 'Board A', description: 'This is another board.', lastUpdated: new Date() }),
			],
			tiles: [],
		};

		await this._db.write();
	}

	public async disconnect(): Promise<void> {
		await this.saveChanges.flush();
	}

	public registerPlugin(plugin: Plugin): void {
		this.plugins.push(new Plugin(plugin));
	}
}


