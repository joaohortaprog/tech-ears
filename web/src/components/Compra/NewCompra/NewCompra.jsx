import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import CompraForm from 'src/components/Compra/CompraForm'

const CREATE_COMPRA_MUTATION = gql`
  mutation CreateCompraMutation($input: CreateCompraInput!) {
    createCompra(input: $input) {
      id
    }
  }
`

const NewCompra = () => {
  const [createCompra, { loading, error }] = useMutation(
    CREATE_COMPRA_MUTATION,
    {
      onCompleted: () => {
        toast.success('Compra created')
        navigate(routes.compras())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCompra({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Compra</h2>
      </header>
      <div className="rw-segment-main">
        <CompraForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCompra
