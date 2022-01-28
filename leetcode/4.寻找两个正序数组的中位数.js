/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const arrSrc = nums1.concat(nums2)
  const notSameArr = arrSrc.sort((a, b) => {
    if (a > b) {
      return 1
    }
    return - 1
  })
  const halfLength = Math.ceil(notSameArr.length / 2)
  for (let i = 0; i < halfLength; i++) {
    if (notSameArr.length === 2) {
      return ((Number(notSameArr[0]) + Number(notSameArr[1])) / 2)
    } else if (notSameArr.length === 1) {
      return Number(notSameArr[0])
    }
    notSameArr.shift()
    notSameArr.pop()
  }
  return notSameArr
};
// @lc code=end

