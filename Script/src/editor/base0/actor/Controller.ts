import SKActor from '../SKActor';
import Pawn from './Pawn';
export default class Controller{

  private pawn:Pawn;
  private _isInState:boolean;
  attachToPawn(pawn:Pawn){
    this.pawn;
  }

  getPawn(){
    return this.pawn;
  }

  isInState():boolean{
    return this._isInState
  }
}
