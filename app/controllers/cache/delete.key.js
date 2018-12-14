import Q from 'q';
import config from '../../../config';

const Key = require('../../models/Key');


const deleteKeyFromDb = async(key_name) => {
    const defer = Q.defer();
    try {
        await Key.remove({
            name: key_name
        });
        defer.resolve('Removed key');
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


async function deleteKey(req, res) {
    try {
        const { params } = req;
        const { key_name } = params;
        const key_data = await deleteKeyFromDb(key_name);
        res.status(200).json({
            key_data
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default deleteKey;
