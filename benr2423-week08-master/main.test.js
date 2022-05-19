const supertest = require('supertest');
const request = supertest('http://localhost:3000');
//require("./main")

describe('Express Route Test', function () {
	//  it('should return hello world', async () => {
	//  	return request.get('/hello')
	//  		.expect(200)
	//  		.expect('Content-Type', /text/)
	//  		.then(res => {
	//  		expect(res.text).toBe('Hello BENR2423');
	//  		});
	//  })

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({username: 'user12', password: "987654" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toBe(
					// {}
					"Login Successfully"
					// _id: expect.any(String),
					// name: expect.any(String),
					// age: expect.any(Number),
					
				);
			});
	});

	it('login failed', async () => {
		return request
		.post('/login')
		.send({username: 'user12', password: "1234" })
		.expect('Content-Type', /text/)
		.expect(401).then(response => {
			expect(response.text).toBe(
					'Invalid username or password'
					// 'Invalid username or password'
					// _id: expect.any(String),
					// name: expect.any(String),
					// age: expect.any(Number),
				
			);
		});
	})

	it('register', async () => {
		return request
		.post('/register')
		.send({username: 'user1adsf', password: "123456" })
		.expect('Content-Type', /text/)
		.expect(200).then(response => {
			expect(response.text).toBe(
					'Register Successfully'
					// 'Register Successfully'
					// _id: expect.any(String),
					// name: expect.any(String),
					// age: expect.any(Number),
			);
		});
	});

	it('register failed', async () => {
		return request
		.post('/register')
		.send({username: 'user12', password: "123456" })
		.expect('Content-Type', /text/)
		.expect(402).then(response => {
			expect(response.text).toBe(
					'Username already exists'
					// 'Username already exists'
					// _id: expect.any(String),
					// name: expect.any(String),
					// age: expect.any(Number),
			);
		});
	})
});