const express = require('express')
const { requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getCodeBlocks, getCodeBlockById, addCodeBlock, updateCodeBlock, removeCodeBlock } = require('./code-block.controller')
const { log } = require('../../middlewares/logger.middleware')

const router = express.Router()

router.get('/', log, getCodeBlocks)
router.get('/:id', getCodeBlockById)
router.post('/', requireAdmin, addCodeBlock)
router.put('/:id', updateCodeBlock)
router.delete('/:id', requireAdmin, removeCodeBlock)

module.exports = router