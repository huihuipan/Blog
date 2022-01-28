# JS 异步编程

###### 异步编程有哪些方案？
  - 回调函数
  - 事件监听
  - Promise
  - Generator
  - async/await

###### 同步编程和异步编程的区别
- 同步：在此段代码执行完未返回结果之前，会阻塞之后的代码执行，这样的情况称为同步。

- 异步：异步调用发出后，不会影响阻塞后面的代码执行，这样的情形称为异步。

###### 异步场景
- ajax 请求的回调；
- 定时器中的回调；
- 事件回调；
- Nodejs 中的一些方法回调。

###### 回调地狱的解决方案
- 回调地狱
```js
fs.readFile(A, 'utf-8', function(err, data) {
    fs.readFile(B, 'utf-8', function(err, data) {
        fs.readFile(C, 'utf-8', function(err, data) {
            fs.readFile(D, 'utf-8', function(err, data) {
                //....
            });
        });
    });
});
```

###### Promise 
为了解决回调地狱的问题，之后社区提出了 Promise 的解决方案，ES6 又将其写进了语言标准，采用 Promise 的实现方式在一定程度上解决了回调地狱的问题。
```js
function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    });
}
read(A).then(data => {
    return read(B);
}).then(data => {
    return read(C);
}).then(data => {
    return read(D);
}).catch(reason => {
    console.log(reason);
});
```
优点：
- 可读性的确有一定的提升
- 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数

缺点：
- 链式调用过多，依然存在维护问题 


###### Generator
Generator 也是一种异步编程解决方案，它最大的特点就是可以交出函数的执行权，Generator 函数可以看出是异步任务的容器，需要暂停的地方，都用 yield 语法来标注。

```js
function* gen() {
    let a = yield 111;
    console.log(a);
    let b = yield 222;
    console.log(b);
    let c = yield 333;
    console.log(c);
    let d = yield 444;
    console.log(d);
}
let t = gen();
t.next(1); //第一次调用next函数时，传递的参数无效，故无打印结果
t.next(2); // a输出2;
t.next(3); // b输出3; 
t.next(4); // c输出4;
t.next(5); // d输出5;
```

###### async/await
ES6 之后 ES7 中又提出了新的异步解决方案：async/await，async 是 Generator 函数的语法糖，async/await 的优点是代码清晰（不像使用 Promise 的时候需要写很多 then 的方法链），可以处理回调地狱的问题。async/await 写起来使得 JS 的异步代码看起来像同步代码，其实异步编程发展的目标就是让异步逻辑的代码看起来像同步一样容易理解。

```js
function testWait() {
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log("testWait");
            resolve();
        }, 1000);
    })
}
async function testAwaitUse(){
    await testWait()
    console.log("hello");
    return 123;
    // 输出顺序：testWait，hello
    // 第十行如果不使用await输出顺序：hello , testWait
}
console.log(testAwaitUse());
```

### 深入理解 Promise

如果一定要解释 Promise 到底是什么，简单来说它就是一个容器，里面保存着某个未来才会结束的事件（通常是异步操作）的结果。

#### Promise 状态
- 待定（pending）：初始状态，既没有被完成，也没有被拒绝。
- 已完成（fulfilled）：操作成功完成。
- 已拒绝（rejected）：操作失败。

#### Promise 如何解决回调地狱
使用错误冒泡的方式，在最后 catch 错误
```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
}).catch(err => {
  // xxx
})

```

#### Promise 静态方法
##### Promise.all()
所有异步返回成功后返回成功结果的数组
其中一个失败则进入catch
##### Promise.allSettled()
与 all() 类似，但即使失败也不会进入catch

##### Promise.any()
其中一个异步成功则返回 fulfilled
全部失败才返回catch

##### Promise.race()
其中一个先返回状态，则 race 返回这个最先返回的状态


### Generator

生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议。
