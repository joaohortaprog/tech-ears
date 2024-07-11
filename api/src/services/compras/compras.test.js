import {
  compras,
  compra,
  createCompra,
  updateCompra,
  deleteCompra,
} from './compras'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('compras', () => {
  scenario('returns all compras', async (scenario) => {
    const result = await compras()

    expect(result.length).toEqual(Object.keys(scenario.compra).length)
  })

  scenario('returns a single compra', async (scenario) => {
    const result = await compra({ id: scenario.compra.one.id })

    expect(result).toEqual(scenario.compra.one)
  })

  scenario('creates a compra', async (scenario) => {
    const result = await createCompra({
      input: { codigo: 'String', produtoId: scenario.compra.two.produtoId },
    })

    expect(result.codigo).toEqual('String')
    expect(result.produtoId).toEqual(scenario.compra.two.produtoId)
  })

  scenario('updates a compra', async (scenario) => {
    const original = await compra({ id: scenario.compra.one.id })
    const result = await updateCompra({
      id: original.id,
      input: { codigo: 'String2' },
    })

    expect(result.codigo).toEqual('String2')
  })

  scenario('deletes a compra', async (scenario) => {
    const original = await deleteCompra({
      id: scenario.compra.one.id,
    })
    const result = await compra({ id: original.id })

    expect(result).toEqual(null)
  })
})
