const app = require("./app");
const MongoDB = require("./app/utils/mongodb.util");
const config = require("./app/config/index");

async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database successfully");

        const PORT = config.app.port || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error){
        console.error("Unable to connect to the database:", error);
        process.exit();
    }
}

startServer();