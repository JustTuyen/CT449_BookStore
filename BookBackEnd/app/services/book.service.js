const { ObjectId, ReturnDocument } = require('mongodb');
class BookService{
    constructor(client){
        this.Book = client.db().collection("Sach");
    }

    extractBookData(payload){
        const sach = {
            //ID : payload.ID,
            TenSach: payload.TenSach,
            TacGia: payload.TacGia,
            NhaXuatBan_ID: payload.NhaXuatBan_ID,
            NamXuatBan: payload.NamXuatBan,
            MoTa : payload.MoTa,
            DonGia: payload.DonGia,
            SoQuyen: payload.SoQuyen,
            TrangThai_ID: payload.TrangThai_ID,
        };

        Object.keys(sach).forEach(
            (key) => sach[key] === undefined && delete sach[key]
        );

        return sach;
    }

    //create a new book
    async create(payload){
        const sach = this.extractBookData(payload);
        console.log("Book to insert:", sach);
        const result = await this.Book.insertOne(sach);
        return result;
    }

    //httpget
    async findAll(){
        return await this.Book.find().toArray();
    }

    async findById(id){
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    //find by name
    async findByName(name){
        return await this.Book.find({
            TenSach: { $regex: new RegExp(name), $options: "i" },
        }).toArray();
    }

    //find by name
    async findByPublisher(name){
        return await this.find({
            NhaXuatBan: { $regex: new RegExp(name), $options: "i" },
        }).toArray();
    }

    //find by name
    async findByArthor(name){
        return await this.find({
            TacGia: { $regex: new RegExp(name), $options: "i" },
        }).toArray();
    }

    //httpput
    async update(id, payload){
        const update = this.extractContactData(payload);
        const result = await this.Book.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update }, 
            { ReturnDocument: 'after' }
        );
        return result.value;
    }

    //deleted
    async delete(id){
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
        return result.value;
    }
}

module.exports = BookService;