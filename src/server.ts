import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/users'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => {
	res.status(200)
	res.json({ message: 'hello' })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
	if (err.type === 'auth') {
		res.status(401)
		res.json({ message: 'unauthorized' })
	} else if (err.type === 'input') {
		res.status(400)
		res.json({ message: 'invalid input' })
	} else {
		res.status(500)
		res.json({ message: 'oops thats on us' })
	}
})
export default app