const express = require('express');
const mysql = require('mysql');
const util = require('util');
const basicAuth = require('basic-auth');
const router = express.Router();
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const query = util.promisify(con.query).bind(con);

function authMiddleware(req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== 'admin' || user.pass !== 'admin') {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return res.sendStatus(401); // Unauthorized
    }
    next(); 
}

async function getCategorieById(id_categorie) {
    const result = await query('SELECT categorie_name FROM categories WHERE id_categorie = ?', [id_categorie]);
    return result[0];
}

router.get('/', async (req, res) => {
    const { categorie_name } = req.query;
    let sqlQuery = 'SELECT * FROM categories WHERE 1=1';
    if (categorie_name) {
        sqlQuery += ' AND categorie_name = ?';
    }

    try {
        const result = await query(sqlQuery, [categorie_name]);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Change parameters.' });
    }
});

router.get('/:id_categorie', async (req, res) => {
    const { id_categorie } = req.params;
    try {
        const result = await query('SELECT * FROM categories WHERE id_categorie = ?', [id_categorie]);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/post', authMiddleware, async (req, res) => {
    const { id_categorie, categorie_name } = req.body;

    try {
        await query('INSERT INTO categories VALUES(?, ?)', [id_categorie, categorie_name]);
        res.send('CATEGORIE POSTED !');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error inserting category' });
    }
});

router.put('/put/:id_categorie', authMiddleware, async (req, res) => {
    const { id_categorie } = req.params;
    const { categorie_name: new_categorie_name } = req.body;

    try {
        const oldCategorie = await getCategorieById(id_categorie);

        if (!oldCategorie) {
            return res.status(404).send('Category not found');
        }

        const { categorie_name: old_categorie_name } = oldCategorie;

        await query('UPDATE categories SET categorie_name = ? WHERE id_categorie = ?', [new_categorie_name, id_categorie]);
        await query('UPDATE items SET categorie_name = ? WHERE categorie_name = ?', [new_categorie_name, old_categorie_name]);

        res.send('CATEGORIE ET ITEMS MIS À JOUR !');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating category or items' });
    }
});

router.delete('/delete/:id_categorie', authMiddleware, async (req, res) => {
    const { id_categorie } = req.params;

    try {
        const oldCategorie = await getCategorieById(id_categorie);

        if (!oldCategorie) {
            return res.status(404).send('Category not found');
        }

        const { categorie_name } = oldCategorie;

        await query('DELETE FROM categories WHERE id_categorie = ?', [id_categorie]);
        await query('DELETE FROM items WHERE categorie_name = ?', [categorie_name]);

        res.send('TOUT DELETE COMME IL FAUT !');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting category or items' });
    }
});

module.exports = router;
