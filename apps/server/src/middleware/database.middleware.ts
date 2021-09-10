import Container from 'typedi';

import { DatabaseService } from '@dash/dal';


export async function useDatabase({ filename }: { filename: string }) {
	const databaseService = Container.get(DatabaseService);
	await databaseService.connect({ filename });
}
