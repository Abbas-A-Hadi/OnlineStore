var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { api, userObject } from "../Global.js";
import { GetNewEmptyRegisterUserRequest } from "../DataTypes/Users/RegisterUserRequest.js";
const RegisterUserRequest = GetNewEmptyRegisterUserRequest();
let LoginFormElm;
let RegisterStep1FormElm;
let RegisterStep2FormElm;
document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
function OnDocumentContentLoaded() {
    LoginFormElm = document.getElementById("loginForm");
    RegisterStep1FormElm = document.getElementById("registerStep1");
    RegisterStep2FormElm = document.getElementById("registerStep2");
    const showRegister = document.getElementById("showRegister");
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        LoginFormElm.classList.remove("active");
        RegisterStep1FormElm.classList.add("active");
    });
    const showLoginFromReg = document.getElementById("showLoginFromReg");
    showLoginFromReg.addEventListener("click", (e) => {
        e.preventDefault();
        RegisterStep1FormElm.classList.remove("active");
        LoginFormElm.classList.add("active");
    });
    const showLoginFromStep2 = document.getElementById("showLoginFromStep2");
    showLoginFromStep2.addEventListener("click", (e) => {
        e.preventDefault();
        RegisterStep2FormElm.classList.remove("active");
        LoginFormElm.classList.add("active");
    });
    const nextStep = document.getElementById("nextStep");
    nextStep.addEventListener("click", OnNextStepButtonInRegisterFormClick);
    RegisterStep2FormElm.addEventListener("submit", OnSubmitRegistrationFormClick);
    LoginFormElm.addEventListener("submit", OnLoginButtonClick);
    const regBirthdayHandler = () => formatDate.bind(regBirthdayInput);
    let regBirthdayInput = document.getElementById("regBirthday");
    regBirthdayInput === null || regBirthdayInput === void 0 ? void 0 : regBirthdayInput.addEventListener("input", regBirthdayHandler);
    document.removeEventListener("DOMContentLoaded", OnDocumentContentLoaded);
}
function OnLoginButtonClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]')
            .value.trim();
        const password = this.querySelector('input[type="password"]')
            .value.trim();
        let loginRequest = {
            email: email,
            password: password
        };
        try {
            const response = yield api.Post('auth/login/', loginRequest);
            api.SetToken(response.AccessToken);
            window.location.href = "../../../../.././Front-End/WebSite-Root/documents/home-page.html";
            console.log(api);
            console.log(response);
            alert();
        }
        catch (error) {
            alert(error);
        }
    });
}
function OnNextStepButtonInRegisterFormClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const email = document.getElementById("regEmail")
            .value.trim();
        const password = document.getElementById("regPassword")
            .value.trim();
        const confirmPassword = document.getElementById("regConfirm")
            .value.trim();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        RegisterUserRequest.Email = email;
        RegisterUserRequest.Password = password;
        RegisterStep1FormElm.classList.remove("active");
        RegisterStep2FormElm.classList.add("active");
    });
}
function OnSubmitRegistrationFormClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const birthdayInputElm = document.getElementById("regBirthday");
        const dateOfBirthAsDate = birthdayInputElm.valueAsDate;
        if (!dateOfBirthAsDate ||
            Object.prototype.toString.call(dateOfBirthAsDate) !== "[object Date]") {
            birthdayInputElm.focus();
            alert("Please enter a valid date (dd/mm/yyyy)");
            return;
        }
        const firstNameInputElm = document.getElementById("regFirstName");
        const lastNameInputElm = document.getElementById("regLastName");
        if (!firstNameInputElm.value.trim()) {
            firstNameInputElm.focus();
            alert("First name is required");
            return;
        }
        if (!lastNameInputElm.value.trim()) {
            lastNameInputElm.focus();
            alert("Last name is required");
            return;
        }
        RegisterUserRequest.FirstName = firstNameInputElm.value.trim();
        RegisterUserRequest.LastName = lastNameInputElm.value.trim();
        RegisterUserRequest.DateOfBirthAsDateOnlyString =
            dateOfBirthAsDate === null || dateOfBirthAsDate === void 0 ? void 0 : dateOfBirthAsDate.toISOString().split("T")[0];
        try {
            console.log(api);
            console.log(RegisterUserRequest);
            userObject.Email = RegisterUserRequest.Email;
            userObject.FirstName = RegisterUserRequest.FirstName;
            userObject.LastName = RegisterUserRequest.LastName;
            userObject.DateOfBirthAsDateOnlyString = RegisterUserRequest.DateOfBirthAsDateOnlyString;
            const result = yield api.Post('auth/register', RegisterUserRequest);
            api.SetToken(result.AccessToken);
            console.log(result);
            console.log(api);
            window.sessionStorage.setItem('accessToken', result.AccessToken);
            window.sessionStorage.setItem('refreshToken', result.RefreshToken);
            alert("Registeration Done.");
            RegisterStep2FormElm.classList.remove("active");
            LoginFormElm.classList.add("active");
        }
        catch (error) {
            alert(error);
        }
    });
}
function formatDate(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length >= 5)
        input.value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    else if (value.length >= 3)
        input.value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    else
        input.value = value;
}
//# sourceMappingURL=login-page.js.map