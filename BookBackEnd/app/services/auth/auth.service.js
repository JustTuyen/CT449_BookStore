// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// class AuthService{
//     constructor(db){
//         this.User = db.collection("DocGia");
//     }

//     extractUserData(payload){
//         return {
//             HoVaDem: payload.HoVaDem,
//             Ten: payload.Ten,
//             Email: payload.Email,
//             Password: payload.Password,
//             GioiTinh : payload.GioiTinh,
//             NgaySinh: payload.NgaySinh,
//             SoDienThoai: payload.SoDienThoai,
//             DiaChi: payload.DiaChi,
//             VaiTro: payload.VaiTro || 'User',
//         };
//     }

//     async register(payload){
//         const user = this.extractUserData(payload);

//         //check if email already exists
//         const exist = await this.User.findOne({ Email: user.Email });
//         if (exist) {
//             throw new Error('Email already in use');
//         }
//         //hash password
//         user.Password = await bcrypt.hash(user.Password, 10);
        
//         //register
//         await this.User.insertOne(user);
//         return { message: 'Registration successful' };
//     }

//     async login(email, password){
//         const user = await this.collection.findOne({ Email: email });
//         if (!user) {
//             throw new Error('User not found');
//         }

//         const okay = await bcrypt.compare(password, user.Password);
//         if (!okay) {
//             throw new Error('Invalid password');
//         }

//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 email: user.Email,
//                 role: user.VaiTro,
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: process.env.TOKEN_EXPIRES_IN || '1d',
//             }
//         );

//         return { 
//             message: 'Login successful',
//             token,
//             user:{
//                 id: user._id,
//                 name: user.Ten,
//                 email: user.Email,
//                 role: user.VaiTro,
//             }
//          };
//     }
// }

// module.exports = AuthService;