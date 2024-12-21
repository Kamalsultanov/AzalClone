import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import DataContext from './Context/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DataContext>
                <App />
        </DataContext>
    </BrowserRouter>    
)
