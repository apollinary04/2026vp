const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;
const dateET = require('./dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Polina Rajevskaja, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Polina Rajevskaja, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, see leht aga on juba programmeeritud.</p>\n\t<hr>';
const pageBanner = '<img src="veebiprogrammeerimine_2026_TA.png" alt="">';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	console.log('Päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);

	
	if(currentURL.pathname === '/'){	
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<img src="/foto2.jpg" alt="Foto">\n');
		res.write('\n\t<p>Täna on ' + dateET.fullWeekday() + ', ' + dateET.fullDate(Math.round(Math.random())) + ', kell oli lehe avamise hetkel: ' + dateET.fullTime() +'.</p>');
		res.write('\n\t<ul>');
		res.write('\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
		res.write('\n\t\t<li><a href="/miksTLU">Miks tulin TLÜ-sse õppima?</a></li>');
		res.write('\n\t</ul>');
		res.write(pageFoot);
		return res.end();
	}
	
	else if(currentURL.pathname === '/miksTLU'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write('\t<h1>Miks tulin TLÜ-sse õppima?</h1>\n');
		res.write('\t<img src="/foto1.jpg" alt="Foto">\n');
		res.write('\t<p>Tulin Tallinna Ülikooli õppima, sest mind on alati huvitanud erinevad asjad, mida saab arvutiga teha. Soovin saada rohkem teadmisi ja oskusi, et tulevikus töötada arvutitega seotud valdkonnas.</p>\n');
		res.write('\t<p><a href="/">Tagasi avalehele</a></p>');
		res.write(pageFoot);
		return res.end();
	}

	else if(currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write('\t<h1>Eesti vanasõnad</h1>\n');

		try {
			const data = await fs.readFile('txt/vanasonad.txt', 'utf8');
			let folkWisdom = data.split(';');
			let proverb = folkWisdom[Math.floor(Math.random() * folkWisdom.length)];
			res.write('\t<p>Tänane vanasõna: ' + proverb + '</p>\n');
		} catch (err) {
			res.write('\t<p>Viga: vanasõnu ei leitud.</p>\n');
		}

		res.write('\t<p><a href="/">Tagasi avalehele</a></p>');
		res.write(pageFoot);
		return res.end();
	}
	
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);

		try {
			const data = await fs.readFile(picPath);
			res.writeHead(200, {"Content-type": "image/png"});
			res.end(data);
		} catch (err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		}
	}
	
	else if(path.extname(currentURL.pathname).toLowerCase() === '.jpg'){
	let picPath = path.join(__dirname, 'pic', path.basename(currentURL.pathname));

	try {
		const data = await fs.readFile(picPath);
		res.writeHead(200, {"Content-type": "image/jpeg"});
		res.end(data);
	} catch (err){
		res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
		return res.end('Pilti ei leitud!');
	}
	}

	else {
		res.end('Viga 404, ei leia sellist lehte!');
	}
}).listen(5322);