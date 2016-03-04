import RoomActor from '../RoomActor';
import MeshComponent from '../../core/component/mesh/MeshComponent';
import SelectedComponent from '../../core/component/select/SelectedComponent';

export default class FalseRoof extends RoomActor{
  private isSelected:boolean = false;
  private selectedBox:THREE.BoxHelper;

  constructor(){
    super();
    this.length = 2200;
    this.width = 600;
    this.height = 120;
  }

  init(){
    var mesh = new MeshComponent();
    mesh.geometry = new THREE.BoxGeometry( this.length, this.width, this.height );
    mesh.material = new THREE.MeshBasicMaterial( { color:0xffffff } );
    // let selcomp = new SelectedComponent();
    // console.log(selcomp);
    // this.addComponent(selcomp);

    this.addComponent(mesh);

    this.addEventListener('mouseup',this.onMouseUp);
    // this.addEventListener('mouseup',(event)=>{

      // this.removeEventListener('mouseup',false);

      // let par = this.getParent();
      // selected2D.position.set(this.getMeshGroup().position.x,this.getMeshGroup().position.y,this.getMeshGroup().position.z);
      // let sp = this.getSpace();
      // // debugger;
      // console.log(par);
      // sp.scene.add(selected2D);
      // sp.scene.add(boxhelper);
      // console.log(selected2D);

    // })
  }
  public getLength():number{
    return this.length;
  }
  public getWidth():number{
    return this.width;
  }
  public getHeight():number{
    return this.height;
  }
  public setLength(length:number){
    this.length = length;
    this.update();
  }
  public setWidth(width:number){
    this.width = width;
    this.update();
  }
  public setHeight(height:number){
    this.height = height;
    this.update();
  }

  private update(){
    var mesh = new MeshComponent();
    mesh.geometry = new THREE.BoxGeometry( this.length, this.width, this.height );
    mesh.material = new THREE.MeshBasicMaterial( { color:0xffffff } );
    let firstMesh = this.getFristMeshComponent();
    firstMesh.copy(mesh);
  }

  private onMouseUp = (event)=>{
    event.stopPropagation();
    this.addSelectedBox();
    this.removeEventListener('mouseup',this.onMouseUp);
  }

  private addSelectedBox(){
    let sp = this.getSpace();
    sp.isEditMode(this.getFristMeshComponent());
    if(sp.ControlPoints !== undefined){
      sp.ControlPoints = new Array(8);
      sp.addControlPoint();
      sp.scene.appendobj(sp.ControlPoints);
    }else{
      sp.addControlPoint();
      sp.scene.appendobj(sp.ControlPoints);
    }

  }
  public hidenSelectedBox(){
    this.isSelected = false;
    let sp = this.getSpace();
    sp.isNotEditMode();
    console.log(sp.getMode());
  }
}
