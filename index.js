
const express = require('express');
const bcrypt = require("bcryptjs");
const session = require('express-session');

const app = express();
const port = 3000;
// variabel som hanterar filsystemet
const fs = require("fs");
app.listen(port, () => console.log(`Example app listening on port ${port}!`))




// FIXA så att vi har tillgång till bl a CSS
app.use(express.static("public"))
// FIXA EN BODY till POST
app.use(express.urlencoded({extended:true}))

// initera en session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { }
  }))


app.get('/', (req, res) => {


res.send(render("HOME"));

})
app.get('/session', (req, res) => {


   if(req.session.email) return res.send(render( "välkommern "+req.session.email));

   res.redirect("/login");

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

    let users = JSON.parse(fs.readFileSync("user.json").toString());

    let userExist = users.find(u=>u.email==data.email);
    if(!userExist) return res.send(render("No such USEr"));

    let check = await bcrypt.compare(data.password, userExist.password);

    if(!check) return res.redirect("/login?wrong_credentials");

    req.session.email = userExist.email;
    req.session.loggedIn = true;
    res.send(render("INLOGGAD SOM "+userExist.email));


}



async function register(req, res){

    // Hämta data som skickats med metod POST
    let data = req.body;

    // Hasha lösenord
    data.password = await bcrypt.hash(data.password,12);

    let users = JSON.parse(fs.readFileSync("user.json").toString());

    let userExist = users.find(u=>u.email == data.email);
    if(userExist) return res.send(render("User exists"));


    // Här vet vi att det är en ny user....

    users.push(data);
    fs.writeFileSync("user.json", JSON.stringify(users, null, 3));

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