import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { codeBlockService } from "../services/code-block.service"
import { SOCKET_EMIT_SEND_CODE, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_MENTOR_JOINED, SOCKET_EVENT_UPDATE_CODE, socketService } from "../services/socket.service"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import correctImg from '../assets/imgs/correct.gif'
import wrongImg from '../assets/imgs/wrong.gif'
import { saveCodeBlock } from "../store/code/code.actions"

export default function CodeBlockPage() {
    const [codeBlock, setCodeBlock] = useState(null)
    const [isMentor, setIsMentor] = useState(false)
    const [isShowSolution, setIsShowSolution] = useState(false)
    const [isShowCorrectPopup, setIsShowCorrectPopup] = useState(false)
    const [isShowWrongPopup, setIsShowWrongPopup] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_UPDATE_CODE, onUpdateCode)
        socketService.on(SOCKET_EVENT_MENTOR_JOINED, () => setIsMentor(true))
    }, [])

    useEffect(() => {
        loadCodeBlock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, codeBlock?.title)

        return () => {
            socketService.emit(SOCKET_EMIT_SET_TOPIC, null)
        }
    }, [codeBlock?.title])

    useEffect(() => {
        if (!codeBlock) return
        checkSolution()
        socketService.emit(SOCKET_EMIT_SEND_CODE, {
            title: codeBlock.title,
            code: codeBlock.code
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeBlock?.code])

    async function loadCodeBlock() {
        const codeBlockId = params.id
        if (!codeBlockId) return
        try {
            const codeBlock = await codeBlockService.getById(codeBlockId)
            setCodeBlock(codeBlock)
        } catch (err) {
            console.log('at CodeBlockPage, loadCodeBlock:', err)
        }
    }

    function onUpdateCode(code) {
        setCodeBlock(prevState => ({ ...prevState, code }))
    }

    function onSaveCodeBlock() {
        try {
            saveCodeBlock({ ...codeBlock })
            navigate(-1)
        } catch (err) {
            console.log('at CodeBlockPage, onSaveCodeBlock:', err)
        }
    }

    function onBack() {
        navigate(-1)
    }

    function checkSolution() {
        if (codeBlock.code.trim() === codeBlock.solution.trim()) showPopup('correct')
    }

    function onCheckSolution() {
        if (!codeBlock) return
        if (codeBlock.code.trim() === codeBlock.solution.trim()) {
            showPopup('correct')
        } else showPopup('wrong')
    }

    function showPopup(imgName) {
        switch (imgName) {
            case 'correct':
                setIsShowCorrectPopup(true)
                setTimeout(() => {
                    setIsShowCorrectPopup(false)
                }, 2000)
                break;
            case 'wrong':
                setIsShowWrongPopup(true)
                setTimeout(() => {
                    setIsShowWrongPopup(false)
                }, 2000)
                break;
            default:
                break;
        }
    }

    function handleChange(value) {
        setCodeBlock(prevState => ({ ...prevState, code: value }))
    }

    return (
        <section className="code-block-page main-layout">
            <div className="container">
                <button className="back-btn" onClick={onBack}>
                    <KeyboardBackspaceIcon className="back-icon" />
                </button>
                <h1 className="title">{codeBlock?.title}</h1>
                {isMentor && <h2 className="is-mentor-title">Mentor Mode(read-only)</h2>}
                <p className="instruction">{codeBlock?.instruction}</p>
                <div className="code-editor-container">
                    <div className="code-btns">
                        <div className="display-btns">
                            <button className={`code-btn ${!isShowSolution ? 'active' : ''}`}
                                onClick={() => setIsShowSolution(false)}>
                                Code
                            </button>
                            <button className={`code-btn ${isShowSolution ? 'active' : ''}`}
                                onClick={() => setIsShowSolution(true)}>
                                Solution
                            </button>
                        </div>
                        <div className="action-btns">
                            <button className="check-btn" onClick={onCheckSolution}>
                                Check
                            </button>
                            <button className="save-btn" onClick={onSaveCodeBlock}>
                                Save
                            </button>
                        </div>
                    </div>
                    {!isShowSolution ? (
                        <CodeMirror
                            className="code-mirror"
                            height="100%"
                            value={codeBlock?.code}
                            extensions={[javascript()]}
                            readOnly={isMentor}
                            editable={!isMentor}
                            theme={vscodeDark}
                            onChange={handleChange}
                        />
                    ) : (
                        <CodeMirror
                            className="code-mirror"
                            height="100%"
                            value={codeBlock?.solution}
                            extensions={[javascript()]}
                            readOnly={true}
                            editable={false}
                            theme={vscodeDark}
                        />
                    )}
                </div>
            </div>
            {isShowCorrectPopup && <img className="popup" src={correctImg} alt="" />}
            {isShowWrongPopup && <img className="popup" src={wrongImg} alt="" />}
        </section>
    )
}