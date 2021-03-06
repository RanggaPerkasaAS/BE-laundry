const { request,response } = require("express")
const express = require("express")
const login = express()
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const secretKey = "testestes"

//membaca request bertipe json
login.use(express.json())

//memanggil model index
const models = require("../models/index")

//memanggil model users
const user = models.users

login.post("/", async (request, response)=>{
    let newLogin = {
        username : request.body.username,
        password : md5(request.body.password)
    }
    let dataUser = await user.findOne({
        where : newLogin
    })

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        //payload untuk menyimpan data yang akan dienkripsi
        let token = jwt.sign(payload,secretKey)
        return response.json({
            logged: true,
            token: token,
            user: dataUser
        })
    }else{
        return response.json({
            logged : false,
            message: `Invalid username or password`
        })
    }

})

//fungsi auth digunakan uuntuk verifikasi token yang dikirirmkan
const auth = (request,response,next) => {
    //dapatkan data authorization
    let header = request.headers.authorization


    //data tokennya
    let token = header && header.split(" ")[1]
    //split digunakan untuk memecah sebuah string menjadi array berdasarkan spasi

    if(token == null){
        return response.status(401).json({
            message: `Unauthorized`
        })
    }else{
        let jwtHeader ={
            algorithm : "HS256"
        }

        //verivikasi token yang diberikan
        jwt.verify(token,secretKey,jwtHeader, error => {
            if(error){
                return response.status(401).json({
                    message: `Invalid token`
                })
            }else{
                next()
            }
        })
    }
}
module.exports = {login,auth}