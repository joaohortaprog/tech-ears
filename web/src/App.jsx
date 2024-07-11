import { Home } from '@mui/icons-material'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Observador from './components/RedwoodUnmanagedComponents/Observador/Observador'
import client from './lib/clienteApollo'
const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider graphQLClientConfig={client}>
        <Observador></Observador>
        <Routes />
      </RedwoodApolloProvider>
      {localStorage.getItem('token') && (
        <div onClick={() => navigate(routes.home())} id="botaoPaginaInicial">
          <span>
            <Home></Home>
          </span>
        </div>
      )}
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
