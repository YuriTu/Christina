# Christina
A modern JavaScript animation utility library

# Introduction

克里斯蒂娜是一个专为 Canvas 2D动画、webGL3D动画所设计的工具库。

她能完成常用的 

1. 数据转化
2. 数据初始化
3. 常用动画算法

# How
```javascript
npm install christina

import _ from 'christina'
```

# Why is Christina

克里斯蒂娜是动画《命运石之门》中男主角的助手——牧濑红莉栖的别称。她协助完成了时间机器。

希望Christina.js也能像助手一样帮助你构建你的动画世界。


# How to use

### TL;DR

我们推荐直接看测试用例这样了解更加直观

- 类型判断
```javascript
_.isArray()

_.isString() 

_.isObject() 

_.isFunction()

// 浮点数组判断
_.isFloat32Array([]) // -> false 

// 空字符串
_.isNullString("") // -> true 

_.isIE() // -> bool
```

- 数据处理

1. 数据转换

```javascript
// 十六进制色转rgba 
// Warning! 此处非 ===
_.hexToRgba('#FF9E72',.1) // == 'rgba(225,158,114,.1)'
_.hexToRgba('0xFF9E72',.1) // == 'rgba(225,158,114,.1)'
_.hexToRgba('#FF9E72',.1).rgb // -> 'rgb(225,158,114)'
_.hexToRgba('0xFF9E72',.1).rgbArr // -> '[151,39,45]'

// rbga转十六进制色
_.rgbToHex([0,255,0]) // == '#00ff00'
_.rgbToHex([0,255,0])['0x'] // -> '0x00ff00'
```

2. 随机数生成

```javascript

//随机浮点数 min最小值 max 最大值 默认为正数
_.random(min,max) // -> 0.002

//随机整数 默认为0-100
_.randomInt(min,max) // -> 25

/**
 * 生成一组平滑的随机数，根据数量，将随机数均匀的分布
 * @param {String} count 需要生成几个数据
 * @param {Number} bits 需要保留几位小数
 * @returns {Array} 对应的数组
 */
_.smoothRandom(count,bits) // -> [0,2.5,4.5,7.2.9.8]
```

3. 数据处理

```javascript
/**
 * 数字映射
 * @param {number} origin 提供数据
 * @param {number} oriStart 数据起点
 * @param {number} oriEnd 数据重点
 * @param {number} tarStart 映射数据起点
 * @param {number} tarEnd 映射数据终点
 * @returns {number} 映射数据
 */
_.analogy(3,-5,5,0,100)) // -> 80

```
