import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_FILIAL_MUTATION = gql`
  mutation DeleteFilialMutation($id: Int!) {
    deleteFilial(id: $id) {
      id
    }
  }
`

const Filial = ({ filial }) => {
  const [deleteFilial] = useMutation(DELETE_FILIAL_MUTATION, {
    onCompleted: () => {
      toast.success('Filial deleted')
      navigate(routes.filials())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete filial ' + id + '?')) {
      deleteFilial({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Filial {filial.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{filial.id}</td>
            </tr>
            <tr>
              <th>Matricula</th>
              <td>{filial.matricula}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{filial.nome}</td>
            </tr>
            <tr>
              <th>Coordenador id</th>
              <td>{filial.coordenadorId}</td>
            </tr>
            <tr>
              <th>Geo x</th>
              <td>{filial.geoX}</td>
            </tr>
            <tr>
              <th>Geo y</th>
              <td>{filial.geoY}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFilial({ id: filial.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(filial.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Filial
