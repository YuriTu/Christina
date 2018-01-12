/**
 * @file 数据函数测试
 * @author tuqiang_ru@163.com）
 */

import _ from '../dist/christina';
import {expect} from 'chai';
describe('Data judgment', () => {
    it('hexToRgba', () => {
        expect(_.hexToRgba('#00FF00').toString()).to.be.equal("RGBA(0,255,0,1)");
        expect(_.hexToRgba('#FF9E72').toString()).to.be.equal("RGBA(255,158,114,1)");
        expect(_.hexToRgba('#97272D').rgb).to.be.a('array');
    });
    it('rgbToHex', () => {
        expect(_.rgbToHex([0,255,0])).to.be.equal('#00ff00');
        expect(_.rgbToHex([255,158,114])).to.be.equal('#ff9e72');
    });
    it('smoothRandom', () => {
        expect(_.smoothRandom(5)).to.be.a('array');
    });
    it('function', () => {
        expect(_.isFunction(() => null)).to.be.ok;
    });
    it('randomInt', () => {
        expect(_.randomInt()).to.be.a('number');
        expect(_.randomInt(10,20)).to.be.a('number');
    });
});
