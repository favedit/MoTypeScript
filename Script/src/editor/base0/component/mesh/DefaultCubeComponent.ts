import StaticMeshComponent from './StaticMeshComponent';
import {Component} from '../../IoC';
@Component()
export default class DefaultCubeComponent extends StaticMeshComponent{
  constructor(color?:number,size?:number){
    super();
    size = size || 1;
    color = color ||0x00ff00;
    this.geometry = new THREE.BoxGeometry( size, size, size );
    this.material = new THREE.MeshBasicMaterial( { color:color} );
  }
}
