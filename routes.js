const express = require('express')
const router = new express.Router()
const ExpressError = require('./expressError')
const items = require('./fakeDb')

router.get('/', function(req, res){
    res.json({items})
})

router.get('/:itemName', function(req, res) {
    const foundItem = items.find(item => item.itemName === req.params.itemName)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    } else {
        res.json({item: foundItem})
    }
})

router.post('/', function(req, res) {
    const newItem = {itemName: req.body.itemName, price: req.body.price}
    items.push(newItem)
    res.status(201).json({added: newItem})
})

router.patch('/:itemName', function(req, res) {
    const foundItem = items.find(item => item.itemName === req.params.itemName)
    if (foundItem === undefined) {
        throw new ExpressError('Item not found', 404)
    } else {
        foundItem.itemName = req.body.itemName
        foundItem.price = req.body.price
        res.json({item: foundItem})
    }
})

router.delete('/:itemName', function(req, res) {
    const foundItem = items.find(item => item.itemName === req.params.itemName)
    if (items.indexOf(foundItem) === -1) {
        throw new ExpressError("Item not found", 404)
    } else {
        items.splice(items.indexOf(foundItem), 1)
        return res.json({message: "Deleted"})
    }
})

module.exports = router;