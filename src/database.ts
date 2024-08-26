import mysql from 'mysql2/promise';

const pool = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'monedero',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/* db.connect((err)=>{
    if(err){
        console.error('Error conectando a la base de datos:',err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
}); */

export default pool;