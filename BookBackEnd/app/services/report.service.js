const { ObjectId, ReturnDocument } = require('mongodb');
class ReportService{
    constructor(client){
        this.Report = client.db().collection("PhieuPhat");
    }

    extractReportData(payload){
        const phieuphat = {
            PhieuTheoDoi_ID: payload.PhieuTheoDoi_ID,
            LyDo: payload.LyDo,
            DonGia: payload.DonGia,
            NgayLap: payload.NgayLap,
            //DocGia_ID : payload.DocGia_ID,
            TrangThai_ID: payload.TrangThai_ID,
        };

        Object.keys(phieuphat).forEach(
            (key) => phieuphat[key] === undefined && delete phieuphat[key]
        );

        return phieuphat;
    }

    //
    async create(payload){
        const report = this.extractReportData(payload);
        const result = await this.Report.insertOne(report);
        return result;
    }

    async findAll(){
        return await this.Report.find().toArray();
    }

    async findById(id){
        return await this.Report.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }

     async findByStatus(status){
        return await this.Report.find({
            TrangThai_ID: { $regex: new RegExp(status), $options: "i" },
        }).toArray();
    }

    async findByCard(phieuTheoDoi_ID){
        return await this.Report.find({
            PhieuTheoDoi_ID:phieuTheoDoi_ID,
        }).toArray();
    }
    
    //httpput
    async update(id, payload){
        const update = this.extractReportData(payload);
        const result = await this.Report.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update }, 
            { ReturnDocument: 'after' }
        );
        return result.value;
    }

    //deleted
    async delete(id){
        const result = await this.Report.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
        return result.value;
    }

}

module.exports = ReportService;