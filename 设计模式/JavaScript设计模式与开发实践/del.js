// global.name = 'globalName'
// const obj = {
//     name: 'objName',
//     getName: function() {
//         console.log(this.name)
//     }
// }

// obj.getName()

// const getName = obj.getName
// getName()

function calcEveryCombinaTion(arr) {    
    let total = 0
    arr.forEach(item => {
        total += item
    })
    let res = {}
    // res[total] = [arr]

    function add(initArr, start) {
        let init = 0
        initArr.forEach(item => {
            init += item
        })
        if (init === total) {
            console.log(init === total)
            return res
        }
        for (let i = start; i < arr.length; i++) {
            const price = init + arr[i]
            const currentArr = [...initArr, arr[i]]
            if (res[price]) {
                res[price].push(currentArr.join(','))
            } else {
                res[price] = [currentArr.join(',')]
            }
        }

        if (start === arr.length - 1) {
            console.log('未到底')
            let hasChange = 0
            let newInit = initArr
            let newStart = start += 1
            for(let i = 0; i < initArr.length; i++) {
                const idx = arr.indexOf(initArr)
                const endIdx = arr.length - initArr.length + i
                if (idx < endIdx) {
                    newInit[i] = arr[idx + 1]
                }
            }
            return add(newInit, newStart)
        } else {
            let newInit = [...initArr, arr[start]]
            let newStart = start += 1
            return add(newInit, newStart)
        }

        // let newInit = []
        // for (let i = 0; i < initArr.length; i++) {
        //     console.log(i, initArr[i], arr[arr.length - 1 - i], initArr[i] === arr[arr.length - 1 - i])
        //     if (initArr[i] === arr[arr.length - 1 - i]) {
        //         console.log(`第${i}个位置到头了`, initArr.join(','))
        //     }

        //     // const idx = arr.indexOf(initArr[i])
        //     // console.log(idx === arr.length - i, idx, arr.length - i)
        //     // if (idx === arr.length - i) {
        //     //     console.log('该位置到头了', newInit.join(','))
        //     // }
        // }
    }
    return add([], 0)
    
}
// const arr = [1, 2, 3, 4, 6, 8, 10, 12, 15, 20, 25]
// const res = calcEveryCombinaTion(arr)

// console.log(JSON.stringify(res))

const arr = [1,2,3,4]
const resJson = {}
function getNextArr(initArr) {
    let newInitArr = [...initArr]
    let booEndArr = initArr.map(() => false)

    if (!initArr.length) {
        newInitArr[initArr.length] = arr[initArr.length]
    } else {

        for (let i = initArr.length - 1; i >= 0; i --) {
            const idx = arr.indexOf(initArr[i])
            const endIdx = arr.length - initArr.length + i
    
            const preIdx = initArr[i - 1] ?  arr.indexOf(initArr[i - 1]) : null
            const preEndIdx = arr.length - initArr.length + i - 1
            
            const nextIdx = initArr[i + 1] ?  arr.indexOf(initArr[i + 1]) : null
            const nextEndIdx = arr.length - initArr.length + i + 1
        
            if (idx < endIdx) {
                // console.log('未到头')
                // if (idx > 0) {
                //     console.log('非第一个未到头', `${newInitArr[i]} => ${arr[idx]}`)
                //     newInitArr[i] = arr[idx + 1]
                // } else {
                //     console.log('第一个未到头', `${newInitArr[i]} => ${arr[idx + 1]}`)
                //     newInitArr[i] = arr[idx]
                // }
                if (booEndArr[i + 1] || !nextIdx) {
                    console.log(`第${i+1}到最后，第${i}没到最后，递进${newInitArr[i]} => ${arr[idx + 1]}`)
                    newInitArr[i] = arr[idx + 1]
                } else {
                    console.log(`第${i+1}没到最后，第${i}没到最后，不变${newInitArr[i]} => ${arr[idx]}`)
                    newInitArr[i] = arr[idx]
                }
            } else {
                booEndArr[i] = true
                console.log(`第${i}到最后${newInitArr[i]} => ${arr[i + 1]}`)
                newInitArr[i] = arr[i + 1]
                // console.log(`第${i}到头`, `${newInitArr[i]} => ${arr[i]}`)
                // newInitArr[i] = arr[i]
                
                if (preIdx && preIdx === preEndIdx) {
                    newInitArr[i] = arr[idx]
                } else {
                    newInitArr[i] = arr[i]
                }
            
            }
            if (i === 0 && idx === endIdx) {
                console.log('增加一位', `${newInitArr} => ${[...newInitArr, arr[initArr.length]]}`)
                newInitArr[initArr.length] = arr[initArr.length]
            }
        }
    }
    // console.log(`${initArr} => ${newInitArr}`)
    const result = JSON.parse(JSON.stringify(newInitArr))

    let total = 0
    result.forEach(item => {
        total += item
    })

    if (!resJson[total]) {
        resJson[total] = [result.join(',')]
    } else {
        resJson[total].push(result.join(','))
    }


    console.log(result.join(','))
    console.log('------------------')
    if (initArr.length === arr.length) {
        return result
    }
    return getNextArr(result)
}
// const a = getNextArr([4])
// console.log('==================')
// const b = getNextArr(a)
// console.log('==================')
// const c = getNextArr(b)
// console.log('==================')
// console.log({
//     a, b, c,
// })

getNextArr([])
console.trace(resJson)
// console.log(JSON.stringify(resJson))

