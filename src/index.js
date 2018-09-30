module.exports = function getZerosCount(number, base) {

  const primeFactors = decomposePrimeFactors(base);
  let zeros = -1;

  for(let i = 0, len = primeFactors.length; i < len; i++) {
    const base = primeFactors[i][0];
    const exp = primeFactors[i][1];
    const countFactor = Math.trunc(calcCountPrimeFactor(number, base) / exp);
    if(zeros == -1 || countFactor < zeros) {
      zeros = countFactor;
    }
  }

  return zeros;
}
  
function decomposePrimeFactors(num) {
    
  const primeFactors = [];  
    
  for(let i = 2; i <= num; i++) {
    while(num % i === 0) {
      primeFactors.push(i);
      num = num / i;
     }
  }
   
  return formPowerFactorPairs(primeFactors);
}
  
function formPowerFactorPairs(primeFactors) {
  
  const powerFactors = [];
  let prevFactor = primeFactors[0];
  let count = 1;
    
  for(let i = 1, len = primeFactors.length; i < len; i++) {
  
    if(primeFactors[i] === prevFactor) {
      count++;
    } else {
      powerFactors.push([prevFactor, count]);
      prevFactor = primeFactors[i];
      count = 1;
    }
      
  }
    
  powerFactors.push([prevFactor, count]);
  
  return powerFactors;
}

function calcCountPrimeFactor(number, primeFactor) {

  let countFactor = 0;
  
  for (let i = primeFactor; i <= number; i *= primeFactor) {
    countFactor += Math.trunc(number / i); 
  }

  return countFactor;
}