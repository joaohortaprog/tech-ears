export const schema = gql`
  type Compra {
    id: Int!
    codigo: String!
    produtoId: Int!
    Produto: Produto
    userId: Int!
    User: User
    recibo: String
    cabecalhoBase64: String
    dataCompra: DateTime!
  }

  type Query {
    compras: [Compra!]! @requireAuth
    compra(id: Int!): Compra @requireAuth
  }

  input CreateCompraInput {
    codigo: String!
    produtoId: Int!
    userId: Int!
    recibo: String
    cabecalhoBase64: String
    dataCompra: DateTime!
  }

  input UpdateCompraInput {
    codigo: String
    produtoId: Int
    userId: Int
    recibo: String
    cabecalhoBase64: String
    dataCompra: DateTime!
  }

  type Mutation {
    createCompra(input: CreateCompraInput!): Compra! @requireAuth
    updateCompra(id: Int!, input: UpdateCompraInput!): Compra! @requireAuth
    deleteCompra(id: Int!): Compra! @requireAuth
  }
`
