import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { useState, useEffect } from 'react'
import customTechearsAxios from 'src/global/customTechEarsAxios'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'

const MapComponent = ({
  centroDoMapa,
  setLocalizacaoDaFilial,
  localizacaoDaFilial,
}) => {
  const [position, setPosition] = useState(null)
  const map = useMap()

  useEffect(() => {
    console.log(centroDoMapa)
    if (centroDoMapa) {
      map.setView(centroDoMapa, 13)
    }
  }, [centroDoMapa, map])

  useEffect(() => {
    console.log(localizacaoDaFilial)
    if (localizacaoDaFilial) {
      setPosition({
        lat: localizacaoDaFilial[0],
        lng: localizacaoDaFilial[1],
      })
    }
  }, [localizacaoDaFilial])

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng)
        setPosition(e.latlng)
        setLocalizacaoDaFilial([e.latlng.lat, e.latlng.lng])
      },
    })
    return null
  }

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {position && <Marker position={position}></Marker>}
    </>
  )
}

const FilialForm = (props) => {
  const [podeExibirMapa, setPodeExibirMapa] = React.useState(false)
  const [usuarios, setUsuarios] = React.useState([])
  const [usuarioSelecionado, setUsuarioSelecionado] = React.useState({})
  const [centroDoMapa, setCentroDoMapa] = useState(null)
  const [localizacaoDaFilial, setLocalizacaoDaFilial] = useState([0, 0])

  const { id } = useParams()

  //CONTROLE DE EVENTOS QUANDO A PAGINA É UM CADASTRO OU EDIÇÃO
  //OBSERVA SE A PÁGINA É DE EDIÇÃO OU CADASTRO
  useEffect(() => {
    //EDIÇÃO
    if (id) {
      console.log(props.filial)
      const filial = props.filial
      const geoX = parseFloat(filial.geoX)
      const geoY = parseFloat(filial.geoY)
      const coordenadorDaFilial = filial.User
      document.getElementById('campoPesquisaDeUsuario').value =
        coordenadorDaFilial.name
      if (geoX && geoY) {
        setCentroDoMapa([geoX, geoY])
        setLocalizacaoDaFilial([geoX, geoY])
      }
    } /*CADASTRO*/ else {
      //FAZ O CÓDIGO DE QUANDO FOR CADASTRO
      pegaLocalizacaoDoUsuarioQuandoForUmNovoCadastro()
    }
  }, [id])

  useEffect(() => {
    if (centroDoMapa) {
      setPodeExibirMapa(true)
    }
  }, [centroDoMapa])

  function pegaLocalizacaoDoUsuarioQuandoForUmNovoCadastro() {
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

  React.useEffect(() => {
    if (id && localizacaoDaFilial) {
      document.getElementById('geoX').value = localizacaoDaFilial[0]
      document.getElementById('geoY').value = localizacaoDaFilial[1]
    }
  }, [localizacaoDaFilial])

  const onSubmit = (data) => {
    console.log(data)
    data.campoDeUsuario = undefined
    data.geoX = localizacaoDaFilial[0].toString()
    data.geoY = localizacaoDaFilial[1].toString()
    data.coordenadorId = usuarioSelecionado.id
    props.onSave(data, props?.filial?.id)
  }

  const aoPesquisarOUsuarioAssociado = async (valor) => {
    const inputDeTextoDePesquisaDeUsuario = valor.target
    const valorDigitadoNoCampoDeTextoDePesquisaDeUsuario =
      inputDeTextoDePesquisaDeUsuario.value

    if (!valorDigitadoNoCampoDeTextoDePesquisaDeUsuario) {
      setUsuarios([])
      return
    }

    const objetoDeConsulta = {
      query: `query buscaDeUsuariosPorFiltro {\n  pesquisaDeUsersPorFiltro(filtro: {campoDePesquisa: "${valorDigitadoNoCampoDeTextoDePesquisaDeUsuario}"}) {\n    id\n    name\n    email\n  }\n}`,
      operationName: 'buscaDeUsuariosPorFiltro',
      extensions: {},
    }

    console.log(objetoDeConsulta)
    try {
      const response = await customTechearsAxios.post(
        '',
        objetoDeConsulta
      )
      const resultadoDaPesquisa = response.data.data.pesquisaDeUsersPorFiltro
      setUsuarios(resultadoDaPesquisa)
    } catch (e) {
      window.alert('Não foi possível realizar a pesquisa de usuarios')
      console.log('ERRO ' + e)
    }
  }

  const aoSelecionarUmUsuario = (usuario) => {
    console.log('usuario selecionado ' + usuario.name)
    setUsuarioSelecionado(usuario)
    setUsuarios([])
    const campoPesquisaDeUsuario = document.getElementById(
      'campoPesquisaDeUsuario'
    )
    campoPesquisaDeUsuario.value = usuario.name
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="matricula"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Matricula
        </Label>

        <TextField
          name="matricula"
          defaultValue={props.filial?.matricula}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="matricula" className="rw-field-error" />

        <Label
          name="nome"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nome
        </Label>

        <TextField
          name="nome"
          defaultValue={props.filial?.nome}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="nome" className="rw-field-error" />

        <Label
          name="coordenadorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Coordenador
        </Label>

        <TextField
          id="campoPesquisaDeUsuario"
          name="campoDeUsuario"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={aoPesquisarOUsuarioAssociado}
        />

        {usuarios?.length > 0 ? (
          <>
            <div className="containerDeListagem">
              {usuarios.map((usuario) => (
                <>
                  <div onClick={() => aoSelecionarUmUsuario(usuario)}>
                    <AddIcon></AddIcon>
                    {`${usuario.name} - ${usuario.email}`}
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}

        <Label
          name="geoX"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Geo X
        </Label>

        <input id="geoX" className="rw-input" readOnly={true} />

        <FieldError name="geoX" className="rw-field-error" />

        <Label
          name="geoY"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Geo Y
        </Label>

        <TextField
          name="geoY"
          defaultValue={localizacaoDaFilial[1]}
          className="rw-input"
          readOnly={true}
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="geoY" className="rw-field-error" />

        {podeExibirMapa && (
          <>
            <MapContainer
              center={centroDoMapa || [51.505, -0.09]}
              zoom={14}
              style={{ height: '800px', width: '1200px' }}
            >
              <MapComponent
                setLocalizacaoDaFilial={setLocalizacaoDaFilial}
                centroDoMapa={centroDoMapa}
                localizacaoDaFilial={localizacaoDaFilial}
              />
            </MapContainer>
          </>
        )}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FilialForm
