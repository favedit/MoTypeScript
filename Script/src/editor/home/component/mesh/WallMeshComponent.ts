import MeshComponent from '../../../core/component/mesh/MeshComponent';
import {Component} from '../../../core/IoC';
import SKMouseEvent from '../../../core/event/SKMouseEvent';
import Room from '../../Room';
// @Component();
export default class WallMeshComponent extends MeshComponent{
	private innerWall: THREE.Shape=new THREE.Shape();
	private outerWall: THREE.Shape=new THREE.Shape();
	private topWall:THREE.Shape=new THREE.Shape();
	private doorsHoles:Array<THREE.Path>;
	private windowsHoles:THREE.Path[];
	private startConer:THREE.BoxGeometry;
	private endConer:THREE.BoxGeometry;

	// public length: number;
	public width: number;
	public height: number;
	public thinkness: number;
	public holeInsertPt:THREE.Vector2;
	public startPoint: THREE.Vector2;
	public endPoint: THREE.Vector2;

	constructor(width:number,height:number,thinkness:number,private room:Room){
		super();
		this.width= width;
		this.height= height;
		this.thinkness = thinkness;
		this.drawInnerWall();
		// this.drawOuterWall();
		this.drawTopSureface(this.height);
		this.drawButtomSureface(this.height);
		this.geometry = new THREE.ShapeGeometry(this.innerWall);
		this.material = new THREE.MeshBasicMaterial({ color: 0x18ec0d,side:THREE.BackSide});
		//this.drawConer();
	}


	public filpNormal(state?:THREE.Side){
		if(state === undefined){
			let tmpSide = this.material.side;
			if(tmpSide==THREE.FrontSide){
				this.material.side = THREE.BackSide;
			}else if(tmpSide == THREE.DoubleSide){
				this.material.side = THREE.DoubleSide;
			}else if(tmpSide == THREE.BackSide){
				this.material.side = THREE.FrontSide;
			}
		}else{
			this.material.side = state;
		}
	}

	public update(){
		this.geometry = new THREE.ShapeGeometry(this.innerWall);
	}
	// public getStartPoint():THREE.Vector2{
	// 	return this.startPoint;
	// }
	// public setStartPoint(){
	// 	let start:THREE.Vector2= new THREE.Vector2(this.position.x,this.position.z);
	// 	this.startPoint = start;
	// }
	// public getEndPoint():THREE.Vector2{
	// 	return this.endPoint;
	// }
	// public setEndPoint(){
	// 	let end:THREE.Vector2=new THREE.Vector2(this.width,this.position.z);
	// 	this.endPoint = end;
	// }

	public getHoles():Array<THREE.Path>{
		return this.innerWall.holes;
	}

	public dragHole(distance:number,width:number,height:number):boolean{
		if(this.holeInsertPt.x > 0){
			this.innerWall.holes = [];
			this.update();
			this.holeInsertPt.x -= distance;
			let tmpHole = this.drawRect(this.holeInsertPt,width,height);
			this.innerWall.holes.push(tmpHole);
			this.update();
		}else{
			return true;
		}
	}

	public drawWindow(insertPoint:THREE.Vector2,width:number,height:number){
		let windowInWall = this.drawRect(insertPoint,width,height);
		this.innerWall.holes.push(windowInWall);
		this.update();
	}
	public drawDoor(insertPoint:THREE.Vector2,width:number,height:number){
		let doorInWall = this.drawRect(insertPoint,width,height);
		this.innerWall.holes.push(doorInWall);
		this.update();
	}

	private drawRect(insertPoint:THREE.Vector2,width:number,height:number):THREE.Path{
		this.holeInsertPt = insertPoint;
		let rect = new THREE.Path();
		rect.moveTo(insertPoint.x,insertPoint.y);
		rect.lineTo(insertPoint.x+width,insertPoint.y);
		rect.lineTo(insertPoint.x+width,insertPoint.y+height);
		rect.lineTo(insertPoint.x,insertPoint.y+height);
		rect.lineTo(insertPoint.x,insertPoint.y);
		return rect;
	}

	private calDoorHole(){

	}
	private setStartConerPoint(scope:WallMeshComponent){
		this.room.dispatchEvent({type:'set-floor-start-point',data:scope.position})
	}
	private drawConer(){
		let material = new THREE.MeshBasicMaterial({color:0x333333,side:THREE.FrontSide});
		this.startConer = new THREE.BoxGeometry(this.thinkness/3, this.thinkness/3, this.thinkness/3);
		this.endConer = this.startConer.clone();

		let startConerMesh = new THREE.Mesh(this.startConer,material);
		startConerMesh.position.set(0,0,0);
		startConerMesh.name='conner';
		let endConerMesh = new THREE.Mesh(this.endConer,material);
		endConerMesh.position.set(this.width,this.height/2,0);


		this.add(startConerMesh);

		startConerMesh.addEventListener('mouseup',(event)=>{
			event.stopPropagation();
			this.setStartConerPoint(this);

		});
		// this.add(endConerMesh);
	}


	private drawTopSureface(height:number){
		let topSureface = this.drawTandB();
		topSureface.position.y = height;
		this.add(topSureface);
	}

	private drawButtomSureface(height:number){
		let buttomSureface = this.drawTandB();
		buttomSureface.position.y = 0;
		this.add(buttomSureface);
	}

	private drawTandB():THREE.Mesh{
		let material = new THREE.MeshBasicMaterial({color:0x888888,side:THREE.DoubleSide});
		let bAndTWallShape:THREE.Shape = this.absDrawTopWall(this.width,this.thinkness);
		let tmpGeometry = new THREE.ShapeGeometry(bAndTWallShape);
		let bAndTWallMesh = new THREE.Mesh(tmpGeometry,material);
		bAndTWallMesh.rotateX(Math.PI/2);
		return bAndTWallMesh;

	}

	private drawOuterWall(){
		// this.absDrawWall(this.width + this.thinkness*2,this.height);
		let outerWall:THREE.Shape = new THREE.Shape();
		outerWall.moveTo(-this.thinkness, 0);
		outerWall.lineTo(this.width + this.thinkness, 0);
		outerWall.lineTo(this.width + this.thinkness,this.height);
		outerWall.lineTo(-this.thinkness,this.height);
		outerWall.lineTo(-this.thinkness, 0);
		let material = new THREE.MeshBasicMaterial({color:0x228822,side:THREE.BackSide})
		let tmpGeometry = new THREE.ShapeGeometry(outerWall);
		let outerWallMesh = new THREE.Mesh(tmpGeometry,material);
		outerWallMesh.position.z = this.thinkness;
		this.add(outerWallMesh);
	}

	private absDrawTopWall(length:number,thinkness:number):THREE.Shape{
		let topWall:THREE.Shape = new THREE.Shape();
		topWall.moveTo(0, 0);
		topWall.lineTo(length, 0);
		topWall.lineTo(length+thinkness,thinkness);
		topWall.lineTo(0-thinkness,thinkness);
		topWall.lineTo(0, 0);
		return topWall;
	}

	private drawInnerWall(){
		this.absDrawWall(this.width,this.height);
	}

	private absDrawWall(width:number,height:number){
		this.innerWall.moveTo(0, 0);
		this.innerWall.lineTo(width, 0);
		this.innerWall.lineTo(width,height);
		this.innerWall.lineTo(0,height);
		this.innerWall.lineTo(0, 0);
	}


}
