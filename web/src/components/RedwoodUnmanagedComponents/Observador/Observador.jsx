import { navigate, routes } from '@redwoodjs/router'

function Observador() {
  React.useEffect(() => {
    setInterval(() => {
      if (
        !localStorage.getItem('token') &&
        window.location.href !== 'http://localhost:8910/'
      ) {
        navigate(routes.authPage())
      }
    }, 500)
  }, [])

  return <></>
}

export default Observador
