import {FCurvePath} from '../src/runtime/graphic/shape/brep/FCurvePath';
import {FPath} from '../src/runtime/graphic/shape/brep/FPath';

debugger
var path = new FPath();
path.moveTo(0, 0);
path.lineTo(10, 10);
path.lineTo(20, 10);
path.lineTo(20, 20);
var points = path.getPoints();
console.log(points)
debugger
