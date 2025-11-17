const ApiError = require('../app-error');
const MongoDB = require('./../utils/mongodb.util');
const BorrowingCardService = require('../services/borrowingCard.service');

exports.create = async (req, res, next) => {
    if(!req.body?.Sach_ID){
       return next(new ApiError(400,"Sach_ID can not be empty"));
    }

    try {
        const borrowingCardService = new BorrowingCardService(MongoDB.client);
        const result = await borrowingCardService.create(req.body);
        res.send(result);

    } catch (error){
        return next(
            new ApiError(500,"An error occurred while creating the borrowing card")
        );
    }
}

exports.findAll = async(req, res, next) =>{
    let documents = [];
    try{
        const borrowingCardService = new BorrowingCardService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await borrowingCardService.findByStatus(name);
        } else {
            documents = await borrowingCardService.findAll({});
        }
    } catch (error){
        return next(
            new ApiError(500,"An error occurred while retrieving borrowing cards")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) =>{
    try{
        const borrowingCardService = new BorrowingCardService(MongoDB.client);
        const document = await borrowingCardService.findById(req.params.id);
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

exports.update = async(req, res, next) =>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const borrowingCardService = new BorrowingCardService(MongoDB.client);
        const document = await borrowingCardService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Borrowing card not found"));
        }
        return res.send({ message: "Borrowing card was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error updating borrowing card with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) =>{
    try{
        const borrowingCardService = new BorrowingCardService(MongoDB.client);
        const document = await borrowingCardService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Borrowing card not found"));
        }
        return res.send({ message: "Borrowing card was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error deleting borrowing card with id=${req.params.id}`)
        );
    }
};