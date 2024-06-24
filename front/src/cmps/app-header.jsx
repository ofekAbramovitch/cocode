import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Link } from "react-router-dom"

export default function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <Link to='/' className="logo-container">
                <IntegrationInstructionsIcon className='logo-icon' />
                <h1>CoCode</h1>
            </Link>
        </header>
    )
}