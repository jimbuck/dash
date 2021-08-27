import { Service } from 'typedi';
import { Resolver, Query } from 'type-graphql';

import { DatabaseService, Deck } from '@dash/dal';

@Service()
@Resolver(Deck)
export class DeckResolver {
	constructor(private readonly db: DatabaseService) {}

  @Query(() => [Deck], { description: 'Query for Decks.' })
	public async decks(
	): Promise<Deck[]> {
		return (await this.db.decks.find()).map(d => new Deck(d));
	}
}
