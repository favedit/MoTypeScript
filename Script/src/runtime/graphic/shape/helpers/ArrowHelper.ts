// import {FObject3d} from '../../core/FObject3d';
import {Geometry} from '../brep/Geometry';
import {CylinderGeometry} from '../geometry/CylinderGeometry';

//export class ArrowHelper extends FObject3d {
   export class ArrowHelper{
   lineGeometry = new Geometry();
   coneGeometry = new CylinderGeometry(0, 0.5, 1, 5, 1);

   public constructor(dir, origin, length, color, headLength, headWidth) {
      //super();
      // this.lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));
      // this.coneGeometry.translate(0, - 0.5, 0);
      // if (color === undefined) color = 0xffff00;
      // if (length === undefined) length = 1;
      // if (headLength === undefined) headLength = 0.2 * length;
      // if (headWidth === undefined) headWidth = 0.2 * headLength;
      // this.position.copy(origin);
      // this.line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: color }));
      // this.line.matrixAutoUpdate = false;
      // this.add(this.line);
      // this.cone = new THREE.Mesh(coneGeometry, new THREE.MeshBasicMaterial({ color: color }));
      // this.cone.matrixAutoUpdate = false;
      // this.add(this.cone);
      // this.setDirection(dir);
      // this.setLength(length, headLength, headWidth);
   }

   public setDirection = (function() {
      // 	var axis = new THREE.Vector3();
      // 	var radians;
      // 	return function setDirection( dir ) {
      // 		// dir is assumed to be normalized
      // 		if ( dir.y > 0.99999 ) {
      // 			this.quaternion.set( 0, 0, 0, 1 );
      // 		} else if ( dir.y < - 0.99999 ) {
      // 			this.quaternion.set( 1, 0, 0, 0 );
      // 		} else {
      // 			axis.set( dir.z, 0, - dir.x ).normalize();
      // 			radians = Math.acos( dir.y );
      // 			this.quaternion.setFromAxisAngle( axis, radians );
      // 		}
      // 	};
   } ());

   public setLength(length, headLength, headWidth) {
      // if ( headLength === undefined ) headLength = 0.2 * length;
      // if ( headWidth === undefined ) headWidth = 0.2 * headLength;
      // this.line.scale.set( 1, Math.max( 0, length - headLength ), 1 );
      // this.line.updateMatrix();
      // this.cone.scale.set( headWidth, headLength, headWidth );
      // this.cone.position.y = length;
      // this.cone.updateMatrix();
   }

   public setColor(color) {
      //this.line.material.color.set( color );
      //this.cone.material.color.set( color );
   }
}