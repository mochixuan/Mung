import {
    MovieSchema,
    SubjectSchema,
    RatingSchema,
    CastsSchema,
    DirectorsSchema,
    ImagesSchema
} from './Schemas'

/*
* 数据库版本管理
* */

export default [{
    schema: [
        MovieSchema,
        SubjectSchema,
        RatingSchema,
        CastsSchema,
        DirectorsSchema,
        ImagesSchema
    ],
    path: 'mung.realm',
    schemaVersion:1,
    migration:(oldRealm,newRealm)=>{

    }
}]