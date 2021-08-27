


export class Collection<T> {

	private readonly db: T[];
	public readonly name: string;


	public constructor({ name, db }: { name: string, db?: T[] }) {
		this.name = name;
		this.db = db ?? [];
	}

	public async find(query?: (item: T, index: number) => boolean): Promise<T[]> {
		return Promise.resolve(!query ? [...this.db] : this.db.filter(query));
	}

}
