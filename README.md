# Christina
A modern JavaScript animation utility library

# Introduction

克里斯蒂娜是一个专为 Canvas 2D动画、webGL3D动画所设计的工具库。

christina.js is a animation library for Canvas & webGL.

她能完成常用的 

1. 数据转化
2. 数据初始化
3. 常用动画算法

She can help you with 
1. Convert data
2. Initialize the data
3. Commonly animation algorithm

# How
```javascript
npm install christina

import _ from 'christina'
```

# Why is Christina

克里斯蒂娜是动画《命运石之门》中男主角的助手——牧濑红莉栖的别称。她协助完成了时间机器。

Christina is the role of the animation "Steins;Gate".
Makise Kurisu helped finish the time machine.

希望Christina.js也能像助手一样帮助你构建你的动画世界。

I hope Christina.js can help you build your own animated world just as much as an assistant.

# How to use

### TL;DR

我们推荐直接看测试用例这样了解更加直观
I recommend looking at the test case to find out

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

/**
 * float32类型的array.concat
 * @param first
 * @param second
 * @returns {Float32Array}
 * @constructor
 */

_.float32Concat([1,2,3],new Float32Array([4,5,6])) // -> new Float32Array([1,2,3,4,5,6])

_.float32ToArray(new Float32Array([4,5,6]) // -> [4,5,6]

/**
 * 数组堆叠 将数组循环顺序堆叠于一个指定长度的数组
 * @param maxLength 目标长度
 * @param origin 源数组
 * @returns {*} 结果数组
 */

_.arrayStacked(6,[1,2,3]) // -> [1,2,3,1,2,3]
```

- 算法

1. 几何计算

```javascript
/**
 * 勾股定理计算
 * @param {number} side1
 * @param {number} side2
 * @param {number} hypotenuse 斜边
 * @returns {*}
 */
_.pythagoras(3,4) // -> 5
_.pythagoras(null,4,5) // -> 3

/**
 * 三维矩阵变换
 * @param {string} type 饶哪个轴旋转
 * @param {number} angle 旋转角度
 * @param {num} x 坐标
 * @param {num} y 坐标
 * @param {num} z 坐标
 * @returns {x:number,y:number,z:number}
 */

// js语言精度问题可能为-0.99999，有一定误差不影响动画制作
_.matrix3DRotate('x',Math.PI / 2,1,1,1) // -> {x:1,y:-1,z:1}

/**
 * 空间中两点距离
 * @param x1
 * @param x2
 * @param y1
 * @param y2
 * @param z1
 * @param z2
 * @returns {number}
 */
_.distancePoint(1,5,1,1,1,2) // -> Math.sqrt(17)
```



