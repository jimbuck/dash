import { Service } from 'typedi';
import { Resolver, Query, ResolverInterface, FieldResolver, Root } from 'type-graphql';

import { Board, DatabaseService, Deck } from '@dash/dal';

@Service()
@Resolver(Deck)
export class DeckResolver implements ResolverInterface<Deck> {
	constructor(private readonly db: DatabaseService) {}

  @Query(() => [Deck], { description: 'Query for Decks.' })
	public async decks(
	): Promise<Deck[]> {
		return (await this.db.decks.find()).map(d => new Deck(d));
	}

	@FieldResolver(() => [Board])
  public async boards(@Root() deck: Deck): Promise<Board[]> {
  	return (await this.db.boards.find(b => b.deckId === deck.id)).map(b => new Board(b));
  }
}
