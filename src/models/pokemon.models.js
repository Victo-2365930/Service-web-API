import db from "../config/db_pg.js";


const pokemondInfoParId = (id) =>{
    return new Promise((resolve, reject) => {
        const requete = 'SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE id = $1';
        const params = [id];

        db.query(requete, params, (erreur, resultat) => {
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            else{
                resolve(resultat.rows);
            }
        })
    })
}

const listerTousPokemons = () =>{
    return new Promise((resolve, reject) => {
        const requete = 'SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon';

        db.query(requete, (erreur, resultat) => {
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            else{
                resolve(resultat.rows);
            }
        })
    })
}

const listerPokemonType = (type) =>{
    return new Promise((resolve, reject) => {
        const requete = 'SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE type_primaire = $1'; //faire par type primaire seulement
        const params = [type];

        db.query(requete, params, (erreur, resultat) => {
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            else{
                resolve(resultat.rows);
            }
        })
    })
}

const ajouterLePokemon = (req) => {
    return new Promise((resolve, reject) => {
        const requete = 'INSERT INTO pokemon(nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES($1,$2,$3,$4,$5,$6)';
        const params = [req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            } else {
                resolve(resultat.rows);
            }
        });
    });
};

const modifierLePokemon = (req) =>{
    return new Promise((resolve, reject) => {
        const requete = 'UPDATE pokemon SET(nom = $1, type_primaire = $2, type_secondaire= $3, pv= $4, attaque = $5, defense= $6) WHERE id=$7';
        const params = [req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense, req.params.id];

        db.query(requete, params, (erreur, resultat) => {
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            else{
                resolve(resultat.rows);
            }
        })
    })
}

const supprimerLePokemon = (id) => {
    return new Promise((resolve, reject) => {
        const requete = 'DELETE FROM pokemon WHERE id = $1';
        const params = [id];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            } else {
                resolve(resultat.rows);
            }
        });
    });
};

export { pokemondInfoParId, listerTousPokemons, listerPokemonType, ajouterLePokemon, modifierLePokemon, supprimerLePokemon }