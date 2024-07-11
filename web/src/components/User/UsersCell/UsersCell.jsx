import { Link, routes } from '@redwoodjs/router'

import Users from 'src/components/User/Users'

export const QUERY = gql`
  query FindUsers {
    users {
      id
      email
      name
      cpf
      rg
    }
  }
`

export const Loading = () => <div>Carregando...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'Sem usuários ainda. '}
      <Link to={routes.newUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ users }) => {
  return <Users users={users} />
}
