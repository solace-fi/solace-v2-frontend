import Calendar from 'react-calendar'
import styled, { css } from 'styled-components'

const StyledCalendar = styled(Calendar)`
  ${({ theme }) => {
    return css`
      .react-calendar {
        background-color: ${theme.backgroundInteractive};
      }
    `
  }}
`

export default StyledCalendar
