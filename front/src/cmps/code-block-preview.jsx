import { Link } from "react-router-dom"

export default function CodeBlockPreview({ codeBlock }) {

    return (
        <Link className="code-block-preview" to={`/codeblock/${codeBlock._id}`}>
            <h2>{codeBlock.title}</h2>
        </Link>
    )
}
