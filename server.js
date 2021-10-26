const express = require("express")
const app = express()

//call router member
const member = require("./routers/member")
app.use("/member",member)

//call router paket
const paket = require("./routers/paket")
app.use("/paket",paket)

//call router users
const users = require("./routers/users")
app.use("/users",users)

//call router transaksi
const transaksi = require("./routers/transaksi")
app.use("/transaksi",transaksi)

app.listen(8000,()=>{
    console.log(`Server run on port 8000`)
})