import { ObjectType, Field } from 'type-graphql';
import { BaseModel } from './base';

@ObjectType({ implements: BaseModel, description: 'A Board is a collection of boards.' })
export class Board extends BaseModel {

	@Field({ description: 'The id of the deck for this board.' }) public deckId: string;
	@Field({ description: 'The display name of the board.' }) public name: string;
	@Field({ nullable: true, description: 'The detailed description of the board.' }) public description?: string;
	@Field(() => Date, { description: 'The timestamp of the last time the board was updated. Defaults to the creation time.' }) public lastUpdated: Date;

	// Field Resolver
	public tiles: any[];

	constructor(props: Omit<Board, 'tiles'>) {
		super(props);
	}
}
