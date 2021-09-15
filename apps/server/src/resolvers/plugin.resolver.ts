import { Service } from 'typedi';
import { Resolver, Query, Arg } from 'type-graphql';

import { DatabaseService, Plugin } from '@dash/dal';

@Service()
@Resolver(Plugin)
export class PluginResolver {
	constructor(private readonly db: DatabaseService) {}

	@Query(() => [Plugin], { description: 'Query for Plugins.' })
	public plugins(
	): Plugin[] {
		return this.db.plugins;
	}

	@Query(() => Plugin, { description: 'Retrieve a plugin by name.' })
	public plugin(
		@Arg('name') name: string,
	): Plugin {
		return this.db.plugins.find(plugin => plugin.name === name);
	}
}
