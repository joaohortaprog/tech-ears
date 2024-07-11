import { Link, routes } from '@redwoodjs/router'

import Compras from 'src/components/Compra/Compras'

export const QUERY = gql`
  query FindCompras {
    compras {
      id
      codigo
      produtoId
      Produto {
        nome
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No compras yet. '}
      <Link to={routes.newCompra()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ compras }) => {
  return <Compras compras={compras} />
}
