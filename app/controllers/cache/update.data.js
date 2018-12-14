import Q from 'q';
import config from '../../../config';
import checkRequestBody from '../../utils/request.body.verifier';

const Key = require('../../models/Key');
const Data = require('../../models/Data');


const checkRequest = (body) => {
    const defer = Q.defer();
    try {
        const error = checkRequestBody(body, [
            'message'
        ]);
        if (error) {
            defer.reject({
                code: 400,
                msg: error
            });
        }
        defer.resolve(true);
    } catch (e) {
        defer.reject({
            code: 400,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const verifyKey = async(key_name) => {
    const defer = Q.defer();
    try {
        const key = await Key.findOne({
            name: key_name
        });
        if (!key) {
            defer.reject({
                code: 400,
                msg: 'Please provide a valid key'
            });
        } else {
            defer.resolve(key);
        }
    } catch (e) {
        logger.error('Get-Keys-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const verifyData = async(data_id) => {
    const defer = Q.defer();
    try {
        const data = await Data.findById(data_id);
        if (!data) {
            defer.reject({
                code: 400,
                msg: 'Please provide a valid Data ID'
            });
        } else {
            defer.resolve(data);
        }
    } catch (e) {
        logger.error('Verify-Data-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const updateData = async(body, data_id) => {
    const defer = Q.defer();
    try {
        const { message } = body;
        const updates = {
            message
        };
        const newData = await Data.findOneAndUpdate(
            { _id: data_id },
            { $set: updates },
            { new: true, context: 'query' }
        );
        defer.resolve(newData);
    } catch (e) {
        logger.error('Add-Data-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function updateKeyData(req, res) {
    try {
        const { params, body } = req;
        const { key_name, data_id } = params;
        await checkRequest(body);
        await verifyKey(key_name);
        await verifyData(data_id);
        const key_data = await updateData(body, data_id);
        res.status(201).json({
            key_data
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default updateKeyData;
