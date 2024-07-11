import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FilialForm from 'src/components/Filial/FilialForm'

export const QUERY = gql`
  query EditFilialById($id: Int!) {
    filial: filial(id: $id) {
      id
      matricula
      nome
      coordenadorId
      geoX
      geoY
      User {
        name
        id
      }
    }
  }
`

const UPDATE_FILIAL_MUTATION = gql`
  mutation UpdateFilialMutation($id: Int!, $input: UpdateFilialInput!) {
    updateFilial(id: $id, input: $input) {
      id
      matricula
      nome
      coordenadorId
      geoX
      geoY
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ filial }) => {
  const [updateFilial, { loading, error }] = useMutation(
    UPDATE_FILIAL_MUTATION,
    {
      onCompleted: () => {
        toast.success('Filial atualizada!')
        window.location.reload()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateFilial({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Filial {filial?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FilialForm
          filial={filial}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
