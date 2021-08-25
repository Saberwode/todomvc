var express = require('express');
var router = express.Router();
const users = require('./users')
const app = express();
const service = require('../service/service');
require('../service/database')
app.use('/users', users)
app.use(express.json()); 

let stack = []
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 发送数据 全部数据
router.get('/all',async (req,res,next)=>{
  // res.json(stack)
  const result  = await service.sendAll();
  res.json(result);
})
// 发送数据 未完成数据
router.get('/active',async (req,res,next)=>{
  // console.log(typeof(stack));
  // console.log(stack.filter((e) => e.content.clickStatus == false));
  // res.json(stack.filter((e) => e.content.clickStatus == false))
  const result  = await service.sendActive();
  res.json(result)


})
// 发送数据 已经完成数据
router.get('/completed',async (req,res,next)=>{
  // let show = stack.filter((e) => e.content.clickStatus == true)
  // console.log(show);
  // res.json(show)
  const result  = await service.sendCompleted();
  res.json(result)
})


// 接收数据
try {
  router.post('/content',async (req,res,next)=>{
    // stack.push(req.body)
    // console.log(req.body.content);
    const result = await service.addList(req.body)
    // console.log(result);
    res.end('接收到数据！');
  })
} catch (error) {
  console.log(error);
}
// console.log(this.stack);

// 删除数据
router.delete('/delete', async (req,res,next)=>{
  const {itemId} = req.body
  // stack = stack.filter(e=>!(e.content.id===itemId))
  // console.log(stack);
  // res.json(stack)
  // res.end(`删除成功，删除的数据是${itemId}号数据`)
  const result = await service.deleteItem(itemId)
  const result1 = await service.sendAll()

  res.json(result1);

})


//修改数据
router.post('/patch',async (req,res,next)=>{
  // console.log(req.body);
  const {itemId,status} = req.body;
  // stack.forEach(e=>{
  //   if(e.content.id == itemId){
  //     e.content.clickStatus = status
  //   }
  // })
  // console.log(stack);
  const result = await service.updateItem(itemId,status);
  console.log(result);
  res.end(`修改数据成功，${itemId}号数据被修改为${status}`)
})

//全选数据
router.get('/toggleAll',async (req,res,next)=>{
  stack = await service.sendAll()
  console.log(stack);
  if(stack.every((e)=> e.clickStatus === 'true')){
    // stack.forEach(e=> e.content.clickStatus = false)
    const result = await service.toggleNotAll();
  }else if(stack.some((e)=> e.clickStatus === 'false')){
    // stack.forEach(e => e.content.clickStatus = true);
    const result2 = await service.toggleAll();
  }
  const result1 = await service.sendAll()
  res.json(result1)
})

//删除已选数据
router.get('/clearCompleted',async (req,res,next)=>{
  // stack = stack.filter(e=> e.content.clickStatus!== true)
  const result = await service.deleteCompleted();
  const result1 = await service.sendAll();
  // res.json(stack)
  res.json(result1);
})
module.exports = router;
