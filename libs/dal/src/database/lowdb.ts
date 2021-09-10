// Copied for now until ESM support is added to NX.
export interface Adapter<T> {
  read: () => Promise<T | null>
  write: (data: T) => Promise<void>
}

export class MissingAdapterError extends Error {
	constructor() {
		super();
		this.message = 'Missing Adapter';
	}
}

export class Low<T = unknown> {
  adapter: Adapter<T>
  data: T | null = null

  constructor(adapter: Adapter<T>) {
  	if (adapter) {
  		this.adapter = adapter;
  	} else {
  		throw new MissingAdapterError();
  	}
  }

  async read(): Promise<void> {
  	this.data = await this.adapter.read();
  }

  async write(): Promise<void> {
  	if (this.data) {
  		await this.adapter.write(this.data);
  	}
  }
}
