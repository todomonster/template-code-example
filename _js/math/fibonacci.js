// https://jimmyswebnote.com/javascript-fibonacci-numbers/


/**費式數列
 * fib(2)// 1
 * fib(10)// 55
 * fib(-1)// 0
*/
// O(n)
function fib(n) {
  if (!n || n < 0) return 0;//"not allow"
  const arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
}
