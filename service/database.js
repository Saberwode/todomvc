const mysql = require('mysql2')
const connection = mysql.createPool({
  host:"localhost",
  database:"bili",
  user:"root",
  password:"123456",
  connectionLimit:10,
})

connection.getConnection((err,conn)=>{
  conn.connect((err)=>{
    if(err){
      console.log('连接失败',err);
    }else{
      console.log("数据库连接成功");
    }
  })
})


module.exports = connection.promise()