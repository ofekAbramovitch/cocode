import { Routes, Route } from 'react-router'
import LobbyPage from './pages/lobby-page'
import AppHeader from './cmps/app-header'
import CodeBlockPage from './pages/code-block-page'


export default function App() {

    return (
        <section className="app main-layout">
            <AppHeader />
            <main className="main-container full">
                <Routes>
                    <Route path='/' element={<LobbyPage />} />
                    <Route path='/codeblock/:id' element={<CodeBlockPage />} />
                </Routes>
            </main>
        </section>
    )
}