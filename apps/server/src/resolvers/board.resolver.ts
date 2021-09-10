import { Service } from 'typedi';
import { Resolver, Query, ResolverInterface, FieldResolver, Root, Mutation, Arg, InputType, Field } from 'type-graphql';

import { DatabaseService, Board, Tile } from '@dash/dal';
import { id } from '@dash/utils';

@InputType()
export class CreateBoardInput {
	@Field() public name: string;
	@Field({ nullable: true }) public description?: string;
}

@Service()
@Resolver(Board)
export class BoardResolver implements ResolverInterface<Board> {
	constructor(private readonly db: DatabaseService) {}

  @Query(() => [Board], { description: 'Query for Decks.' })
	public boards(
	): Board[] {
		return this.db.boards.map(b => new Board(b));
	}

	@FieldResolver(() => [Tile], { description: '' })
  public tiles(@Root() board: Board): Tile[] {
  	return [];
  }

	@Mutation(() => Board, { description: 'Create a new board.' })
	public createBoard(
    @Arg('board') newBoard: CreateBoardInput,
	): Board {
		const board = new Board({ id: id(), lastUpdated: new Date(), ...newBoard });
		this.db.boards.push(board);
		this.db.saveChanges();

		return board;
	}
}
