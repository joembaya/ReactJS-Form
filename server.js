var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('util')
var qs = require( "querystring" );

// Create a server
http.createServer( function (req, res) {  
 
   var pathname = url.parse(req.url).pathname;
   
 
   console.log("Request for " + pathname + " received.");
   
    if(pathname == '/api/v1/signup'){
                                                          
            console.log("Status [200] " + req.method + " to " + req.url);
            var fullBody = '';
            
            req.on('data', function(chunk) {
              // append the current chunk of data to the fullBody variable
              fullBody += chunk.toString();
            });
            
            req.on('end', function() {
              res.writeHead(200, "OK", {'Content-Type': 'text/html'});
              
              // parse the data
              var decodedBody = qs.parse(fullBody);
         
              console.log(util.inspect(decodedBody));          
              res.write(util.inspect(decodedBody));
              
              res.end();
            });
    }
    else // Files only
    {  
                fs.readFile(pathname.substr(1), function (err, data) {
              if (err) {
                 console.log(err);
                 // HTTP Status: 404 : NOT FOUND
                 res.writeHead(404, {'Content-Type': 'text/html'});
              }
              
              else{		  
                 // HTTP Status 
                            res.writeHead(200, {'Content-Type': 'text/html'});	
                             res.write(data.toString()); 
              }
            
              res.end();
           }); 
    }
     
}).listen(8081);

// Console will print the message
console.log('Server running at Localhost');