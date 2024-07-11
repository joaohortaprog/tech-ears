import AddIcon from '@mui/icons-material/Add'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import './CompraForm.css'
import customTechearsAxios from 'src/global/customTechEarsAxios'
const CompraForm = (props) => {
  const [produtos, setProdutos] = React.useState([])
  const [produtoSelecionado, setProdutoSelecionado] = React.useState({})
  const [pdf, setPdf] = React.useState('')
  const [usuarios, setUsuarios] = React.useState([])
  const [usuarioSelecionado, setUsuarioSelecionado] = React.useState({})
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  React.useEffect(() => {
    console.log(props)
    if (props.compra?.Produto) {
      setProdutoSelecionado(props.compra.Produto)
      const campoPesquisaDeProduto = document.getElementById(
        'campoPesquisaDeProduto'
      )
      campoPesquisaDeProduto.value = props.compra.Produto.nome
    }
    if (props.compra?.User) {
      setUsuarioSelecionado(props.compra.User)
      const campoPesquisaDeUsuario = document.getElementById(
        'campoPesquisaDeUsuario'
      )
      campoPesquisaDeUsuario.value = props.compra.User.name
    }
  }, [])

  React.useEffect(() => {
    if (props.compra?.id) {
      if (props.compra?.recibo) {
        setPdf(props.compra?.cabecalhoBase64 + ',' + props.compra?.recibo)
      }
    }
  }, [props])

  const onSubmit = (data) => {
    if (!produtoSelecionado?.id) {
      window.alert('Selecione um produto')
      return
    }

    if (!usuarioSelecionado?.id) {
      window.alert('Selecione um usuário')
      return
    }

    if (pdf) {
      data.recibo = pdf.split(',')[1]
      data.cabecalhoBase64 = pdf.split(',')[0]
    }

    data.produtoId = produtoSelecionado.id
    data.userId = usuarioSelecionado.id
    data.dataCompra = new Date()
    data.campoDePesquisa = undefined
    data.campoDeUsuario = undefined
    console.log(data)
    props.onSave(data, props?.compra?.id)
  }

  const aoPesquisarOProdutoAssociado = async (valor) => {
    const inputDeTextoDePesquisaDeProduto = valor.target
    const valorDigitadoNoCampoDeTextoDePesquisaDeProduto =
      inputDeTextoDePesquisaDeProduto.value

    if (!valorDigitadoNoCampoDeTextoDePesquisaDeProduto) {
      setProdutos([])
      return
    }

    const objetoDeConsulta = {
      query: `query buscaDeProdutosPorFiltro {\n  pesquisaDeProdutosPorFiltro(filtro: {campoDePesquisa: "${valorDigitadoNoCampoDeTextoDePesquisaDeProduto}"}) {\n    id\n    nome\n    codigo\n  }\n}`,
      operationName: 'buscaDeProdutosPorFiltro',
      extensions: {},
    }

    console.log(objetoDeConsulta)
    try {
      const response = await customTechearsAxios.post('', objetoDeConsulta)
      const resultadoDaPesquisa = response.data.data.pesquisaDeProdutosPorFiltro
      setProdutos(resultadoDaPesquisa)
    } catch (e) {
      window.alert('Não foi possível realizar a pesquisa de produtos')
      console.log('ERRO ' + e)
    }
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
      const response = await customTechearsAxios.post('', objetoDeConsulta)
      const resultadoDaPesquisa = response.data.data.pesquisaDeUsersPorFiltro
      setUsuarios(resultadoDaPesquisa)
    } catch (e) {
      window.alert('Não foi possível realizar a pesquisa de usuarios')
      console.log('ERRO ' + e)
    }
  }

  const aoSelecionarUmProduto = (produto) => {
    console.log('produto selecionado ' + produto.nome)
    setProdutoSelecionado(produto)
    setProdutos([])
    const campoPesquisaDeProduto = document.getElementById(
      'campoPesquisaDeProduto'
    )
    campoPesquisaDeProduto.value = produto.nome
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

  const handleOnChangePDF = (event) => {
    console.log(event.target)
    console.log(event.target.files)
    const arquivo = event.target.files[0]
    console.log(arquivo)

    if (arquivo) {
      const reader = new FileReader()
      reader.readAsDataURL(arquivo)

      reader.onload = function (e) {
        const arquivoEmFormaDeTextoBase64 = e.target.result
        console.log(arquivoEmFormaDeTextoBase64)
        setPdf(arquivoEmFormaDeTextoBase64)
      }
    }
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

        {pdf && (
          <div style={{ height: '750px' }}>
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={pdf} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </div>
        )}

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Recibo
        </Label>

        <input
          id="file"
          onChange={handleOnChangePDF}
          accept=".pdf"
          type="file"
        ></input>

        <Label
          name="codigo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Codigo
        </Label>

        <TextField
          name="codigo"
          defaultValue={props.compra?.codigo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="codigo" className="rw-field-error" />
        <Label
          name="produto"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Produto Associado
        </Label>

        <TextField
          id="campoPesquisaDeProduto"
          name="campoDePesquisa"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={aoPesquisarOProdutoAssociado}
        />

        {produtos?.length > 0 ? (
          <>
            <div className="containerDeListagem">
              {produtos.map((produto) => (
                <>
                  <div onClick={() => aoSelecionarUmProduto(produto)}>
                    <AddIcon></AddIcon>
                    {`${produto.codigo} - ${produto.nome}`}
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}

        <Label
          name="usuario"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Usuário da Compra
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

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CompraForm
