import SKSpace from '../SKSpace';
import SKMouseEvent from './SKMouseEvent';
import meshComponent from '../component/mesh/MeshComponent';
import ControlPoints from '../helpers/ControlPoint2D';
import {addGobal} from '../SKUtils';

export default class MouseEventHandler{

  onDownPosition: THREE.Vector2;
  onDoubleClickPosition:THREE.Vector2;
  onUpPosition: THREE.Vector2;
  onMovePosition:THREE.Vector2;
  currentIntersection:meshComponent;
  onContextMenuPosition:THREE.Vector2;
  mouse: THREE.Vector2;
  raycaster: THREE.Raycaster;

  private clickables:Array<THREE.Object3D> = [];
  private domElement:HTMLElement;
  constructor(private space:SKSpace){

    this.onDownPosition = new THREE.Vector2();
    this.onUpPosition = new THREE.Vector2();
    this.onMovePosition = new THREE.Vector2();
    this.onContextMenuPosition = new THREE.Vector2();
    this.onDoubleClickPosition = new THREE.Vector2();

    this.mouse = new THREE.Vector2();

    this.currentIntersection = new meshComponent();

    this.domElement = space.renderer.domElement;
    this.domElement.addEventListener('mousedown', this.onMouseDown, false);
    this.domElement.addEventListener('mousemove',this.onMouseMove,false);
    // this.domElement.addEventListener('dblclick',this.ondblClick,false);

    this.raycaster = new THREE.Raycaster();
  }

  addClickable(obj:THREE.Object3D){
    this.clickables.push(obj);
  }

  ondblClick =(event)=>{
    event.preventDefault();
    event.stopPropagation();
    var array = this.getMousePosition(this.domElement,event.clientX,event.clientY);
    this.onDoubleClickPosition.fromArray(array);

    var intersects = this.getIntersects(this.onDoubleClickPosition,this.clickables);
    if(intersects.length>0){
      var intersect = intersects[0];
      this.space.cameraControls.focus(intersect.object);
    }

  }

  onMouseDown = (event)=>{
    event.preventDefault();
    let vector = new THREE.Vector3(this.mouse.x,this.mouse.y,0.5);
    // this.raycaster = new THREE.Raycaster(this.space.camera.position,vector.sub(this.space.camera.position).normalize());

    if(event.button == 2){
      var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
      this.onContextMenuPosition.fromArray(array);
      var intersects = this.getIntersects(this.onContextMenuPosition, this.clickables);
      if (intersects.length > 0) {
          var intersect:THREE.Intersection = intersects[0];
          var object:THREE.Object3D = intersects[0].object;

          object.dispatchEvent(new SKMouseEvent('contextmenu').fromIntersection(intersect))

      }
    }else{
      var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
      this.onDownPosition.fromArray(array);
      var intersects = this.getIntersects(this.onDownPosition, this.clickables);
      if (intersects.length > 0) {
          var intersect:THREE.Intersection = intersects[0];
          var object:THREE.Object3D = intersects[0].object;

          object.dispatchEvent(new SKMouseEvent('mousedown').fromIntersection(intersect))

      }
      document.addEventListener('mouseup', this.onMouseUp, false);
    }



  }

  onMouseMove = (event)=>{
    event.preventDefault();
    let vector = new THREE.Vector3(this.mouse.x,this.mouse.y,0.5);
    // this.raycaster = new THREE.Raycaster(this.space.camera.position,vector.sub(this.space.camera.position).normalize());

    var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
    this.onMovePosition.fromArray(array);
    var intersects = this.getIntersects(this.onMovePosition, this.clickables);
    if (intersects.length > 0) {
      // if(this.currentIntersection !== undefined){
      //   this.currentIntersection.material.color.set(new THREE.Color(0x000000));
      // }
        var intersect:THREE.Intersection = intersects[0];
        var object:THREE.Object3D = intersects[0].object;

        object.dispatchEvent(new SKMouseEvent('mousemove').fromIntersection(intersect))

    }
  }

  onMouseUp = (event)=>{
    event.preventDefault();

    let vector = new THREE.Vector3(this.mouse.x,this.mouse.y,0.5);
    // this.raycaster = new THREE.Raycaster(this.space.camera.position,vector.sub(this.space.camera.position).normalize());

    var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
    this.onUpPosition.fromArray(array);
    var intersects = this.getIntersects(this.onUpPosition, this.clickables);

    if (intersects.length > 0) {

        for(let plan in intersects){
          if((<any>intersects[plan].object).geometry instanceof THREE.PlaneBufferGeometry){
            console.log(intersects[plan].object);
            addGobal('ins',intersects[plan].object);
            // (<ControlPoints>intersects[plan].object).setHeighLight((<ControlPoints>intersects[plan].object).heighLightmaterial);
          }
        }
        // debugger;
        var intersect:THREE.Intersection = intersects[0];
        var object:THREE.Object3D = intersects[0].object;
        this.space.svgpoints.x = event.clientX;
        this.space.svgpoints.y = event.clientY;
        console.log(event.clientX,event.clientY);


        object.dispatchEvent(new SKMouseEvent('mouseup').fromIntersection(intersect))

    }
    document.removeEventListener('mouseup', this.onMouseUp, false);
  }

  getMousePosition(dom, x, y) {
      var rect = dom.getBoundingClientRect();
      return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  };

  getIntersects(point:THREE.Vector2, objects:THREE.Object3D[]):THREE.Intersection[] {
      this.mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);
      if(this.space.isEnabled2D()){
        this.raycaster.setFromCamera(this.mouse, this.space.orthoCamera);
      }else{
        this.raycaster.setFromCamera(this.mouse, this.space.camera);
      }
      return this.raycaster.intersectObjects(objects, true);
  };


}
