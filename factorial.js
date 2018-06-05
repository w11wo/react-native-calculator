export function factorial(x) {
  let xStr = x.toString().split('.')
  if (x < 0 || x > 170) {
    return "Math ERROR"
  } else if (xStr[1] > 0) {
    return "Math ERROR"
  } else if (x == 0) {
    return 1
  } else if (x > 13) {
    return (x * factorial(x-1)).toPrecision(6)
  } else {
    return (x * factorial(x-1))
  }
}

export function permutation(n, r) {
  let nStr = n.toString().split('.')
  let rStr = r.toString().split('.')
  if (n > 170 || r > 170) {
    return "Math ERROR"
  } else if (nStr[1] > 0 || rStr[1] > 0) {
    return "Math ERROR"
  } else if (r > n) {
    return "Math ERROR"
  } else if (n < 0 || r < 0) {
    return "Math ERROR"
  } else if (n > 13 || r > 13) {
    return (factorial(n)/factorial(n-r)).toPrecision(6)
  } else {
    return (factorial(n)/factorial(n-r))
  }
}

export function combination(n, r) {
  let nStr = n.toString().split('.')
  let rStr = r.toString().split('.')
  if (n > 170 || r > 170) {
    return "Math ERROR"
  } else if (nStr[1] > 0 || rStr[1] > 0) {
    return "Math ERROR"
  } else if (r > n) {
    return "Math ERROR"
  } else if (n < 0 || r < 0) {
    return "Math ERROR"
  } else if (n > 13 || r > 13) {
    return (permutation(n, r)/factorial(r)).toPrecision(6)
  } else {
    return (permutation(n, r)/factorial(r))
  }
}
