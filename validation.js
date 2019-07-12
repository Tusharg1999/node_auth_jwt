const Joi=require('@hapi/joi')
 
const RegisterValidation=(data)=>{
const validationSchema={
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()

}
 return Joi.validate(data,validationSchema)
}
const LoginValidation=(data)=>{
    const validationSchema={
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    
    }
     return Joi.validate(data,validationSchema)
    }
module.exports.registerValidation=RegisterValidation
module.exports.loginValidation=LoginValidation
