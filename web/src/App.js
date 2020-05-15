import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import  DevItem from './components/DevItem';
import DevForm from './components/DevForm';


//Components: Bloco isolado de HTml, CSS e JS, no qual não interfere na restante da aplicação
//Propriedade: Informações que um componente PAI passa para o componente FILHO
//Estado: Informações mantindas pelos componentes (Lembar : Imutabilidade)


function App() {
  const [ devs, setDevs ] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data)
    }

    loadDevs();
  }, [])

  async function handleAddDev(data) {

    const response = await api.post('/devs',data)

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
         
        </ul>
      </main>
    </div>
  );
}

export default App;
