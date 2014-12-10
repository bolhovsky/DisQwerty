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
    
    if (fs.existsSync(filename)){
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
        if (fs.lstatSync(filename).isDirectory()){
         if (fs.existsSync(filename+"/index.html")) filename+="/index.html";   
            else{
             files=fs.readdirSync(filename);
      
                content="<ul>"
                for (file in files){
                   
                    content+="<li><a href='"+files[file]+"'>"+files[file]+"</a></li>";
                }
                content+="</ul>";
            }
        }
        if (content)           res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(content||fs.readFileSync(filename));   
        }
    }
    else {
        res.writeHead(404);
     res.end()   ;
        
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
