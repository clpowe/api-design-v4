import * as user from '../users'

describe('user handler', () => {
	it('should create a new user', async () => {
		const req = {
			body: {
				username: 'test',
				password: 'test'
			}
		}
		const res = {
			json({ token }) {
				expect(token).toBeTruthy()
			}
		}
		const newUser = await user.createNewUser(req, res, () => {})
	})
})
