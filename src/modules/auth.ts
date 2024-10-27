import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

export function comparePasswords(password: string, hash: string) {
	return bcrypt.compare(password, hash)
}

export function hashPassword(password: string) {
	return bcrypt.hash(password, 5)
}

export const createJWT = (user: any) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	)
	return token
}

export function protect(req, res, next) {
	const bearer = req.headers.authorization

	if (!bearer) {
		res.status(401);
		res.json({ message: "Not Authorized" })
		return
	}

	const [, token] = bearer.split(" ")
	if (!token) {
		res.status(401)
		res.json({ message: "Not valid token" })
		return
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)
		req.user = user
		next()
		return
	} catch (e) {
		res.status(401);
		res.json({ message: "not valid token" })
		return
	}
}
