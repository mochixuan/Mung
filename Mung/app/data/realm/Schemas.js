/*
* 数据结构
* */

import Realm from 'realm'

const MovieSchema = {
    name: 'Movie',
    properties: {
        count: 'int',
        start: 'int',
        total: 'int',
        subjects: {type: 'list',objectType: 'Subject'},
    }
}

const SubjectSchema = {
    name: 'Subject',
    properties: {
        rating: 'Rating',
        title: 'string',
        casts: {type: 'list',objectType: 'Casts'},
        collect_count: 'int',
        original_title: 'string',
        subtype: 'string',
        directors: {type:'list',objectType: 'Directors'},
        year: 'string',
        images: 'Images',
        alt: 'string',
        id: 'string'
    }
}

const RatingSchema = {
    name: 'Rating',
    properties: {
        max: 'int',
        average: 'float',
        stars: 'string',
        min: 'int',
    }
}

const CastsSchema = {
    name: 'Casts',
    properties: {
        alt: 'string',
        avatars:'Images',
        name: 'string',
        id: 'string',
    }
}

const DirectorsSchema = {
    name: 'Directors',
    properties: {
        alt: 'string',
        avatars:'Images',
        name: 'string',
        id: 'string',
    }
}

const ImagesSchema = {
    name: 'Images',
    properties: {
        small: 'string',
        large: 'string',
        medium: 'string',
    }
}

/*简单皮肤样式*/
const ThemeSchema = {
    name: 'Theme',
    primaryKey: 'id',
    properties: {
        id: 'int',
        color: 'string',
    }
}

export {
    MovieSchema,
    SubjectSchema,
    RatingSchema,
    CastsSchema,
    DirectorsSchema,
    ImagesSchema,
    ThemeSchema,
}
