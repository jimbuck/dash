import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { Board, Parameter } from '..';
import { BaseModel } from './base';

export enum TileType {
	Readonly = 'readonly',
	Button = 'button',
	Toggle = 'toggle',
	Slider = 'slider',
}

registerEnumType(TileType, { name: 'TileType', description: 'A ' });

@ObjectType({ implements: BaseModel, description: 'A single placeable element on a Board.' })
export class Tile extends BaseModel {
	@Field({ description: 'The id of the parent board.' }) public boardId: string;
	@Field({ nullable: true, description: 'The display name of the tile.' }) public text?: string;
	@Field({ nullable: true, description: 'CSS color of the tile.' }) public color?: string;
	@Field({ nullable: true, description: 'Emoji (single character) or FontAwesome icon name.' }) public icon?: string;

	@Field(() => [AssignedAction], { description: 'Assigned actions.' }) public actions: AssignedAction[] = [];
	@Field(() => Date, { description: 'The timestamp of the last time the tile was updated. Defaults to the creation time.' }) public lastUpdated: Date;

	// Field Resolvers
	public board: Board;

	constructor(props: Omit<Tile, 'board' | 'actions'>) {
		super(props);
	}
}

@ObjectType({ implements: BaseModel, description: 'An action assigned to a tile.' })
export class AssignedAction extends BaseModel {
	actionId: string;
	parameters: Parameter[];
}
