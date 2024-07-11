import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:8911/graphql', // Ajuste para a URL do seu endpoint GraphQL
})

const authLink = setContext((_, { headers }) => {
  // Obtenha o token do localStorage
  const token = localStorage.getItem('token')

  // Retorne os headers modificados
  return {
    headers: {
      ...headers,
      token: token ? `${token}` : '',
    },
  }
})

// Combine os links authLink e httpLink
const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
