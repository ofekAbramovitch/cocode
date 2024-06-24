import { useEffect } from "react"
import { useSelector } from "react-redux"
import CodeBlockList from "../cmps/code-block-list"
import { loadCodeBlocks } from "../store/code/code.actions"
import hero from '../assets/imgs/animation.mp4'
import CircularProgress from '@mui/material/CircularProgress';


export default function LobbyPage() {
    const codeBlocks = useSelector(storeState => storeState.codeModule.codeBlocks)

    useEffect(() => {
        loadCodeBlocks()
    }, [])

    if (!codeBlocks || !codeBlocks.length) return (<CircularProgress className="loader" color="secondary" />)
    return (
        <section className="lobby-page main-layout">
            <div className="hero-container full main-layout">
                <video className="full" autoPlay muted loop playsInline>
                    <source src={hero} type="video/mp4" />
                </video>
                <h1 className="hero-title">Make Your Software <br /> Vision a Reality</h1>
            </div>
            <div className="code-blocks full main-layout">
                <h1 className="title">Choose <span>{`{code block}`}</span></h1>
                <CodeBlockList codeBlocks={codeBlocks} />
            </div>
        </section>
    )
}