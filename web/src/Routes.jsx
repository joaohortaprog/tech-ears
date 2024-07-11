import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import AuthPage from './pages/RedwoodUnmanagedPages/Auth/AuthPage'
import HomePage from './pages/RedwoodUnmanagedPages/Home/HomePage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Filiais" titleTo="filials" buttonLabel="Nova Filial" buttonTo="newFilial">
        <Route path="/filials/new" page={FilialNewFilialPage} name="newFilial" />
        <Route path="/filials/{id:Int}/edit" page={FilialEditFilialPage} name="editFilial" />
        <Route path="/filials/{id:Int}" page={FilialFilialPage} name="filial" />
        <Route path="/filials" page={FilialFilialsPage} name="filials" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Compras" titleTo="compras" buttonLabel="Nova Compra" buttonTo="newCompra">
        <Route path="/compras/new" page={CompraNewCompraPage} name="newCompra" />
        <Route path="/compras/{id:Int}/edit" page={CompraEditCompraPage} name="editCompra" />
        <Route path="/compras/{id:Int}" page={CompraCompraPage} name="compra" />
        <Route path="/compras" page={CompraComprasPage} name="compras" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Produtos" titleTo="produtos" buttonLabel="Novo Produto" buttonTo="newProduto">
        <Route path="/produtos/new" page={ProdutoNewProdutoPage} name="newProduto" />
        <Route path="/produtos/{id:Int}/edit" page={ProdutoEditProdutoPage} name="editProduto" />
        <Route path="/produtos/{id:Int}" page={ProdutoProdutoPage} name="produto" />
        <Route path="/produtos" page={ProdutoProdutosPage} name="produtos" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="Novo Usuário" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>

      <Set>
        <Route path="/" name="authPage" page={AuthPage}></Route>
        <Route path="/dashboard" name="home" page={HomePage}></Route>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
