global.name = 'globalName'
const obj = {
    name: 'objName',
    getName: function() {
        console.log(this.name)
    }
}

obj.getName()

const getName = obj.getName
getName()