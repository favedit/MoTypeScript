export class Flag{
   public isFlagOn(a, b) {
       return 0 !== (a & b)
   }

   public isFlagOff(a, b) {
       return 0 === (a & b)
   }

   public setFlagOn(a, b) {
       return a | b
   }

   public setFlagOff(a, b) {
       return a & ~b
   } 
}
