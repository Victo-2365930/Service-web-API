// Nous avons besoin d'importer le module express pour utiliser le Router
import express from 'express';

import {PokemonParId, ListePokemon, AjouterPokemon, ModifierPokemon, SupprimerPokemon} from "../controllers/pokemon.controller.js";

const router = express.Router();


/**
 * GET /api/pokemons/liste?page=1&type=grass
*/
router.get('/liste', ListePokemon);

/**
 * Afficher Pokemon selon Id
 * GET /api/pokemons/:id
*/
router.get('/:id', PokemonParId);


/**
 * POST /api/pokemons
 * {
    "nom":"",
    "type_primaire":"",
    "type_secondaire":"",
    "pv":0,
    "attaque":0,
    "defense":0
}
 * 
*/
router.post('', AjouterPokemon);
/**
PUT /api/pokemons/:id
Structure des données du corps de la requête, en json. À remplacer par des données valides
{
    "nom":"",
    "type_primaire":"",
    "type_secondaire":"",
    "pv":0,
    "attaque":0,
    "defense":0
}
 * 
 */
router.put('/', ModifierPokemon)

router.delete('/:id', SupprimerPokemon)

export default router;