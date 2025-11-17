const { ObjectId, ReturnDocument } = require('mongodb');
class PublisherService{
    constructor(client){
        this.Publisher = client.db().collection("NhaXuatBan");
    }

    extractPublisherData(payload){
        const publisher = {
            //ID : payload.ID,
            TenNXB: payload.TenNXB,
            DiaChi: payload.DiaChi,
            SDT: payload.SDT,
        };

        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

     //create a new book
    async create(payload){
        const publisher = this.extractPublisherData(payload);
        const result = await this.Publisher.insertOne(publisher);
        return result;
    }

    //httpget
    async findAll(){
        return await this.Publisher.find().toArray();
    }

    async findById(id){
        return await this.Publisher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    //find by name
    async findByName(name){
        return await this.Publisher.find({
            TenNXB: { $regex: new RegExp(name), $options: "i" },
        }).toArray();
    }

    //update publisher
     async update(id, payload){
        const update = this.extractPublisherData(payload);
        const result = await this.Publisher.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update }, 
            { returnDocument: 'after' }
        );

       return result.value;
       
    }

    //deleted
    async delete(id){
        const result = await this.Publisher.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
        return result.value;
    }


}

module.exports = PublisherService;