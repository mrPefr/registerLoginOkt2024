const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', (req, res) => res.send('Hello World!'))

// Route för att gå till ett registreringsformulär
app.get("/register", showRegister);

// Route för att gå till ett loginformulär
app.get("/login", showLogin);


function showRegister(req, res){}
function showLogin(req, res){}
