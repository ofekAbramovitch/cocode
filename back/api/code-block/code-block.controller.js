const codeBlockService = require('./code-block.service.js')
const logger = require('../../services/logger.service.js')

async function getCodeBlocks(req, res) {
    try {
        logger.debug('Fetching code blocks')
        const filterBy = {
            title: req.body.title || ''
        }
        const codeBlocks = await codeBlockService.query(filterBy)
        res.json(codeBlocks)
    } catch (err) {
        logger.error('Failed to get code blocks', err)
        res.status(500).send({ err: 'Failed to get code blocks' })
    }
}

async function getCodeBlockById(req, res) {
    try {
        const codeBlockId = req.params.id
        const codeBlock = await codeBlockService.getById(codeBlockId)
        res.json(codeBlock)
    } catch (err) {
        logger.error('Failed to get code block', err)
        res.status(500).send({ err: 'Failed to get code block' })
    }
}

async function addCodeBlock(req, res) {
    try {
        const codeBlock = req.body
        const addedCodeBlock = await codeBlockService.add(codeBlock)
        res.json(addedCodeBlock)
    } catch (err) {
        logger.error('Failed to add code block', err)
        res.status(500).send({ err: 'Failed to add code block' })
    }
}

async function updateCodeBlock(req, res) {
    try {
        const codeBlock = req.body
        const updadtedCodeBlock = await codeBlockService.update(codeBlock)
        res.json(updadtedCodeBlock)
    } catch (err) {
        logger.error('Failed to update code block', err)
        res.status(500).send({ err: 'Failed to update code block' })
    }
}

async function removeCodeBlock(req, res) {
    try {
        const codeBlockId = req.params.id
        const removedId = await codeBlockService.remove(codeBlockId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove code block', err)
        res.status(500).send({ err: 'Failed to remove code block' })
    }
}

module.exports = {
    getCodeBlocks,
    getCodeBlockById,
    addCodeBlock,
    updateCodeBlock,
    removeCodeBlock,
}