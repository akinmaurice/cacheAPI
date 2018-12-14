import express from 'express';
import getKeys from '../controllers/get.keys';
import getKey from '../controllers/get.key';
import createKeyData from '../controllers/create.data';
import deleteKeys from '../controllers/delete.all.keys';

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


export default router;
