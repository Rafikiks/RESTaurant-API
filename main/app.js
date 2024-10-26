var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var categoriesRouter = require('./routes/categories');
var formulasRouter = require('./routes/formulas');
const mysql = require("mysql");

var app = express();
app.use(express.json())

// Configuration du moteur de vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware pour les journaux
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des routes
app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);
app.use('/formulas', formulasRouter);

// Gestion des erreurs 404 et transmission au gestionnaire d'erreurs
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestionnaire d'erreurs
app.use(function(err, req, res, next) {
  // Définit les variables locales, en fournissant l'erreur uniquement en développement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Affiche la page d'erreur
  res.status(err.status || 500);
  res.render('error');
});

// Exportation de l'application
module.exports = app;

// Démarrage du serveur sur le port spécifié
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});