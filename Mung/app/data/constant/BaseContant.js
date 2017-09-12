const App_Name = "Mung";
const Init_HotMovies = {
    count:5,
    start:0,
    total: 1,
    "subjects":{
        count:20,
        start:-1,
        total: 0,
        subjects:[{
           rating:{
               average: 8,
           },
            genres: [
                "动作","科幻","爱情"
            ],
            title: "蓝豆",
            casts:[{name:"mung"},{name:"mung"},{name:"mung"}],
            directors:[{name:"mochixuan",avatars:{large:require("../img/icon_default_icon.png")}}],
            images:{large:require("../img/icon_default_cover.png")}
        }]
    }
}

export {App_Name}