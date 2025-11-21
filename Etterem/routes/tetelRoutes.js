import express from 'express';
import * as tetelModel from '../models/tetelModels.js';
const router = express.Router();

router.get('/:razon', async (req, res) => {
    const { razon } = req.params;
    try {
        const tetel = await tetelModel.getTetelById(razon);
        if (tetel) {
            res.status(201).send(tetel);
        } else {
            res.status(404).send({ error: 'Tétel nem található :((' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a tétel lekérésekor' });
    }
});

router.post('/', async (req, res) => {
    const { razon, pazon, db } = req.body;
    try {
        await tetelModel.createTetel(razon, pazon, db);
        res.status(201).send({ message: 'Tétel létrehozva' });
    } catch (error) {
        res.status(501).send({ error: 'Hiba a tétel létrehozásakor', details: error.message  });
    }
});

router.put('/', async (req, res) => {
    const { razon, pazon, db } = req.body;
    try {
        const affectedRows = await tetelModel.updateTetelDb(razon, pazon, db);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Tétel frissítve' });
        } else {
            res.status(404).send({ error: 'Tétel nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a tétel frissítésekor', details: error.message  });
    }
});

router.delete('/:razon/:pazon', async (req, res) => {
    const { razon, pazon } = req.params;
    try {
        const affectedRows = await tetelModel.deleteTetel(razon, pazon);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Tétel törölve' });
        } else {
            res.status(404).send({ error: 'Tétel nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a tétel törlésekor' });
    }
});

export default router;