var fs=require('fs'),
    path=require('path'),
    sha1=require('sha1'),
    express=require('express'),
    router=express.Router(),
    UserModel=require('../models/users'),
    checkNotLogin=require('../middlewares/check').checkNotLogin;

//GET /signin 注册页
router.get('/',checkNotLogin,(req,res,next)=>{
    //res.send(req.flash());
    res.render('signup');
});
//GET /signin 用户注册页
router.post('/',checkNotLogin,(req,res,next)=>{
    var name=req.fields.name,
        gender=req.fields.gender,
        bio=req.fields.bio,
        avatar=req.files.avatar.path.split(path.sep).pop(),
        password=req.fields.password,
        repassword=req.fields.repassword;

        try{
            if(!(name.length>=1 && name.length<=10)){
                throw new Error('名字请限制在1-10个字符');
            }
            if(['m','f','x'].indexOf(gender)===-1){
                throw new Error('性别只能是m、f或x');
            }
            if(!(bio.length>=1 && bio.length<=30)){
                throw new Error('个人简介请限制在 1-30 个字符');
            }
            if(!req.files.avatar.name){
                throw new Error('缺少头像');
            }
            if(password.length<6){
                throw new Error('密码至少 6 个字符');
            }
            if(password!==repassword){
                throw new Error('两次输入密码不一致');
            }
        }catch(e){
            //注册失败，异步删除上传的头像
            fs.unlink(req.files.avatar.path);
            req.flash('error',e.message);
            return res.redirect('/signup');
        }

        //明文密码加密
        password=sha1(password);
        //待写入数据库的用户信息
        var user={
            name:name,
            password:password,
            gender:gender,
            bio:bio,
            avatar:avatar
        }

        //用户信息写入数据库
        UserModel.create(user)
            .then(function(result){
                //此user是插入mongdb后的值，包含_id
                user=result.ops[0];
                //将用户信息写入session 
                delete user.password;
                req.session.user=user;
                //写入flash
                req.flash('success','注册成功');
                //跳转到首页
                res.redirect('/posts');
            })
            .catch(function(e){
                fs.unlink(req.files.avatar.path);
                //用户名被占用则跳回注册也，而不是错误页
                if(e.message.match('E11000 duplicate key')){
                    req.flash('error','用户名已被占用');
                    return res.redirect('/signup')
                }
                next(e);
            })
});

module.exports=router;