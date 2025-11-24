const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../../services/user.service");

class AuthController{
    static async register(req, res){
        try{
            const userService = new UserService(req.app.locals.db);
            const { Email, Password } = req.body;

            const existingUser = await userService.findByEmail(Email);
            if(existingUser){
                return res.status(400).json({ message: "Email already exists" });
            }

            // Hash password
            //  const cleanPassword = Password.trim().replace(/^"|"$/g, '');
            // const hashed = await bcrypt.hash(cleanPassword, 10);
            // req.body.Password = hashed;

            await userService.create(req.body);

            res.status(201).json({ message: "User registered successfully" });
        } catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    static async logout(req, res){
        res.clearCookie("token");
        res.json({ message: "Logged out" });
    }

    //
    static async login(req, res) {
    try {
        const userService = new UserService(req.app.locals.db);
        const { Email, Password } = req.body;
        //console.log("Received login:", Email, Password);

        const user = await userService.findByEmail(Email);
        //console.log("User found:", user);
        
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // const isMatch = await bcrypt.compare(Password, user.Password);
        // console.log("Password from request:", Password);
        // console.log("Password hash in DB:", user.Password);
        // console.log("Password match result:", isMatch);


        // if (!isMatch) {
        //     return res.status(400).json({ message: "Invalid email or password" });
        // }
        

        const token = jwt.sign(
            { id: user._id, role: user.VaiTro },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict"
        });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                Email: user.Email,
                HoVaDem: user.HoVaDem,
                Ten: user.Ten,
                VaiTro: user.VaiTro
            }
        });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = AuthController;
