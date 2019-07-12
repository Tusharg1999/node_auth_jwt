const router =require('express').Router()
const user=require('../model/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const key=require('../config/key')

const {registerValidation,loginValidation}=require('../validation')
//either this method or async functions in logi ill do async
//Registratio
router.post('/register',(req,res)=>{
    //validatin before using
    const {error}=registerValidation(req.body)
    if(error)
    { return res.status(400).send(error.details[0].message)}
    // checking for duplication of email
     user.findOne({email:req.body.email})
     .then(emailexist=>{
     if(emailexist){
            return res.status(400).send('email exist')
        }
        else
        {   //email do not exist
            //hashing the password(encrypting)
         bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt,(err, hashpassword)=>{
                // Store hash in your password DB.
                if(err) throw err
                 //creating new user  
           const newUser= new user({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword
         })
          try{
            const submitUser= newUser.save();
            res.send(newUser)
          }
          catch(err){
            res.status(400).send(err)
           }
           
                
            });
        });
        }
       
     }) 
    
})

//Login with async
    router.post('/login',async(req,res)=>{
     const {error}=loginValidation(req.body)
     if(error)
     {
         return res.status(400).send(error.details[0].message)
     }
     //checking for email exist
     const currentUser= await user.findOne({email:req.body.email})
     if(!currentUser)
     {return res.status(400).send('email does not exist')}
        // email is correct
        const validpass=await bcrypt.compare(req.body.password,currentUser.password)
        if(!validpass)
        {
            return res.status(400).send('wrong password')
        }
        const token=jwt.sign({id:currentUser._id},key.TOKEN_SECRET)
        res.header('auth-token',token).send(token)


    })
module.exports=router