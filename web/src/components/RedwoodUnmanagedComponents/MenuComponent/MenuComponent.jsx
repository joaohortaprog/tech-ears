import * as React from 'react'

import { Apartment as ApartmentIcon } from '@mui/icons-material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

import { navigate, routes } from '@redwoodjs/router'

const MenuComponent = (props) => {
  const [open, setOpen] = React.useState(true)
  const [menuSelecionado, setMenuSelecionado] = React.useState()

  const handleClick = (valorMenuSelecionado) => {
    console.log('MENU ATIVO AGORA =>' + valorMenuSelecionado)
    setMenuSelecionado(valorMenuSelecionado)
    setOpen(!open)
  }

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Menu
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => handleClick('Produtos')}>
          <ListItemIcon>
            <ShoppingCartIcon></ShoppingCartIcon>
          </ListItemIcon>
          <ListItemText primary="Produtos" />
          {open && menuSelecionado === 'Produtos' ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>

        <Collapse
          in={open && menuSelecionado === 'Produtos'}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText
                onClick={() => navigate(routes.produtos())}
                primary="Listagem"
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cadastro"
                onClick={() => navigate(routes.newProduto())}
              />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleClick('Compras')}>
          <ListItemIcon>
            <MonetizationOnIcon></MonetizationOnIcon>
          </ListItemIcon>
          <ListItemText primary="Compras" />
          {open && menuSelecionado === 'Compras' ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>

        <Collapse
          in={open && menuSelecionado === 'Compras'}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Listagem"
                onClick={() => navigate(routes.compras())}
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cadastro"
                onClick={() => navigate(routes.newCompra())}
              />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleClick('Usuarios')}>
          <ListItemIcon>
            <PersonIcon></PersonIcon>
          </ListItemIcon>

          <ListItemText primary="Usuários" />
          {open && menuSelecionado === 'Usuarios' ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>

        <Collapse
          in={open && menuSelecionado === 'Usuarios'}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText
                onClick={() => navigate(routes.users())}
                primary="Listagem"
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cadastro"
                onClick={() => navigate(routes.newUser())}
              />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleClick('Filiais')}>
          <ListItemIcon>
            <ApartmentIcon></ApartmentIcon>
          </ListItemIcon>

          <ListItemText primary="Filiais" />
          {open && menuSelecionado === 'Filiais' ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>

        <Collapse
          in={open && menuSelecionado === 'Filiais'}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText
                onClick={() => navigate(routes.filials())}
                primary="Listagem"
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cadastro"
                onClick={() => navigate(routes.newFilial())}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  )
}

export default MenuComponent
