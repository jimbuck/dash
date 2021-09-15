import { ObjectType, Field } from 'type-graphql';
import { BaseModel } from './base';
import { Parameter } from './parameter';


@ObjectType({ implements: BaseModel, description: 'A behavior that can be triggered by a tile.' })
export class Action extends BaseModel {

	@Field({ description: 'The display name of the action.' }) public name: string;
	@Field({ nullable: true, description: 'The detailed description of the action.' }) public description?: string;
	@Field({ description: 'The plugin source of the action.' }) public plugin: string;
	@Field(() => [Parameter], { description: 'The available parameters for the action.' }) public parameters: Parameter[];

	constructor(props: Action) {
		super(props);

		this.parameters = (props.parameters ?? []).map(p => new Parameter(p));
	}
}


