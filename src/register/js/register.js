class Register {

  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateOnSubmit();
    this.passwords = [];
    this.userToRegister = {};
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      let error = 0;

      this.fields.forEach((field) => {
        const inputInValidation = document.querySelector(`#${field}`);

        if (self.validateFields(inputInValidation) == false) {
          error++;
        } else {
          this.userToRegister[field] = inputInValidation.value;
        }
      });

      this.passwords = [];

      if (error == 0) {
        // this.form.submit();
        const promiseResponse = fetch('http://localhost:3000/api/v1/auth/register', {
          method: "POST",
          body: JSON.stringify(this.userToRegister),
          headers: {
            "Content-type": "application/json",
          }
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
      }

    });
  }

  validateFields(field) {

    if (field.value.trim() === "") {
      this.setStatus(field, `${field.previousElementSibling.innerText} não pode ser em branco`, "erro");
      return false;
    } else {
      if (field.type == "password") {
        if (field.value.length < 8) {
          this.setStatus(field, `${field.previousElementSibling.innerText} deve ter no mínimo 8 caracteres`, "erro");
          return false;
        } else {
          const password = field.value.trim();
          this.passwords.push(password)
          if (this.passwords.length >= 2) {
            if (this.passwords[0] != this.passwords[1]) {
              this.setStatus(field, `As senhas devem coincidir`, "erro");
              return false;
            } else {
              this.setStatus(field, null, "sucesso");
              return true;
            }
          } else {
            this.setStatus(field, null, "sucesso");
            return true;
          }
        }
      } else if (field.type == "email") {
        const email = field.value.toLowerCase();
        if (!email.includes("@")) {
          this.setStatus(field, `${field.previousElementSibling.innerText} deve possuir o domínio (@) relativo`, "erro");
          return false;
        } else {
          this.setStatus(field, null, "sucesso");
          return true;
        }
      } else {
        this.setStatus(field, null, "sucesso");
        return true;
      }
    }
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector(".error-message");

    if (status == "sucesso") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }

    if (status == "erro") {
      errorMessage.innerText = message;
      field.classList.add("input-error");
    }
  }

}

const form = document.querySelector(".registerForm");
if (form) {
  const fields = ["nameInput", "emailInput", "passwordInput", "repeatPasswordInput"];
  new Register(form, fields);
}