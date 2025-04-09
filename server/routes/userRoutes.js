const express=require('express')
const router=express.Router()
const registerUserController=require('../controllers/User/RegisterController').module
const loginUserController=require('../controllers/User/LoginController').module
const authenticatedMiddleware=require('../middleware/auth').module


router.post('/register',registerUserController)
router.post('/login',loginUserController)

exports.module=router
