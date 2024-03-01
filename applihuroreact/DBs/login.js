const { Op } = require("sequelize")
const {User} = require('./connexion')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv').config()
module.exports=  (app)  =>  {
 app.post('/login',(req, res)  =>    {
    User.findOne({where:{
                [Op.and]:[
                  {email:req.body.email},
                  {username:req.body.username}
                ]}})
    .then(user=>{
        if(!user){
            return res.status(404).json({message:'password, user name ou email est incoorecte'})
        }
        console.log('Mot de passe en clair :', req.body.password);
        console.log('Hash stocké dans la base de données :', user.password);
        bcrypt.compare(req.body.password, user.password )
        
        .then(userExist   =>  {
              if(!userExist){
                res.status(401).json({message:'password, user name ou email est incoorecte'})
              }
             
              const ACCESS=jwt.sign(
                {id:user.id},
                process.env.ACCESSTOKEN ,
                {expiresIn:'120s'}
              )
              const REFRESH=jwt.sign(
                {id:user.id},
                process.env.REFREHTOKEN ,
                {expiresIn:'420s'}
              )
              return User.update({ token: process.env.REFREHTOKEN }, { where: { id: user.id } })
             .then(()=>{
              return res.json({message:"L'utilisateur est bien connecte", data:user, REFRESH,ACCESS})
             })
              
        })
    })  
})
}