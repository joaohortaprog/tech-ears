import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Compra/ComprasCell'
import { truncate } from 'src/lib/formatters'

const DELETE_COMPRA_MUTATION = gql`
  mutation DeleteCompraMutation($id: Int!) {
    deleteCompra(id: $id) {
      id
    }
  }
`

const ComprasList = ({ compras }) => {
  const [deleteCompra] = useMutation(DELETE_COMPRA_MUTATION, {
    onCompleted: () => {
      toast.success('Compra deleted')
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
    if (confirm('Are you sure you want to delete compra ' + id + '?')) {
      deleteCompra({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Codigo</th>
            <th>Produto</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id}>
              <td>{truncate(compra.id)}</td>
              <td>{truncate(compra.codigo)}</td>
              <td>{truncate(compra.Produto?.nome)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.compra({ id: compra.id })}
                    title={'Show compra ' + compra.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCompra({ id: compra.id })}
                    title={'Edit compra ' + compra.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete compra ' + compra.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(compra.id)}
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

export default ComprasList
