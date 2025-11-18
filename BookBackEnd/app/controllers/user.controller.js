const ApiError = require('../app-error');
const MongoDB = require('./../utils/mongodb.util');
const UserService = require('../services/user.service');

exports.create = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const result = await userService.create(req.body);
        res.send(result);

    } catch (error){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
}

exports.findAll = async(req, res, next) =>{
    let documents = [];
    try{
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await userService.findByName(name);
        } else {
            documents = await userService.findAll({});
        }
    } catch (error){
        return next(
            new ApiError(500,"An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findEmail = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);

        const email = req.query.email; // ?email=value

        if (!email) {
            return res.status(400).json({ message: "Email query is required" });
        }

        const user = await userService.findByEmail(email); 

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        return res.json(user);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving email")
        );
    }
};

exports.findOne = async (req, res, next) =>{
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500,`Error retrieving user with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) =>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send({ message: "User was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error updating user with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) =>{
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send({ message: "User was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error deleting user with id=${req.params.id}`)
        );
    }
};