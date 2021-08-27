import { Express } from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLError, OperationTypeNode } from 'graphql';

import { toMilliseconds } from '@dash/utils';

import { ApolloContext } from '../models';
import { environment } from '../environments/environment';



const ignoreGraphQLRequests = winston.format(info => {
	if (info.level === 'http' && info.meta.req.url === '/graphql' && info.meta.res.statusCode === 200) return false;

	if (info.level === 'info' && info.message.startsWith('GQL IntrospectionQuery')) return false;

	return info;
});

const transports: winston.transport[] = [
	new winston.transports.Console({
		level: process.env.LOG_LEVEL || 'info',
		handleExceptions: true,
		format: winston.format.combine(
			ignoreGraphQLRequests(),
			winston.format.splat(),
			winston.format.colorize(),
			winston.format.simple(),
		),
	}),
	new winston.transports.File({
		level: process.env.LOG_LEVEL || 'verbose',
		filename: './logs/' + 'app.log',
		handleExceptions: true,
		format: winston.format.combine(
			winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			winston.format.splat(),
			winston.format.json(),
		),
		maxsize: 5242880, //5MB
		maxFiles: 5,
	}),
];

export const logger = winston.createLogger({
	exitOnError: false,
	transports: transports,
});

/**
 * Sets up request logging. (should go early in pipeline)
 *
 * @export
 * @param {{app: Express}} { app }
 */
export function useLogger({ app }: {app: Express}) {
	app.use(expressWinston.logger({
		statusLevels: {
			'success': 'http',
			'warn': 'warn',
			'error': 'error',
		},
		winstonInstance: logger,
		expressFormat: true,
		colorize: true,
		meta: environment.dev,
	}));
}

/**
 * Sets up error logging. (should go late in pipeline)
 *
 * @export
 * @param {{app: Express}} { app }
 */
export function useErrorLogger({ app }: {app: Express}) {
	app.use(expressWinston.errorLogger({
		winstonInstance: logger,
		meta: true,
	}));
}

export function loggingPlugin(): ApolloServerPlugin<ApolloContext> {
	return {
		async requestDidStart() {
			return {
				async executionDidStart(reqCtx) {
					const start = process.hrtime();

					return {
						async executionDidEnd() {
							const duration = toMilliseconds(process.hrtime(start));

							trackGraphQLOperation({
								name: reqCtx.operationName,
								variables: reqCtx.request.variables,
								duration,
								errors: reqCtx.errors,
								type: reqCtx.operation.operation as 'query' | 'mutation',
							});
						},
					};

				},
			};
		},
	};
}

export interface TrackGraphQLOperationDetails {
  name: string;
  variables?: Record<string, unknown>;
  errors: Error | readonly GraphQLError[];
  duration: number;
  type: OperationTypeNode | 'field';
}

export function trackGraphQLOperation({ name, variables, duration, errors, type }: TrackGraphQLOperationDetails, log = true) {
	if (errors instanceof Error) errors = [errors as GraphQLError];

	if (errors) logger.error(`GQL ${name} ${type} failed ${duration}ms
  ${errors.filter(Boolean).map(error => `${error.stack}`).join('\n')}`);
	else if (log) logger.info(`GQL ${name} ${type} success ${duration}ms`, variables);
}
