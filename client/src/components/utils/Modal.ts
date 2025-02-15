export const showModal = (id:string) => {
    (document.getElementById(id) as HTMLFormElement)?.showModal();
  }