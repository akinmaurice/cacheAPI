import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

const mongoose = require('mongoose');

const Key = require('../../app/models/Key');
const Data = require('../../app/models/Data');


const createKeyData = rewire('../../app/controllers/create.data.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to create data for key', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Validation check should fail', async() => {
        const request = {};
        const checkRequest = createKeyData.__get__('checkRequest');
        await expect(checkRequest(request)).to.be.rejected;
    });


    it('Validation check should pass', async() => {
        const request = {
            message: 'Hello'
        };
        const checkRequest = createKeyData.__get__('checkRequest');
        const response = await checkRequest(request);
        response.should.equal(true);
    });


    it('Should verify Key Exists', async() => {
        const key_name = 'akin-key';
        const data = {
            id: 'jfjfj'
        };
        sandbox.stub(Key, 'findOne').returns(Promise.resolve(data));
        const verifyKey = createKeyData.__get__('verifyKey');
        const response = await verifyKey(key_name);
        response.should.equal(data);
    });


    it('Should create data for key', async() => {
        const key_name = 'akin-key';
        const data = {
            key: key_name,
            message: 'hello World'
        };
        sandbox.stub(Data, 'create').returns(Promise.resolve('Data Added'));
        const createData = createKeyData.__get__('createData');
        const response = await createData(data, key_name);
        response.should.equal('Data Added');
    });
});
