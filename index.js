const express = require('express');
const myapp = express();
const port = 4000;
myapp.use(express.static(__dirname + '/public'));
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Abhiraj:123@cluster0.a4kjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { 
    useNewUrlParser: true
});
myapp.set('view engine', 'ejs');
myapp.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
myapp.use(express.json());




const quesschema = {
    ques: String,
    tot: Number,
    pos: Number   
};
const ques = mongoose.model("Seed", quesschema)



myapp.get("/", (req, res) => {
    ques.findOne({}, function (err, adventure) { console.log(adventure); })
    ;
    ques.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        ques.findOne().skip(random).exec(
          function (err, result) {
            // Tada! random user
            res.render('home',{"question": (result)})
          })
      })
       
    
     
    

});

myapp.post('/', function(request, response){
   var ans = request.body.contact;
   var id = request.body.list;
   
    ques.findById(id, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            docs.tot++;
            console.log(ans);
            if (ans == 'Yes'){
                docs.pos++;
            }
            docs.save();
            console.log("Result : ", docs);
            response.render('ans',{"question": ((docs.pos/docs.tot)*100)});
            
        } 
    

    });   
});

myapp.get("/json", (req, res) => {
   res.json({ message: "Hello world" });
});
myapp.post("/re", (req, res) => {
    res.redirect("/");
 });
myapp.post("/submit", (req, res) => {
    const name = req.body.quess;
    const Seed = new ques ({
        ques:name,
        tot: 0,
        pos: 0
    });
    Seed.save()

    res.redirect("/");
 });

let port = process.env.PORT;
if(port==null || port == ""){
    port = 8000;
}
myapp.listen(port);
