const router =require('express').Router()
const auth=require('../verify')

router.get('/',auth,(req,res)=>{
    res.json({
        name:'tushar',
        status:'happy'
    })
})
module.exports=router