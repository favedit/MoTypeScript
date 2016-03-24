import {Objects} from '../common/lang/Objects';
import {Node} from '../framework/Node';

export class FEntity extends Node {

   public parents: Objects<FEntity> = null;

   public children: Objects<FEntity> = null;

   public constructor() {
      super();
      this.parents = new Objects<FEntity>();
      this.children = new Objects<FEntity>();
   }
}