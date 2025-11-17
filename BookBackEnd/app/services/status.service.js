const { ObjectId, ReturnDocument } = require('mongodb');
class StatusService{
    constructor(client){
        this.Status = client.db().collection("TrangThai");
    }

    extractStatusData(payload){
        const status = {
            TenTrangThai: payload.TenTrangThai,
        };

        Object.keys(status).forEach(
            (key) => status[key] === undefined && delete status[key]
        );

        return status;
    }

     //create a new book
    async create(payload){
        const status = this.extractStatusData(payload);
        //console.log("Extracted status:", status);
        const result = await this.Status.insertOne(status);
        return result;
    }

     //httpget
    async findAll(){
        return await this.Status.find().toArray();
    }

    async findById(id){
        return await this.Status.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    //find by name
    async findByName(name){
        return await this.Status.find({
            TenTrangThai: { $regex: new RegExp(name), $options: "i" },
        }).toArray();
    }

    //update publisher
     async update(id, payload){
        const update = this.extractStatusData(payload);
        const result = await this.Status.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update }, 
            { returnDocument: 'after' }
        );
        return result.value;
    }

    //deleted
    async delete(id){
        const result = await this.Status.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
        return result.value;
    }

    async deleteAll(){
        const result = await this.Status.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = StatusService;