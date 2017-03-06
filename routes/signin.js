var express=require('express'),
    router=express.Router(),
    checkNotLogin=require('../middlewares/check').checkNotLogin;

//GET /signin 登录页
router.get('/',checkNotLogin,(req,res,next)=>{
    res.send(req.flash());
});
//GET /signin 登录页
router.post('/',checkNotLogin,(req,res,next)=>{
    res.send(req.flash());
});

module.exports=router;