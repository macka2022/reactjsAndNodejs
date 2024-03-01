const jwt=require('jsonwebtoken')
const { User } = require('./connexion')
const {ACCESS} =require('./login')
module.exports=(req,res,next)  =>{
    const  accessTokenExist=req.headers.authorization
    if(!accessTokenExist) return res.status(201).json({message:"le tojen access n'existe pas",loggin:false})
            const tokenA = accessTokenExist.split(' ')[1]
            jwt.verify(tokenA , process.env.ACCESSTOKEN , (error,encodeA)  => {
              if(error) {
                
               const   refreshTokenExist=req.headers.refresh
              if(!refreshTokenExist) res.status(201).json({message:'le tojen refresh est invalide...1', loggin:false})
              const tokenR=refreshTokenExist.split(' ')[1]
               jwt.verify(tokenR , process.env.REFREHTOKEN , (error,encodeR)  => {
                console.log("refresh");
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getSeconds() + 125); 
            res.cookie('accessToken', req.user, { httpOnly: true, secure: false, expires: expirationDate });
              if(error) {
                // console.log(error);
                // if(error.name=="TokenExpiredError" ){
                //   return User.destroy({ where: { id: req.cookies.accessToken.id } })
                //   .then(_ => res.json({ message: "Token de rafraîchissement expiré, utilisateur supprimé",}))
                //   .catch(_ => res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur",loggin:false  }));
                   
                // }  
              return res.status(201).json({message:'le tojen refresh est invalide  2' , loggin:false} )
            }
            req.user=encodeR;
                // Définir une date d'expiration dans 24 heures
              
            next()
          })
        }
        else{
          req.user=encodeA
             next()
        }
      })

}