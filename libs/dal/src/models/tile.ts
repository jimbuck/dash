import { ObjectType, Field } from 'type-graphql';
import { BaseModel } from './base';

@ObjectType({ implements: BaseModel, description: 'A Tile is a placeable .' })
export class Tile extends BaseModel {

	@Field({ description: 'The display name of the tile.' }) public name: string;
	@Field({ nullable: true, description: 'The detailed description of the tile.' }) public description?: string;
	@Field(() => Date, { description: 'The timestamp of the last time the tile was updated. Defaults to the creation time.' }) public lastUpdated: Date;

	constructor(props: Tile) {
		super(props);
	}
}
