const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("senha");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginStatus = document.getElementById("login-status");
const loginButton = document.getElementById("login-button");
const form = document.getElementById("login-form");

emailInput.addEventListener("input", () => emailError.textContent = "");

passwordInput.addEventListener("input", () => passwordError.textContent = "");

function validateInput(input, errorTextField, errorMessage) {
    if (!input) {
        errorTextField.textContent = errorMessage;
        return false;
    }
    return true;
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    loginStatus.textContent = "";
    loginStatus.style.color = "white";
    emailError.textContent = "";
    passwordError.textContent = "";

    const email = emailInput.value.trim();
    const validEmail = validateInput(email, emailError, "Por favor, digite o seu email no campo acima.");

    const password = passwordInput.value.trim();
    const validPassword = validateInput(password, passwordError, "Por favor, digite a sua senha no campo acima.");

    if (!validEmail || !validPassword) {
        return;
    }

    const usuario = {
        "email": email,
        "senha": password
    };

    try {
        loginButton.disabled = true;
        loginStatus.textContent = "Verificando suas credenciais, por favor aguarde...";

        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
          method: "POST",
          body: JSON.stringify(usuario),
          headers: {
            "Content-type": "application/json",
          }
        });

        const data = await response.json();

        await sleep(5000); // função para simular artificialmente a resposta demorada da api

        if (response.ok) {
            loginStatus.textContent = "Credenciais verificadas com sucesso! Em breve você será redirecionado(a) para a loja, por favor aguarde...";
            loginStatus.style.color = "green";
            alert(data.token);
            await sleep(2000); // função para simular artificialmente a resposta demorada da api
            window.location.href = "../home/home.html";
        } else {
            loginStatus.textContent = "Email ou senha incorretos.";
            loginStatus.style.color = "red";
        }
    } catch (error) {
        loginStatus.textContent = "Não foi possível contactar o servidor. Tente novamente mais tarde.";
        loginStatus.style.color = "red";
    } finally {
        loginButton.disabled = false;
    }
});

// função para simular artificialmente a resposta demorada da api
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}