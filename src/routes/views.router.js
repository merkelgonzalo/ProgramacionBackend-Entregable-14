import {Router} from 'express';
import { getCartController, getProductsController, registerController, loginController } from '../controllers/views.controller.js';
import { autorization } from '../middlewares/autorization.js';
import { addLogger } from '../utils/logger.js';

const router = Router();

router.get('/', addLogger, getProductsController);

// router.get('/realTimeProducts', async (req, res) => { 
//     const products = await productModel.find().lean();
//     res.render('realTimeProducts', {products: products});
// });

router.get('/carts/:cid', addLogger, getCartController);

// const adminAcces = (req,res,next) =>{
//     console.log(req.session.user.role);
//     if(req.session.user.role !== 'admin'){
//         console.log('Only admin access');
//         return res.redirect('/');
//     } 
//     next();
// }

// const privateAcces = (req,res,next)=>{
//     if(!req.session.user) return res.redirect('/login');
//     next();
// }

const publicAcces = (req,res,next) =>{
    next();
}

router.get('/register', addLogger, publicAcces, registerController);

router.get('/login', addLogger, publicAcces, loginController);

export default router;