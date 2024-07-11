import Produto from 'src/components/Produto/Produto'

export const QUERY = gql`
  query FindProdutoById($id: Int!) {
    produto: produto(id: $id) {
      id
      nome
      valor
      codigo
      dataRegistro
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Produto not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ produto }) => {
  return <Produto produto={produto} />
}
