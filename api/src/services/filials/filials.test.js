import {
  filials,
  filial,
  createFilial,
  updateFilial,
  deleteFilial,
} from './filials'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('filials', () => {
  scenario('returns all filials', async (scenario) => {
    const result = await filials()

    expect(result.length).toEqual(Object.keys(scenario.filial).length)
  })

  scenario('returns a single filial', async (scenario) => {
    const result = await filial({ id: scenario.filial.one.id })

    expect(result).toEqual(scenario.filial.one)
  })

  scenario('creates a filial', async (scenario) => {
    const result = await createFilial({
      input: {
        matricula: 'String',
        nome: 'String',
        coordenadorId: scenario.filial.two.coordenadorId,
        geoX: 'String',
        geoY: 'String',
      },
    })

    expect(result.matricula).toEqual('String')
    expect(result.nome).toEqual('String')
    expect(result.coordenadorId).toEqual(scenario.filial.two.coordenadorId)
    expect(result.geoX).toEqual('String')
    expect(result.geoY).toEqual('String')
  })

  scenario('updates a filial', async (scenario) => {
    const original = await filial({ id: scenario.filial.one.id })
    const result = await updateFilial({
      id: original.id,
      input: { matricula: 'String2' },
    })

    expect(result.matricula).toEqual('String2')
  })

  scenario('deletes a filial', async (scenario) => {
    const original = await deleteFilial({
      id: scenario.filial.one.id,
    })
    const result = await filial({ id: original.id })

    expect(result).toEqual(null)
  })
})
