var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mysql       = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shoptrendo'
})

app.use( express.static( "public" ) );

connection.connect(function(err) {
  if (err){
  	console.log(err)
  } else{
  	console.log("connected to db");
  }
})

app.get("/",function(req,res){
	connection.query('select user_id from products',function(err,result){
		if(err){
			console.log(err);
		}
		else{
			result.forEach(function(data){
				var data1 = new Array();
				connection.query('Select product_name,product_image,product_category from products where user_id=?',data.user_id,function(err,result){
					if(err){
						console.log('madar');
					}
					else{
						result.forEach(function(data2){
							data1.push(data2.product_name)
						})
					}
	    		})
	    		console.log(data1);
			})
			/*console.log(data1);*/
			/*res.render("home.ejs",{result: productResult})*/
		}
	})
	/*user.forEach(function(result){
		var userID = result.user_id
		connection.query('Select product_name,product_image,product_category from products where user_id=?',userID,function(err,result){
			if(err){
				console.log('madar');
			}else{
				res.render("home.ejs",{result: result});
			}
	    })
		})	*/
})

app.listen(3000,function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log("connected");
	}
})