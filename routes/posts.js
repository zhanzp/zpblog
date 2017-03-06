var express=require('express'),
    router=express.Router(),
    checkLogin=require('../middlewares/check').checkLogin;

//get或post所有用戶或者特定用戶的文章頁 
router.get('/',(req,res,next)=>{
    res.render('posts');
    // res.send(req.flash());
});
router.post('/',(req,res,next)=>{
    res.send(req.flash());
});

//发表一篇文章
router.post('/',checkLogin,(req,res,next)=>{
    res.send(req.flash());
})

//GET /posts/create 发表文章页
router.get('/create',checkLogin,(req,res,next)=>{
    res.sned(req.flash());
});

//GET /posts/:postId 单独一篇的文章页
router.get('./:postId',checkLogin,(req,res,next)=>{
    res.send(req.flash());
});

//Get /posts/:postId/edit 更新文章页
router.get('./:postId/edit',checkLogin,(req,res,next)=>{
    res.send(req.flash());
});

//POST /posts/:postId/edit 更新一篇文章
router.post('./:postId/edit',checkLogin,(req,res,next)=>{
    res.send(req.flash());
});
// GET /posts/:postId/remove 删除一篇文章
router.get('./:postId/remove',checkLogin,(req,res,next)=>{
    res.send(req.flash());
});

// POST /posts/:postId/comment 创建一条留言
router.post('./:postId/comment',checkLogin,(req,res,next)=>{
    res.send(req.flash());
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('./:postId/comment/:commentId/remove',checkLogin,(req,res,next)=>{
    res.send(req.flash());
});

module.exports=router;


