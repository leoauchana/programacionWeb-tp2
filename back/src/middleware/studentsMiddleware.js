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

const validateBySid = (req, res, next) => {
    const sid = req.params.sid;
    if(!sid) {
        return res.status(404).json({message: `Sid is incorrect ${sid}`});
    }
    next();
}

const validateQuerys = (req, res, next) => {
    const {search, currentPage, pageSize} = req.query;

    if(!search){
        return res.status(404).json({message: `Search is incorrect ${sid}`});
    }

    if(!currentPage){
        return res.status(404).json({message: `CurrentPage is incorrect ${sid}`});
    }

    if(!pageSize){
        return res.status(404).json({message: `PageSize is incorrect ${sid}`});
    }
}

module.exports = {
    validateBody,
    validateBySid,
    validateQuerys
}