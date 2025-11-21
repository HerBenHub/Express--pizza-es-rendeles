import pool from '../db.js';

export const getAllVevo = async () => {
    const [rows] = await pool.execute('SELECT * FROM `vevo`');
    return rows;
}

export const getVevoByVazon = async (vazon) => {
    console.log("Kapott azonosító:", vazon);
    const [rows] = await pool.execute('SELECT * FROM `vevo` WHERE vazon = ?', [vazon]);
    return rows[0];
}

export const createVevo = async (vnev, vcim) => {

    const [result] = await pool.execute(
        'INSERT INTO `vevo` (vazon, vnev, vcim) VALUES (NULL, ?, ?)',
        [vnev, vcim]
    ); 
    return result.insertId;
}

export const updateVevo = async (vazon, vnev, vcim) => {
    const [result] = await pool.execute(
        'UPDATE `vevo` SET vnev = ?, vcim = ? WHERE vazon = ?',
        [vnev, vcim, vazon]
    );
    return result.affectedRows;
}

export const deleteVevo = async (vazon) => {
    const [result] = await pool.execute(
        'DELETE FROM `vevo` WHERE vazon = ?',
        [vazon]
    );
    return result.affectedRows;
}