import { ObjectType, Field } from 'type-graphql';
import { BaseModel } from './base';
import { ValueType } from './shared';


@ObjectType()
export class Parameter extends BaseModel {
	@Field({ description: 'Name of the parameter.' }) public name: string;
	@Field(() => ValueType, { description: 'Data type of the parameter.' }) public type: ValueType;
	@Field({ description: 'Description of the parameter and how it use it.' }) public description: string;

	constructor(props: Parameter) {
		super(props);
	}
}
