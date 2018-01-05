/**
 * @file Christina.js
 * @author tuqiang_ru@163.com）
 */


class Christina {
    // 1. 类型判断
    type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    }

    isArray(obj) {
        return this.type(obj) === 'Array';
    }

    isString(obj) {
        return this.type(obj) === 'String';
    }

    isObject(obj) {
        return this.type(obj) === 'Object';
    }

    isFunction(obj) {
        return this.type(obj) === 'Function';
    }

    isFloat32Array(obj) {
        return this.type(obj) === 'Float32Array';
    }

    isNullString(obj) {
        return this.isString(obj) && obj.replace(/(^\s*)|(\s*$)/g, '').length ? false : true;
    }

    isIE(version) {
        const b = document.createElement('b');
        b.innerHTML = `<!--[if IE ${version} ]><i></i><![endif]-->`;
        return b.getElementsByTagName('i').length === 1;
    }

    // 2.数据处理

    /**
     * Hex转RGBA
     * @param {String} color Hex颜色值 eg： #ff0000 #fff
     * @param {Number} alpha 值 默认为1
     * @returns {object} {rbg:{String},toString:{function} } RGB颜色值
     */
    hexToRgba(color, alpha) {
        let newColor = color.replace('#', '');
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
        const result = {
            'rgb': newColor
        };
        result.toString = () => `RGBA(${newColor.join(',')},${a})`;

        return result;
    }

    /**
     * RGB转Hex
     * @param {Array} color R、G、B三个值
     * @returns {string} Hex值
     */
    rgbToHex(color) {
        const newColor = color.map(item => {
            return Number(item).toString(16).length < 2 ?
                `0${Number(item).toString(16)}` :
                Number(item).toString(16);
        }).join('');

        return `#${newColor}`;
    }
    // 2.2 随机数生成
    // 随机浮点数
    random(min = 0,max){
        if(max === undefined){
            max = min || 1;
            min = 0;
        }
        return Math.random() * ( max - min ) + min;
    }
    // 获得一个区间的整数随机数 不指定则为 [0- 100] 闭区间
    randomInt(max = 100, min = 0) {
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
    smoothRandom(count, bits) {
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
    analogy(origin, oriStart, oriEnd, tarStart, tarEnd) {
        return ((tarEnd - tarStart) * ((origin - oriStart) / (oriEnd - oriStart))) + tarStart;
    }

    /**
     * float32类型的array.concat
     * @param first
     * @param second
     * @returns {Float32Array}
     * @constructor
     */
    Float32Concat(first, second) {
        var firstLength = first.length,
            result = new Float32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    }

    Float32ToArray(origin) {
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
    arrayStacked(maxLength, origin) {
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
    inExpo(t, b, c, d) {
        return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    // 3. 动画算法

    // 3.1 几何计算
    /**
     * @勾股定理
     * @三维矩阵变换
     * @随机整数
     * @raf polyfill
     */

    /**
     * 勾股定理计算
     * @param {number} side1
     * @param {number} side2
     * @param {number} hypotenuse 斜边
     * @returns {*}
     */
    pythagoras(side1, side2, hypotenuse) {
        let rs;
        if (!hypotenuse) {
            rs = Math.sqrt(Math.pow(+side1, 2) + Math.pow(+side2, 2));
        } else {
            const s1 = +side1 || 0;
            const s2 = +side1 || 0;
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

    matrix3DRotate(type = 'x', angle, x, y, z) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        switch (type) {
            case 'x':
            {

            }
            default:
                return {};
        }
        return {};
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

    getMatrix4(offset) {
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
    raf(callback) {
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
    objToArr(obj) {
        const ar = [];
        for (const key in obj) {
            ar.push(obj[key]);
        }
        return ar;
    }

    objMerge(obj1, obj2) {
        return Object.assign({},obj1,obj2);
    }
    // 判断字符串有多少个字节
    strByteLength(data) {
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

    debounce(fn, delay) {
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
    getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i'),
            stringStart = 1;
        const r = window.location.href.substr(stringStart).match(reg);
        if (r !== null) {
            const valueIndex = 2;

            return decodeURIComponent(r[valueIndex]);
        }

        return null;
    }
}

export default (new Christina());
