import { db } from 'src/lib/db'

export const compras = () => {
  return db.compra.findMany({
    include: {
      Produto: false,
    },
  })
}

export const compra = async ({ id }) => {
  const retorno = await db.compra.findUnique({
    where: { id },
    include: {
      Produto: true,
      User: true,
    },
  })

  if (retorno.recibo) {
    retorno.recibo = retorno.recibo.toString('base64')
  }
  return retorno
}

export const createCompra = ({ input }) => {
  return db.compra.create({
    data: input,
  })
}

export const updateCompra = ({ id, input }) => {
  return db.compra.update({
    data: input,
    where: { id },
  })
}

export const deleteCompra = ({ id }) => {
  return db.compra.delete({
    where: { id },
  })
}

export const Compra = {
  Produto: (_obj, { root }) => {
    return db.compra.findUnique({ where: { id: root?.id } }).Produto()
  },
}
