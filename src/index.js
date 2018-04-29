/**
 * @file Christina.js
 * @author tuqiang_ru@163.com）
 */

// todo 随机 -1 1 二分数子


Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

export default class Christina {
    // 构造函数处理
    constructor(){
        String.prototype.setProto = function(key,value){
            this[key] = value;
        }
    }
    // 1. 类型判断
    static type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    }

    static isArray(obj) {
        return this.type(obj) === 'Array';
    }

    static isString(obj) {
        return this.type(obj) === 'String';
    }

    static isObject(obj) {
        return this.type(obj) === 'Object';
    }

    static isFunction(obj) {
        return this.type(obj) === 'Function';
    }

    static isFloat32Array(obj) {
        return this.type(obj) === 'Float32Array';
    }

    static isNullString(obj) {
        return this.isString(obj) && obj.replace(/(^\s*)|(\s*$)/g, '').length ? false : true;
    }

    static isIE(version) {
        const b = document.createElement('b');
        b.innerHTML = `<!--[if IE ${version} ]><i></i><![endif]-->`;
        return b.getElementsByTagName('i').length === 1;
    }

    // 2.数据处理
    //2.1 数据转换
    /**
     * Hex转RGBA
     * @param {String} color Hex颜色值 eg： #ff0000 #fff 0xfff
     * @param {Number} alpha 值 默认为1
     * @returns {object} {rbg:{String},toString:{function} } RGB颜色值
     */
    static hexToRgba(color, alpha) {
        if(!color.startsWith('#') && !color.startsWith('0x') ){
            throw new Error('args is not HEX color');
        }
        let newColor = color.replace(/#|0x/, '');
        const a = parseFloat(alpha) || 1;
        if (newColor.length === 3) {
            newColor = newColor.split('').map(item => parseInt(`0x${item}${item}`));
        } else {
            newColor = newColor.split('').map((item, index) => {
                if (index % 2 === 0) {
                    return parseInt(`0x${item}${newColor[index + 1]}`);
                }
                return '';
            }).filter(item => item !== '');
        }
        const result = new String(`rgba(${newColor.join(',')},${a})`)
        result.setProto('rgb',`rgb(${newColor.join(',')})`);
        result.setProto('rgbArr',newColor);

        return result;
    }

    /**
     * RGB转Hex
     * @param {Array} color R、G、B三个值
     * @returns {string} Hex值
     */
    static rgbToHex(color) {
        const newColor = color.map(item => {
            return Number(item).toString(16).length < 2 ?
                `0${Number(item).toString(16)}` :
                Number(item).toString(16);
        }).join('');

        const rs = new String(`#${newColor}`)
        rs.setProto('0x',`0x${newColor}`)

        return rs;
    }
    // 2.2 随机数生成
    // 随机浮点数
    static random(min = 0,max){
        if(max === undefined){
            max = min || 1;
            min = 0;
        }
        return Math.random() * ( max - min ) + min;
    }
    // 获得一个区间的整数随机数 不指定则为 [0- 100] 闭区间
    static randomInt(min = 0,max = 100 ) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 生成一组平滑的随机数，根据数量，将随机数均匀的分布
     * @param {String} count 需要生成几个数据
     * @param {Number} bits 需要保留几位小数
     * @returns {Array} 对应的数组
     */
    static smoothRandom(count, bits) {
        let num = parseInt(count);
        const rs = [];
        if (isNaN(num) || (typeof num !== 'number')) {
            num = 1;
        }
        const step = 1 / num;
        let i = 1;
        while (i <= num) {
            const number = Math.random() * step * i;
            const flag = number > (step * (i - 1)) && number < (step * (i + 1));
            if (flag) {
                rs.push(+number.toFixed(bits));
                i++;
            }
        }
        return rs;
    }

    // 2.3 数据处理

    /**
     * 数字映射
     * @param {number} origin 提供数据
     * @param {number} oriStart 数据起点
     * @param {number} oriEnd 数据重点
     * @param {number} tarStart 映射数据起点
     * @param {number} tarEnd 映射数据终点
     * @returns {number} 映射数据
     */
    static analogy(origin, oriStart, oriEnd, tarStart, tarEnd) {
        return ((tarEnd - tarStart) * ((origin - oriStart) / (oriEnd - oriStart))) + tarStart;
    }

    /**
     * float32类型的array.concat
     * @param first
     * @param second
     * @returns {Float32Array}
     * @constructor
     */
    static float32Concat(first, second) {
        if (!( this.isFloat32Array(first) || this.isArray(first) ) || !(this.isFloat32Array(second) || this.isArray(second) )) {
            return new Float32Array([]);
        }
        const firstLength = first.length;
        const result = new Float32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    }

    static float32ToArray(origin) {
        if (!this.isFloat32Array(origin)) {
            return origin;
        }

        return Array.prototype.slice.call(origin);
    }

    /**
     * 数组堆叠 将数组循环顺序堆叠于一个指定长度的数组
     * @param maxLength 目标长度
     * @param origin 源数组
     * @returns {*} 结果数组
     */
    static arrayStacked(maxLength, origin) {
        if (!(Array.isArray(origin) || this.isFloat32Array(origin))) {
                return;
            }
            if (origin.length === 0) {
                return;
            }
                if (origin.length > maxLength) {
            return origin;
            }

        const rs = [];
        for (let i = 0; i < maxLength; i++) {
            const trueIndex = i % origin.length;
            rs[i] = origin[trueIndex];
        }
        return rs;
    }



    /**
     * 返回基于二次函数的渐变值
     * @param t 当前值
     * @param b 开始值
     * @param c 变化值
     * @param d 持续时间
     * @returns {*}
     */
    static inExpo(t, b, c, d) {
        return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    // 3. 动画算法

    // 3.1 几何计算
    /**
     * @勾股定理
     * @三维矩阵变换
     * @空间点距离
     * @raf polyfill
     */

    /**
     * 勾股定理计算
     * @param {number} side1
     * @param {number} side2
     * @param {number} hypotenuse 斜边
     * @returns {*}
     */
    static pythagoras(side1 = 0, side2 = 0, hypotenuse) {
        let rs;
        if (!hypotenuse) {
            rs = Math.sqrt(Math.pow(+side1, 2) + Math.pow(+side2, 2));
        } else {
            const s1 = +side1 || 0;
            const s2 = +side2 || 0;
            rs = Math.sqrt(Math.pow(+hypotenuse, 2) - Math.pow(s1, 2) - Math.pow(s2, 2));
        }
        return rs;
    }

    /**
     * 三维矩阵变换
     * @param {string} type 饶哪个轴旋转
     * @param {number} angle 旋转角度
     * @param {num} x 坐标
     * @param {num} y 坐标
     * @param {num} z 坐标
     * @returns {object}
     */

    static matrix3DRotate(type = 'x', angle = 0, x, y, z) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let rs = {};
        switch (true) {
            case (/x/i).test(type):
                rs.x = x;
                rs.y = y * cos - z * sin;
                rs.z = y * sin + z * cos;
                break;
            case (/y/i).test(type):
                rs.x = z * sin + x * cos;
                rs.y = y;
                rs.z = z * cos - x * sin;
                break;
            case (/z/i).test(type):
                rs.x = x * cos - y * sin;
                rs.y = z * sin + x * cos;
                rs.z = z;
                break;
            default:
                throw new Error('type must be x|y|z')
        }
        return rs;
    }

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
    static distancePoint(x1,x2,y1,y2,z1,z2){
        return Math.sqrt( (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
    }

    /**
     * 计算偏移矩阵
     * @def: .getMatrix4: offset => THREE.Matrix4
     *   offset: {Object}
     *     RotationX: {Number} // 绕 X 轴旋转角度，2*PI 为一圈，eg: Math.PI / 2
     *     RotationY: {Number} // 绕 Y 轴旋转角度，2*PI 为一圈，eg: Math.PI / 2
     *     RotationZ: {Number} // 绕 Z 轴旋转角度，2*PI 为一圈，eg: Math.PI / 2
     *     Translation: {Array} // 位移 [x,y,z]
     *     Scale: {Array} // 缩放大小 [x,y,z]
     **/

    static getMatrix4(offset) {
        let m = new THREE.Matrix4();

        for (const key in offset) {
            const val = offset[key];
            if (Array.isArray(val)) { // 位移，缩放，值为数组
                // console.log(...val);
                m[`make${key}`](...val);
            } else { // 旋转，值为角度
                m[`make${key}`](val);
            }
        }
        return m;
    }

    // 3.2 动画处理
    static raf(callback) {
        window.ranf = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||

            function (cb) {
                let start,
                    finish;
                const self = {};
                window.setTimeout(() => {
                    start = +new Date();
                    cb(start);
                    finish = +new Date();

                    self.timeout = 1000 / 60 - (finish - start);
                }, self.timeout);
            };
        return window.ranf(callback);
    }

    // 4.web常用
    /**
     * 类数组对象转数组
     * @param obj
     * @returns {Array}
     */
    static objToArr(obj) {
        const ar = [];
        for (const key in obj) {
            ar.push(obj[key]);
        }
        return ar;
    }

    static objMerge(obj1, obj2) {
        return Object.assign({},obj1,obj2);
    }
    // 判断字符串有多少个字节
    static strByteLength(data) {
        let len = 0;
        for (let i = 0; i < data.length; i++) {
            // 全角
            if (data[i].match(/[^x00-xff]/ig) !== null) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    }

    /**
     * 函数防抖
     * @type {{}}
     */

    static debounce(fn, delay) {
        let timer = 0;
        return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn(...args);
            }, delay);
        };
    }

    /**
     * 取url中的参数
     * 调用方法_.getUrlParam("参数名")
     * @param {string} name The url param key name.
     * @returns {*} The value with the key in the url search.
     */
    static getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i'),
            stringStart = 1;
        const r = window.location.href.substr(stringStart).match(reg);
        if (r !== null) {
            const valueIndex = 2;

            return decodeURIComponent(r[valueIndex]);
        }

        return null;
    }



    static partition(myArray, left, right){
        // 保存定位点
        let temp = myArray[left]
        while (left < right){
            // 交换
            while(left < right && myArray[right] >= temp)--right;
            myArray[left] =

                myArray[right];
            while(left < right && myArray[left] <= temp)++left;
            myArray[right] = myArray[left];
        }
        // 还原
        myArray[left] = temp;
        return left;
    }
    // 快排
    static Qsort(
        arr = [],
        left = 0,
        right = arr.length - 1,
    ){
        if(left >= right) return;
        let index = this.partition(arr, left, right);
        this.Qsort(arr, left, index - 1);
        this.Qsort(arr, index +1, right);
        return arr;
    }
}
