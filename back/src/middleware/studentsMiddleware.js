const validateBody = (req, res, next) => {
        console.log(req.body);
        const name = req.body.name;
        const lastName = req.body.lastName;
        const dni = req.body.dni;
        const email = req.body.email;

        if(!name) {
            return res.status(404).json({message: `Name is required`});
        }
        if(!lastName) {
            return res.status(404).json({message: `Lastname is required`});
        }
        if(!dni) {
            return res.status(404).json({message: `Dni is required`});
        }
        if(!email) {
            return res.status(404).json({message: `Email is required`});
        }

        next();
};

module.exports = {
    validateBody
}