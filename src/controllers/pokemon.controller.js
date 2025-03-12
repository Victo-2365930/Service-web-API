// Importer le fichier de models
import{ pokemondInfoParId, listerTousPokemons, listerPokemonType, ajouterLePokemon, modifierLePokemon, supprimerLePokemon} from "../models/pokemon.models.js";

const PokemonParId = async (req, res) => {
    const id = req.params.id;
    
    try {
        if (!id || parseInt(id) < 1) {
            res.status(404).send(`Pokemon introuvable avec l'id ${id}`);
        } else {
            const pokemonInfo = await pokemondInfoParId(id);
            
            if (pokemonInfo.length == 0) {
                res.status(404).send(`Aucun Pokémon trouvé avec l'id ${id}`);
            } else {
                res.status(200).json(pokemonInfo[0]);
            }
        }
    } catch (erreur) {
        res.status(500).send(`Echec lors de la récupération du pokemon avec l'id ${id}`);
    }
}

//Faire la pagination plus tard
const ListePokemon = async (req,res) => {
    const type = req.query.type;

    try {
        if (!type) {
            const pokemonListe = await listerTousPokemons();
            if (pokemonListe.length == 0) {
                res.status(404).send(`Aucun Pokémon trouvé dans la liste`);
                
            } else {
                res.status(200).send(pokemonListe);
            }
        } else {
            const pokemonListeType = await listerPokemonType(type);
            if (pokemonListeType.length == 0) {
                res.status(404).send(`Aucun Pokémon trouvé dans la liste avec le type ${type}`);
                
            } else {
                res.status(200).send(pokemonListeType);
            }
        }
    } 
    catch (erreur) {
        res.status(500).send(`Echec lors de la récupération de la liste des pokemons`);
    }

}

const AjouterPokemon = async (req,res) => {
    const infoPokemon = [req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense];
    let erreurLabel= ["nom", "type_primaire","type_secondaire", "pv", "attaque", "defense"];
    let erreurManqueInfo = [];

    for(let i = 0; i < infoPokemon.length;i++){
        if(!infoPokemon[i]){
            erreurManqueInfo.push(erreurLabel[i])
        }
    }
    if(erreurManqueInfo.length > 0 ||(erreurManqueInfo.length == 1 && erreurManqueInfo[0] != "type_secondaire" ) ){
        res.status(400).json({
            "erreur": "Le format des données est invalide",
            "champ_manquant": erreurManqueInfo
        })
    }
    try {
        const monInfoPokemon = await ajouterLePokemon(req);

        // Récupérer l'ID du nouveau Pokémon (assumons qu'il soit dans monInfoPokemon.insertId)
        const pokemonAvecId = {
            id: monInfoPokemon.insertId,  // insérer l'ID retourné par la base de données
            nom: req.body.nom,
            type_primaire: req.body.type_primaire,
            type_secondaire: req.body.type_secondaire,
            pv: req.body.pv,
            attaque: req.body.attaque,
            defense: req.body.defense
        };

        res.status(200).json({
            "message": `Le pokemon ${req.body.nom} a été ajouté avec succès`,
            "pokemon": pokemonAvecId
        });
    } catch (erreur) {
        res.status(500).json({
            "erreur": `Echec lors de la création du pokemon ${req.body.nom}`,
            details: erreur.message
        });
    }
};

const ModifierPokemon = (req,res) => {
    const infoPokemon = [req.params.id, req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense];
    let erreurLabel= ["id", "nom", "type_primaire","type_secondaire", "pv", "attaque", "defense"];
    let erreurManqueInfo = [];

    for(let i = 0; i < infoPokemon.length;i++){
        if(!infoPokemon[i]){
            erreurManqueInfo.push(erreurLabel[i])
        }
    }

    //Vérifier si on a reçu tous les paramètres
    if(erreurManqueInfo.length > 0){
        res.status(400).json({
            "erreur": "Le format des données est invalide",
            "champ_manquant": erreurManqueInfo
        })
    }
    
    //Vérifier si le ID reçu en paramètre existe dans la base de données
    let idExiste = pokemondInfoParId(req.params.id)
    if(idExiste.length == 0){
        res.status(404).json({
            "erreur":`Le pokemon id ${req.params.id} n'existe pas dans la base de données`
        })
    }

    //Faire l'action de modifier
    modifierLePokemon(req)
        .then(
            res.status(200).json({
                "message": `Le pokemon ${id} a été modifié avec succès`,
                "pokemon": infoPokemon
            })
        )
        .catch(
            res.status(500).send(`erreur":"Echec lors de la modification du pokemon ${infoPokemon[1]} `)
        )
}


const SupprimerPokemon = async (req, res) => {
    const idPokemon = req.params.id;

    // Vérifier si le Pokémon existe dans la base de données
    let pokemonExiste = await pokemondInfoParId(idPokemon);
    if (pokemonExiste.length == 0) {
        return res.status(404).json({
            "erreur": `Le pokemon id ${idPokemon} n'existe pas dans la base de données`
        });
    }

    // Récupérer les informations du Pokémon avant de le supprimer
    const pokemon = pokemonExiste[0];  // supposons que pokemondInfoParId retourne un tableau avec l'objet Pokémon

    // Supprimer le Pokémon
    try {
        await supprimerLePokemon(idPokemon);

        // Répondre avec les informations du Pokémon supprimé
        res.status(200).json({
            "message": `Le pokemon id ${idPokemon} a été supprimé avec succès`,
            "pokemon": {
                "id": pokemon.id,
                "nom": pokemon.nom,
                "type_primaire": pokemon.type_primaire,
                "type_secondaire": pokemon.type_secondaire,
                "pv": pokemon.pv,
                "attaque": pokemon.attaque,
                "defense": pokemon.defense
            }
        });
    } catch (erreur) {
        res.status(500).json({
            "erreur": `Echec lors de la suppression du pokemon id ${idPokemon}`,
            details: erreur.message
        });
    }
};


export {PokemonParId, ListePokemon, AjouterPokemon, ModifierPokemon, SupprimerPokemon};