const { request,response } = require("express")
const express = require("express")
const app = express()
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const secretKey = "testestes"

//membaca request bertipe json
app.use(express.json())

//memanggil model index
const models = require("../models/index")

//memanggil model users
const user = models.users

app.post("/", async (request, response)=>{
    let newLogin = {
        username : request.body.username,
        password : md5(request.body.password)
    }
    let dataUser = await user.findOne({
        where : newLogin
    })

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let token = jwt.sign(payload,secretKey)
        return response.json({
            logged: true,
            token: token
        })
    }else{
        return response.json({
            logged : false,
            message: `Invalid username or password`
        })
    }

})
module.exports = app