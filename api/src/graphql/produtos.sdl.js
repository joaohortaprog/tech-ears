export const schema = gql`
  type Produto {
    id: Int!
    nome: String!
    valor: Float!
    codigo: String
    dataRegistro: DateTime
  }
  input FiltroBuscaDeProdutos {
    campoDePesquisa: String!
  }

  type Query {
    pesquisaDeProdutosPorFiltro(filtro: FiltroBuscaDeProdutos!): [Produto!]!
      @requireAuth
    produtos: [Produto!]! @requireAuth
    produto(id: Int!): Produto @requireAuth
  }

  input CreateProdutoInput {
    nome: String!
    valor: Float!
    codigo: String
    dataRegistro: DateTime
  }

  input UpdateProdutoInput {
    nome: String
    valor: Float
    codigo: String
    dataRegistro: DateTime
  }

  type Mutation {
    createProduto(input: CreateProdutoInput!): Produto! @requireAuth
    updateProduto(id: Int!, input: UpdateProdutoInput!): Produto! @requireAuth
    deleteProduto(id: Int!): Produto! @requireAuth
  }
`
