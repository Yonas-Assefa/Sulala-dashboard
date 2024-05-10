import { toast } from 'react-toastify';

const pushNotification = (message: string, type?: 'success' | 'error' | 'info' | 'warning') => {
    switch (type) {
        case 'success':
            toast.success(message)
            break
        case 'error':
            toast.error(message)
            break
        case 'info':
            toast.info(message)
            break
        case 'warning':
            toast.warning(message)
            break
        default:
            toast("Hello coders it was easy!")
            break
    }
}

const pushSuccessNotification = (message: string) => {
    pushNotification(message, 'success')
}

const pushErrorNotification = (message: string) => {
    pushNotification(message, 'error')
}

const pushInfoNotification = (message: string) => {
    pushNotification(message, 'info')
}

const pushWarningNotification = (message: string) => {
    pushNotification(message, 'warning')
}

const pushDefaultNotification = (message: string) => {
    pushNotification(message)
}

export { pushSuccessNotification, pushErrorNotification, pushInfoNotification, pushWarningNotification, pushDefaultNotification }
export default pushNotification