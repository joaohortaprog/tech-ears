import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import FilialForm from 'src/components/Filial/FilialForm'

const CREATE_FILIAL_MUTATION = gql`
  mutation CreateFilialMutation($input: CreateFilialInput!) {
    createFilial(input: $input) {
      id
    }
  }
`

const NewFilial = () => {
  const [createFilial, { loading, error }] = useMutation(
    CREATE_FILIAL_MUTATION,
    {
      onCompleted: () => {
        toast.success('Filial created')
        navigate(routes.filials())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createFilial({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Filial</h2>
      </header>
      <div className="rw-segment-main">
        <FilialForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFilial
