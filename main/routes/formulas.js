// Importation des modules nécessaires
var express = require('express');
const mysql = require("mysql");
var router = express.Router();
const basicAuth = require('basic-auth');
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

/* GET formulas avec filtrage. */
router.get('/', function (req, res, next) {
    const formula_name = req.query.formula_name; // Récupère le paramètre formula_name de l'URL
    const categorie_name = req.query.categorie_name; // Récupère le paramètre categorie_name de l'URL
    const price = req.query.price; // Récupère le paramètre price de l'URL

    let sqlQuery = 'SELECT * FROM restaurant_database.formulas WHERE 1=1';

    if (formula_name) {
        sqlQuery += ` AND formula_name = '${formula_name}'`;
    }
    if (categorie_name) {
        sqlQuery += ` AND categorie_name = '${categorie_name}'`;
    }
    if (price) {
        sqlQuery += ` AND price = ${price}`;
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

// Route GET pour récupérer une formule spécifique par son ID
router.get('/:id_formula', function (req, res, next) {
    const id_formula = req.params.id_formula;

    let sqlQuery = `SELECT * FROM restaurant_database.formulas WHERE id_formula = ${id_formula}`;

    con.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Une erreur s'est produite" });
        } else {
            res.json(result);
        }
    });
});

// Route POST pour ajouter une nouvelle formule
router.post('/post', authMiddleware, (req, res) => {
    const id_formula = req.body.id_formula;
    const formula_name = req.body.formula_name;
    const categorie_name = req.body.categorie_name;
    const price = req.body.price;

    con.query('INSERT INTO `formulas` VALUES(?,?,?,?)', [id_formula, formula_name, categorie_name, price], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('FORMULE AJOUTÉE !')
        }
    })
})

// Route PUT pour mettre à jour une formule existante
router.put('/put/:id_formula', authMiddleware, (req, res) => {
    const id_formula = req.params.id_formula;
    const new_formula_name = req.body.formula_name;
    const new_categorie_name = req.body.categorie_name;
    const new_price = req.body.price;

    con.query('UPDATE `formulas` SET formula_name = ?, categorie_name = ?, price = ? WHERE id_formula = ?', [new_formula_name, new_categorie_name, new_price, id_formula], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('FORMULE MISE À JOUR !')
        }
    })
})

// Route DELETE pour supprimer une formule par son ID
router.delete('/delete/:id_formula', authMiddleware, (req, res) => {
    const id_formula = req.params.id_formula

    con.query('DELETE FROM `formulas` WHERE id_formula = ?', id_formula, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("LA FORMULE A ÉTÉ SUPPRIMÉE !")
        }
    })
})

// Exportation du routeur
module.exports = router;