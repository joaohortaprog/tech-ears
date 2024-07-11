import {
  produtos,
  produto,
  createProduto,
  updateProduto,
  deleteProduto,
} from './produtos'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('produtos', () => {
  scenario('returns all produtos', async (scenario) => {
    const result = await produtos()

    expect(result.length).toEqual(Object.keys(scenario.produto).length)
  })

  scenario('returns a single produto', async (scenario) => {
    const result = await produto({ id: scenario.produto.one.id })

    expect(result).toEqual(scenario.produto.one)
  })

  scenario('creates a produto', async () => {
    const result = await createProduto({
      input: { nome: 'String', valor: 6744394.721416005 },
    })

    expect(result.nome).toEqual('String')
    expect(result.valor).toEqual(6744394.721416005)
  })

  scenario('updates a produto', async (scenario) => {
    const original = await produto({ id: scenario.produto.one.id })
    const result = await updateProduto({
      id: original.id,
      input: { nome: 'String2' },
    })

    expect(result.nome).toEqual('String2')
  })

  scenario('deletes a produto', async (scenario) => {
    const original = await deleteProduto({
      id: scenario.produto.one.id,
    })
    const result = await produto({ id: original.id })

    expect(result).toEqual(null)
  })
})
