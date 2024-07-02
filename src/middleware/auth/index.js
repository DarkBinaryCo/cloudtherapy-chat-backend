const Auth = require('../../lib/auth');
const Api = require('../../utils/api');

// Authenticate user
const authUser = (req, res, next) => {
    const userData = {
        uid: req.body.data.uid,
        ...req.body.data.user
    };

    Api.attachErrorHandler(res,
        Auth.authUser(userData).then(() => {
            const response = Api.getResponse(true, "Successfully authenticated user", null);

            res.status(response.statusCode).json(response);
            next();
        })
    );
};



module.exports = {
    authUser
}