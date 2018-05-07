/**
 * @file 类型函数测试
 * @author tuqiang_ru@163.com）
 */

import _ from '../dist/christina';
// import _ from '../src/index';
import {expect} from 'chai';

describe('Type judgment', () => {
    it('string', () => {
        expect(_.isString('string')).to.be.ok;
    });
    it('array', () => {
        expect(_.isArray([])).to.be.ok;
    });
    it('object', () => {
        expect(_.isObject({})).to.be.ok;
    });
    it('function', () => {
        expect(_.isFunction(() => null)).to.be.ok;
    });
    it('Float32Array', () => {
        expect(_.isFloat32Array([])).to.not.be.ok;
        expect(_.isFloat32Array(new Float32Array())).to.be.ok;
    });
    it('null string', () => {
        expect(_.isNullString('')).to.be.ok;
    });
    // it('IE',() => {
    //     expect(_.isIE(10).to.not.be.ok);
    // });
    // it('WebGL',() => {
    //     expect(_.canWebGL().to.not.be.ok);
    // });
});
