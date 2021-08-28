import { Service } from 'typedi';

import { Collection } from './db/collection';
import { Deck } from './models/deck';
import { Board } from './models/board';

@Service()
export class DatabaseService {

	public readonly decks = this.collection<Deck>('decks', [
		new Deck({ id: '1', name: 'Deck 1', description: 'This is a deck.', lastUpdated: new Date() }),
		new Deck({ id: '2', name: 'Deck 2', lastUpdated: new Date() }),
		new Deck({ id: '3', name: 'Deck 3', description: 'This is an unfinished deck.', lastUpdated: new Date() }),
	]);

	public readonly boards = this.collection<Board>('boards', [
		new Board({ id: '1', deckId: '2', name: 'Board 1', description: 'This is a board.', lastUpdated: new Date() }),
		new Board({ id: '2', deckId: '2', name: 'Board 2', lastUpdated: new Date() }),
		new Board({ id: '3', deckId: '1', name: 'Board A', description: 'This is another board.', lastUpdated: new Date() }),
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


