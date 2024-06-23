import { httpService } from "./http.service.js"

const BASE_URL = 'codeblock/'

export const codeBlockService = {
    query,
    getById,
    remove,
    save,
    getEmptyCodeBlock,
    getEmptyFilterBy
}

function query(filterBy = getEmptyFilterBy()) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(codeBlockId) {
    return httpService.get(BASE_URL + codeBlockId)
}

function remove(codeBlockId) {
    return httpService.delete(BASE_URL + codeBlockId)
}

function save(codeBlock) {
    if (codeBlock._id) return httpService.put(BASE_URL + codeBlock._id, codeBlock)
    else return httpService.post(BASE_URL, codeBlock)
}

function getEmptyCodeBlock() {
    return {
        title: "",
        instruction: "",
        code: "",
        solution: "",
    }
}

function getEmptyFilterBy() {
    return {
        title: "",
    }
}