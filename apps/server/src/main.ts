import 'reflect-metadata';

import express from 'express';
import { createServer } from 'http';
import { useDatabase } from './middleware/database.middleware';
import { useGraphQL, generateSchema } from './middleware/graphql.middleware';

(async () => {

	if (process.argv.includes('--generate-schema-then-exit')) {
		await generateSchema();
		return process.exit(0);
	}

	const app = express();
	const httpServer = createServer(app);

	await useDatabase({ filename: './dist/dash.yaml' });
	await useGraphQL({ app, httpServer, path: '/graphql' });

	const port = process.env.port || 3333;
	const server = app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}/api`);
		console.log(`GraphQL at http://localhost:${port}/graphql`);
	});
	server.on('error', console.error);

})();
