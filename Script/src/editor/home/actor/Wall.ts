import SKActor from '../../core/SKActor';
import WallMeshComponent from '../component/mesh/WallMeshComponent';
import RotatingComponent from '../../core/component/animation/AnimationComponent';
import MeshComponent from '../../core/component/mesh/MeshComponent';
import WallActor from './WallActor';
import Room from '../Room';

export default class Wall extends WallActor{
	private northWall:WallMeshComponent;
	private sourthWall:WallMeshComponent;
	private eastWall:WallMeshComponent;
	private westWall:WallMeshComponent;

	private moveDistanceOn2D:number = 3000;

	constructor(private room:Room){
		super();
	}

	init(){
		super.init();

		this.northWall = new WallMeshComponent(3600,2800,120,this.room);
		this.northWall.drawWindow(new THREE.Vector2(900,500),1800,1500);
		// northWall.filpNormal(THREE.DoubleSide);
		this.northWall.position.set(0,0,0);


		this.sourthWall = new WallMeshComponent(3600,2800,120,this.room);
		this.sourthWall.drawDoor(new THREE.Vector2(2560,0),980,2100);
		this.sourthWall.position.set(3600,0,-4800);
		this.sourthWall.rotateY(Math.PI);

		this.westWall = new WallMeshComponent(4800,2800,120,this.room);
		this.westWall.position.set(0,0,-4800);
		this.westWall.rotateY(-Math.PI/2);

		this.eastWall = new WallMeshComponent(4800,2800,120,this.room);
		this.eastWall.position.set(3600,0,0);
		this.eastWall.rotateY(Math.PI/2);




		let mesh = new MeshComponent();
		mesh.add(this.northWall);
		mesh.add(this.eastWall);
		mesh.add(this.sourthWall);
		mesh.add(this.westWall);
		mesh.rotateX(Math.PI/2);
		this.addComponent(mesh);


		// let timer = setInterval(function(){
		// 	let tag = sourthWall.dragHole(100,980,2100);
		// 	if(tag===true){
		// 		clearInterval(timer);
		// 	}
		// },2000);
	}
	tick(){
		// if(this.isInited && this.isActive){
		// 	var space = this.getSpace();
		// 	if(space.isEnabled2D()){
		// 		this.northWall.getObjectByName('conner').position.y = this.moveDistanceOn2D;
		// 		this.sourthWall.getObjectByName('conner').position.y = this.moveDistanceOn2D;
		// 		this.eastWall.getObjectByName('conner').position.y = this.moveDistanceOn2D;
		// 		this.westWall.getObjectByName('conner').position.y = this.moveDistanceOn2D;
		// 	}else{
		// 		this.northWall.getObjectByName('conner').position.y = 0;
		// 		this.sourthWall.getObjectByName('conner').position.y = 0;
		// 		this.eastWall.getObjectByName('conner').position.y = 0;
		// 		this.westWall.getObjectByName('conner').position.y = 0;
		// 	}
		// }
	}


}
