const { ObjectId, ReturnDocument } = require('mongodb');
class UserService{
    constructor(client){
        this.User = client.db().collection("DocGia");
    }

    extractUserData(payload){
        const docgia = {
            HoVaDem: payload.HoVaDem,
            Ten: payload.Ten,
            Email: payload.Email,
            Password: payload.Password,
            GioiTinh : payload.GioiTinh,
            NgaySinh: payload.NgaySinh,
            SoDienThoai: payload.SoDienThoai,
            DiaChi: payload.DiaChi,
        };

        Object.keys(docgia).forEach(
            (key) => docgia[key] === undefined && delete docgia[key]
        );

        return docgia;
    }

    //create a new user
    async create(payload){
        const user = this.extractUserData(payload);
        const result = await this.User.insertOne(user);
        return result;
    }

    //httpget
    async findAll(){
        return await this.User.find().toArray();
    }

    async findById(id){
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    //find by name
    async findByName(name){
        return await this.User.find({
            Ten: { $regex: new RegExp(name), $options: "i" },
        }).toArray();
    }
    
    //httpput
    async update(id, payload){
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update }, 
            { ReturnDocument: 'after' }
        );
        return result.value;
    }

    //deleted
    async delete(id){
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
        return result.value;
    }
}
module.exports = UserService;