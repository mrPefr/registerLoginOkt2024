const exp = require('constants');
const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// FIXA så att vi har tillgång till bl a CSS
app.use(express.static("public"))
// FIXA EN BODY till POST
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => res.send(render('Hello World!')))

// Route för att gå till ett registreringsformulär
app.get("/register", showRegister);

// Route för att gå till ett loginformulär
app.get("/login", showLogin);

// Route för att HANTERA registrering
app.post("/register", register);


function register(req, res){

    let data = req.body;
    res.send(render(JSON.stringify(data)))

}



function showRegister(req, res){



    let form = fs.readFileSync("html/register.html").toString();
    res.send(render(form));

}
function showLogin(req, res){
    let form = fs.readFileSync("html/login.html").toString();
    res.send(render(form));
}




function render(content){

    let html = require("fs").readFileSync("html/template.html").toString();
    return html.replace("{content}", content);


}