/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {

  let strMax = '' // 最长字串

  for (let i = 0; i < s.length; i ++) {
    let sMax = '' // 单数回文
    let dMax = '' // 偶数回文
    let sLock = false
    let dLock = false

    const cStr = s[i]

    let maxLength = Math.min(i, s.length - i - 1)
    for (let j = 0; j <= maxLength; j++) {
      const pStr = s[i - j - 1]  // 左1字母
      const nStr = s[i + j + 1]  // 右1字母
      const nnStr = s[i + j + 2] // 右2字母
      
      if (!sMax) sMax = cStr
      if (pStr && nStr && pStr === nStr && !sLock) {
        sMax = `${pStr}${sMax}${nStr}`
      } else {
        sLock = true
      }

      if (!dMax && cStr === nStr) dMax = `${cStr}${nStr}`
      if (dMax && pStr && nnStr && pStr === nnStr && !dLock) {
        dMax = `${pStr}${dMax}${nnStr}`
      } else {
        dLock = true
      }

      if (sLock && dLock) {
        break
      }
    }

    const cMax = sMax.length > dMax.length ? sMax : dMax
    if (cMax.length > strMax.length) {
      strMax = cMax
    }
  }
  return strMax
};
// @lc code=end

// const test = 'esbtzjaaijqkgmtaajpsdfiqtvxsgfvijpxrvxgfumsuprzlyvhclgkhccmcnquukivlpnjlfteljvykbddtrpmxzcrdqinsnlsteonhcegtkoszzonkwjevlasgjlcquzuhdmmkhfniozhuphcfkeobturbuoefhmtgcvhlsezvkpgfebbdbhiuwdcftenihseorykdguoqotqyscwymtjejpdzqepjkadtftzwebxwyuqwyeegwxhroaaymusddwnjkvsvrwwsmolmidoybsotaqufhepinkkxicvzrgbgsarmizugbvtzfxghkhthzpuetufqvigmyhmlsgfaaqmmlblxbqxpluhaawqkdluwfirfngbhdkjjyfsxglsnakskcbsyafqpwmwmoxjwlhjduayqyzmpkmrjhbqyhongfdxmuwaqgjkcpatgbrqdllbzodnrifvhcfvgbixbwywanivsdjnbrgskyifgvksadvgzzzuogzcukskjxbohofdimkmyqypyuexypwnjlrfpbtkqyngvxjcwvngmilgwbpcsseoywetatfjijsbcekaixvqreelnlmdonknmxerjjhvmqiztsgjkijjtcyetuygqgsikxctvpxrqtuhxreidhwcklkkjayvqdzqqapgdqaapefzjfngdvjsiiivnkfimqkkucltgavwlakcfyhnpgmqxgfyjziliyqhugphhjtlllgtlcsibfdktzhcfuallqlonbsgyyvvyarvaxmchtyrtkgekkmhejwvsuumhcfcyncgeqtltfmhtlsfswaqpmwpjwgvksvazhwyrzwhyjjdbphhjcmurdcgtbvpkhbkpirhysrpcrntetacyfvgjivhaxgpqhbjahruuejdmaghoaquhiafjqaionbrjbjksxaezosxqmncejjptcksnoq'

// console.log(longestPalindrome(test))