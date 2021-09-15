import { ObjectType, Field } from 'type-graphql';
import { BaseModel } from './base';
import { Tile } from './tile';

@ObjectType({ implements: BaseModel, description: 'A set of tiles displayed on a single screen.' })
export class Board extends BaseModel {

	@Field({ description: 'The display name of the board.' }) public name: string;
	@Field({ description: 'Optional icon for the board.' }) public icon?: string;
	@Field({ nullable: true, description: 'The detailed description of the board.' }) public description?: string;
	@Field(() => Date, { description: 'The timestamp of the last time the board was updated. Defaults to the creation time.' }) public lastUpdated: Date;

	// Field Resolver
	public tiles: Tile[];

	constructor(props: Omit<Board, 'tiles'>) {
		super(props);
	}
}
