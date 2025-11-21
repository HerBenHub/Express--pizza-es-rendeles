import express from 'express';
import * as futarModel from '../models/futarModels.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const futarok = await futarModel.getAllFutar();
        res.status(201).send(futarok);
    } catch (error) {
        res.status(501).send({ error: 'Hiba a futárok lekérésekor' });
    }
});

router.get('/:fazon', async (req, res) => {
    const { fazon } = req.params;
    try {
        const futar = await futarModel.getFutarByFazon(fazon);
        if (futar) {
            res.status(201).send(futar);
        } else {
            res.status(404).send({ error: 'Futár nem található :((' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a futár lekérésekor...' });
    }
});

router.post('/', async (req, res) => {
    const { fnev, ftel } = req.body;
    try {
        const insertId = await futarModel.createFutar(fnev, ftel);
        res.status(201).send({ insertId });
    } catch (error) {
        res.status(501).send({ error: 'Hiba a futár létrehozásakor :(((' , details: error.message});
    }
});

router.put('/', async (req, res) => {
    const { fazon, fnev, ftel } = req.body;
    try {
        const affectedRows = await futarModel.updateFutar(fazon, fnev, ftel);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Futár frissítve' });
        } else {
            res.status(404).send({ error: 'Futár nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a futár frissítésekor' , details: error.message});
    }
});

router.delete('/:fazon', async (req, res) => {
    const { fazon } = req.params;
    try {
        const affectedRows = await futarModel.deleteFutar(fazon);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Futár törölve' });
        } else {
            res.status(404).send({ error: 'Futár nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'A futárhoz több adat is tartozik, ezért nem lehetett törölni' });
    }
});

export default router;