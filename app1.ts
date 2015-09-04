///<reference path="./typings/node/node.d.ts" />

import http = require("http");
import fs = require("fs");
import url = require("url");
import qs = require("querystring");

var tasks = [];

var server : http.Server = http.createServer(function(req,res){

		
	
	var currentUrl = url.parse(req.url);
	
	var myObj = qs.parse(currentUrl.query)
	
	if(myObj.action == "add"){
		tasks.push(myObj.task)
	} else if(myObj.action == "delete"){
		tasks.splice(myObj.index, 1);
	}
	
	fs.readFile('./template.html', function (er, data) {
			if(er){
				//console.log(er);
				res.end(er.toString());
				return;
			}
			
			
			var temp = data.toString();
			// console.log(temp)
			
			var html = "<table border = '3' style = 'margin:auto'>";
			for(var i = 0; i < tasks.length; i++){
				html += "<tr>";
				html += "<th> Task </th>";
				html += "<th> Del the Task </th>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>" + tasks[i] +  "</td>";
				html += "<td><a href='?action=delete&index=" + i +  "'>Delete</a></td>";
				html += "</tr>";
			}
			html += "</table>";
			
			temp = temp.replace("Todothings", html);
			
			res.end(temp);
		})
}).listen(3000);
	