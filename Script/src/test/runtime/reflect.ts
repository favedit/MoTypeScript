class A{
   public static Class:any = new Object();
   public test(){};
}
A.Class.name = 'CA';

var clazz:any = (A.prototype as any).clazz = (A as any).clazz = new Object();
clazz.name = 'A';

class B extends A{
   public static Class:any = new Object();
}
B.Class.name = 'CB';

var clazz:any = (B.prototype as any).clazz = (B as any).clazz = new Object();
clazz.name = 'B';

var a = new A();
var b = new B();

console.log(a, b);

console.log((a as any).clazz.name);
console.log((b as any).clazz.name);

console.log(A.Class);
console.log(B.Class);
