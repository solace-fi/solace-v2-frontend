import { ButtonAppearanceCss } from '@/components/atoms/Button'
import { BKPT_TABLET_END, BKPT_MOBILE_END } from '@/constants'
import styled from 'styled-components'

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  background-color: ${({ theme }) => theme.backgroundBackdrop};
  margin: auto;
  max-width: 890px;
  height: 330px;
  border-radius: 4px;
  padding: 5px;

  @media screen and (max-width: ${BKPT_MOBILE_END}px) {
    height: 300px;
    width: 100%;
  }

  /* ... */

  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    color: ${({ theme }) => theme.textPrimary};
  }

  button {
    ${ButtonAppearanceCss}

    margin: 4px;
    min-width: 54px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.backgroundInteractive};
    color: ${({ theme }) => theme.textPrimary};

    @media screen and (max-width: ${BKPT_TABLET_END}px) {
      margin: 4px;
      min-width: 40px;
    }

    @media screen and (max-width: ${BKPT_MOBILE_END}px) {
      min-width: 30px;
      margin: 2px;
      border-radius: 0px;
    }
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }

    .react-calendar__tile--range {
      background-color: ${({ theme }) => theme.accentInquiry} !important;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.4;
  }

  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`

export default CalendarContainer
