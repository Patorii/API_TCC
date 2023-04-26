import { Container, Text } from './styles'
import React from 'react'
import InputMask from 'react-input-mask'

interface IInputProps {
  label: string
  type: string
  placeholder: string
  name: string
  value?: string
  handleChange?: (input: React.ChangeEvent<HTMLInputElement>) => void
  mask?: string
  error?: boolean
  textArea?: boolean
  pattern?: string
}

const Input = ({
  label,
  type,
  placeholder,
  name,
  value = '',
  mask = '',
  error,
  textArea,
  handleChange,
}: IInputProps) => {
  return (
    <Container textArea={textArea}>
      <Text>{label}</Text>
      <InputMask
        mask={mask}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        defaultValue={value}
        className={error ? 'inputError input' : 'input'}

        
      />
      {error && (
        <>
        <br />
        <span className="error">Corrija o preenchimento do campo {placeholder}!</span>
        </>
      )}
    </Container>
  )
}

export {Input}
