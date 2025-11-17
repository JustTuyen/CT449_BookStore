const ApiError = require('../app-error');
const MongoDB = require('./../utils/mongodb.util');
const StatusService = require('../services/status.service');

exports.create = async (req, res, next) => {
    if(!req.body?.TenTrangThai){
       return next(new ApiError(400,"Name can not be empty"));
    }

    try {
        const statusService = new StatusService(MongoDB.client);
        const result = await statusService.create(req.body);
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
        const statusService = new StatusService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await statusService.findByName(name);
        } else {
            documents = await statusService.findAll({});
        }
    } catch (error){
        return next(
            new ApiError(500,"An error occurred while retrieving statuses")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) =>{
    try{
        const statusService = new StatusService(MongoDB.client);
        const document = await statusService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500,`Error retrieving status with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) =>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const statusService = new StatusService(MongoDB.client);
        const document = await statusService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Status not found"));
        }
        return res.send({ message: "Status was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error updating status with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) =>{
    try{
        const statusService = new StatusService(MongoDB.client);
        const document = await statusService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Status not found"));
        }
        return res.send({ message: "Status was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error deleting status with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next ) =>{
    try{
        const statusService = new StatusService(MongoDB.client);
        const deletedCount = await statusService.deleteAll();
        return res.send({
            message: `${deletedCount} statuses were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500,"An error occurred while removing all statuses")
        );
    }
};
