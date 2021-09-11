import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { BaseModel } from './base';

export enum TileType {
	Unknown = 'unknown',
	Button = 'button',
	Toggle = 'toggle',
	Slider = 'slider',
	Display = 'display',
}

registerEnumType(TileType, { name: 'TileType', description: '' });

@ObjectType({ implements: BaseModel, description: 'A Tile is a placeable .' })
export class Tile extends BaseModel {

	@Field({ description: 'The display name of the tile.' }) public name: string;


	@Field(() => Date, { description: 'The timestamp of the last time the tile was updated. Defaults to the creation time.' }) public lastUpdated: Date;

	constructor(props: Tile) {
		super(props);
	}
}
