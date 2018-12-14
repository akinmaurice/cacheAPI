import Q from 'q';
import config from '../../config';

const Key = require('../models/Key');


const getKeysFromDb = async() => {
    const defer = Q.defer();
    try {
        const keys = await Key.find();
        defer.resolve(keys);
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


async function getKeys(req, res) {
    try {
        const keys_data = await getKeysFromDb();
        res.status(200).json({
            keys_data
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default getKeys;
