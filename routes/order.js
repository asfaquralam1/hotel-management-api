const express = require('express')
const Order = require('../models/order')
const router = new express.Router


router.post('/add-order', async (req, res) => {
    const order = new Order(req.body)
    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get ('/order-list', async(req, res)=>{
    try {
        const order = await Order.find({})
        res.status(200).send(order)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/get-single-order/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const order = await Order.findById(_id)
        if (!order) {
            return res.status(404).send()
        }
        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/update-order/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['name','email','roomType','price','status']
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'invalid update!' })
    }
    try {
        const order = await Order.findById(req.params.id)
        updates.forEach((update) => order[update] = req.body[update])
        await order.save()


        if (!order) {
            return res.status(404).send()
        }
        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/delete-order/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if (!order) {
            return res.status(404).send()
        }
        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router