var http = require('http'),
 url = require('url'),
    fs=require('fs'),
    qs = require('querystring'),
 port=process.argv[2]||8888;
http.createServer(function (req, res) {
    var content;
     res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
var filename=(process.cwd()+decodeURI(url_parts.pathname));
    if (query.q){
            switch (url_parts.pathname){
             case "/library/":
                letters = getLetters(query.q);
    
                    if (letters){
    result=[];
    for (id in letters){
        result.push(id);
    }
    res.writeHead(200, {'Content-Type': 'text/json'});

    res.end(JSON.stringify(result));
    }
    else{
    res.writeHead(400);
    }
                    
                    break;
 
            }
        }
    else{
        if (fs.lstatSync(filename).isDirectory()) filename+="/index.html";
    fs.exists(filename, function(exist){
       if (exist){
           res.writeHead(200, {'Content-Type': require('mime').lookup(filename)})
           fs.createReadStream(filename).pipe(res);
       }
        else{
         res.writeHead(404);   
        }
    });
    }
}).listen(port);


getLetters = function(part){
    part.toLowerCase();
 file = "./json/"+part[0]+".json";
    
    if (fs.existsSync(file)){
        str = part.substr(1);
        res=JSON.parse(fs.readFileSync(file));
        for (var id in str){
        res=res[str[id]];   
        }
        
        return res;
    }
    else{
     return false;   
    }
}
console.log("Программа запущенна. Откройте http://127.0.0.1:"+port)
