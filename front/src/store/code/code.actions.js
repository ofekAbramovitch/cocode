import { codeBlockService } from "../../services/code-block.service"
import { store } from "../store"
import { ADD_CODEBLOCK, REMOVE_CODEBLOCK, SET_CODEBLOCKS, SET_FILTER_BY, UPDATE_CODEBLOCK } from "./code.reducer"

export async function loadCodeBlocks() {
    try {
        const codeBlocks = await codeBlockService.query(store.getState().codeModule.filterBy)
        store.dispatch({ type: SET_CODEBLOCKS, codeBlocks })
    } catch (err) {
        console.log(err)
    }
}

export async function removeCodeBlock(codeBlockId) {
    try {
        await codeBlockService.remove(codeBlockId)
        store.dispatch({ type: REMOVE_CODEBLOCK, codeBlockId })
    } catch (error) {
        console.log("error:", error)
    }
}

export async function saveCodeBlock(codeBlock) {
    const type = (codeBlock._id) ? UPDATE_CODEBLOCK : ADD_CODEBLOCK
    try {
        const newCodeBlock = await codeBlockService.save(codeBlock)
        store.dispatch({ type, codeBlock: newCodeBlock })
    } catch (err) {
        console.error('cant save code block:', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
    store.dispatch(loadCodeBlocks())
}