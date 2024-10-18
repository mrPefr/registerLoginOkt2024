const exp = require('constants');
const express = require('express');
const bcrypt = require("bcryptjs");
const app = express();
const port = 3000;
// variabel som hanterar filsystemet
const fs = require("fs");
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// FIXA så att vi har tillgång till bl a CSS
app.use(express.static("public"))
// FIXA EN BODY till POST
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {


res.send(req.headers);

})
app.get('/kalle', (req, res) => {


    res.send(req.headers);
    
    })

// Route för att gå till ett registreringsformulär
app.get("/register", showRegister);

// Route för att gå till ett loginformulär
app.get("/login", showLogin);

// Route för att HANTERA registrering
app.post("/register", register);

// Route för att hantera inloggning
app.post("/login", login);

async function login(req, res){

    let data = req.body;

    let user = JSON.parse(fs.readFileSync("user.json").toString());

    let check = await bcrypt.compare(data.password, user.password);

    if(!check) return res.redirect("/login?wrong_credentials");

    res.send(render("INLOGGAD SOM "+user.email));


}



async function register(req, res){

    // Hämta data som skickats med metod POST
    let data = req.body;

    // Hasha lösenord
    data.password = await bcrypt.hash(data.password,12);

    let user = JSON.parse(fs.readFileSync("user.json").toString());
    if(user.email) return res.send(render("FORBIDDEN"));

    fs.writeFileSync("user.json", JSON.stringify(data, null, 3));

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