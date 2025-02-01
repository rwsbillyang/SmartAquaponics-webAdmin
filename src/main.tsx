import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'

// import { UseCacheConfig } from '@rwsbillyang/preact-usecache'
// const initConfig = () => {
//     console.log("initConfig...")
//     UseCacheConfig.EnableLog = false
//     //...
//  }
//  initConfig()
 
render(<App />, document.getElementById('app')!)
