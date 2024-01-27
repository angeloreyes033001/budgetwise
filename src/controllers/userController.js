const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const users = async(req,res)=>{
    try {
        const users = await prisma.users.findMany();
        res.send(users)
    } catch (error) {
        console.error(error)
    }
}

const verify = async(req,res)=>{
    res.send({status: true, message: req.decoded})
}

const registration = async(req,res)=>{
    try {
        const{ email,firstname,lastname,password } = req.body

        const checkEmail = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(checkEmail) return res.send({status: false, message: `This email is already registered.`})

        const user = await prisma.users.create({
            data:{
                email: email.toLowerCase(),
                firstname: firstname.toLowerCase(),
                lastname: lastname.toLowerCase(),
                password: await bcrypt.hash(password,10)
            }
        });

        if(!user) return res.send({status: false,message: `Something went wrong.`});

        res.send({
            status: true,
            message: "Successfully Registered."
        })

    } catch (error) {
        res.status(409).send({error: error})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(email,password)
        const user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(!user){
            return res.json({
                status: false,
                error: "email",
                message: "Email is not register."
            });
        }

        bcrypt.compare(password,user.password,(error,result)=>{
            if(!result) return res.json({status: false, error: "password", message: "Password do not match."});
            
            const token = jwt.sign({id: user.id},process.env.JWT_SECRET_TOKEN,{expiresIn: "1d"})
            res.cookie("jwt",token,{
                httpOnly: true,
                secure:true
            });
            res.json({status: true, message: "Successfully Login"});

        })

    } catch (error) {
        return res.json({
            status: false,
            message: error
        })
    }
}

module.exports = {verify,login,registration,users}