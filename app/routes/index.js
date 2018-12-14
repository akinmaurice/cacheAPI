import express from 'express';
import getKeys from '../controllers/cache/get.keys';
import getKey from '../controllers/cache/get.key';
import createKeyData from '../controllers/cache/create.data';
import deleteKeys from '../controllers/cache/delete.all.keys';
import deleteKey from '../controllers/cache/delete.key';
import updateKeyData from '../controllers/cache/update.data';

const router = express.Router();

router.get(
    '/',
    (req, res) => {
        res.status(200).json({ message: 'Cache Service' });
    }
);


router.get(
    '/keys',
    getKeys
);


router.get(
    '/keys/:key_name',
    getKey
);


router.post(
    '/keys/:key_name',
    createKeyData
);


router.delete(
    '/keys',
    deleteKeys
);


router.delete(
    '/keys/:key_name',
    deleteKey
);


router.put(
    '/keys/:key_name/:data_id',
    updateKeyData
);

export default router;
