import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

const mongoose = require('mongoose');

const Key = require('../../app/models/Key');
const Data = require('../../app/models/Data');


const updateKeyData = rewire('../../app/controllers/update.data.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates Functions to update key data', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Validation check should fail', async() => {
        const request = {};
        const checkRequest = updateKeyData.__get__('checkRequest');
        await expect(checkRequest(request)).to.be.rejected;
    });


    it('Validation check should pass', async() => {
        const request = {
            message: 'Hello'
        };
        const checkRequest = updateKeyData.__get__('checkRequest');
        const response = await checkRequest(request);
        response.should.equal(true);
    });


    it('Should verify Key Exists before update', async() => {
        const key_name = 'akin-key';
        const data = {
            id: 'jfjfj'
        };
        sandbox.stub(Key, 'findOne').returns(Promise.resolve(data));
        const verifyKey = updateKeyData.__get__('verifyKey');
        const response = await verifyKey(key_name);
        response.should.equal(data);
    });


    it('Should verify Data Exists before update', async() => {
        const key_name = 'akin-key';
        const data = {
            id: 'jfjfj',
            message: 'Hello World'
        };
        sandbox.stub(Data, 'findById').returns(Promise.resolve(data));
        const verifyData = updateKeyData.__get__('verifyData');
        const response = await verifyData(key_name);
        response.should.equal(data);
    });

    it('Should Update Key Data', async() => {
        const key_name = 'akin-key';
        const data = {
            id: 'jfjfj',
            message: 'Hello World'
        };
        sandbox.stub(Data, 'findOneAndUpdate').returns(Promise.resolve(data));
        const updateData = updateKeyData.__get__('updateData');
        const response = await updateData(key_name);
        response.should.equal(data);
    });
});
