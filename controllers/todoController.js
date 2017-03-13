var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the mLabs Database
mongoose.connect('mongodb://test:test@ds129050.mlab.com:29050/todoplaylist');

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo',todoSchema);

// var itemOne = Todo({item : 'Buy Flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

//var data = [{item:'get milk'},{item: 'walk dog'},{item:'kick some coding'}];
var urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = function(app){

app.get('/todo',function(req,res){
  //Get Data from MongoDB and pass it to the view
  Todo.find({},function(err, data){ //This will find all the items in the database
    if(err) throw err;
    res.render('todo',{todos:data});
  });
     console.log('request get');
});

app.post('/todo', urlencodedParser, function(req,res){
   //Get Data from the View and Add it to the MongoDB
   var newTodo = Todo(req.body).save(function(err,data){
     if(err) throw err;
     res.json(data);
   });
   //data.push(req.body);
   /*
    res.render('todo',{todos:data});
                or
         res.json(data);
  */
   console.log('request post');
});

app.delete('/todo/:item',function(req,res){
  //Delete the requested Item from MongoDB
  Todo.find({item : req.params.item.replace(/\-/g," ")}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
  });
  /* data = data.filter(function(todo){
  //   //Replacing Spaces with '-'
  //   return todo.item.replace(/ /g,'-')!==req.params.item;
  // });
  // res.json(data);
  console.log('request delete');
  //res.render('todo',{todos:data});
  */
});

};
