module.exports = function getZerosCount(number, base) {

  var primeFactors = decomposePrimeFactors(base);
  var zeros = -1;

  for(var i = 0; i < primeFactors.length; i++) {
    var base = primeFactors[i][0];
    var exp = primeFactors[i][1];
    var countFactor = Math.trunc(calcCountPrimeFactor(number, base) / exp);
    if(zeros == -1 || countFactor < zeros) {
      zeros = countFactor;
    }
  }

  return zeros;
}
  
function decomposePrimeFactors(num) {
    
  var primeFactors = [];  
    
  for(var i = 2; i <= num; i++) {
    while(num % i === 0) {
      primeFactors.push(i);
      num = num / i;
     }
  }
   
  return formPowerFactorPairs(primeFactors);
}
  
function formPowerFactorPairs(primeFactors) {
  
  var powerFactors = [];
  var prevFactor = primeFactors[0];
  var count = 1;
    
  for(var i = 1; i < primeFactors.length; i++) {
  
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

  var countFactor = 0;
  
  for (var i = primeFactor; i <= number; i *= primeFactor) {
    countFactor += Math.trunc(number / i); 
  }

  return countFactor;
}