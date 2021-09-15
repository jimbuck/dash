import { ObjectType, Field } from 'type-graphql';
import { Parameter } from '..';
import { Action } from './action';
import { BaseModel } from './base';
import { Property } from './property';


@ObjectType({ implements: BaseModel, description: 'A behavior that can be triggered by a tile.' })
export class Plugin extends BaseModel {

	@Field({ description: 'The display name of the plugin.' }) public name: string;
	@Field({ description: 'The detailed description of the plugin.' }) public description: string;
	@Field({ description: 'Individual or team who built the plugin.' }) public author: string;
	@Field({ description: 'Website or repository URL.' }) public website: string;
	@Field({ description: 'The plugin source of the action.' }) public plugin: string;

	@Field(() => [Action], { description: 'The available actions for the plugin.' }) public actions: Action[];
	@Field(() => [Property], { description: 'The available properties for the plugin.' }) public properties: Property[];

	constructor(props: Plugin) {
		super(props);
		this.actions = props.actions.map(action => new Action(action));
		this.properties = props.properties.map(prop => new Property(prop));
	}

	public execute(action: Action, parameters: Parameter[]): void | Promise<void> {
		console.log(`Executing action ${action.name} with properties ${parameters.map(param => param.name)}`);
	}
}


