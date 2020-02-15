export const config = {
  success(title) {
    return {
      position: 'top-end',
      icon: 'success',
      title,
      showConfirmButton: false,
      timer: 1500
    }
  },
  error: {
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!'
  }
};
