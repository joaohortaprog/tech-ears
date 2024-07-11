import gql from 'graphql-tag'

import jsonwebtoken from 'jsonwebtoken'

import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { requireAuth as applicationRequireAuth } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated and is associated
  with an optional set of roles.
  """
  directive @requireAuth(roles: [String]) on FIELD_DEFINITION
`

export const decodeToken = (token) => {
  const secretKey = '2fa4a6cff7cb87bf21685f04ee0e508f6dd9a3d08118aa786254e8660ffa3b341407e438bc722f85379a90776b9448b380725ca7323f7d38201ccc246868bb38'; // Certifique-se de definir sua chave secreta no arquivo .env

  try {
    // Verifica e decodifica o token
    const decoded = jsonwebtoken.verify(token, secretKey);
    return decoded;
  } catch (err) {
    // Tratamento de erros
    throw new Error(`Erro ao verificar o token: ${err.message}`);
  }
}

const validate = ({ directiveArgs }) => {
  const tokenASerValidado = context.request.headers.get('token')

  console.log(decodeToken(tokenASerValidado))
  if (!tokenASerValidado) {
    throw new Error('Acesso inválido')
  }

}

const requireAuth = createValidatorDirective(schema, validate)

export default requireAuth
