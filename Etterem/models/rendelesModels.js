import pool from '../db.js';

export const getAllRendeles = async () => {
    const [rows] = await pool.execute
    ('SELECT rendeles.razon ,(pizza.par * tetel.db) FROM pizza JOIN tetel on pizza.pazon = tetel.pazon JOIN rendeles on tetel.razon = rendeles.razon GROUP BY rendeles.razon');
    return rows;
}

export const getRendelesByRazon = async (razon) => {
    const [rows] = await pool.execute(
        'SELECT rendeles.razon , pizza.pnev FROM pizza JOIN tetel on pizza.pazon = tetel.pazon JOIN rendeles on tetel.razon = rendeles.razon WHERE rendeles.razon = ? GROUP BY rendeles.razon ', [razon]);
    return rows;
}

export const createRendeles = async (razon, fazon, pazon, idopont) => {
    const [result] = await pool.execute(
        'INSERT INTO `rendeles` (razon, vazon, fazon, idopont) VALUES (?, ?, ?, ?)', [razon, vazon, fazon, Now()]);
}

export const deleteRendeles = async (razon) => {
    const [result] = await pool.execute("DELETE FROM rendeles WHERE razon = ?", [razon]);
    return result.affectedRows;
}