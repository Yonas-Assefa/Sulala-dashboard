type ModalMethods = {
    showModal: () => void
    close: () => void
}

export const openModal = (modalId: string) => {
    document.getElementById<ModalMethods>(modalId)?.showModal()
}

export const closeModal = (modalId: string) => {
    document.getElementById<ModalMethods>(modalId)?.close()
}