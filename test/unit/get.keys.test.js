import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

const Key = require('../../app/models/Key');


const getKeys = rewire('../../app/controllers/get.keys.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to get all keys', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Should fail to get all keys', async() => {
        const getKeysFromDb = getKeys.__get__('getKeysFromDb ');
        await expect(getKeysFromDb()).to.be.rejected;
    });


    it('Should get all keys', async() => {
        const keys = [
            {
                _id: '5c1403179ad7dd6f1ed227ff',
                name: '2b9240600e8099d7f27ab45f7ae3f4c5c0ac588a',
                ttl: '2018-12-14T20:49:22.774Z',
                __v: 0,
                created: '2018-12-14T19:23:03.149Z'
            }
        ];
        sandbox.stub(Key, 'find').returns(Promise.resolve(keys));
        const getKeysFromDb = getKeys.__get__('getKeysFromDb ');
        const response = await getKeysFromDb();
        response.should.equal(keys);
    });
});
