const validateBody = (req, res, next) => {
        if(!req.body.name || !req.body.lastName || !req.body.dni || !req.body.email){
            res.status(400).send(`Datos incorrectos`);
        }
        next();
}

module.exports = {
    validateBody
}