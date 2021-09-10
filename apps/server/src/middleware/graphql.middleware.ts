import * as http from 'http';

import 'reflect-metadata';
import 'class-validator';

import { Container } from 'typedi';
import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphql, GraphQLSchema, Source, ExecutionResult, execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { buildSchema } from 'type-graphql';

import { environment } from '../environments/environment';
import { scalarsMap } from '../types/scalars';
import { ApolloContext } from '../models';
import { loggingPlugin } from '../services/logger';

import { BoardResolver } from '../resolvers/board.resolver';

let schema: GraphQLSchema;

export async function executeLocalQuery<T>(source: string | Source, args?: Record<string, unknown>): Promise<ExecutionResult<T>> {
	if (!schema) {
		console.warn(`Failed to execute local GraphQL query! (schema not initialized)`);
		return Promise.reject(null);
	}

	return await graphql({ schema, source, variableValues: args }) as ExecutionResult<T>;
}

export async function generateSchema() {
	return await buildSchema({
		resolvers: [
			BoardResolver,
		],
		container: Container,
		emitSchemaFile: {
			path: `${__dirname}/schema.graphql`,
			sortedSchema: false,
		},
		scalarsMap,
		globalMiddlewares: [],
	});
}

// Configure and enable graphql
export async function useGraphQL({
	app,
	httpServer,
	path,
}: { app: Application, httpServer: http.Server, path: string }): Promise<ApolloServer> {
	// app.get('/graphql', securePage(), (req, res, next) => next());
	// app.post('/graphql', secureApi(), (req, res, next) => next());

	schema = await generateSchema();

	// The ApolloServer constructor requires two parameters: your schema
	// definition and your set of resolvers.
	const apollo = new ApolloServer({
		debug: environment.dev,
		schema,
		plugins: [loggingPlugin(), cleanupSubscriptionsPlugin()],
		// The Playground is typically disabled when NODE_ENV is set to `production`.
		//   To enable playground in production uncomment the following lines:
		// introspection: true,
		context: ({ req }) => {
			return {} as ApolloContext;

			// const user = req?.user as User;
			// return { user } as ApolloContext;
		},
	});

	const subscriptionServer = SubscriptionServer.create({
		schema,
		execute,
		subscribe,
		onConnect() {
			return {};
			// lookup userId by token, etc.
			// return { userId };
		},
	}, {
		server: httpServer,
		path,
	});

	await apollo.start();
	apollo.applyMiddleware({ app, path });

	return apollo;

	function cleanupSubscriptionsPlugin() {
		return {
			async serverWillStart() {
				return {
					async drainServer() {
						subscriptionServer.close();
					},
				};
			},
		};
	}
}
