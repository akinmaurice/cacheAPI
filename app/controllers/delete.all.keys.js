import Q from 'q';
import config from '../../config';

const Key = require('../models/Key');


const deleteKeysFromDb = async() => {
    const defer = Q.defer();
    try {
        await Key.remove({});
        defer.resolve('Removed all keys');
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


async function deleteKeys(req, res) {
    try {
        const keys_data = await deleteKeysFromDb();
        res.status(200).json({
            keys_data
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default deleteKeys;
