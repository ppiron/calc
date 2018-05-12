const symbols = ['+', '-', '*', '/', 'blank'];

const compare = (s1, s2) => {
  if (s1 === '*' || s1 === '/') {
    if (s2 === '+' || s2 === '-') {
      return 'GT';
    } 
    else {
      return 'EQ';
    }
  }
  if (s1 === '+' || s1 === '-') {
    if (s2 === '*' || s2 === '/') {
      return 'LT';
    } 
    else {
      return 'EQ';
    }
  }
  if (s2 === 'blank') {
    return 'GT';
  }
}

const expr = ['5.2', '/', '5.3', '-', '4'];

const operations = (op1, op2) => {
  return {
    '+': () => op1 + op2,
    '-': () => op1 - op2,
    '*': () => op1 * op2,
    '/': () => op1 / op2,
  }
}

const calc = expr => {
  let acc = [];
  let ops = ['blank'];
  let ndec = 0;
  const ndec_max = 9;
  for (let i = 0; i < expr.length; i++) {
    if (!symbols.includes(expr[i])) {
      if (expr[i].indexOf('.') < 0) {
        acc.unshift(parseFloat(expr[i]));  
      } else {
        acc.unshift(parseFloat(expr[i]));
        ndec = (ndec + expr[i].length - expr[i].indexOf('.') - 1) > ndec_max ? ndec_max :
        (ndec + expr[i].length - expr[i].indexOf('.') - 1);
      }
      if ((compare(ops[0], expr[i + 1]) !== 'LT' && ops.length > 1) ||
            !expr[i + 1]) {
          //console.log(acc, ndec)
          const op1 = acc[1];
          const op2 = acc[0];
          acc = [operations(op1, op2)[ops[0]](), ...acc.slice(2)];
          ops = ops.slice(1);
        }
    } else {
      ops.unshift(expr[i]);
      if (expr[i] === '/') {
        ndec = ndec_max;
      }
    }
  }
  //console.log(acc[0].toFixed(ndec).slice(acc[0].toFixed(ndec).indexOf('.')))
  if (acc[0].toFixed(ndec).slice(acc[0].toFixed(ndec).indexOf('.') + 1).split('').find((el) => {
    return el !== '0';
  })) {
    return acc[0].toFixed(ndec)
  } else 
  {
    return acc[0].toFixed(0) + '.'
  }
}

export default calc;

//console.log(calc(expr));

//console.log(operations(parseInt('1', 10), parseInt('2', 10))['/']());