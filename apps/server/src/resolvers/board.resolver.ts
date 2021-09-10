import { Service } from 'typedi';
import { Resolver, Query, ResolverInterface, FieldResolver, Root } from 'type-graphql';

import { DatabaseService, Board, Tile } from '@dash/dal';

@Service()
@Resolver(Board)
export class BoardResolver implements ResolverInterface<Board> {
	constructor(private readonly db: DatabaseService) {}

  @Query(() => [Board], { description: 'Query for Decks.' })
	public async boards(
	): Promise<Board[]> {
		return this.db.boards.map(b => new Board(b));
	}

	@FieldResolver(() => [Tile])
  public async tiles(@Root() deck: Board): Promise<Tile[]> {
  	return [];
  }
}
