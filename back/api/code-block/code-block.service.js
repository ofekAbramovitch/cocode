const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('codeblock')
        var codeBlocks = await collection.find(criteria).sort({ title: 1 }).toArray()
        return codeBlocks
    } catch (err) {
        logger.error('cannot find code blocks', err)
        throw err
    }
}

async function getById(codeBlockId) {
    try {
        const collection = await dbService.getCollection('codeblock')
        const codeBlock = collection.findOne({ _id: ObjectId.createFromHexString(codeBlockId) })
        return codeBlock
    } catch (err) {
        logger.error(`while finding code block ${codeBlockId}`, err)
        throw err
    }
}

async function remove(codeBlockId) {
    try {
        const collection = await dbService.getCollection('codeblock')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(codeBlockId) })
        return codeBlockId
    } catch (err) {
        logger.error(`cannot remove code block ${codeBlockId}`, err)
        throw err
    }
}

async function add(codeBlock) {
    try {
        const collection = await dbService.getCollection('codeblock')
        await collection.insertOne(codeBlock)
        return codeBlock
    } catch (err) {
        logger.error('cannot insert code block', err)
        throw err
    }
}

async function update(codeBlock) {
    try {
        const codeBlockToSave = { ...codeBlock }
        delete codeBlockToSave._id
        const collection = await dbService.getCollection('codeblock')
        await collection.updateOne({ _id: ObjectId.createFromHexString(codeBlock._id) }, { $set: codeBlockToSave })
        return codeBlock
    } catch (err) {
        logger.error(`cannot update code block ${codeBlock._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title) criteria.title = { $regex: filterBy.title, $options: 'i' }
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
