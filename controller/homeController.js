module.exports.home = (req,res)=>{
    res.render('homeSection/home.ejs',{
        title:'Home Page',
        message:'Welcome to Home Page'
    })
}