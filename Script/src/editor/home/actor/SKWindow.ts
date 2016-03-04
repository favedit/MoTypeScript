import RoomActor from '../RoomActor';
import DefaultCubeComponent from '../../core/component/mesh/DefaultCubeComponent';
import RotatingComponent from '../../core/component/animation/RotatingComponent';
import ImageMeshComponent from '../component/mesh/ImageMeshComponent';
import TopImageMeshComponent from '../component/mesh/TopImageMeshComponent';
import SKObjLoader from '../../core/loader/SKObjLoader';
import {addGobal} from '../../core/SKUtils';

export default class SKWindow extends RoomActor {
    constructor() {
        super();
        this.length = 1800;
        this.height = 1500;
        this.width = 70;
    }

    init(callback) {
        super.init(() => {

            var loader = SKObjLoader.getSingleInstance();

            loader.load({ objUrl: './resource/room/window.obj', mtlUrl: './resource/room/window.mtl' }, (mesh) => {
                var image = new ImageMeshComponent('./resource/door.png',1800,120);
                // image.position.y += 240;
                var doorMesh = new TopImageMeshComponent(image, mesh);
                this.addComponent(doorMesh);
                callback();
            });
        });
    }
}
