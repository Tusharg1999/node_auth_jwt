const router =require('express').Router()
const user=require('../model/user')
const bcrypt=require('bcryptjs')
const {registerValidation}=require('../validation')
//either this method or async functions in logi ill do async
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
module.exports=router