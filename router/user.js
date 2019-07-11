const router =require('express').Router()
const user=require('../model/user')
router.post('/register',(req,res)=>{
    const {name,email,password}=req.body
    const errors=[]
    if(!email || !password || !name)
    {
        errors.push({msg:'please fill all details'})
    }
    if(errors.length>0)
    {
      errors.forEach((index)=>{
          res.send(index.msg)
      })
      
    }
    else
    {
   const newUser= new user({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password
   })
   try{
       const submitUser= newUser.save();
       res.send(newUser)
   }
   catch(err){
       res.status(400).send(err)
   }
}
})
module.exports=router