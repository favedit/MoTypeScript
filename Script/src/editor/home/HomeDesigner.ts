import SKSpace from '../core/SKSpace';
import {Application} from '../core/IoC';
import RotatingCube from '../core/actor/RotatingCube';
import AsyncRotatingCube from '../core/actor/AsyncRotatingCube';
import Room from './Room';
import {addGobal} from '../core/SKUtils';
declare var sk: SKongVR;


let parWidth = $(".skong-con").width;
var canvas = <HTMLCanvasElement>document.getElementById('sk_canvas')
canvas.style.width = parWidth + 'px';

@Application()
class SKongVR extends SKSpace {
    private room;
    constructor() {

        super({
            canvas: canvas,
            antialias: true
        }, 0xeeeeee);

        this.addCommand
        // this.camera.lookAt(new THREE.Vector3(-4800/2,3600/2,0));
        //this.camera.position.set(0, -3000, 0);
        this.camera.position.set(3345, -3000, 1295);
        //x: 3345, y: -3000, z: 1295
        this.camera.lookAt(new THREE.Vector3(945, 1800, 1295));
        this.orthoCamera.position.set(4800 / 2, 3600 / 2, 5000);
        this.orthoCamera.lookAt(new THREE.Vector3(4800 / 2, 3600 / 2, 0));
        addGobal('camera', this.camera);

        addGobal('sk', this);
        //addGobal('svgpoint', this.svgpoints);

        this.room = new Room();

        this.room.init(() => {
            this.scene.add(this.room)
        });

        let CanvasWidth = canvas.width;
        let CanvasHeight = canvas.height;

        //this.camera = new PerspectiveCamera( 50, CanvasWidth/CanvasHeight, 0.1, 50*1000 );

        var dom = this.renderer.domElement;
        dom.width = CanvasWidth;
        dom.style.width = CanvasWidth + 'px';
    }

    getRoom() {
        return this.room;
    }

}
