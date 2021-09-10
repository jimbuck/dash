import { ObjectId } from 'bson';

export function id() {
	return new ObjectId().toHexString();
}
