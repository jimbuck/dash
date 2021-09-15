import { registerEnumType } from 'type-graphql';

export enum ValueType {
	Boolean = 'boolean',
	Integer = 'integer',
	Float = 'float',
	String = 'string',
	Toggle = 'toggle',
}

registerEnumType(ValueType, { name: 'ValueType', description: 'Type of properties and parameters.' });
