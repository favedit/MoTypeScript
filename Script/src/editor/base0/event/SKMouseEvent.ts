export default class SKMouseEvent {

  distance: number;
  point: THREE.Vector3;
  face: THREE.Face3;
  object: THREE.Object3D;

  private _stopPropagation:boolean = false;

  isStopedPropagation(){
    return this._stopPropagation;
  }

  stopPropagation(){
    this._stopPropagation = true;
  }


    constructor(public type:string){

    }

    fromIntersection(intersect:THREE.Intersection):SKMouseEvent{
  		this.distance = intersect.distance;
  		this.point = intersect.point;
  		this.face = intersect.face;
  		this.object = intersect.object;
      return this;
    }
}
