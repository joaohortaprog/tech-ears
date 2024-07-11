import { Button } from '@mui/material'
import './Auth.css'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import axios from 'axios'

import { set } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import customTechEarsNodeRedAxios from 'src/global/customTechEarsNodeRedAxios'
const Auth = (props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleDigitarEmail(event) {
    setEmail(event.target.value)
  }

  function handleDigitarSenha(event) {
    setPassword(event.target.value)
  }

  async function handleClicarBotaoAcessar() {
    const dadosDeLogin = {
      email: email,
      passwd: password,
    }
    console.log(dadosDeLogin)
    try {
      const respostaServidor = await customTechEarsNodeRedAxios.post(
        '/api/login',
        dadosDeLogin
      )
      localStorage.setItem('idUsuarioLogado', respostaServidor.data.userId)
      localStorage.setItem('token', respostaServidor.data.token)
      navigate(routes.home())
    } catch (e) {
      console.log(e)
      window.alert('Erro ao fazer login ' + e.response.data)
    }
  }
  return (
    <>
      <Card id="cartao-login">
        <div className="containerAccess col-9">
          <Typography
            sx={{ mt: 4, mb: 2, fontSize: '35px' }}
            variant="h3"
            component="div"
          >
            {'Acesso Gestão Tech-ears'}
          </Typography>

          <div id="corpoCartaoLogin">
            <div className="campoLogin">
              <label>E-mail</label>
              <input
                name="email"
                value={email}
                onChange={handleDigitarEmail}
              ></input>
            </div>

            <div className="campoLogin">
              <label>Senha</label>
              <input
                name="senha"
                type="password"
                value={password}
                onChange={handleDigitarSenha}
              ></input>
            </div>

            <Button onClick={handleClicarBotaoAcessar} variant="contained">
              Acessar
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default Auth
