const { ObjectId, ReturnDocument } = require('mongodb');
class EmployeeService{
    constructor(client){
        this.Employee = client.db().collection("NhanVien");
    }

    extractEmployeeData(payload){
        const employee = {
            HoVaDem: payload.HoVaDem,
            Ten: payload.Ten,
            Email: payload.Email,
            Password: payload.Password,
            GioiTinh : payload.GioiTinh,
            NgaySinh: payload.NgaySinh,
            SoDienThoai: payload.SoDienThoai,
            DiaChi: payload.DiaChi,
            VaiTro: payload.VaiTro,
        };

        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );

        return employee;
    }

    async create(payload){
        const employee = this.extractEmployeeData(payload);
        //console.log("Employee to insert:", employee);
        const result = await this.Employee.insertOne(employee);
        return result;
    }

    //httpget
    async findAll(){
        return await this.Employee.find().toArray();
    }

    async findById(id){
        return await this.Employee.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    //find by name
    async findByName(name){
        return await this.Employee.find({
            Ten: { $regex: new RegExp(name), $options: "i" },
        }).toArray();
    }

     async findByRole(role){
        return await this.Employee.find({
            VaiTro: { $regex: new RegExp(role), $options: "i" },
        }).toArray();
    }
    
    //httpput
    async update(id, payload){
        const update = this.extractEmployeeData(payload);
        const result = await this.Employee.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update }, 
            { ReturnDocument: 'after' }
        );
        return result.value;
    }

    //deleted
    async delete(id){
        const result = await this.Employee.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
        return result.value;
    }
}

module.exports = EmployeeService;