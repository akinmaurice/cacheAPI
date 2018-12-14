import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

const mongoose = require('mongoose');

const Key = require('../../app/models/Key');


const deleteKey = rewire('../../app/controllers/cache/delete.key.js');
const deleteKeys = rewire('../../app/controllers/cache/delete.all.keys.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates Function to delete keys', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('Should delete a single Key', async() => {
        const key_name = 'akin-key';
        sandbox.stub(Key, 'remove').returns(Promise.resolve('Removed key'));
        const deleteKeyFromDb = deleteKey.__get__('deleteKeyFromDb');
        const response = await deleteKeyFromDb(key_name);
        response.should.equal('Removed key');
    });

    it('Should delete all Keys', async() => {
        sandbox.stub(Key, 'remove').returns(Promise.resolve('Removed all keys'));
        const deleteKeysFromDb = deleteKeys.__get__('deleteKeysFromDb');
        const response = await deleteKeysFromDb();
        response.should.equal('Removed all keys');
    });
});
