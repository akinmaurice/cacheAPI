import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

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
});
