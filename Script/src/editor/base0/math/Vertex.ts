export default class Vertex{
  normal:THREE.Vector3;
  uv:THREE.Vector2;
  constructor( public x:number,public y:number,public z:number, normal?:THREE.Vector3, uv?:THREE.Vector2 ) {
		this.normal = normal || new THREE.Vector3;
		this.uv = uv || new THREE.Vector2;
	};
  applyMatrix4 ( m:THREE.Matrix4 ) {
		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;
		this.x = e[0] * x + e[4] * y + e[8]  * z + e[12];
		this.y = e[1] * x + e[5] * y + e[9]  * z + e[13];
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
		return this;
	}
}
