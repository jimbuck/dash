import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Deck {

	@Field() public id: string;
	@Field() public name: string;
	@Field({ nullable: true }) public description?: string;
	@Field(() => Date) public lastUpdated: Date;

	constructor(props: Deck) {
		Object.assign(this, props);
	}
}
