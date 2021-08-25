const connection = require('./database');


class UserService{
  // 接收数据
  async addList(list){
    // console.log(list);
    const {id,value,clickStatus} = list;
    // console.log(id,value,clickStatus);
    const statement = `
    INSERT INTO list (id,value,clickStatus) VALUES (?,?,?);
    `
    const result = await connection.execute(statement,[id,value,clickStatus]);
    return result;
  }
  async sendAll(){
    const statement = `
    SELECT id,value,clickStatus FROM list;
    `
    const [result] = await connection.execute(statement)
    // console.log(result);
    // console.log(await connection.execute(statement));
    return result;
  }
  async sendActive(){
    const statement = `
    SELECT * FROM list WHERE clickStatus = 'false';
    `
    const [result] = await connection.execute(statement)
    return result;
  }
  async sendCompleted(){
    const statement = `
    SELECT * FROM list WHERE clickStatus = 'true';
    `
    const [result] = await connection.execute(statement)
    return result;
  }
  async deleteItem(itemId){
    const statement = `
    DELETE FROM list WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[itemId])
    return result;
  }
  async updateItem(itemId,clickStatus){
    const statement = `
    UPDATE list set clickStatus = ? WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[clickStatus,itemId])
    return result;
  }
  async toggleAll(){
    const statement = `
    UPDATE list set clickStatus = 'true';
    `
    const [result] = await connection.execute(statement)
    return result;
  }
  async toggleNotAll(){
    const statement = `
    UPDATE list set clickStatus = 'false';
    `
    const [result] = await connection.execute(statement)
    return result;
  }
  async deleteCompleted(){
    const statement = `
    DELETE FROM list WHERE clickStatus = 'true';
    `
    const [result] = await connection.execute(statement)
    return result;
  }
}

module.exports = new UserService();