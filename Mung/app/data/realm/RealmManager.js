import Realm from 'realm'
import Migrations from './Migrations'

let realm = new Realm(Migrations[Migrations.length-1])

/*-------------Movies--------------*/

let insertMovie = (movie) => {
    try {
        realm.write(()=>{
            realm.create('Movie',movie);
        })
    } catch (error) {
        console.log("insertMovies",error);
    }
}

let queryMovie = ()=>{
    return realm.objects('Movie');
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
