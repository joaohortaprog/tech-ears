import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_PRODUTO_MUTATION = gql`
  mutation DeleteProdutoMutation($id: Int!) {
    deleteProduto(id: $id) {
      id
    }
  }
`

const Produto = ({ produto }) => {
  const [deleteProduto] = useMutation(DELETE_PRODUTO_MUTATION, {
    onCompleted: () => {
      toast.success('Produto deleted')
      navigate(routes.produtos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete produto ' + id + '?')) {
      deleteProduto({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Produto {produto.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{produto.id}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{produto.nome}</td>
            </tr>
            <tr>
              <th>Valor</th>
              <td>{produto.valor}</td>
            </tr>
            <tr>
              <th>Codigo</th>
              <td>{produto.codigo}</td>
            </tr>
            <tr>
              <th>Data registro</th>
              <td>{timeTag(produto.dataRegistro)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editProduto({ id: produto.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(produto.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Produto
