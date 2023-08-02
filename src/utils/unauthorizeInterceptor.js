import Toastify from 'toastify-js';

export default function UnauthorizedInterceptor(callback) {
  return async (error) => {
    if (error.response && error.response.status === 401) {
      //DISPLAY TOAST
      const message = error.message;
      Toastify({
        duration: 3000,
        text: message,
        position: "right",
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();

      await new Promise((r) => setTimeout(r, 2500));

      callback()
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          throw error;
        });
    }
    return Promise.reject(error);
  };
}
