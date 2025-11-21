import pool from '../db.js';

export const getAllFutar = async () => {
    const [rows] = await pool.execute('SELECT * FROM `futar`');
    return rows;
}

export const getFutarByFazon = async (fazon) => {
    console.log("Kapott azonosító:", fazon);
    const [rows] = await pool.execute('SELECT * FROM `futar` WHERE fazon = ?', [fazon]);
    return rows[0];
}

export const createFutar = async (fnev, ftel) => {

    const [result] = await pool.execute(
        'INSERT INTO `futar` (fnev, ftel) VALUES (?, ?)',
        [fnev, ftel]
    );
    return result.insertId;
}

export const updateFutar = async (fazon, fnev, ftel) => {
    const [result] = await pool.execute(
        'UPDATE `futar` SET fnev = ?, ftel = ? WHERE fazon = ?',
        [fnev, ftel, fazon]
    );
    return result.affectedRows;
}

export const deleteFutar = async (fazon) => {
    const [result] = await pool.execute(
        'DELETE FROM `futar` WHERE fazon = ?',
        [fazon]
    );
    return result.affectedRows;
}