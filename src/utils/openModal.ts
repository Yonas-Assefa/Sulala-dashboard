export const openModal = (modalId: string) => {
    document.getElementById<{ showModal: () => {} }>(modalId)?.showModal()
}