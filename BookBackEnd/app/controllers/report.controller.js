const ApiError = require('../app-error');
const MongoDB = require('./../utils/mongodb.util');

const ReportService = require('../services/report.service');
exports.create = async (req, res, next) => {
    if(!req.body?.PhieuTheoDoi_ID){
       return next(new ApiError(400,"PhieuTheoDoi_ID can not be empty"));
    }

    try {
        const reportService = new ReportService(MongoDB.client);
        const result = await reportService.create(req.body);
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
        const reportService = new ReportService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await reportService.findByName(name);
        } else {
            documents = await reportService.findAll({});
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
        const reportService = new ReportService(MongoDB.client);
        const document = await reportService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Report not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500,`Error retrieving report with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) =>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const reportService = new ReportService(MongoDB.client);
        const document = await reportService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Report not found"));
        }
        return res.send({ message: "Report was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error updating report with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) =>{
    try{
        const reportService = new ReportService(MongoDB.client);
        const document = await reportService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Report not found"));
        }
        return res.send({ message: "Report was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error deleting report with id=${req.params.id}`)
        );
    }
};


exports.findByCard = async (req, res, next) =>{
    try{
        const reportService = new ReportService(MongoDB.client);
        const document = await reportService.findByCard(req.params.id);
        if(!document){
            return next(new ApiError(404,"Borrowing card not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500,`Error retrieving borrowing card with id=${req.params.id}`)
        );
    }
};