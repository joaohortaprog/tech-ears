import PersonIcon from '@mui/icons-material/Person'

import './UserForm.css'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
const UserForm = (props) => {
  const [fotoPerfil, setFotoDePerfil] = React.useState('')

  React.useEffect(() => {
    if (props.user?.id) {
      console.log(props.user)
      if (props.user.foto && props.user.cabecalhoBase64) {
        setFotoDePerfil(`${props.user.cabecalhoBase64},${props.user.foto}`)
      }
    }
  }, [props])

  const onSubmit = (data) => {
    if (fotoPerfil) {
      const base64 = fotoPerfil
      data.foto = base64.split(',')[1]
      data.cabecalhoBase64 = base64.split(',')[0]
    }

    props.onSave(data, props?.user?.id)
  }

  const handleOnChangeFoto = (event) => {
    console.log(event.target)
    console.log(event.target.files)
    const arquivo = event.target.files[0]
    console.log(arquivo)

    if (arquivo) {
      const reader = new FileReader()
      reader.readAsDataURL(arquivo)

      reader.onload = function (e) {
        const arquivoEmFormaDeTextoBase64 = e.target.result
        setFotoDePerfil(arquivoEmFormaDeTextoBase64)
      }
    }
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Foto de Perfil <PersonIcon></PersonIcon>
        </Label>
        <img
          className="foto-perfil-upload"
          alt="foto de perfil"
          onClick={() => document.getElementById('file').click()}
          src={fotoPerfil ? fotoPerfil : '/user.png'}
        ></img>
        <input
          id="file"
          onChange={handleOnChangeFoto}
          accept=".png, .jpeg, .jpg"
          type="file"
        ></input>
        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          E-mail
        </Label>

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="cpf"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cpf
        </Label>

        <TextField
          name="cpf"
          defaultValue={props.user?.cpf}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="cpf" className="rw-field-error" />

        <Label
          name="rg"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rg
        </Label>

        <TextField
          name="rg"
          defaultValue={props.user?.rg}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="rg" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
