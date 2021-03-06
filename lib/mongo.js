var config=require('config-lite'),
    Mongolass=require('mongolass'),
    mongolass=new Mongolass();

    mongolass.connect(config.mongodb);

    exports.User=mongolass.model('User',{
        name:{type:'string'},
        password:{type:'string'},
        avatar:{type:'string'},
        gender:{type:'string',enum:['m','f','x']},
        avatar:{type:'string'},
    });
// 根据用户名找到用户，用户名全局唯一
    exports.User.index({name:1},{unique:true}).exec();