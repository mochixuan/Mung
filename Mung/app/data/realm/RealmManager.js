import Realm from 'realm'
import Migrations from './Migrations'

let realm = new Realm(Migrations[Migrations.length-1])

/*-------------Movies--------------*/

const insertMovie = (movie) => {
    try {
        realm.write(()=>{
            realm.create('Movie',movie);
        })
    } catch (error) {
        console.log("insertMovies",error);
    }
}

const queryMovie = ()=>{
    let movies = [];
    try {
        movies = realm.objects('Movie');
    } catch (error) {
        console.log("queryStudent",error);
    }
    return movies;
}

const deleteMovie = () => {
    try {
        realm.write(()=>{
            realm.delete(realm.objects('Movie'));
        })
    } catch (error) {
        console.log("deleteMovie",error);
    }
}

export {insertMovie,queryMovie,deleteMovie}
