const express = require('express')
const Room = require('../models/room')
const router = new express.Router


router.post('/add-room',async (req, res) => {
    const unique = await Room.find({title: req.body.title})
    if(unique.length){
        return res.status(400).send('title have to be unique')
    }
    const room = new Room(req.body)
    try {
        await room.save()
        res.status(201).send(room)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get ('/room-list', async(req, res)=>{
    try {
        const room = await Room.find({})
        res.status(200).send(room)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/get-single-room/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const room = await Room.findById(_id)
        if (!room) {
            return res.status(404).send()
        }
        res.send(room)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/update-room/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['title','description','price']
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'invalid update!' })
    }
    try {
        const room = await Room.findById(req.params.id)
        updates.forEach((update) => room[update] = req.body[update])
        await room.save()


        if (!room) {
            return res.status(404).send()
        }
        res.send(room)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/delete-room/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id)
        if (!room) {
            return res.status(404).send()
        }
        res.send(room)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router