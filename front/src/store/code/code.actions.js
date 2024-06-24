import { codeBlockService } from "../../services/code-block.service"
import { store } from "../store"
import { SET_ALERT_INFO } from "../system/system.reducer"
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
        store.dispatch({
            type: SET_ALERT_INFO,
            alertInfo: { show: true, severity: 'success', msg: 'Code block saved successfully!' }
        })
        const newCodeBlock = await codeBlockService.save(codeBlock)
        store.dispatch({ type, codeBlock: newCodeBlock })
    } catch (err) {
        console.error('cant save code block:', err)
        store.dispatch({
            type: SET_ALERT_INFO,
            alertInfo: { show: true, severity: 'error', msg: 'Failed to save code block.' }
        })
        throw err
    } finally {
        setTimeout(() => store.dispatch({
            type: SET_ALERT_INFO,
            alertInfo: { ...store.getState().systemModule.alertInfo, show: false }
        }), 3000)
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
    store.dispatch(loadCodeBlocks())
}