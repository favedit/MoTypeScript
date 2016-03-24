import {Objects} from '../common/lang/Objects';
import {FNode} from '../framework/FNode';

export class FEntity extends FNode {

   public parents: Objects<FEntity> = null;

   public children: Objects<FEntity> = null;

   public constructor() {
      super();
      this.parents = new Objects<FEntity>();
      this.children = new Objects<FEntity>();
   }
}