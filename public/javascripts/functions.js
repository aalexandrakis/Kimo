module.exports = {
	httpPost: function(req, res, url, data, dataCallBack, endCallBack){
		console.log('Http Post Function ' + url + ' ' + data);

		http = require('http');
		options = {
		    host: 'localhost',
		    port: 8080,
		    path: url,
		    method: 'POST',
		    headers: {
		        'Content-Type': 'application/json',
		        'Content-Length': Buffer.byteLength(data)
		    }
		};
		newReq = http.request(options, function(newRes) {
			newRes.setEncoding('utf8');
			newRes.on('data', function (result) {
				dataCallBack(result);
		    });
			newRes.on('end', function (result) {
				endCallBack(result);
		    });
		});
		newReq.on('error', function(error){
			res.redirect('/error/408');
		});
		newReq.write(data);
		newReq.end();
	},

httpGet: function(req, res, url, data, dataCallBack, endCallBack){
		console.log('Http Get Function ' + url );

		http = require('http');
		options = {
		    host: 'localhost',
		    port: 8080,
		    path: url,
		    method: 'GET',
		    headers: {
		        'Content-Type': 'application/json'
		    }
		};
		newReq = http.request(options, function(newRes) {
			newRes.setEncoding('utf8');
			newRes.on('data', function (result) {
				dataCallBack(result);
		    });
			newRes.on('end', function (result) {
				endCallBack(result);

		    });

		});
		newReq.on('error', function(error){
			res.redirect('/error/408');
		});
		newReq.write(data);
		newReq.end();
	},

	putError: function(array, name, error){
		array.forEach(function(field, index){
			if (field.name == name){
				field.error = error;
				return;
			}
		});
	},

	putValue: function(array, name, value){
		array.forEach(function(field, index){
			if (field.name == name){
				field.value = value;
				return;
			}
		});
	},

	test:  function(){
		return 'test function';
	}


}