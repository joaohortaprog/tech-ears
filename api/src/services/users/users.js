import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const pesquisaDeUserPorEmail = ({ email }) => {
  return db.user.findUnique({
    where: {
      email: email,
    },
  })
}

export const pesquisaDeUsersPorFiltro = ({ filtro }) => {
  return db.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: filtro.campoDePesquisa,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: filtro.campoDePesquisa,
            mode: 'insensitive',
          },
        },
      ],
    },
  })
}

export const user = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  console.log(user)
  if (user.foto) {
    user.foto = user.foto.toString('base64')
  }
  console.log(user)
  return user
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}
