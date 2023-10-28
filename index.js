const express = require('express')
const app = express()
const port = 4000
const connectDb=require("./db");
connectDb();
const signinRouter=require("./routes/signin")
const loginRouter=require("./routes/login")
const homeRouter=require("./routes/home")
app.use(express.json())
const cors=require("cors")
app.use(cors({origin:"*"}))



app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use("/signin",signinRouter)
app.use("/login",loginRouter)
app.use("/home",homeRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})