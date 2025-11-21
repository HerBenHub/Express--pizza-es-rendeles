import pool from '../db.js';

export const getTetelById = async (razon) => {
    const [rows] = await pool.execute('SELECT tetel.razon, pizza.pnev, tetel.db, vevo.vnev FROM pizza JOIN tetel on pizza.pazon = tetel.pazon JOIN rendeles on tetel.razon = rendeles.razon JOIN vevo on vevo.vazon = rendeles.vazon WHERE rendeles.razon = ?', [razon]);
    return rows[0];
}

export const createTetel = async (razon, pazon, db) => {
    const [result] = await pool.execute(
        'INSERT INTO `tetel` (razon, pazon, db) VALUES (?, ?, ?)', [razon, pazon, db]);
}

export const updateTetelDb = async (razon, pazon, db) => {
    const [result] = await pool.execute(
        'UPDATE `tetel` SET db = ? WHERE razon = ? AND pazon = ?', [db, razon, pazon]);
    return result.affectedRows;
}

export const deleteTetel = async (razon, pazon) => {
    const [result] = await pool.execute("DELETE FROM tetel WHERE razon = ? AND pazon = ?", [razon, pazon]);
    return result.affectedRows;
}