export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    cpf: String
    rg: String
    passwd: String
    ultimoAcesso: DateTime
    foto: String
    cabecalhoBase64: String
  }

  input FiltroUser {
    campoDePesquisa: String!
  }

  type Query {
    pesquisaDeUsersPorFiltro(filtro: FiltroUser): [User!]! @requireAuth
    pesquisaDeUserPorEmail(email: String): User! @skipAuth
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    passwd: String
    name: String
    cpf: String
    rg: String
    foto: String
    cabecalhoBase64: String
  }

  input UpdateUserInput {
    email: String
    name: String
    cpf: String
    passwd: String
    rg: String
    foto: String
    cabecalhoBase64: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
