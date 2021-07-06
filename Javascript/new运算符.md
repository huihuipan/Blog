# new 运算符

```javascript
function Person(name) {
  this.name = name
}

const xiaoming = new Person(xiaoming)

console.log(xiaoming.name)

```

这段代码中，new 做了什么？

## MDN 描述

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

## 语法
```javascript
new constructor[([arguments])]
```
constructor：一个指定对象实例的类型的类或函数。
arguments：一个用于被 constructor 调用的参数列表。

## 描述
new 关键字会进行如下的操作：
1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（设置该对象的constructor）到另一个对象 ；
3. 将步骤1新创建的对象作为this的上下文 ；
4. 如果该函数没有返回对象，则返回this。