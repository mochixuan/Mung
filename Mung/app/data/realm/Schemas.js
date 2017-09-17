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
        genres: {type:'list',objectType: 'string'},
        title: 'string',
        casts: {type: 'list',objectType: 'Casts'},
        collect_count: 'int',
        original_title: 'string',
        subtype: 'string',
        directors: {type:'list',objectType: 'Directors'},
        year: 'int',
        images: 'Images',
        alt: 'string',
        id: 'int'
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
        avatars:{type: 'list',objectType:'Images'},
        name: 'string',
        id: 'int',
    }
}

const DirectorsSchema = {
    name: 'Directors',
    properties: {
        alt: 'string',
        avatars:{type: 'list',objectType:'Images'},
        name: 'string',
        id: 'int',
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

export {
    MovieSchema,
    SubjectSchema,
    RatingSchema,
    CastsSchema,
    DirectorsSchema,
    ImagesSchema,
}
