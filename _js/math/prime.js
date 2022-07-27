// https://www.fly63.com/article/detial/1112

/**找質數
 * isPrime(2)// true
 * isPrime(4)// false
 */

function isPrime(n) {
  if (!n || n < 2) return false;
  for (let i = 2, limit = Math.sqrt(n); i <= limit; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

/**質因數分解
 * primeFactorize(24) // { 2: 3, 3: 1 }
 */
function primeFactorize(n) {
  let result = {};
  //不斷循環做質數除法
  while (n > 1) {
    for (let i = 2; i <= n; i++) {
      //能被質數整除就操作result
      if (isPrime(i) && n % i == 0) {
        result[i] = result[i] ? result[i] + 1 : 1;
        n /= i;
      }
    }
  }
  return result;
}
