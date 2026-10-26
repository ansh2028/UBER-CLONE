const express =require('express');
const router =express.Router();
const{body,validationResult}=require('express-validator')
const captionController=require('../controllers/caption.controller')

router.post("/register",[
    body('fullname.firstname').trim().notEmpty().withMessage('Firstname is required').minLength(3).withMessage('Firstname must be at least 3 characters long'),
    body('email').trim().notEmpty().isEmail().withMessage('Invalid Email'),
    body('password').trim().notEmpty().withMessage('Password is required').minLength(6).withMessage('Password must be at least 6 characters long'),
    body('vehicle.capacity').trim().notEmpty().withMessage('Capacity is required').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.color').trim().notEmpty().withMessage('Color is required'),
    body('vehicle.licensePlate').trim().notEmpty().withMessage('License Plate is required'),
    body('vehicle.vehicleType').trim().notEmpty().withMessage('Vehicle Type is required').isLength({max:20}).withMessage('Vehicle Type must be at most 20 characters long'),

],captionController.registerCaption)


router.post('/login',[
    body('email').trim().notEmpty().isEmail().withMessage('Invalid Email'),
    body('password').trim().notEmpty().withMessage('Password is required').minLength(6).withMessage('Password must be at least 6 characters long'),

],captionController.login)

router.get('/profile',authmiddleware.authCaption,captionController.getProfile)

router.get('/logout',authmiddleware.authCaption,captionController.logoutCaption)



module.exports=router;
