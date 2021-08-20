function resolve(a) {
   let sum = a;
   return function temp(b) {
       if(arguments.length === 0) {
           return sum;
       } else {
           sum = sum + b;
           return temp;
       }
   }
}

console.log(resolve(1)(2)(3)()); // 6

function curry2(fn) {
    let len = fn.length; // 函数的 length 属性实际上就是其参数的个数
    let count = 0;
    return function temp() {
        if(count == len) {
            return fn(...arg);
        }
        else {
            return function() {
                count++;
                return temp(...arguments);
            }
        }
    }
}

var curry = function(f) {
    var len = f.length;
    
      return function t() {
        var innerLength = arguments.length,
          args = Array.prototype.slice.call(arguments);
          
        if (innerLength >= len) {   // 递归出口，f.length
           return f.apply(undefined, args)
        } else {
          return function() {
            var innerArgs = Array.prototype.slice.call(arguments),
              allArgs = args.concat(innerArgs);
              
            return t.apply(undefined, allArgs)
          }
        }
      }
  }
function add(a,b) {
    return a+b;
}
let f = curry(add);
console.log(f(1)(2));

// class myPromise {
//   state = 'padding';
//   data = '';
//   constructor(executor) {
//     function resolve(data) {
//       this.state = 'resolved';
//       this.data = data;
//     }
//     function reject(reason) {
//       this.state = 'rejected';
//       this.data = reason;
//     }

//     try {
//       executor(resolve, reject) 
//     } catch(e) {
//       reject(e);
//     }
//   }
// }
