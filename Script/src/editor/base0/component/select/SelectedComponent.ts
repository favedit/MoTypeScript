import SKComponent from '../../SKComponent';
import {Component} from '../../IoC';
import SelectedBox2D from '../../helpers/SelectedBox2D';
import SelectedComponentPar from './SelectedComponentPar';

@Component()
export default class SelectedComponent extends SelectedComponentPar{
  init(){
    let visibleMesh = this.getOwner().getFristMeshComponent();
    // if(visibleMesh !== undefined){
      visibleMesh.addEventListener('mouseup',(event)=>{
        event.stopPropagation();
        this.addSelectedBox();
        // this.addSelectedBox();
      })
    // }
  }
  private addSelectedBox(){
    let sp = this.getOwner().getSpace();
    sp.isEditMode(this.getOwner().getFristMeshComponent());
    console.log(sp.getMode());
  }

}
