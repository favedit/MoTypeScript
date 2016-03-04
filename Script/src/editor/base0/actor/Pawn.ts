import VisibleActor from './VisibleActor';
import Controller from './Controller';
export default class Pawn extends VisibleActor{
  private controller:Controller;
  getController(){
    return this.controller;
  }
}
