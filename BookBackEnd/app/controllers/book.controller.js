const ApiError = require('../app-error');
const BookService = require('../services/book.service');
const MongoDB = require('./../utils/mongodb.util');

exports.create = async (req, res, next) => {
    if(!req.body?.TenSach){
       return next(new ApiError(400,"Name can not be empty"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const result = await bookService.create(req.body);
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
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await bookService.findByName(name);
        } else {
            documents = await bookService.findAll({});
        }
    } catch (error){
        return next(
            new ApiError(500,"An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOnlyFive = async(req, res, next) =>{
    let documents = [];
    try{
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await bookService.findByName(name);
        } else {
            documents = await bookService.findFive();
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
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Book not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500,`Error retrieving book with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) =>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Book not found"));
        }
        return res.send({ message: "Book was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error updating book with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) =>{
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Book not found"));
        }
        return res.send({ message: "Book was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500,`Error deleting book with id=${req.params.id}`)
        );
    }
};


exports.findNSX = async (req, res, next) => {
    try {
        const publisher = req.query.publisher; // ?email=value
        const bookService = new BookService(MongoDB.client);
        const book = await bookService.findByNSB(publisher); 

        if (!publisher) {
            return res.status(404).json({ message: "name not found" });
        }

        return res.json(book);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving name")
        );
    }
};