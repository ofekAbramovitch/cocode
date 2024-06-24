import { Routes, Route } from 'react-router'
import { useSelector } from 'react-redux'
import LobbyPage from './pages/lobby-page'
import AppHeader from './cmps/app-header'
import CodeBlockPage from './pages/code-block-page'
import { Alert } from '@mui/material'

export default function App() {
    const alertInfo = useSelector(storeState => storeState.systemModule.alertInfo)

    return (
        <>
            <section className="app main-layout">
                <AppHeader />
                <main className="main-container full">
                    <Routes>
                        <Route path='/' element={<LobbyPage />} />
                        <Route path='/codeblock/:id' element={<CodeBlockPage />} />
                    </Routes>
                </main>
            </section>
            {alertInfo.show && (
                <Alert className="alert" severity={alertInfo.severity}>{alertInfo.msg}</Alert>
            )}
        </>
    )
}