import VisibleActor from '../../core/actor/VisibleActor';
import {addGobal} from '../../core/SKUtils';
export default class WallActor extends VisibleActor{
  protected shapeCache:THREE.Shape;
  protected wallPoints:Array<THREE.Vector2>;

  public startConerPoint:THREE.Vector3;

  constructor(){
    super();
    addGobal('wall',this);
  }

  public getPoints():Array<THREE.Vector2>{
      let mesh = this.getFristMeshComponent();
      if(this.wallPoints !== undefined){
        if(mesh === undefined){
          console.log("The points catche has not been initialised,please give an mesh object of the wall!");
        }else{
          this.wallPoints=new Array<THREE.Vector2>();
          this.setPoints(mesh);
          return this.wallPoints;
        }
      }else{
        if(mesh ===undefined){
          return this.wallPoints;
        }else{
          this.setPoints(mesh);
          return this.wallPoints;
        }
    }
	}

  protected setPoints(mesh:any){
    this.wallPoints = new Array<THREE.Vector2>();
    for(let i =0;i<mesh.children.length;i++){
      this.wallPoints.push(new THREE.Vector2(mesh.children[i].position.x,
            mesh.children[i].position.z));
    }
  }

  public getShape():THREE.Shape{
    if(this.shapeCache === undefined){
      this.shapeCache = new THREE.Shape();
      this.shapeCache.moveTo(0,0);
      if(this.wallPoints.length !== -1){
        for(let vertex in this.wallPoints){
          this.shapeCache.lineTo(vertex.x,vertex.y);
        }
      }else{
        console.log("The points catche has not been initialised,please give an mesh object of the wall!");
      }
      this.shapeCache.closePath();
      return this.shapeCache;
    }else{
      return this.shapeCache;
    }
  }



}
