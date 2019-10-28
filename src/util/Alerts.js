import Swal from 'sweetalert2';

export const notifySuccess = (message) => Swal.fire('Genial', message, 'success');

export const notifyError = (message) => Swal.fire('Oops', message, 'error');

export const notifyWarning = (message) => Swal.fire('Oops', message, 'warning');

export const confirmAlert = (message, buttonText) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Estás seguro?',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: buttonText,
    }).then(result => {
      if (result.value) resolve(true)
      else resolve(false);
    })
  })
}