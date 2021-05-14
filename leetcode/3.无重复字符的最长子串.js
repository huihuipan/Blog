/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
	let maxStr = ''
	for (let i = 0; i < s.length; i ++) {
		const lessStr = s.substr(i + 1, s.length)
		let subStr = s[i]
		for (let j = 0; j < lessStr.length; j ++) {
			const endW = lessStr[j]
			if (subStr.includes(endW)) {
				break
			} else {
				subStr = subStr + endW
			}	
		}
		if (subStr.length > maxStr.length) {
			maxStr = subStr
		}
	}
	return maxStr.length
};

// @lc code=end


