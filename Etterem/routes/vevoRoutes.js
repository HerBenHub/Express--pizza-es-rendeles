import express from 'express';
import * as vevoModel from '../models/vevoModels.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const vevok = await vevoModel.getAllVevo();
        res.status(201).send(vevok);
    } catch (error) {
        res.status(501).send({ error: 'Hiba a vevők lekérésekor' });
    }
});

router.get('/:vazon', async (req, res) => {
    const { vazon } = req.params;
    try {
        const vevo = await vevoModel.getVevoByVazon(vazon);
        if (vevo) {
            res.status(201).send(vevo);
        } else {
            res.status(404).send({ error: 'Vevő nem található :((' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a vevő lekérésekor...' });
    }
});

router.post('/', async (req, res) => {
    const { vnev, vcim } = req.body;
    try {
        const insertId = await vevoModel.createVevo(vnev, vcim);
        res.status(201).send({ insertId });
    } catch (error) {
        res.status(501).send({ error: 'Hiba a vevő létrehozásakor :(((' });
    }
});

router.put('/', async (req, res) => {
    const { vazon, vnev, vcim } = req.body;
    try {
        const affectedRows = await vevoModel.updateVevo(vazon, vnev, vcim);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Vevő frissítve' });
        } else {
            res.status(404).send({ error: 'Vevő nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a vevő frissítésekor' });
    }
});

router.delete('/:vazon', async (req, res) => {
    const { vazon } = req.params;
    try {
        const affectedRows = await vevoModel.deleteVevo(vazon);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Vevő törölve' });
        } else {
            res.status(404).send({ error: 'Vevő nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'A vevőhöz több adat is tartozik, ezért nem lehetett törölni' });
    }
});

export default router;