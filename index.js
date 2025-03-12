import express from 'express';

// Créer une application express
const app = express();

// Importer les middlewares
app.use(express.json());

// Importer le fichier de router du fichier salutations.route
import methoderoutes from './src/routes/pokemon.routes.js';

// On associe la route /api/pokemons/ au router importé
app.use('/api/pokemons', methoderoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
