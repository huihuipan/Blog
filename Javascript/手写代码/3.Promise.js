const PADDING = 'padding'       // promise 初始状态
const FULFILLED = 'fulfilled'   // promise 成功状态
const REJECTED = 'rejected'     // promise 失败状态

class _Promise {
  constructor(executor) {
    
    this.state = PADDING    // Promise 状态
    this.value = undefined  // resolve 返回值
    this.reason = undefined // reject 返回值

    this.onFulfilledCallbacks = []    // 用于存放成功后的回调
    this.onRejectedCallbacks = []     // 用于存放失败后的回调


    // 成功回调
    let resolve = value => {
      if (this.state !== PADDING) {
        return
      }
      this.state = FULFILLED
      this.value = value

      this.onFulfilledCallbacks.forEach(fn => fn())
    }

    // 失败回调
    let reject = reason => {
      if (this.state !== PADDING) {
        return
      }
      this.state = REJECTED
      this.reason = reason

      this.onRejectedCallbacks.forEach(fn => fn())
    }

    // 如果 executor 报错，则执行 reject
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }

  }

  // then 方法
  then(onFulfilled, onRejected) {
    // then 返回的是一个 Promise
    const promise2 = new _Promise((resolve, reject) => {
      // resolve
      if (this.state === FULFILLED) {
        let x = onFulfilled(this.value)
        resolvePromise(promise2, x, resolve, reject)
      }
      
      // reject
      if (this.state === REJECTED) {
        let x = onRejected(this.reason)
        resolvePromise(promise2, x, resolve, reject)
      }

      // padding 把回调函数存储起来
      if (this.state === PADDING) {
        this.onFulfilledCallbacks.push(() => { 
          let x = onFulfilled(this.value) 
          resolvePromise(promise2, x, resolve, reject)
        })
        this.onRejectedCallbacks.push(() => { 
          let x = onRejected(this.reason) 
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })

    return promise2

  }

}

const resolvePromise = (promise2, x, resolve, reject) => {
  // 循环引用报错
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 防止多次引用
  let called
  if (typeof x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function')  {
        then.call((x, y) => {
          if (called) return
          called = true
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject)
        }, err => {
          if (called) return
          called = true

          reject(err)
        })
        return
      }
      
      resolve(x)
   
    } catch (error) {
      // 也属于失败
      if (called) return
      called = true
      // 取then出错了那就不要在继续执行了
      reject(error); 
    }
  }


}



const delayTime = (time = 3000, callback) => {
  return new _Promise(resolve => {
    // setTimeout(() => {
    //   if (callback) {
    //     callback()
    //   }
    //   resolve()
    // }, time)
    console.log(time)
    resolve(time)
  })
}

let a = delayTime(3000, () => { console.log('第一次')})
.then(() => {
  delayTime(4000, () => { console.log('第二次')})
}).then(() => {
  delayTime(5000, () => { console.log('第三次')})
})

