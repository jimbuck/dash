import { ObjectType, Field } from 'type-graphql';
import { BaseModel } from './base';
import { Board } from './board';

@ObjectType({ implements: BaseModel, description: 'A deck is a collection of boards.' })
export class Deck extends BaseModel {

	@Field({ description: 'The display name of the deck.' }) public name: string;
	@Field({ nullable: true, description: 'The detailed description of the deck.' }) public description?: string;
	@Field(() => Date, { description: 'The timestamp of the last time the deck was updated. Defaults to the creation time.' }) public lastUpdated: Date;

	// Field Resolver
	public boards: Board[];

	constructor(props: Omit<Deck, 'boards'>) {
		super(props);
	}
}
