import Q from 'q';
import moment from 'moment';
import crypto from 'crypto';
import config from '../../../config';
import loggerInit from '../../../config/logger';

const logger = loggerInit('development');


const Key = require('../../models/Key');
const Data = require('../../models/Data');


const getKeyFromDb = async(params) => {
    const defer = Q.defer();
    try {
        const { key_name } = params;
        let key = await Key.findOne({
            name: key_name,
            ttl: { $gte: moment() }
        });
        if (key) {
            logger.info('Cache Hit');
            const updates = {
                ttl: moment().add(config.ttlTime, 'hour')
            };
            key = await Key.findOneAndUpdate(
                { _id: key._id },
                { $set: updates },
                { new: true, context: 'query' }
            );
            const keyData = await Data.find({
                key: key.name
            });
            defer.resolve(keyData);
        } else {
            logger.info('Cache Miss');
            // Check if the limit of keys has been reached
            const keyCount = await Key.count();
            if (keyCount >= config.cacheKeyLimit) {
            // If Limit has been reached, get the oldest key in the cache
            // by the ttl and time it was created
            // Overwrite this key
                let oldKey = await Key.findOne().sort({
                    ttl: 1,
                    created: 1
                }).limit(1);
                const updates = {
                    ttl: moment().add(config.ttlTime, 'hour'),
                    name: crypto.randomBytes(20).toString('hex')
                };
                oldKey = await Key.findOneAndUpdate(
                    { _id: oldKey._id },
                    { $set: updates },
                    { new: true, context: 'query' }
                );
                defer.resolve(oldKey.name);
            } else {
                const randomString = crypto.randomBytes(20).toString('hex');
                await Key.create({
                    name: randomString,
                    ttl: moment().add(config.ttlTime, 'hour')
                });
                defer.resolve(randomString);
            }
        }
    } catch (e) {
        console.log(e);
        console.log('Get-Keys-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function getKey(req, res) {
    try {
        const { params } = req;
        const key_data = await getKeyFromDb(params);
        res.status(200).json({
            key_data
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default getKey;
