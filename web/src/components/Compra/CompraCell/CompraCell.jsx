import Compra from 'src/components/Compra/Compra'

export const QUERY = gql`
  query FindCompraById($id: Int!) {
    compra: compra(id: $id) {
      id
      codigo
      produtoId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Compra not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ compra }) => {
  return <Compra compra={compra} />
}
