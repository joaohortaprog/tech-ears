import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_COMPRA_MUTATION = gql`
  mutation DeleteCompraMutation($id: Int!) {
    deleteCompra(id: $id) {
      id
    }
  }
`

const Compra = ({ compra }) => {
  const [deleteCompra] = useMutation(DELETE_COMPRA_MUTATION, {
    onCompleted: () => {
      toast.success('Compra deleted')
      navigate(routes.compras())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete compra ' + id + '?')) {
      deleteCompra({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Compra {compra.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{compra.id}</td>
            </tr>
            <tr>
              <th>Codigo</th>
              <td>{compra.codigo}</td>
            </tr>
            <tr>
              <th>Produto id</th>
              <td>{compra.produtoId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCompra({ id: compra.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(compra.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Compra
