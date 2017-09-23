const App_Name = "Mung";
const Init_HotMovies = {
    count: 5,
    start: 0,
    total: 1,
    "subjects": {
        count: 20,
        start: -1,
        total: 0,
        subjects: [{
            rating: {
                average: 8,
            },
            genres: [
                "动作", "科幻", "爱情"
            ],
            title: "蓝豆",
            casts: [{name: "mung"}, {name: "mung"}, {name: "mung"}],
            directors: [{name: "mochixuan", avatars: {large: require("../img/icon_default_icon.png")}}],
            images: {large: require("../img/icon_default_cover.png")}
        }]
    }
}
const Base = {
    name: 'apikey',
    value: '0df993c66c0c636e29ecbb5344252a4a'
}
const Cate_Data = [
    {
        title: '即将上映',
        url: '',
        colors:['#fe4080',"#ff77a5"],
        icon: require('../img/icon_upcoming.png'),
    }, {
        title: '口碑榜',
        url: '',
        colors:['#feaa1a',"#ffd31a"],
        icon: require('../img/icon_praise.png'),
    }, {
        title: '北美票房榜',
        url: '',
        colors:['#b983ff',"#a35cff"],
        icon: require('../img/icon_north.png'),
    }, {
        title: '新片榜',
        url: '',
        colors:['#00ceff',"#0196fe"],
        icon: require('../img/icon_newlast.png'),
    }
]

const Default_Photos = {
    w_badge: -1,
    photos:[{
        photos_count: -1,
    }]
}

export {Base,App_Name,Cate_Data,Default_Photos}