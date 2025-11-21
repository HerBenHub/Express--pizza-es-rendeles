import express from 'express';
import cors from 'cors';
import logger from './models/logger.js';

import futarRoutes from './routes/futarRoutes.js';
import pizzaRoutes from './routes/pizzaRoutes.js';
import vevoRoutes from './routes/vevoRoutes.js';
import rendelesRoutes from './routes/rendelesRoutes.js';
import tetelRoutes from './routes/tetelRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/futar', futarRoutes);// GET / POST / PUT / DELETE GET /:id
app.use('/api/pizza', pizzaRoutes);
app.use('/api/vevo', vevoRoutes);
app.use('/api/rendeles', rendelesRoutes);
app.use('/api/tetel', tetelRoutes);
app.use('/static', express.static('pizza_kepek'));

app.listen(3000, () => {
    console.log('Szerver: http://localhost:3000');
});

/*
Hiányzó feladat:
- delete, post: futár, pizza, vevő
- 
*/