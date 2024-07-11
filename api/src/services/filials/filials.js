import { db } from 'src/lib/db'

export const filials = () => {
  return db.filial.findMany()
}

export const filial = ({ id }) => {
  return db.filial.findUnique({
    where: { id },
    include: {
      User: true,
    },
  })
}

export const createFilial = ({ input }) => {
  return db.filial.create({
    data: input,
  })
}

export const updateFilial = ({ id, input }) => {
  return db.filial.update({
    data: input,
    where: { id },
  })
}

export const deleteFilial = ({ id }) => {
  return db.filial.delete({
    where: { id },
  })
}

export const Filial = {
  User: (_obj, { root }) => {
    return db.filial.findUnique({ where: { id: root?.id } }).User()
  },
}
