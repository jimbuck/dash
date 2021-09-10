import { Service } from 'typedi';
import throttle from 'lodash/throttle';
import type { DebouncedFunc } from 'lodash';

import { Low } from './database/lowdb';
import { YAMLFile, JSONFile, BSONFile } from './database/adapters';
import { Board } from './models/board';
import { Tile } from './models/tile';

function NOOP() { /* noop */ }

export interface DatabaseOptions {
	filename?: string;
	throttle?: false | number;
}

@Service()
export class DatabaseService  {

	private _options: DatabaseOptions
	private _db: Low<Omit<DatabaseService, 'connect' | 'saveChanges' | 'disconnect'>>;

	public get boards(): Board[] { return this._db.data.boards; }
	public get tiles(): Tile[] { return this._db.data.tiles; }

	public saveChanges: DebouncedFunc<() => Promise<void>>;

	public async connect(options: DatabaseOptions): Promise<void> {
		this._options = Object.assign({ filename: 'db.yaml', throttle: false }, options);

		this.saveChanges = this._options.throttle
			? throttle(() => this._db.write(), this._options.throttle, { trailing: true })
			: Object.assign(() => this._db.write(), { cancel: NOOP, flush: async () => this._db.write() });

		this._db = new Low(
			this._options.filename.endsWith('.yaml') ? new YAMLFile(this._options.filename)
				: this._options.filename.endsWith('.json') ? new JSONFile(this._options.filename)
					: new BSONFile(this._options.filename),
		);

		// Initialize the database
		await this._db.read();

		// Add seed data (remove if you don't want a seeded database)
		if (this._db.data) return;

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
}


