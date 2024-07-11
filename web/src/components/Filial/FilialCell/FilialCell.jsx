import Filial from 'src/components/Filial/Filial'

export const QUERY = gql`
  query FindFilialById($id: Int!) {
    filial: filial(id: $id) {
      id
      matricula
      nome
      coordenadorId
      geoX
      geoY
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Filial not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ filial }) => {
  return <Filial filial={filial} />
}
