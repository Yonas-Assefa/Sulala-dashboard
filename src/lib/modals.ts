type ModalMethods = {
  showModal: () => void;
  close: () => void;
};

export const openModal = async (modalId: string, withPromise?: boolean) => {
  document.getElementById<ModalMethods>(modalId)?.showModal();
  if (!withPromise) return;

  const confirmBtn = document.getElementById(modalId + "_confirm");
  const cancelBtn = document.getElementById(modalId + "_cancel");
  return new Promise((resolve, reject) => {
    confirmBtn?.addEventListener("click", () => resolve(true));
    cancelBtn?.addEventListener("click", () => resolve(false));
  });
};

export const closeModal = (modalId: string, withPromise?: boolean) => {
  if (!isModalOpen(modalId)) return;
  if (withPromise) {
    const cancelBtn = document.getElementById(modalId + "_cancel");
    cancelBtn?.click();
  }
  document.getElementById<ModalMethods>(modalId)?.close();
};

export const isModalOpen = (modalId: string) => {
  return document.getElementById(modalId)?.open;
};
