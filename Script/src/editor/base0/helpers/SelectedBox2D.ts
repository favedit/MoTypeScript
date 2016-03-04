// import SKActor from '../SKActor';
import ControlPoint from './ControlPoint2D';

const enum controlPoints { topLeft, topCenter, topRight,
  middleLeft, middleCenter, middleRight,
  buttomLeft, buttomCenter, buttomRight};

export default class SelectedBox2D extends THREE.LineSegments{
  // private geometry:THREE.BufferGeometry;
  private activeHighlight:controlPoints=controlPoints.middleCenter;
  private center:THREE.Vector2;

  private ctrPts:Array<ControlPoint>;

  constructor(object:THREE.Object3D){
    super();
    this.center = new THREE.Vector2();
    let position:Float32Array= new Float32Array(4*3);
    let indices:Uint8Array = new Uint8Array(8);
    indices.set([ 0, 1, 1, 2, 2, 3, 3, 0 ]);
    this.geometry = new THREE.BufferGeometry();
    (<THREE.BufferGeometry>this.geometry).setIndex(new THREE.BufferAttribute(indices,1));
    (<THREE.BufferGeometry>this.geometry).addAttribute('position',new THREE.BufferAttribute(position,3));
    this.material = new THREE.LineDashedMaterial({color:0xffff00,linewidth:3});
    if(Object !== undefined){
      this.update(object);
    }
  }

  public update(object:THREE.Object3D){
    let box = new THREE.Box3();
    box.setFromObject(object);
    if(box.empty()) return;
    this.center.x = box.center().x;
    this.center.y = box.center().y;

    let min = box.min;
    let max = box.max;

    let position = (<any>(<THREE.BufferGeometry>this.geometry).attributes).position;
    let array = position.array;
    array[  0 ] = max.x; array[  1 ] = max.y; array[  2 ] = max.z;
		array[  3 ] = min.x; array[  4 ] = max.y; array[  5 ] = max.z;
		array[  6 ] = min.x; array[  7 ] = min.y; array[  8 ] = max.z;
		array[  9 ] = max.x; array[ 10 ] = min.y; array[ 11 ] = max.z;

    position.needsUpdate = true;
    this.geometry.computeBoundingBox();


  }


}
