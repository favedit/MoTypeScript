import meshComponent from '../component/mesh/MeshComponent';

export default class ControlPoint extends meshComponent{
  public defaultMaterial:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color:0x007dff,side:THREE.DoubleSide})
  public heighLightmaterial:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color:0x00ff00,side:THREE.DoubleSide});
  public isActiveHeighlight:boolean= false;

  constructor(isHeighLight?:boolean){
    super();
    this.geometry = new THREE.PlaneGeometry(80,80);
    this.isActiveHeighlight = isHeighLight === undefined ? false : isHeighLight;
    if(!this.isActiveHeighlight){
      this.setHeighLight(this.defaultMaterial);
    }else{
      this.setHeighLight(this.heighLightmaterial)
    }
    this.addEventListener('mousedown',(event)=>{
      event.stopPropagation();
      this.setHeighLight(this.heighLightmaterial);

    })
    this.addEventListener('mousemove',(event)=>{
      event.stopPropagation();
    })
    this.addEventListener('mouseup',this.onMouseUp);

  }
  private onMouseUp = (event)=>{
    event.stopPropagation();
    console.log('asdfsadf');
    // event.preventDefault();
    this.heighLight();
    this.setHeighLight(this.heighLightmaterial);
    this.removeEventListener('mouseup',this.onMouseUp);
  }
  private handleClick(){

  }
  public heighLight(){
    this.isActiveHeighlight = true;
    this.setHeighLight(this.heighLightmaterial);
  }
  public unHeighLight(){
    this.isActiveHeighlight = false;
    this.setHeighLight(this.defaultMaterial);
  }
  public setHeighLight(highlightMaterial:THREE.MeshBasicMaterial){
    this.material = highlightMaterial;
  }

}
