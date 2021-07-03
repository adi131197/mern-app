const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema');
const Authenticate = require('../middleware/authenticate')

router.get('/', (req,res)=> {
    console.log('MERN App server side.');
})


// Register Route
router.post('/register', async (req,res)=> {
    const { name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword) return res.status(422).json({
        msg: 'Please fill all the details.'
    })

    try {
        
        const userExist = await User.findOne({email});

        if(userExist) {
            return res.status(422).json({msg: 'Email already exists..'})
        } else if(password !== cpassword) {
            return res.status(422).json({
                msg: 'Password and confirm password are not same.'
            })
        }
        
        const newUser = new User({
            name,
            email,
            phone,
            work,
            password,
            cpassword
        })
    
        await newUser.save()
        
        return res.status(201).json({
                msg: 'Registration success..!!'
            })
        

    } catch (err) {
        console.log(`Error occurrred ${err}`)
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
})


// Login Route
router.post('/signin', async (req,res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({
        msg: 'Please enter all the details'
    })

    try {
        const existUser = await User.findOne({ email })

        if(!existUser) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, existUser.password);

        if(!isMatch) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            })
        }

        const token = await existUser.generateAuthToken();
        
        return res.status(201).json({
            msg: 'Login Success',
            token
        })
    } catch (err) {
        console.log('An Error Occurred => ', err)
        return res.status(500).json({
            msg: 'Internal Server Error'
        })
        
    }
    
})

router.get('/about', Authenticate,(req, res) => {
    res.status(200).send(req.rootUser)
})

router.get('/getData', Authenticate, (req,res) => {
    res.status(200).send(req.rootUser)
})

router.post('/contactus', Authenticate, async (req,res) => {
    try {

        const {name,email,phone,message} = req.body;
        if(!name || !email || !phone || !message){
            return res.status(400).json({
                'msg': 'Please fill the details'
            })
        }

        const userContact = await User.findOne({
            _id: req.userID
        })

        if(userContact) {
            const userMessage = await userContact.addMessage(name,email,phone,message)
            if(userMessage) {
                return res.status(200).json({
                    msg: 'Message sent success'
                })
            }
            
        }
    } catch (er) {
        console.log('An Error Occurred => ', err)
        return res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
})

router.get('/logoutuser', (req, res) => {
    res.clearCookie('jwttoken', {
        path: '/'
    })
    res.status(200).send('Logout success')
})

module.exports = router;