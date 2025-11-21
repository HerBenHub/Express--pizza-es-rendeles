import pool from '../db.js';

export const getAllPizza = async () => {
    const [rows] = await pool.execute('SELECT * FROM `pizza`');
    return rows;
}

export const getPizzaById = async (pazon) => {
    console.log("Kapott azonosító:", pazon);
    const [rows] = await pool.execute('SELECT * FROM `pizza` WHERE pazon = ?', [pazon]);
    return rows[0];
}

export const createPizza = async (pnev, par) => {
    const [result] = await pool.execute(
        'INSERT INTO `pizza` (pnev, par) VALUES (?, ?)',
        [pnev, par]
    );
    return result.insertId;
}

export const updatePizza = async (pazon, pnev, par) => {
    const [result] = await pool.execute(
        'UPDATE `pizza` SET pnev = ?, par = ? WHERE pazon = ?',
        [pnev, par, pazon]
    );
    return result.affectedRows;
}

export const deletePizza = async (pazon) => {
    const [result] = await pool.execute(
        'DELETE FROM `pizza` WHERE pazon = ?',
        [pazon]
    );
    return result.affectedRows;
}