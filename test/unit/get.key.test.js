import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

const Key = require('../../app/models/Key');
const Data = require('../../app/models/Data');


const getKey = rewire('../../app/controllers/cache/get.key.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to get a single key', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should get a single valid key', async() => {
        const params = {
            key_name: 'akin-key'
        };
        const key =
            {
                _id: '5c1403179ad7dd6f1ed227ff',
                name: '2b9240600e8099d7f27ab45f7ae3f4c5c0ac588a',
                ttl: '2018-12-14T20:49:22.774Z',
                __v: 0,
                created: '2018-12-14T19:23:03.149Z'
            };
        const data = [
            {
                _id: '5c1418ef9232bf261eaab79b',
                key: '859181d9a810f907e7549d39be49c45e30267e37',
                message: 'Updated Text new',
                __v: 0,
                created: '2018-12-14T20:56:15.559Z'
            }
        ];
        sandbox.stub(Key, 'findOne').returns(Promise.resolve(key));
        sandbox.stub(Key, 'findOneAndUpdate').returns(Promise.resolve(key));
        sandbox.stub(Data, 'find').returns(Promise.resolve(data));
        sandbox.stub(Key, 'count').returns(Promise.resolve(10));
        const getKeyFromDb = getKey.__get__('getKeyFromDb');
        const response = await getKeyFromDb(params);
        response.should.equal(data);
    });


    it('Should get create a new key', async() => {
        const params = {
            key_name: 'akin-key'
        };
        const key =
            {
                _id: '5c1403179ad7dd6f1ed227ff',
                name: '2b9240600e8099d7f27ab45f7ae3f4c5c0ac588a',
                ttl: '2018-12-14T20:49:22.774Z',
                __v: 0,
                created: '2018-12-14T19:23:03.149Z'
            };
        const data = [
            {
                _id: '5c1418ef9232bf261eaab79b',
                key: '859181d9a810f907e7549d39be49c45e30267e37',
                message: 'Updated Text new',
                __v: 0,
                created: '2018-12-14T20:56:15.559Z'
            }
        ];
        sandbox.stub(Key, 'findOne').returns(Promise.resolve());
        sandbox.stub(Key, 'create').returns(Promise.resolve(key));
        sandbox.stub(Data, 'find').returns(Promise.resolve(data));
        sandbox.stub(Key, 'count').returns(Promise.resolve(10));
        const getKeyFromDb = getKey.__get__('getKeyFromDb');
        const response = await getKeyFromDb(params);
        response.should.be.a('string');
    });
});
