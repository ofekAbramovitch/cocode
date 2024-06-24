/* eslint-disable react/prop-types */
import CodeBlockPreview from "./code-block-preview"

export default function CodeBlockList({ codeBlocks }) {

    return (
        <ul className="code-block-list">
            {codeBlocks.map(codeBlock => (
                <li key={codeBlock._id}>
                    <CodeBlockPreview codeBlock={codeBlock} />
                </li>
            ))}
        </ul>
    )
}