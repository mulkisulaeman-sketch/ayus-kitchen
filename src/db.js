const {Pool}=require('pg'); const c=require('./config');
const pool=new Pool({connectionString:c.databaseUrl,max:10,idleTimeoutMillis:30000,connectionTimeoutMillis:3000});
async function query(text,params){return pool.query(text,params)}
async function initDb(){await query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,name VARCHAR(120) NOT NULL,email VARCHAR(255) UNIQUE NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);const {rows}=await query('SELECT COUNT(*)::int count FROM users');if(rows[0].count===0)await query('INSERT INTO users(name,email) VALUES($1,$2),($3,$4)',['Ayu','ayu@example.com','Mulki','mulki@example.com'])}
async function healthcheck(){await query('SELECT 1');return true} module.exports={pool,query,initDb,healthcheck};
