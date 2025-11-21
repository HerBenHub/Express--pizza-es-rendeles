import express from 'express';
import * as pizzaModel from '../models/pizzaModels.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pizzas = await pizzaModel.getAllPizza();
        res.status(201).send(pizzas);
    } catch (error) {
        res.status(501).send({ error: 'Hiba a pizzák lekérésekor' });
    }
});

router.get('/:pazon', async (req, res) => {
    const { pazon } = req.params;
    try {
        const pizza = await pizzaModel.getPizzaById(pazon);
        if (pizza) {
            res.status(201).send(pizza);
        } else {
            res.status(404).send({ error: 'Pizza nem található :((' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a pizza lekérésekor...' });
    }
});

router.post('/', async (req, res) => {
    const { pnev, par } = req.body;
    try {
        const insertId = await pizzaModel.createPizza(pnev, par);
        res.status(201).send({ insertId });
    } catch (error) {
        res.status(501).send({ error: 'Hiba a pizza létrehozásakor :(((' , details: error.message});
    }
});

router.put('/', async (req, res) => {
    const { pazon, pnev, par } = req.body;
    try {
        const affectedRows = await pizzaModel.updatePizza(pazon, pnev, par);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Pizza frissítve' });
        } else {
            res.status(404).send({ error: 'Pizza nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'Hiba a pizza frissítésekor' , details: error.message});
    }
});

router.delete('/:pazon', async (req, res) => {
    const { pazon } = req.params;
    try {
        const affectedRows = await pizzaModel.deletePizza(pazon);
        if (affectedRows > 0) {
            res.status(201).send({ message: 'Pizza törölve' });
        } else {
            res.status(404).send({ error: 'Pizza nem található' });
        }
    } catch (error) {
        res.status(501).send({ error: 'A pizzához több adat is tartozik, ezért nem lehetett törölni' });
    }
});

export default router;