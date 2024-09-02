// validations.js
export const validateForm = (name, email, password) => {
    let formErrors = {};
  
    if (!name) {
      formErrors.name = 'El nombre es obligatorio';
    }
    if (!email) {
      formErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      formErrors.email = 'Formato de correo electrónico inválido';
    }
    if (!password) {
      formErrors.password = 'La contraseña es obligatoria';
    }
  
    return formErrors;
  };

  export const validateLogin = ( email, password, invalid) => {
    let formErrors = {};
  
    if (!email) {
      formErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      formErrors.email = 'Formato de correo electrónico inválido';
    }
    if (!password) {
      formErrors.password = 'La contraseña es obligatoria';
    }
    return formErrors;
  };
  