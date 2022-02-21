var sql=require('mysql');
var pool=sql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123Nitin@456',
    database:'glasskart',
    connectionLimit:100,
    multipleStatements:true
});
module.exports=pool;