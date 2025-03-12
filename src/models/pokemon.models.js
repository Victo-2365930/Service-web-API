import db from '../config/db.js';


const pokemondInfoParId = (id) =>{
    return new Promise((resolve, reject) => {
        const requete = 'SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE id = ?';
        const params = [id];

        db.query(requete, params, (erreur, resultat) => {
            if(erreur){
                console.log(erreur)
                reject(erreur);

            }
            else{
                resolve(resultat);
            }
        })
    })
}

const listerTousPokemons = () =>{
    return new Promise((resolve, reject) => {
        const requete = 'SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon';

        db.query(requete, (erreur, resultat) => {
            if(erreur){
                reject(erreur);
            }
            else{
                resolve(resultat);
            }
        })
    })
}

const listerPokemonType = (type) =>{
    return new Promise((resolve, reject) => {
        const requete = 'SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE type_primaire = ?'; //faire par type primaire seulement
        const params = [type];

        db.query(requete, params, (erreur, resultat) => {
            if(erreur){
                console.log(erreur)
                reject(erreur);
            }
            else{
                resolve(resultat);
            }
        })
    })
}

const ajouterLePokemon = (req) => {
    return new Promise((resolve, reject) => {
        const requete = 'INSERT INTO pokemon(nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES(?,?,?,?,?,?)';
        const params = [req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            } else {
                resolve(resultat);
            }
        });
    });
};

const modifierLePokemon = (req) =>{
    return new Promise((resolve, reject) => {
        const requete = 'UPDATE pokemon SET(nom = ?, type_primaire = ?, type_secondaire= ?, pv= ?, attaque = ?, defense= ?) WHERE id=?';
        const params = [req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense, req.params.id];

        db.query(requete, params, (erreur, resultat) => {
            if(erreur){
                reject(erreur);
            }
            else{
                resolve(resultat);
            }
        })
    })
}

const supprimerLePokemon = (id) => {
    return new Promise((resolve, reject) => {
        const requete = 'DELETE FROM pokemon WHERE id = ?';
        const params = [id];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            } else {
                resolve(resultat);
            }
        });
    });
};

export { pokemondInfoParId, listerTousPokemons, listerPokemonType, ajouterLePokemon, modifierLePokemon, supprimerLePokemon }