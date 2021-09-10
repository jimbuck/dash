import fs from 'fs';

import * as YAML from 'yaml';
import * as BSON from 'bson';

import { Writer } from './steno';
import { Adapter } from './lowdb';


YAML.defaultOptions.customTags = ['timestamp'];

class TextFile implements Adapter<string> {
  private filename: string
  private writer: Writer

  constructor(filename: string) {
  	this.filename = filename;
  	this.writer = new Writer(filename);
  }

  async read(): Promise<string | null> {
  	let data;

  	try {
  		data = await fs.promises.readFile(this.filename, 'utf-8');
  	} catch (e) {
  		if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
  			return null;
  		}
  		throw e;
  	}

  	return data;
  }

  write(str: string): Promise<void> {
  	return this.writer.write(str);
  }
}

export class JSONFile<T> implements Adapter<T> {
  private adapter: TextFile

  constructor(filename: string) {
  	this.adapter = new TextFile(filename);
  }

  async read(): Promise<T | null> {
  	const data = await this.adapter.read();
  	if (data === null) {
  		return null;
  	} else {
  		return BSON.EJSON.parse(data) as T;
  	}
  }

  write(obj: T): Promise<void> {
  	return this.adapter.write(BSON.EJSON.stringify(obj, null, 2));
  }
}

export class YAMLFile<T> implements Adapter<T> {
	private adapter: TextFile;

	constructor(filename: string) {
		this.adapter = new TextFile(filename);
	}

	public async read(): Promise<T | null> {
		const data = await this.adapter.read();
		if (data === null) {
			return null;
		} else {
			return YAML.parse(data) as T;
		}
	}

	public async write(obj: T): Promise<void> {
		await this.adapter.write(YAML.stringify(obj));
	}
}

export class BSONFile<T> implements Adapter<T> {
  private filename: string

  constructor(filename: string) {
  	this.filename = filename;
  }

  async read(): Promise<T | null> {
  	let buffer: Buffer;
  	let data: T;

  	try {
  		buffer = await fs.promises.readFile(this.filename);
  		data = BSON.deserialize(buffer) as T;
  	} catch (e) {
  		if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
  			return null;
  		}
  		throw e;
  	}

  	return data;
  }

  write(obj: T): Promise<void> {
  	return fs.promises.writeFile(this.filename, BSON.serialize(obj));
  }
}
