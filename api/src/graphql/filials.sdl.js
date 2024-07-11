export const schema = gql`
  type Filial {
    id: Int!
    matricula: String!
    nome: String!
    coordenadorId: Int!
    geoX: String!
    geoY: String!
    User: User!
  }

  type Query {
    filials: [Filial!]! @requireAuth
    filial(id: Int!): Filial @requireAuth
  }

  input CreateFilialInput {
    matricula: String!
    nome: String!
    coordenadorId: Int!
    geoX: String!
    geoY: String!
  }

  input UpdateFilialInput {
    matricula: String
    nome: String
    coordenadorId: Int
    geoX: String
    geoY: String
  }

  type Mutation {
    createFilial(input: CreateFilialInput!): Filial! @requireAuth
    updateFilial(id: Int!, input: UpdateFilialInput!): Filial! @requireAuth
    deleteFilial(id: Int!): Filial! @requireAuth
  }
`
