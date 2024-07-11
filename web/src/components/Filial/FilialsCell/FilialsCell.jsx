import { Link, routes } from '@redwoodjs/router'

import Filials from 'src/components/Filial/Filials'

export const QUERY = gql`
  query FindFilials {
    filials {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No filials yet. '}
      <Link to={routes.newFilial()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ filials }) => {
  return <Filials filials={filials} />
}
