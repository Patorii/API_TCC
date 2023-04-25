import React,{useState} from 'react'
import {Site} from './styles'
import {Header} from './components/Header'
import {Main} from './components/Main'
import {Aside} from './components/Aside'
import {BtnFiltro} from './components/BtnFiltro'
import { GlobalStyle } from './styles/global'


function App() {
  const [aparecer, setAparecer] = useState(false)

  function AparecerFiltro(clicou){
    setAparecer(clicou)
  }

  return (
    <Site aparecerAside={aparecer}>
      <GlobalStyle />
      <Header />
      <BtnFiltro clicou={AparecerFiltro}/>
      {
        aparecer ? <Aside /> : ''
      }
      <Main aparecerAside={aparecer}/>
    </Site>
  )
}

export default App;
