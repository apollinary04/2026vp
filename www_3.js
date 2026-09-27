const http = require("http");
const dateET = require("./dateTimeET");
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Polina Rajevskaja, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Polina Rajevskaja, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ulikoolis</a> ning ei sisalda tosiseltvoetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, see leht on juba programmeeritud.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead); 
	res.write(pageBody); 

	res.write('Täna on ' + dateTimeET.day() + ', ' + dateTimeET.fullDate(Math.round(Math.random())) + ', kell oli lehe avamise hetkel: ' + dateTimeET.fullTime() + '.');

	res.write(pageFoot); 
	//res.write("Veeb lakski kaima!");
	return res.end();
	
}).listen(5322);