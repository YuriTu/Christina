/**
 * @file 数据函数测试
 * @author tuqiang_ru@163.com）
 */

// import _ from '../dist/christina';
import _ from '../src/index';
import {expect} from 'chai';
describe('Data judgment', () => {
    it('hexToRgba', () => {
        expect(_.hexToRgba('#00FF00')).to.have.string("rgba(0,255,0,1)");
        expect(_.hexToRgba('#FF9E72')).to.have.string("rgba(255,158,114,1)");
        expect(_.hexToRgba('0xFF9E72')).to.have.string("rgba(255,158,114,1)");
        expect(_.hexToRgba('#97272D').rgb).to.be.equal('rgb(151,39,45)');
        expect(_.hexToRgba('0x97272D').rgbArr).to.be.an('array').to.include.members([151,39,45]);
    });
    it('rgbToHex', () => {
        expect(_.rgbToHex([0,255,0])).to.have.string('#00ff00');
        expect(_.rgbToHex([255,158,114])).to.have.string('#ff9e72');
        expect(_.rgbToHex([255,158,114])['0x']).to.be.equal('0xff9e72');
    });
    it('floatRandom', () => {
        expect(_.random(5)).to.be.a('number');
    });
    it('intRandom', () => {
        expect(_.randomInt()).to.be.a('number').lessThan(100);
    });

    it('smoothRandom', () => {
        expect(_.smoothRandom(5)).to.be.a('array');
    });

});

describe('Data transfrom', () => {
    it('analogy', () => {
        expect(_.analogy(3,-5,5,0,100)).to.be.equal(80);
    });
    it('float32Concat', () => {
        const a = new Float32Array([1,2,3]);
        const b = new Float32Array([4,5,6]);
        const c = [4,5,6]
        expect(_.float32Concat(a,b)).to.be.a('float32array');
        expect(_.float32Concat(a,b).length).to.be.equal(6);
        expect(_.float32Concat(a,c)).to.be.a('float32array');
        expect(_.float32Concat(a,c).length).to.be.equal(6);
    });
    it('float32ToArray', () => {
        const a = new Float32Array([1,2,3]);
        expect(_.float32ToArray(a)).to.be.an('array');
        expect(_.float32ToArray(a).length).to.be.equal(3);
    });
    it('arrayStacked', () => {

    })
})

