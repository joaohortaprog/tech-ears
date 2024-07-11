import './Home.css'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { MapContainer } from 'react-leaflet'

import MenuComponent from '../MenuComponent/MenuComponent'
import UltimosAcessosComponent from '../UltimosAcessosComponent/UltimosAcessosComponent'

import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import customTechEarsNodeRedAxios from 'src/global/customTechEarsNodeRedAxios'
import MapComponentFiliais from './mapaFiliais/MapComponentFiliais'
const Home = (props) => {
  const [centroDoMapa, setCentroDoMapa] = useState(null)
  const [podeExibirMapa, setPodeExibirMapa] = React.useState(true)
  const [filiais, setFiliais] = React.useState([])
  useEffect(() => {

    pegaLocalizacaoDoUsuario()
    obterFiliais()
  }, [])

  async function obterFiliais() {
    try {
      const respostaDoServidor = await customTechEarsNodeRedAxios.get(
        '/api/filiais/usuario-logado',
        {
          headers: {
            token: localStorage.getItem('idUsuarioLogado'),
          },
        }
      )
      console.log(respostaDoServidor)
      setFiliais(respostaDoServidor.data)
    } catch (e) {
      console.log('ERRO AO OBTER FILIAIS ' + e)
    }
  }

  function pegaLocalizacaoDoUsuario() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          console.log(position)
          setCentroDoMapa([latitude, longitude])
        },
        (error) => {
          console.error('Erro ao obter a localização: ', error)
          alert('Não foi possível obter sua localização.')
        }
      )
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.')
    }
  }

  return (
    <>
      <Card id="cartao-boas-vindas">
        <div className="containerBemVindo col-9">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
            {'Bem-vindo(a)!'}
          </Typography>

          <MenuComponent></MenuComponent>

          <div>
            {podeExibirMapa && (
              <>
                <MapContainer
                  center={centroDoMapa || [51.505, -0.09]}
                  zoom={14}
                  filiais={filiais}
                  style={{ height: '500px', width: '1300px' }}
                >
                  <MapComponentFiliais
                    filiais={filiais}
                    centroDoMapa={centroDoMapa}
                  />
                </MapContainer>
              </>
            )}
          </div>
        </div>
        <div className="containerUltimosAcessos col-3">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Últimos Acessos
          </Typography>
          <UltimosAcessosComponent></UltimosAcessosComponent>
        </div>
      </Card>
    </>
  )
}

export default Home
