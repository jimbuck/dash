/* eslint-disable */
import { DateOnly } from '@dash/models';
import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
// Generated on 2021-09-10T21:16:04-04:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: Date;
};

/** An entity with a unique identifier. */
export type BaseModel = {
  /** The primary id of the entity. */
  id: Scalars['ID'];
};

/** A Board is a collection of boards. */
export type Board = BaseModel & {
  /** The detailed description of the board. */
  description?: Maybe<Scalars['String']>;
  /** The primary id of the entity. */
  id: Scalars['ID'];
  /** The timestamp of the last time the board was updated. Defaults to the creation time. */
  lastUpdated: Scalars['DateTime'];
  /** The display name of the board. */
  name: Scalars['String'];
  tiles: Array<Tile>;
};

export type CreateBoardInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Mutation = {
  /** Create a new board. */
  createBoard: Board;
};


export type MutationCreateBoardArgs = {
  board: CreateBoardInput;
};

export type Query = {
  /** Query for Decks. */
  boards: Array<Board>;
};

/** A Tile is a placeable . */
export type Tile = BaseModel & {
  /** The primary id of the entity. */
  id: Scalars['ID'];
  /** The timestamp of the last time the tile was updated. Defaults to the creation time. */
  lastUpdated: Scalars['DateTime'];
  /** The display name of the tile. */
  name: Scalars['String'];
};

export type BaseModelKeySpecifier = ('id' | BaseModelKeySpecifier)[];
export type BaseModelFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BoardKeySpecifier = ('description' | 'id' | 'lastUpdated' | 'name' | 'tiles' | BoardKeySpecifier)[];
export type BoardFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	tiles?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createBoard' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createBoard?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('boards' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	boards?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TileKeySpecifier = ('id' | 'lastUpdated' | 'name' | TileKeySpecifier)[];
export type TileFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	BaseModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BaseModelKeySpecifier | (() => undefined | BaseModelKeySpecifier),
		fields?: BaseModelFieldPolicy,
	},
	Board?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BoardKeySpecifier | (() => undefined | BoardKeySpecifier),
		fields?: BoardFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Tile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TileKeySpecifier | (() => undefined | TileKeySpecifier),
		fields?: TileFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;