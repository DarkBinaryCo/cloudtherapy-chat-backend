const User = require('../../lib/user');
const Api = require('../../utils/api');

// Get user by uid
const getUser = (req, res, next) => {
    Api.attachErrorHandler(res,
        User.getUserById(req.params.uid).then((user) => {
            // console.log(user);
            const response = Api.getResponse(true, "Successfully retrieved user", user);

            res.status(response.statusCode).json(response);
        })
    );
};

// Update user
const updateUser = (req, res, next) => {
    Api.attachErrorHandler(res,
        User.updateUser(req.params.uid, req.body.data).then(() => {
            const response = Api.getResponse(true, "Successfully updated user");

            res.status(response.statusCode).json(response);
        })
    )
}

module.exports = {
    getUser,
    updateUser
}