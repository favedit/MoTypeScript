import {FObjects} from '../common/lang/FObjects';
import {FNode} from '../framework/FNode';

export class FEntity extends FNode {

   public parents: FObjects<FEntity> = null;

   public children: FObjects<FEntity> = null;

   public constructor() {
      super();
      this.parents = new FObjects<FEntity>();
      this.children = new FObjects<FEntity>();
   }
}