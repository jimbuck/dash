import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType({ description: 'An entity with a unique identifier.', isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID, { description: 'The primary id of the entity.' })
	public id!: string;

  /**
   * Creates an instance of BaseModel with the provided id.
   * @param {T} model
   * @memberof Node
   */
  constructor(props: { id: string }) {
  	Object.assign(this, props);
  }
}
