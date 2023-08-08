import React, { useCallback, useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Flex } from '@/components/atoms/Flex'
import { ModalProps } from '@/components/atoms/Modal'
import { Tdiv } from '@/components/atoms/Text'
import { Modal } from '@/components/molecules/Modal'
import CalendarContainer from './styled/CalendarContainer'
import StyledCalendar from './styled/StyledCalendar'

export type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

function isDate(value: Value): value is Date {
  return value instanceof Date
}

export const CalendarModal: React.FC<
  ModalProps & {
    selectedDate: Date
    setSelectedDate: (date: Date) => void
  }
> = ({ handleClose, isOpen, selectedDate, setSelectedDate }) => {
  // Updated according to examples here: https://www.npmjs.com/package/react-calendar
  const [value, onChange] = useState<Value>(new Date())
  const _handleClose = useCallback(() => {
    onChange(selectedDate)
    handleClose()
  }, [handleClose, selectedDate])
  return (
    <Modal
      isOpen={isOpen}
      handleClose={_handleClose}
      modalTitle={'Select Date'}
    >
      <Flex col gap={10}>
        <Tdiv secondary textAlign="center">
          Changing:{' '}
          {selectedDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Tdiv>
        {isOpen && (
          <CalendarContainer>
            <StyledCalendar
              calendarType="US"
              value={value}
              onChange={onChange}
            />
          </CalendarContainer>
        )}
        <Button
          big={
            value && selectedDate.toDateString() != value.toString()
              ? true
              : false
          }
          onClick={() => {
            if (isDate(value)) {
              setSelectedDate(value)
              handleClose()
            } else {
              throw new Error('Invalid date')
            }
          }}
          disabled={!value || selectedDate.toDateString() == value.toString()}
        >
          Confirm{' '}
          {isDate(value) && selectedDate.toDateString() == value.toString()
            ? 'New Date'
            : value
            ? value.toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Invalid Date'}
        </Button>
      </Flex>
    </Modal>
  )
}
