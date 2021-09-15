import { ObjectType, Field } from 'type-graphql';
import { BaseModel } from './base';
import { ValueType } from './shared';


@ObjectType()
export class Property extends BaseModel {
	@Field({ description: 'Name of the property.' }) public name: string;
	@Field(() => ValueType, { description: 'Data type of the property.' }) public type: ValueType;
	@Field({ description: 'Description of the property and how it use it.' }) public description: string;

	constructor(props: Property) {
		super(props);
	}
}
