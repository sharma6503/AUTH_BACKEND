const redis=require("redis")
const dotenv=require("dotenv")
dotenv.config()




const redisClient=()=>{
    return redis.createClient()
  url:process.env.redis_url
}


const client=redisClient()
client.on("error",(err)=>{
    console.log(err)

})
client.on("connect",()=>{
    console.log("connect to redis")

})
client.on("end",()=>{
    console.log("connect to redis ended")

})

client.on("SIGQUIT",()=>{
    client.quit()

})

module.exports=client