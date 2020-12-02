class LinkedList {
  constructor() {
    this.headNode = null    // 存储头节点
    this.length = 0  // 存储数量
  }

  // 创建节点
  createNode(node, next = null) {
    return {
      node,
      next,
    }
  }

  // 获取指定位置节点 | (default | 超出): 最后一个节点
  getNode(idx) {
    const _this = this

    if (idx === 0) {
      return this.headNode
    }

    const endIdx = idx && idx <= this.length ? idx : this.length
    let i = 0
    function readLinkedList(node) {
      if (node.next !== null && i < endIdx) {
        i += 1
        return readLinkedList(node.next)
      } else {
        return node
      }
    }
    return readLinkedList(this.headNode)
  }

  // 是否为空链表
  isEmpty(){
    let res = true
    if (this.headNode) {
      res = false
    }
    return res
  }


  // 获取链表长度
  getLength() {
    return this.length
  }

  // 从尾部插入
  add(node) {
    const newNode = this.createNode(node)
    if (this.isEmpty()) {
      this.headNode = newNode
    } else {
      const tailNode = this.getNode()
      tailNode.next = newNode
    }
    this.length += 1
  }

  // 从指定位置插入 | default 默认第一个节点
  insert(node, idx = 0) {
    if (this.isEmpty()) {
      this.headNode = this.createNode(node)
    } else if (idx === 0) {
      const newHead = this.createNode(node, this.headNode)
      this.headNode = newHead
    } else {
      const preNode = this.getNode(idx - 1)
      const idxNode = this.getNode(idx)
      const newNode = this.createNode(node, idxNode)
      preNode.next = newNode
    }
    this.length += 1
  }
  
  // 更新指定位置
  update(node, idx) {
    if (this.isEmpty()) {
      this.headNode = this.createNode(node)
    } else {
      const idxNode = this.getNode(idx)
      idxNode.node = node
    }
  }

  // 删除指定节点 没有则不删除
  delete(idx) {
    if (this.isEmpty()) {
      return
    } else if (idx === 0) {
      this.headNode = null
    } else {
      const preNode = this.getNode(idx - 1)
      const idxNode = this.getNode(idx)
      if (idxNode.next) {
        preNode.next = idxNode.next
      } else {
        preNode.next = null
      }
      this.length -= 1
    }
  }

}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
  }
  
  // 创建节点
  createNode(node, next = null, pre = null) {
    return {
      pre,
      node,
      next,
    }
  }

  // 从尾部插入
  add(node) {
    if (this.isEmpty()) {
      this.headNode = this.createNode(node)
    } else {
      const tailNode = this.getNode()
      tailNode.next = this.createNode(node, null, tailNode)
    }
    this.length += 1
  }

}

const dLs = new DoublyLinkedList()

dLs.add('a0')
dLs.add('a1')
dLs.add('a2')
dLs.add('a3')
console.log(JSON.stringify(dLs))