/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  // console.log(JSON.stringify(l1))

  function cv(list) {
    if (list && list.val) {
      return list.val
    }
    return 0
  }

  function cn(list) {
    if (list && list.next) {
      return list.next
    }
    return null
  }

  function add(ls1, ls2, ls3 = { val: 0, next: null }) {
    const val = cv(ls1) + cv(ls2) + cv(ls3)
    const resultNode = {
      val: val > 9 ? val - 10 : val,
      next: val > 9 ? { val: 1 } : null
    }
    const node = {
      val: resultNode.val,
      next: cn(ls1) || cn(ls2) || cn(resultNode) ? add(cn(ls1), cn(ls2), cn(resultNode)) : null,
    }
    return node
  }

  const l3 = add(l1, l2)  
  console.log(l3)
  return l3

};
// @lc code=end

