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
            DocGia_ID : payload.DocGia_ID,
            TrangThai_ID: payload.TrangThai_ID,
        };

        Object.keys(phieuphat).forEach(
            (key) => phieuphat[key] === undefined && delete phieuphat[key]
        );

        return phieuphat;
    }
}

module.exports = ReportService;