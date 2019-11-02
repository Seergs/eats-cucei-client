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

export const inputScoreForSellerProduct = () => {
  return new Promise((resolve, reject) => {
    Swal.mixin({
      input: 'select',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: false,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Califica tu producto',
        inputOptions: {
          '0': '0',
          '1': '1',
          '2': '2',
          '3': '3',
          '4': '4',
          '5': '5'
        }
      }, {
        title: 'Califica al vendedor',
        inputOptions: {
          '0': '0',
          '1': '1',
          '2': '2',
          '3': '3',
          '4': '4',
          '5': '5'
        }
      }
    ]).then(result => {
      const scoreProduct = result.value[0];
      const scoreSeller = result.value[1];
      const score = {
        scoreProduct,
        scoreSeller
      }
      resolve(score)
    })
  })
}