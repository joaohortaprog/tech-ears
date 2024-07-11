import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import ProdutoForm from 'src/components/Produto/ProdutoForm'

const CREATE_PRODUTO_MUTATION = gql`
  mutation CreateProdutoMutation($input: CreateProdutoInput!) {
    createProduto(input: $input) {
      id
    }
  }
`

const NewProduto = () => {
  const [createProduto, { loading, error }] = useMutation(
    CREATE_PRODUTO_MUTATION,
    {
      onCompleted: () => {
        toast.success('Produto created')
        navigate(routes.produtos())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createProduto({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Produto</h2>
      </header>
      <div className="rw-segment-main">
        <ProdutoForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewProduto
