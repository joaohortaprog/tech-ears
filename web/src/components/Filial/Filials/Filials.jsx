import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Filial/FilialsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_FILIAL_MUTATION = gql`
  mutation DeleteFilialMutation($id: Int!) {
    deleteFilial(id: $id) {
      id
    }
  }
`

const FilialsList = ({ filials }) => {
  const [deleteFilial] = useMutation(DELETE_FILIAL_MUTATION, {
    onCompleted: () => {
      toast.success('Filial deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete filial ' + id + '?')) {
      deleteFilial({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Matricula</th>
            <th>Nome</th>
            <th>Coordenador id</th>
            <th>Geo x</th>
            <th>Geo y</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {filials.map((filial) => (
            <tr key={filial.id}>
              <td>{truncate(filial.id)}</td>
              <td>{truncate(filial.matricula)}</td>
              <td>{truncate(filial.nome)}</td>
              <td>{truncate(filial.coordenadorId)}</td>
              <td>{truncate(filial.geoX)}</td>
              <td>{truncate(filial.geoY)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.filial({ id: filial.id })}
                    title={'Show filial ' + filial.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFilial({ id: filial.id })}
                    title={'Edit filial ' + filial.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete filial ' + filial.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(filial.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FilialsList
