import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProdutoForm from 'src/components/Produto/ProdutoForm'

export const QUERY = gql`
  query EditProdutoById($id: Int!) {
    produto: produto(id: $id) {
      id
      nome
      valor
      codigo
      dataRegistro
    }
  }
`

const UPDATE_PRODUTO_MUTATION = gql`
  mutation UpdateProdutoMutation($id: Int!, $input: UpdateProdutoInput!) {
    updateProduto(id: $id, input: $input) {
      id
      nome
      valor
      codigo
      dataRegistro
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ produto }) => {
  const [updateProduto, { loading, error }] = useMutation(
    UPDATE_PRODUTO_MUTATION,
    {
      onCompleted: () => {
        toast.success('Produto updated')
        navigate(routes.produtos())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateProduto({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Produto {produto?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProdutoForm
          produto={produto}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
