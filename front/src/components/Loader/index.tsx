import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Container } from './styles'

interface ILoaderProps {
  height?: string
  width?: string
  color?: string
  ariaLabel?: string
  radius?: string
  visible?: boolean
  wrapperClass?: string
}

function Loader({
  height = '200',
  width = '200',
  color = 'var(--brown-600)',
  ariaLabel = 'tail-spin-loading',
  radius = '1',
  visible = true,
  wrapperClass = 'spin',
}: ILoaderProps) {
  return (
    <Container>
        <TailSpin
        height={height}
        width={width}
        color={color}
        ariaLabel={ariaLabel}
        radius={radius}
        visible={visible}
        wrapperClass={wrapperClass}
        />
    </Container>
  )
}

export { Loader }