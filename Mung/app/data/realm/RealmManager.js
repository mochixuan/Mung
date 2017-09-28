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
    }
}

const queryMovie = ()=>{
    return realm.objects('Movie');
}

const deleteMovie = () => {
    try {
        realm.write(()=>{
            realm.delete(realm.objects('Movie'));
        })
    } catch (error) {
    }
}

/*---------------Theme----------------*/
const insertThemeColor = (themeColor) => {
    if (themeColor == null) {
        return;
    }
    try {
        realm.write(()=>{
            let color = realm.objectForPrimaryKey('Theme',0);
            if (color == null) {
                realm.create('Theme',{
                    id:0,
                    color:themeColor,
                })
            } else {
                color.color = themeColor;
            }
        })
    } catch (error) {

    }
}

const queryThemeColor = ()=>{
    let themeColor = realm.objects('Theme');
    if (themeColor == null || themeColor.length == 0) {
        return '#937eff';
    } else {
        return themeColor[0].color;
    }
}



export {insertMovie,queryMovie,deleteMovie,insertThemeColor,queryThemeColor}
