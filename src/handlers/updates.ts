import prisma from '../db'

export async function getOneUpdate(req, res) {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id
		}
	})

	res.json({ data: update })
}

export async function getUpdates(res, req) {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id
		},
		include: {
			updates: true
		}
	})

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates]
	}, [])

	res.json({ data: updates })
}

export async function createUpdate(req, res) {
	const product = await prisma.product.findUnique({
		where: {
			id: req.body.productId
		}
	})

	if (!product) {
		// does not belong to user
		return res.json({ message: 'nope' })
	}

	const update = await prisma.update.create({
		data: {
			title: req.body.title,
			body: req.body.body,
			product: { connect: { id: product.id } }
		}
	})

	res.json({ data: update })
}

export async function updateUpdate(req, res) {
	const update = await prisma.update.findFirst({
		where: {
			id: req.params.id,
			product: {
				belongsToId: req.user.id
			}
		}
	})

	if (!update) {
		return res
			.status(404)
			.json({ message: 'Update not found or access denied' })
	}

	const upatedUpdate = await prisma.update.update({
		where: {
			id: req.params.id
		},
		data: req.body
	})

	res.json({ data: upatedUpdate })
}

export async function deleteUpdate(req, res) {
	const update = await prisma.update.findFirst({
		where: {
			id: req.params.id,
			product: {
				belongsToId: req.user.id
			}
		}
	})

	if (!update) {
		return res.status(404).json({
			message: 'Update not found or access denied'
		})
	}

	// Proceed with deletion since we've verified ownership
	const deleted = await prisma.update.delete({
		where: {
			id: req.params.id
		}
	})

	res.json({ data: deleted })
}
