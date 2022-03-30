const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs")
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.shin9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(async err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')

    const detail = []
    
    for (let i = 0; i < 100; i++) {
        const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const password = faker.internet.password();
        const address = faker.address.city();
        detail[i] = []
        detail[i][0] = (name)
        detail[i][1] = (password)
        detail[i][2] = (address)
    }
    
    for(let j=0; j < 100; j++) {
		client.db("Name_list").collection("users").insertOne({
			Name: detail[j][0],
			Password: detail[j][1],
			Address: detail[j][2]
		})
	}

    const saltRounds = 10  
    bcrypt.genSalt(saltRounds, function (saltError, salt){
        for(let k = 0; k < 100; k++){
            newpass = detail[k][1]
            if(saltError){
                throw saltError
            }else{
                bcrypt.hash(newpass, salt, function(hashError, hash){
                    if (hashError){
                        throw hashError
                    }else {
                        client.db("Name_list").collection("users").updateOne({Name: detail[k][0]}, {$set: {Password: hash}}).then(result => {
                        console.log(result)});
                    }
                })
            }
        }
    })
})