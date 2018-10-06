import React from 'react'
import ReactDOM from 'react-dom'
import { init } from 'utils/api'
import './styles/index.css'
import './styles/reset.css'
import App from './App'
// import registerServiceWorker from './registerServicesWorker'

init()
ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker()
