const User = require("../model/user.model");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')


const signup = async(req,res)=>{
    console.log('admna');
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message: "Please fill all the fields"})
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({
            message: "User already exists",
            success: false
        })
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    await newUser.save();
    res.status(201).json({message: "User created successfully",
        success: true
    })
}

const signin = async(req,res) => {
    const {email, password} = req.body;

    const validemail = await User.findOne({email});
    if(!validemail){
        return res.status(400).json({message: "Invalid email or password"})
    }
    const isValidPassword = await bcryptjs.compare(password, validemail.password);
    if(!isValidPassword){
        return res.status(400).json({message: "Invalid email or password"})
    }
    const token = jwt.sign({id: validemail._id}, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validemail._doc
    res.cookie('access token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24*60*60*1000)
    })
    .status(200).json({
        message: "Signed in successfully",
        rest
    })
}

const google = async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access token', token, {
                httpOnly: true})
                .json(rest)
        } else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            res.cookie('access token', token, {
                httpOnly: true})
                .json(rest)
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {signup, signin, google}