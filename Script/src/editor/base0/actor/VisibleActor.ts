import SKActor from '../SKActor';
import MeshGroupComponent from '../component/mesh/MeshGroupComponent';
import MeshComponent from '../component/mesh/MeshComponent';
import SKComponent from '../SKComponent';
export default class VisibleActor extends SKActor{
  private meshGroup:MeshGroupComponent = new MeshGroupComponent();

  addChild(actor:SKActor){
    super.addChild(actor);
    if(actor instanceof VisibleActor){
        this.meshGroup.add(actor.meshGroup);
    }
  }

  addComponent(component:SKComponent){
    super.addComponent(component);
    if(component instanceof MeshComponent){
      this.meshGroup.add(component);
    }
  }

  getFristMeshComponent():MeshComponent{
    return this.meshGroup.children[0];
  }

  getMeshComponents():Array<MeshComponent>{
    return this.meshGroup.children;
  }

  getMeshGroup():MeshGroupComponent{
    return this.meshGroup;
  }

  getCenterPoint(){
    var c = new THREE.Vector3();
    if(this.meshGroup.children.length >= 1){
      this.meshGroup.children.forEach((mesh:MeshComponent)=>{
        if(mesh instanceof MeshComponent){
          c.add(mesh.getCenterPoint())
        }
      });
      c.divideScalar(this.meshGroup.children.length);
    }
    return c;
  }

  getOppositeFaceOfPoint(point:THREE.Vector3){
    var box = this.getBoundingBox();
    console.log(box)
  }

  getBoundingBox(){
    var box = this.getBoundingBoxOfMeshGroup(this.meshGroup);
    console.log(box)
    return box;
  }

  private isInfinityBox(box){
    return this.isInfinityVector3(box.min) && this.isInfinityVector3(box.max)
  }

  private isInfinityVector3(vector:THREE.Vector3){
    return this.isInfinityNumber(vector.x) && this.isInfinityNumber(vector.y) && this.isInfinityNumber(vector.z);
  }

  private isInfinityNumber(value:number){
    return value == Infinity || value == -Infinity;
  }

  private getBoundingBoxOfMeshGroup(meshGroup){
    var boundingBox = new THREE.Box3();
    meshGroup.children.forEach((child)=>{
      var box;
      if(child instanceof THREE.Mesh){
        child.geometry.computeBoundingBox();
        box = child.geometry.boundingBox;
      }
      if(child instanceof THREE.Group){
        box = this.getBoundingBoxOfMeshGroup(child);
      }

      if(!box || this.isInfinityBox(box)){
        box = this.getBoundingBoxOfMeshGroup(child);
      }

      boundingBox.min.min(box.min);
      boundingBox.max.max(box.max);
      boundingBox.min.multiply(child.scale);
      boundingBox.max.multiply(child.scale);
    });
    return boundingBox;
  }

  public distanceTo(actor:VisibleActor){
    var myLoc = this.meshGroup.position.clone().applyMatrix4(this.meshGroup.matrixWorld );
    var itLoc = actor.meshGroup.position.clone().applyMatrix4(actor.meshGroup.matrixWorld);
    return myLoc.distanceTo(itLoc);
  }


  getFristFromChildren(type:any){
    var aimActor = null;
    if(!type){
      aimActor = this.children[0];
    }else{
      for(var i in this.children){
        var actor = this.children[i];
        if(actor instanceof type){
          aimActor = actor;
          break;
        }
      }
    }
    return aimActor;
  }

  getNearestOf(actor,type?:any):VisibleActor{
    this.children.sort((a:VisibleActor,b:VisibleActor)=>{
      if(a == actor || b == actor){
        return -1;
      }
      if(a instanceof VisibleActor && b instanceof VisibleActor){
        return a.distanceTo(actor) - b.distanceTo(actor)
      }else{
        return -1;
      }
    });

    return <VisibleActor>this.getFristFromChildren(type);
  }

  getFarthestOf(actor,type?:any){
    this.children.sort((a:VisibleActor,b:VisibleActor)=>{
      if(a instanceof VisibleActor && b instanceof VisibleActor){
        return   b.distanceTo(actor) - a.distanceTo(actor)
      }else{
        return -1;
      }
    });

    return <VisibleActor>this.getFristFromChildren(type);
  }

}
