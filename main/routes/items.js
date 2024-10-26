// Importation des modules nécessaires
var express = require('express');
const mysql = require("mysql");
const basicAuth = require('basic-auth');
var router = express.Router()
require('dotenv').config();

// Configuration de la connexion à la base de données
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// Middleware pour l'authentification de base
function authMiddleware(req, res, next) {
    const user = basicAuth(req);

    if (!user || user.name !== 'admin' || user.pass !== 'admin') {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401); // Non autorisé
        return;
    }

    // Si l'authentification réussit, continuer vers le middleware suivant
    next();
}

/* GET items avec filtrage. */
router.get('/', function (req, res, next) {
    const categorie_name = req.query.categorie_name;
    const price = req.query.price;
    const description = req.query.description;
    const name = req.query.name;

    let sqlQuery = 'SELECT * FROM restaurant_database.items WHERE 1=1';

    if (categorie_name) {
        sqlQuery += ` AND categorie_name = ${categorie_name}`;
    }
    if (price) {
        sqlQuery += ` AND price = ${price}`;
    }
    if (description) {
        sqlQuery += ` AND description = '${description}'`;
    }
    if (name) {
        sqlQuery += ` AND name = ${name}`;
    }

    con.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur de paramètres." });
        } else {
            res.json(result);
        }
    });
});

// Route GET pour récupérer un item spécifique par son ID
router.get('/:id_item', function (req, res, next) {
    const id_item = req.params.id_item;

    let sqlQuery = `SELECT * FROM restaurant_database.items WHERE id_item = ${id_item}`;

    con.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Une erreur s'est produite" });
        } else {
            res.json(result);
        }
    });
});

// Route POST pour ajouter un nouvel item
router.post('/post', authMiddleware, (req, res) => {
    const id_item = req.body.id_item;
    const categorie_name = req.body.categorie_name;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;

    con.query('INSERT INTO `items` VALUES(?,?,?,?,?)', [id_item, categorie_name, name, description, price], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('ITEM AJOUTÉ !')
        }
    })
})

// Route PUT pour mettre à jour un item existant
router.put('/put/:id_item', authMiddleware, (req, res) => {
    const id_item = req.params.id_item;
    const new_categorie_name = req.body.categorie_name;
    const new_name = req.body.name;
    const new_description = req.body.description;
    const new_price = req.body.price;

    con.query('UPDATE `items` SET categorie_name = ?, name = ?, description = ?, price = ? WHERE id_item = ?', [new_categorie_name, new_name, new_description, new_price, id_item], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('ITEM MIS À JOUR !')
        }
    })
})

// Route DELETE pour supprimer un item par son ID
router.delete('/delete/:id_item', authMiddleware, (req, res) => {
    const id_item = req.params.id_item

    con.query('DELETE FROM `items` WHERE id_item = ?', id_item, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("L'ITEM A ÉTÉ SUPPRIMÉ !")
        }
    })
})

// Exportation du routeur
module.exports = router;