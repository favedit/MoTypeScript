import MeshComponent from '../../../core/component/mesh/MeshComponent';
export default class IamgeMeshComponent extends MeshComponent{
  constructor(imageUrl:string,length:number,width:number){
    super();
    var gt = THREE.ImageUtils.loadTexture( imageUrl );
    this.geometry = new THREE.PlaneBufferGeometry( length, width );
    this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );
  //    imageMesh.rotation.x = - Math.PI / 2;

  }
}
