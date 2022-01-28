const _new = (...arg) => {
  const TypeError = arg1 => `TypeError: ${arg1.name} is not a constructor`

  // 第一个参数为构造函数
  const constructor = Array.prototype.shift.call(arg)

  // constructor 不是函数 或者 没有prototype （箭头函数）
  if (typeof constructor !== 'function' || !constructor.prototype) {
    console.error(TypeError(constructor))
    return new Error(TypeError(constructor))
  }

  // 1. 创建一个空的 Javascript 对象
  // 2. 为空对象添加属性__proto__，将该属性链接至构造函数的原型对象
  const newObject = Object.create(constructor.prototype)

  // 3. 将新对象作为 this 的上下文
  const result = constructor.apply(newObject, arg)

  // 4. 如果改函数没有返回对象，则返回 this
  let flag = result && (typeof result === 'object' || typeof result === 'function')

  return flag ? result : newObject
}

// 测试
function Person(name) {
  this.name = name
}
Person.prototype.sayName = function() {
  console.log(this.name)
}

const xiaoming = new Person('xiaoming')
xiaoming.sayName()                                    // xiaoming
console.log(xiaoming instanceof Person)               // true
console.log(xiaoming.__proto__ === Person.prototype)  // true

const xiaohong = _new(Person, 'xiaohong')
xiaohong.sayName()                                    // xiaohong
console.log(xiaohong instanceof Person)               // true
console.log(xiaohong.__proto__ === Person.prototype)  // true

const Animal = () => {}
const a1 = new Animal()     // TypeError: Animal is not a constructor
const a2 = _new(Animal)     // TypeError: Animal is not a constructor
