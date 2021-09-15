import { Service } from 'typedi';
import { Resolver, Query, ResolverInterface, FieldResolver, Root, Mutation, Arg, InputType, Field } from 'type-graphql';

import { DatabaseService, Board, Tile } from '@dash/dal';
import { EMPTY_STRING, id } from '@dash/utils';

@InputType()
export class CreateTileInput {
	@Field() public name: string;
	@Field() public boardId: string;
}

@Service()
@Resolver(Tile)
export class TileResolver implements ResolverInterface<Tile> {
	constructor(private readonly db: DatabaseService) {}

  @Query(() => [Tile], { description: 'Tiles on a Board.' })
	public tiles(
		@Arg('boardId') boardId: string,
	): Tile[] {
		return this.db.tiles.filter(tile => tile.boardId === boardId);
	}

	@FieldResolver(() => Board, { description: 'The parent board.' })
  public board(@Root() tile: Tile): Board {
  	return this.db.boards.find(board => board.id === tile.boardId);
  }

	@Mutation(() => Tile, { description: 'Create a new Tile.' })
	public createTile(
    @Arg('tile') newTile: CreateTileInput,
	): Tile {
		const tile = new Tile({ id: id(), lastUpdated: new Date(), ...newTile });
		this.db.tiles.push(tile);
		this.db.saveChanges();

		return tile;
	}

	//#region Interaction Mutations

	@Mutation(() => Tile, { description: 'Triggers the action on a button.' })
	public async triggerButton(
		@Arg('tileId') tileId: string,
	): Promise<Tile> {
		const tile = this.db.tiles.find(tile => tile.id === tileId);
		const pluginActions = tile.actions.map(assignedAction => {
			for (const plugin of this.db.plugins) {
				for (const action of plugin.actions) {
					if (action.id === assignedAction.actionId) return [plugin, action] as const;
				}
			}
		}).filter(Boolean);

		for (const [plugin, action] of pluginActions) {
			const parameters = tile.actions.find(assignedAction => assignedAction.actionId === action.id).parameters;
			await plugin.execute(action, parameters);
		}

		return tile;
	}

	//#endregion

}
