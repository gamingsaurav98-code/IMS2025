const roleBasedAuth = (roles) =>{
    return (req, res, next) => {

        if(req.user.roles.includes(roles)) return next();
      

            res.status(403).send("Access denied. ");
    };
};

export default roleBasedAuth;