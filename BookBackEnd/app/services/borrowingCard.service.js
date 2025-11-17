const { ObjectId, ReturnDocument } = require('mongodb');
class BorrowingCardService{
    constructor(client){
        this.BorrowingCard = client.db().collection("TheTheoDoiSach");
    }

    extractBorrowingCardData(payload){
        const borrowingCard = {
            Sach_ID: payload.Sach_ID,
            DocGia_ID: payload.DocGia_ID,
            NhanVien_ID: payload.NhanVien_ID,
            NgayMuon: payload.NgayMuon,
            NgayTra: payload.NgayTra,
            TrangThai_ID: payload.TrangThai_ID,
            DonGia: payload.DonGia,
        };

        Object.keys(borrowingCard).forEach(
            (key) => borrowingCard[key] === undefined && delete borrowingCard[key]
        );
        return borrowingCard;
    }

     //create a new user
    async create(payload){
        const borrowingCard = this.extractBorrowingCardData(payload);
        const result = await this.BorrowingCard.insertOne(borrowingCard);
        return result;
    }

     async findAll(){
        return await this.BorrowingCard.find().toArray();
    }

    async findById(id){
        return await this.BorrowingCard.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }

    //find by name
    async findByStatus(status){
        return await this.BorrowingCard.find({
            TrangThai_ID: { $regex: new RegExp(status), $options: "i" },
        }).toArray();
    }
    
    //httpput
    async update(id, payload){
        const update = this.extractBorrowingCardData(payload);
        const result = await this.BorrowingCard.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update }, 
            { ReturnDocument: 'after' }
        );
        return result.value;
    }

    //deleted
    async delete(id){
        const result = await this.BorrowingCard.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
        return result.value;
    }
}

module.exports = BorrowingCardService;