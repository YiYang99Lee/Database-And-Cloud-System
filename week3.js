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

    let Name = []
    let Username = []
    let Password = []
    let Address = []
    //Array to store all the users' data

    for (let i = 0; i < 100; i++) {
        const name = faker.name.findName();
        const username = faker.internet.userName();
        const user_password = faker.internet.password();
        const user_address = faker.address.city();
        Name.push(name);
        Username.push(username);
	    Password.push(user_password);
	    Address.push(user_address);
    }
    
    console.log(Name);
	console.log(Username);
	console.log(Password);
    console.log(Address);

	for(let j=0; j < 100; j++) {
		client.db("database").collection("collection").insertOne({
			Name: Name[j],
            Username: Username[j],
			Password: Password[j],
			Address: Address[j]
		})
	}

    const saltRounds = 10  
    bcrypt.genSalt(saltRounds, function (saltError, salt){
        for(let k = 0; k < 100; k++){
            newpass = Password[k]
            if(saltError){
                throw saltError
            }else{
                bcrypt.hash(newpass, salt, function(hashError, hash){
                    if (hashError){
                        throw hashError
                    }else {
                        client.db("database").collection("collection").updateOne({Name: Name[k]}, {$set: {Password: hash}}).then(result => {
                        console.log(result)});
                    }
                })
            }
        }
    })
});