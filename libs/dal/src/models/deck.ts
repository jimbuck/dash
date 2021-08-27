import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Deck {

	@Field({ description: 'The unique identifier of the deck.' }) public id: string;
	@Field({ description: 'The display name of the deck.' }) public name: string;
	@Field({ nullable: true, description: 'The detailed description of the deck.' }) public description?: string;
	@Field(() => Date, { description: 'The timestamp of the last time the deck was updated. Defaults to the creation time.' }) public lastUpdated: Date;

	constructor(props: Deck) {
		Object.assign(this, props);
	}
}
