import prisma from '../db'

// Get All
export async function getProducts(req, res) {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		include: {
			products: true
		}
	})

	res.json({ data: user.products })
}

// Get One
export async function getOneProduct(req, res) {
	const id = req.params.id

	const product = await prisma.product.findFirst({
		where: {
			id,
			belongsToId: req.user.id
		}
	})

	res.json({ data: product })
}

// Create a product
export async function createProduct(req, res, next) {
	try {
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				belongsToId: req.user.id
			}
		})

		res.json({ data: product })
	} catch (error) {
		next(error)
	}
}

// Update a producr
export async function updateProduct(req, res) {
	const updated = await prisma.product.update({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		},
		data: {
			name: req.body.name
		}
	})

	res.json({ data: updated })
}

// Delete a product
export async function deleteProduct(req, res) {
	const deleted = await prisma.product.delete({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		}
	})

	res.json({ data: deleted })
}
