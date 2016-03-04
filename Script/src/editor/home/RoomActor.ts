import VisibleActor from '../core/actor/VisibleActor';
abstract class RoomActor extends VisibleActor{
  protected length:number;
  protected height:number;
  protected width:number;
  arrowHelper;
  public getLength(){
    return this.length;
  }

  public getHeight(){
    return this.height;
  }

  public getWidth(){
    return this.width;
  }

  public setHeight(height:number){
    this.height = height;
  }

  public setWidth(width:number){
    this.width = width;
  }

  public setLength(length:number){
    this.length = length;
  }

  getClosestBoundingToPointIn2D(point:THREE.Vector2):THREE.Ray{
    var boundingBox = this.getBoundingBox();
    var min = boundingBox.min.applyMatrix4(this.getMeshGroup().matrixWorld);
    var max = boundingBox.max.applyMatrix4(this.getMeshGroup().matrixWorld);
    var x1 = min.x, y1 = min.y;
    var x2 = max.x, y2 = max.y;
    var rays = [];
    rays.push(new THREE.Ray(new THREE.Vector3(x1,y2,0),new THREE.Vector3(x1,y1,0)));
    rays.push(new THREE.Ray(new THREE.Vector3(x1,y1,0),new THREE.Vector3(x2,y1,0)));
    rays.push(new THREE.Ray(new THREE.Vector3(x2,y1,0),new THREE.Vector3(x2,y2,0)));
    rays.push(new THREE.Ray(new THREE.Vector3(x2,y2,0),new THREE.Vector3(x1,y2,0)));

    return this.getClosestRayToPoint(rays,new THREE.Vector3(point.x,point.y,0));
  }

  getClosestRayToPoint(rays:Array<THREE.Ray>,point:THREE.Vector3){
    rays.sort(function(ray1,ray2){
      return ray1.distanceToPoint(point) - ray2.distanceToPoint(point);
    })
    return rays[0];
  }


  getBoundNormalToPointIn2D(point:THREE.Vector2){
    var ray = this.getClosestBoundingToPointIn2D(point);
    var closePoint = ray.closestPointToPoint(new THREE.Vector3(point.x,point.y,0));
    var vec2 = new THREE.Vector2( point.x - closePoint.x,point.y - closePoint.y);
    var closePointIn2D = new THREE.Vector2(closePoint.x,closePoint.y);
    var afterAdd = closePointIn2D.clone().add(vec2);
    var normal = vec2.clone().normalize();
    if(point.distanceTo(closePointIn2D) < point.distanceTo(afterAdd)){
      normal = normal.clone().negate();
    }
    return normal;
  }

  showAxleWire(){

    if(this.arrowHelper){
      this.arrowHelper.visible = true;
    }else{
      var center = this.getCenterPoint();

      var roomCenter = (<RoomActor>this.getParent()).getCenterPoint();

      var dirVector = new THREE.Vector3();
      var roomCenterIn2D = new THREE.Vector2(roomCenter.x,roomCenter.y);
      var normal = this.getBoundNormalToPointIn2D(roomCenterIn2D);
      var dir = new THREE.Vector3( center.x + normal.x * 1000, center.y + normal.y * 1000, center.z );
      var origin = center;
      var length = 1000;
      var hex = 0xffff00;
      this.arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
      this.getMeshGroup().add(this.arrowHelper);
    }

  }

  hideAxleWire(){
    if(this.arrowHelper){
      this.arrowHelper.visible = false;
    }
  }

  getRoomPosition(){

  }



}


export {RoomActor as default}
