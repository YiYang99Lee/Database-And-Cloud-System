const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.shin9.mongodb.net/?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		await User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {//usertest for new user registration
		const res = await User.register("username1", "123")
		expect(res).toBe('Register Successfully')
	})

	test("Duplicate username", async () => {//usertest for duplicate username
		const res = await User.register("user12", "1234")
		expect(res).toBe("Username already exists")
	})

	test("User login invalid username", async () => {//test for invalid username
		const res = await User.login("user99", "43567")
		expect(res).toBe("Username is incorrect")
	})

	test("User login invalid password", async () => {//test for invalid password
		const res = await User.login("user12", "9876543")
		expect(res).toBe("Password is incorrect") 
	})

	test("User login successfully", async () => {//test for successful login
		const res = await User.login("user12", "987654")
		expect(res).toBe("Login Successfully")
	})

	// test('should run', () => {
	// });
});