import { Router } from 'express';
import passport from 'passport';
import { GetUserDto } from "../dao/dto/user.dto.js";
import { addLogger } from '../utils/logger.js';

const router = Router();

router.post('/register', addLogger, passport.authenticate('register', {failureREdirect:'/failregister'}), async (req, res) =>{
    res.send({status:"success", message:"User registered"});
});

router.get('/failregister', addLogger, async (req, res) => {
    console.log("Failed strategy");
    res.send({error:"Error ocurred when try to register"});
})

router.post('/login', addLogger, passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req,res)=>{
    if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});
    
    req.session.user = {
        name: req.user.first_name,
        email: req.user.email,
        age: req.user.age,
        cart: req.user.cart,
        role: req.user.role
    }

    res.send({status:"success", payload:req.session.user, message:"Login!!!"})

});

router.get('/faillogin', addLogger, async (req, res)=>{

    console.log('Failed strategy');
    res.send({error: 'Error ocurred when try to login...'});

});

router.get('/logout', addLogger, (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"Couldn't close session"});
        res.redirect('/login');
    })
});

router.get('/github', addLogger, passport.authenticate('github'), async (req,res)=>{});

router.get('/githubcallback', addLogger, passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/')
});

router.get('/current', addLogger, (req, res) => {

    if(!req.session.user) return res.status(400).send({status:"error", error: 'No user currently'});

    let user = new GetUserDto(req.session.user);
    
    res.send({status:"success", payload:user, message:"Current user!!!"})
});

export default router;