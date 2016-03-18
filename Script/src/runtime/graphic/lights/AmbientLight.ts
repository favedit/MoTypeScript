import {FLight} from './Light';

export class FAmbientLight extends FLight {
   public constructor(color, intensity) {
      super(color, intensity);
      // this.type = 'AmbientLight';
      // this.castShadow = undefined;
   }
}
