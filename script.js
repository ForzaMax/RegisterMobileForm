// кастомная проверка емейла на собаку и популярные виды почт
// реализовать глазики

// пароль макс мин количество символов
// что бы в конфирме было подтверждение пароля

//ЗАДАЧА Реализовать изменение фона при появление модальных окон !!! --- в процессе
//ЗАДАЧА Выход из модального окна по клику на body
//ЗАДАЧА При загрузке DOM стирать значения в инпутах

const logBtnNode = document.querySelector(".button-log");
const regBtnNode = document.querySelector(".button-reg");
const logModalNode = document.querySelector(".modal-login");
const regModalNode = document.querySelector(".modal-register");
const logModalFormNode = document.querySelector("#form-log");
const regModalFormNode = document.querySelector("#form-reg");
const logModalFormInputsNode = Array.from(
  logModalFormNode.querySelectorAll(".form__input")
);
const regModalFormInputsNode = Array.from(
  regModalFormNode.querySelectorAll(".form__input")
);
const logLinkNode = document.querySelector("#log-link");
const regLinkNode = document.querySelector("#reg-link");

const inputs = Array.from(document.querySelectorAll("input"));
const contentBackground = document.querySelector(".content__picture");

const closeBtnNode = Array.from(document.querySelectorAll(".modal__icon"));
const lockPasswordNode = document.querySelectorAll(".form__lock");

document.addEventListener("DOMContentLoaded", () => {
  inputs.forEach((input) => {
    input.value = "";
  });
});

contentBackground.addEventListener("click", () => {
  logModalNode.classList.remove("modal__visible");
  regModalNode.classList.remove("modal__visible");
});

// Появление модальных окон на клик  ==============================================
regBtnNode.addEventListener("click", () => {
  regModalNode.classList.add("modal__visible");

  contentBackground.style.backgroundColor = "rgba(5, 5, 34, 0.50)";
});

logBtnNode.addEventListener("click", () => {
  logModalNode.classList.add("modal__visible");
});

logLinkNode.addEventListener("click", () => {
  regModalNode.classList.remove("modal__visible");
  logModalNode.classList.add("modal__visible");

  inputs.forEach((input) => {
    input.value = "";
  });
});

regLinkNode.addEventListener("click", () => {
  logModalNode.classList.remove("modal__visible");
  regModalNode.classList.add("modal__visible");

  inputs.forEach((input) => {
    input.value = "";
  });
});

// Перебор всех кнопок закрытия модального окна
closeBtnNode.forEach((btn) => {
  btn.addEventListener("click", () => {
    logModalNode.classList.remove("modal__visible");
    regModalNode.classList.remove("modal__visible");
    regModalFormInputsNode.forEach((input) => {
      input.value = "";
    });
  });
});

// Перебор всех кнопок изменения видимости пароля
for (let lockBtn of lockPasswordNode) {
  // Не мешало бы подисправить

  lockBtn.addEventListener("click", () => {
    inputs.forEach((input, index) => {
      if (input.name.includes("password")) {
        if (input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        }
      }
    });
  });
}

// Закрытие модального окна по ESC
document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    logModalNode.classList.remove("modal__visible");
    regModalNode.classList.remove("modal__visible");
    regModalFormInputsNode.forEach((input) => {
      input.value;
    });
  }
});

// САБМИТ И ВАЛИДАЦИЯ ==============================================

// regModalFormInputsNode.forEach((input) => {
//   input.addEventListener("input", () => {
//     validateForm(input);
//   });
// });

// logModalFormInputsNode.forEach((input) => {
//   input.addEventListener("input", () => {
//     validateForm(input);
//   });
// });

const LS_ITEM_KEY = "userData";
let data = JSON.parse(localStorage.getItem(LS_ITEM_KEY, "[]")) || [];

function saveLocalStorage() {
  localStorage.setItem(LS_ITEM_KEY, JSON.stringify(data));
}

regModalFormNode.addEventListener("submit", (e) => {
  if (!validationReg()) {
    e.preventDefault();
  } else {
    saveData();
  }
});

function saveData() {
  let formData = new FormData();

  regModalFormInputsNode.forEach((input) => {
    if (input.name !== "confirm-password") {
      formData.append(input.name, input.value);
    }
  });

  let id = new Date().getTime();
  formData.append("id", id);

  let formDataObject = {};

  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  console.log(formDataObject);
  console.log(formData);
  console.log(data);
  data.push(formDataObject);

  saveLocalStorage();

  formData = new FormData();
  console.log(data);
}

logModalFormNode.addEventListener("submit", (e) => {
  if (!validationLog()) {
    e.preventDefault();
  }
});

function validationLog() {
  let isValid = false;

  const loginArea = logModalFormInputsNode[0];
  const passwordArea = logModalFormInputsNode[1];

  console.log(loginArea.value, passwordArea.value);

  data.forEach((user) => {
    console.log(user.username, user.password);

    if (user.email == loginArea.value && user.password == passwordArea.value) {
      isValid = true;
    }
  });

  if (!isValid) {
    alert(`Логин или пароль введены неверно`);
  }

  // let rememberPass = document.querySelector("#rememberPass");
  // if (rememberPass.checked) {
  //   localStorage.setItem("username", loginArea.value);
  //   localStorage.setItem("password", passwordArea.value);
  // } else {
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("password");
  // }

  console.log(`Общая валидация: ${isValid}`);
  return isValid;
}

console.log(data);

function validationReg() {
  let isValid = true;

  regModalFormInputsNode.forEach((input) => {
    if (!validateForm(input)) {
      isValid = false;
    }
  });

  console.log(`Общая валидация: ${isValid}`);
  return isValid;
}

function validateForm(input) {
  const name = input.name;
  const value = input.value.trim();
  let isValid = true;

  switch (name) {
    case "email":
      if (value.includes("@")) {
        // Проверка email
        isValid = validationEmail(value);
      } else {
        // Проверка username
        if (
          value.length < input.dataset.minLength ||
          value.length > input.dataset.maxLength
        ) {
          console.log(
            `Длина юзернейма должна быть от ${input.dataset.minLength} до ${input.dataset.maxLength} символов`
          );
          isValid = false;
        }
      }
      break;

    case "course":
      // Проверка поля course на минимальную и максимальную длину
      if (
        value.length < input.dataset.minLength ||
        value.length > input.dataset.maxLength
      ) {
        console.log(
          `Название курса должно быть от ${input.dataset.minLength} до ${input.dataset.maxLength} символов`
        );
        isValid = false;
      }
      break;

    case "password":
      isValid = validationPassword(input);
      break;

    case "confirm-password":
      const passwordValue = document.querySelector(
        'input[name="password"]'
      ).value;

      if (value !== passwordValue) {
        console.log(`Пароли не совпадают`);
        isValid = false;
      }
      break;

    default:
      isValid = false;
  }

  if (!isValid) {
    input.classList.add("form__input-error");
    input.classList.remove("form__input-valid");
  } else {
    input.classList.remove("form__input-error");
    input.classList.add("form__input-valid");
  }

  console.log(`Валидация ${name} инпута: ${isValid}`);
  return isValid;
}

// Валидация email ===========================================================
function validationEmail(email) {
  console.log(email);
  if (!email.includes("@")) return false;

  const emailParts = email.toLowerCase().split("@");
  console.log(emailParts);

  if (emailParts.length !== 2) return false; // Проверка на одну @
  if (
    !emailParts[0] ||
    emailParts[0].startsWith(".") ||
    emailParts[0].endsWith(".")
  )
    return false; // Проверка текста до @
  if (
    !emailParts[1] ||
    emailParts[1].startsWith("-") ||
    emailParts[1].endsWith("-")
  )
    return false; // Проверка текста после @

  const domainParts = emailParts[1].split(".");
  console.log(domainParts);

  // Проверка что б был текст перед точкой и после неё
  if (domainParts.length < 2) return false;

  // Проверка длины, что бы не меньше двух символов был текст до и после точки
  if (domainParts.some((part) => part.length < 2)) return false;

  return true;
}

// Валидация пароля ===========================================================
function validationPassword(password) {
  const minLength = password.dataset.minLength;
  const maxLength = password.dataset.maxLength;

  const pass = password.value;

  let hasLowerCase = false;
  let hasNumber = false;

  if (pass.length === 0 || pass.length < minLength || pass.length > maxLength) {
    return false;
  }

  for (let i = 0; i < pass.length; i++) {
    const char = pass[i];

    if (!isNaN(parseInt(char))) {
      hasNumber = true; // Проверка на наличие цифры
    } else if (char === char.toLowerCase()) {
      hasLowerCase = true; // Проверка на наличие нижнего регистра
    }
  }

  return hasLowerCase && hasNumber;
}
