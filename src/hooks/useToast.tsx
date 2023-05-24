import { AppToast, TransactionToast } from '@/components/molecules/Toast'
import { txError, txSuccess, txWarn } from '@/constants'
import { TransactionCondition, Error } from '@/constants/enums'
import { toast } from 'react-toastify'

export const useToast = () => {
  const makeTxToast = (
    txType: string,
    condition: TransactionCondition,
    toastId?: string,
    txHash?: string,
    errObj?: any
  ) => {
    const _toast = (
      <TransactionToast
        txType={txType}
        condition={condition}
        txHash={txHash}
        errObj={errObj}
      />
    )
    switch (condition) {
      case 'Complete':
        if (toastId) {
          if (toast.isActive(toastId)) {
            toast.update(toastId, {
              render: _toast,
              ...txSuccess,
            })
          } else {
            toast(_toast, {
              toastId,
              ...txSuccess,
            })
          }
        }
        break
      case 'Incomplete':
        if (toastId) {
          if (toast.isActive(toastId)) {
            toast.update(toastId, {
              render: _toast,
              ...txError,
            })
          } else {
            toast(_toast, {
              toastId,
              ...txError,
            })
          }
        }
        break
      case 'Cancelled':
        if (toastId) {
          if (toast.isActive(toastId)) {
            toast.update(toastId, {
              render: _toast,
              ...txWarn,
            })
          } else {
            toast(_toast, {
              toastId,
              ...txWarn,
            })
          }
        }
        break
      case 'Pending':
        if (toastId) {
          toast.loading(_toast, {
            toastId,
            type: toast.TYPE.INFO,
            autoClose: false,
            position: toast.POSITION.BOTTOM_RIGHT,
            closeOnClick: false,
            closeButton: true,
            className: 'info-toast',
            // theme: 'colored' as Theme,
          })
        }
        break
      default:
        toast(_toast, {
          ...txError,
        })
    }
  }

  const makeAppToast = (id: Error, message: string, toastConfig: any) => {
    if (toast.isActive(id)) {
      toast.update(id, {
        render: <AppToast message={message} />,
        ...toastConfig,
      })
    } else {
      toast(<AppToast message={message} />, {
        toastId: id,
        ...toastConfig,
      })
    }
  }

  return { makeTxToast, makeAppToast }
}
