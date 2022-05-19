const MongoClient = require("mongodb").MongoClient;
const User = require("./user");//calling the function we created in user.js as library

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.shin9.mongodb.net/?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	await User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})


app.post('/login', async (req, res) => {
	console.log(req.body);
	
	const user = await User.login(req.body.username, req.body.password);//variable for storing string passed from login function in user.js

	if (user=="Login Successfully"){
		res.status(200).send("Login Successfully");//response for successful login
	}else{
		res.status(401).send('Invalid username or password');//response for invalid username or password
	}
		
		// res.json({
	// 	_id: '123456',
	// 	name: 'test',
	// 	age: 18,
	// })	
})

app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password);//variable for storing string passed from register function in user.js

	if (user == 'Register Successfully'){
		res.status(200).send('Register Successfully');//response for successful registration
	}else{
		res.status(402).send('Username already exists');//response for duplicate username
	}
		
		// res.json({
		// 	_id: '123456',
		// 	name: 'test',
		// 	age: 18,
		// })
	
	
})

// app.patch('/update', async (req, res) => {

// 	const user=await User.update(req.body.username,req.body.password);
// 	if (user == 'Updated'){
// 		res.status(200).send('Passsword Changed');//response for successful registration
// 	}else{
// 		res.status(401).send('Invalid Authorization');//response for duplicate username
// 	}
// })

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})