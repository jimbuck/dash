import { Service } from 'typedi';

import { Collection } from './db/collection';
import { Deck } from './models/deck';

@Service()
export class DatabaseService {

	public readonly decks = this.collection<Deck>('decks', [
		new Deck({ id: '1', name: 'Deck 1', description: 'This is a deck.', lastUpdated: new Date() }),
		new Deck({ id: '2', name: 'Deck 2', lastUpdated: new Date() }),
		new Deck({ id: '3', name: 'Deck 3', description: 'This is also a deck.', lastUpdated: new Date() }),
	]);



	public async connect(): Promise<void> {
		// Setup DB.
	}

	public async disconnect(): Promise<void> {
		// Disconnect from DB.
	}

	private collection<T>(name: string, db: T[]): Collection<T> {
		return new Collection<T>({ name, db });
	}
}


