import { GraphQLScalarType, Kind } from 'graphql';
import { DateOnly } from '@dash/models';

export const DateOnlyScalar = new GraphQLScalarType({
	name: 'DateOnly',
	description: 'Standard Date object.',
	serialize(value: unknown): string {
		if (value instanceof Date) value = new DateOnly(value);
		if (!(value instanceof DateOnly)) {
			throw new Error(`DateOnlyScalar can only serialize DateOnly values (found ${(value as any)?.constructor?.name})`);
		}
		return value.toJSON();
	},
	parseValue(value: unknown): DateOnly {
		// check the type of received value
		if (typeof value !== 'string') {
			throw new Error('DateOnlyScalar can only parse string values');
		}
		return new DateOnly(value); // value from the client input variables
	},
	parseLiteral(ast): DateOnly {
		// check the type of received value
		if (ast.kind !== Kind.STRING) {
			throw new Error('DateOnlyScalar can only parse string values');
		}
		return new DateOnly(ast.value); // value from the client query
	},
});

export const dateOnlyScalarConfig = { type: DateOnly, scalar: DateOnlyScalar };
