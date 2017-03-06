var express=require('express'),
    router=express.Router(),
    checkLogin=require('../middlewares/check').checkLogin;

//Get /signout登出

router.get('/',checkLogin,(req,res,next)=>{
    res.send(req.flash());
});

module.exports=router;
