const{ MongoClient } = require("mongodb");
class MongoDB{
    static client = null;;
    static async connect(uri){
        if(!MongoDB.client){
            MongoDB.client = new MongoClient(uri);
            await this.client.connect();
            console.log("MongoDB connected");
        }
        return this.client;
    }
}

module.exports = MongoDB;