const http = require("http");

const server=http.createServer((req,res)=>{
    console.log("run request...")
    res.setHeader('Context Type','text/html');
    res.write('<h1>Hello Le Tuan Nghia</h1>');
    res.end();
})

server.listen(8080,'localhost',()=>{
    console.log('NodeJS is running on port 8080');
})