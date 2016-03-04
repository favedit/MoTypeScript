import * as product from './product/index';
export {product as product}

var sk = (window as any).sk;
if (!sk) {
   sk = new Object();
   (window as any).sk = sk;
}
var data = sk.data;
if (!data) {
   data = new Object();
   sk.data = data;
}
data.product = product;
