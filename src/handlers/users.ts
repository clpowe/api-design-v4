import prisma from '../db'
import { hashPassword, createJWT, comparePasswords } from '../modules/auth'

export async function createNewUser(req, res, next) {
	const hash = await hashPassword(req.body.password)
	try {
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: hash
			}
		})
		const token = createJWT(user)
		res.json({ token })
	} catch (error) {
		error.type = 'input'
		next(error)
	}
}

export async function signin(req, res) {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username
		}
	})

	const isValid = await comparePasswords(req.body.password, user.password)

	if (!isValid) {
		res.status(401)
		res.json({ message: 'none' })
		return
	}

	const token = createJWT(user)
	res.json({ token })
}
