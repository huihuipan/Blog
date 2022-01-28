# JavaScript toString

## Object.prototype.toString

每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。

## Array.prototype.toString

Array对象覆盖了Object的 toString 方法。对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。

## Function.prototype.toString

Function对象覆盖了从Object继承来的 toString 方法。对于用户定义的 Function 对象，toString方法返回一个字符串，其中包含用于定义函数的源文本段。

## String.prototype.toString
String 对象覆盖了Object 对象的 toString 方法；并没有继承 Object.toString()。对于 String 对象，toString 方法返回该对象的字符串形式，和 String.prototype.valueOf() 方法返回值一样。

## Number.prototype.toString

Number 对象覆盖了 Object 对象上的 toString() 方法，它不是继承的 Object.prototype.toString()。对于 Number 对象，toString() 方法以指定的基数返回该对象的字符串表示。

如果转换的基数大于10，则会使用字母来表示大于9的数字，比如基数为16的情况，则使用a到f的字母来表示10到15。

如果基数没有指定，则使用 10。

如果对象是负数，则会保留负号。即使radix是2时也是如此：返回的字符串包含一个负号（-）前缀和正数的二进制表示，不是 数值的二进制补码。

进行数字到字符串的转换时，建议用小括号将要转换的目标括起来，防止出错。

## Boolean.prototype.toString

Boolean 对象覆盖了 Object 对象的  toString 方法。并没有继承 Object.prototype.toString()。对于布尔对象，toString 方法返回该对象的字符串形式。

当一个Boolean对象作为文本值或进行字符串连接时，JavaScript 会自动调用其 toString 方法。

对于Boolean对象或值，内置的 toString 方法返回字符串 "true" 或 "false"，具体返回哪个取决于布尔对象的值。

## 小结

以上信息来自 MDN，从这些信息可以知道，JS 是基于*原型链*设计的面向对象语言，整个设计可以简单理解为一个链表，类似：
```js
Object {
  prototype: {
    toString() {...},
    ...
  },

  Array: {
    prototype: {
      toString() { ... }
      ...
    }
  },

  ... 

  String: {
    prototype: {
      toString() { ... }
      ...
    }
  },
}

```

Object 是整个语言的根对象，所以 Object 原型上的方法，所有对象都可以使用，对于不适合的方式，在各个子类型中会改写，以达到符合该类型的效果。

## 应用

所以，所有类型上面都有一个 toString 方法，但实际上并不是一回事，Object.prototype.toString 描述
> 每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。

Object 的 toString 方法是返回 '[object type]'

那么使用 call 的方式让一个未知对象调用 Object.prototype.toString 即可获得 '[object type]' 信息，再通过截取字符串的方式，就可以获得该未知对象的对象类型的字面量。

```js
const getObjectType = obj => {
  const type = Object.prototype.toString.call(obj)type.replace(/^\[object (\S+)\]$/, '$1')
  return type
}
```

