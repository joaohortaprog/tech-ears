import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ProdutoForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.produto?.id)
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
          name="nome"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nome
        </Label>

        <TextField
          name="nome"
          defaultValue={props.produto?.nome}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="nome" className="rw-field-error" />

        <Label
          name="valor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Valor
        </Label>

        <TextField
          name="valor"
          defaultValue={props.produto?.valor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="valor" className="rw-field-error" />

        <Label
          name="codigo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Codigo
        </Label>

        <TextField
          name="codigo"
          defaultValue={props.produto?.codigo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="codigo" className="rw-field-error" />

        <Label
          name="dataRegistro"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Data registro
        </Label>

        <DatetimeLocalField
          name="dataRegistro"
          defaultValue={formatDatetime(props.produto?.dataRegistro)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="dataRegistro" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProdutoForm
