const fnArr = [
  String, 
  toString, 
  Boolean,
  Number, 
  parseInt, 
  parseFloat, 
]

const testArr = [
  new String('123'),
  '',
  ' ',
  'abc',
  '0',
  '123',
  '123.1',
  '123.1.1',
  '123.abc',
  '123.1.abc',
  'abc123',
  '0x123',
  '0X123',
  123,
  123.1,
  0,
  0x123,
  0X123,
  NaN,
  true,
  false,
  null,
  undefined
  // Symbol(123)
]

let arr = '| 测试用例 \\ 方法 |'

for (let v of testArr) {
  let n = ''
  if (typeof v === 'string') {
    n = `'${v}'`
  } else {
    n = `${String(v)}`
  }
  arr += ` ${n} |`
}

arr += '\n'

for (let v of testArr) {
  arr += '| :---: '
}

arr += '| :---: | :---: |\n'

for (let fn of fnArr) {
  console.log(fn)
  const res1 = []
  for (let val of testArr) {
    let v = null
    try {
      if (fn === toString) {
        v = val.toString()
      } else {
        v = fn(val)
      }
    } catch (error) {
      console.error(error.message)
      v = error.message
    }
    if (typeof v === 'string') {
      v = `'${v}'`
    }
    res1.push(v)
  }
  const res2 = `| ${fn.name}() | ${res1.join(' | ')} |\n`
  
  arr = arr + res2

}

console.log(arr)