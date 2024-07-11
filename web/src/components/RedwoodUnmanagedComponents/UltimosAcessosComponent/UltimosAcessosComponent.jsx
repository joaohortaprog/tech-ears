import * as React from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import axios from 'axios'
import customTechEarsNodeRedAxios from 'src/global/customTechEarsNodeRedAxios'
const UltimosAcessosComponent = (props) => {
  const [usuarios, setUsuarios] = React.useState([])

  async function consultarUltimosAcessos() {
    const apiUltimosAcessosResposta = await customTechEarsNodeRedAxios.get(
      '/api/ultimos-acessos'
    )
    console.log(apiUltimosAcessosResposta.data)
    setUsuarios(apiUltimosAcessosResposta.data)
  }

  function formatDateTime(isoDate) {
    // Converte a data ISO para um objeto Date
    const date = new Date(isoDate)

    // Obtém o dia, mês, ano, horas e minutos
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Os meses começam do zero em JavaScript
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    // Retorna a data no formato dd/mm/yyyy hh:mm
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  React.useEffect(() => {
    consultarUltimosAcessos()
  }, [])

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Divider />

        <List>
          {usuarios.map((usuario) => (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={`${usuario.name} ${formatDateTime(
                      usuario.ultimoAcesso
                    )}`}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Box>
    </>
  )
}

export default UltimosAcessosComponent
