const ApiError = require('../app-error');
const MongoDB = require('./../utils/mongodb.util');
const EmployeeService = require('../services/employee.service');

exports.create = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const result = await employeeService.create(req.body);
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
        const employeeService = new EmployeeService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await employeeService.findByName(name);
        } else {
            documents = await employeeService.findAll({});
        }
    } catch (error){
        return next(
            new ApiError(500,"An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) =>{
    try{
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Employee not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500,`Error retrieving employee with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) =>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Employee not found"));
        }
        return res.send({ message: "Employee was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error updating employee with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) =>{
    try{
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Employee not found"));
        }
        return res.send({ message: "Employee was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error deleting employee with id=${req.params.id}`)
        );
    }
};