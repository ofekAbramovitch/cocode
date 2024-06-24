const express = require('express')
const { getCodeBlocks, getCodeBlockById, addCodeBlock, updateCodeBlock, removeCodeBlock } = require('./code-block.controller')
const { log } = require('../../middlewares/logger.middleware')

const router = express.Router()

router.get('/', log, getCodeBlocks)
router.get('/:id', getCodeBlockById)
router.post('/', addCodeBlock)
router.put('/:id', updateCodeBlock)
router.delete('/:id', removeCodeBlock)

module.exports = router