import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompraForm from 'src/components/Compra/CompraForm'

export const QUERY = gql`
  query EditCompraById($id: Int!) {
    compra: compra(id: $id) {
      id
      codigo
      produtoId
      recibo
      cabecalhoBase64
      Produto {
        id
        nome
      }
      User {
        name
        email
        id
      }
    }
  }
`

const UPDATE_COMPRA_MUTATION = gql`
  mutation UpdateCompraMutation($id: Int!, $input: UpdateCompraInput!) {
    updateCompra(id: $id, input: $input) {
      id
      codigo
      produtoId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ compra }) => {
  const [updateCompra, { loading, error }] = useMutation(
    UPDATE_COMPRA_MUTATION,
    {
      onCompleted: () => {
        toast.success('Compra updated')
        navigate(routes.compras())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCompra({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Compra {compra?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CompraForm
          compra={compra}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
