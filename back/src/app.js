const express = require('express');
const routerAlumns = require('./routes/alumnsRoute');
const app = express();

//Settings
app.set('port',3000);


app.use(express.json());
app.use('api/alumns',routerAlumns);




app.use((req, res) => {
    res.send(`No se encontro tu pagina`);
});
//Connection
app.listen(app.get('port'));
console.log(`Connection in port ${app.get('port')}`);