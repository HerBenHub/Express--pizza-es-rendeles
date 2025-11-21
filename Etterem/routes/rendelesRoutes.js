import express from 'express';
import * as rendelesModel from '../models/rendelesModels.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const rendelesek = await rendelesModel.getAllRendeles();
        res.status(201).send(rendelesek);
    } catch (error) {
        res.status(501).send({ error: 'Hiba a rendelések lekérésekor' });
    }
});

router.get('/:razon', async (req, res) => {
    const { razon } = req.params;
    try {
        const rendeles = await rendelesModel.getRendelesByRazon(razon);
        res.status(201).send(rendeles);
    } catch (error) {
        res.status(501).send({ error: 'Hiba a rendelés lekérésekor' });
    }
});

router.post('/', async (req, res) => {
    const { pazon, vazon, fazon } = req.body;
    try {
        await rendelesModel.createRendeles(pazon, vazon, fazon);
        res.status(201).send({ message: 'Rendelés létrehozva' });
    } catch (error) {
        res.status(501).send({ error: 'Hiba a rendelés létrehozásakor', details: error.message  });
    }
});

router.delete('/:razon', async (req, res) => {
    const { razon } = req.params;
    try {
        const affectedRows = await rendelesModel.deleteRendeles(razon);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Rendelés törölve' });
        } else {
            res.status(404).send({ error: 'Rendelés nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a rendelés törlésekor, egyéb tételek törlésekor', details: error.message  });
    }
});

export default router;