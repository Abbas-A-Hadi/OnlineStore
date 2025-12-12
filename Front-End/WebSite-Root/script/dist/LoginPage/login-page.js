var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { baseApiUrl } from "../Global.js";
import { ApiClient } from "../ApiClient.js";
document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
function OnDocumentContentLoaded() {
    const loginForm = document.getElementById("loginForm");
    const registerStep1 = document.getElementById("registerStep1");
    const registerStep2 = document.getElementById("registerStep2");
    const showRegister = document.getElementById("showRegister");
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("active");
        registerStep1.classList.add("active");
    });
    const showLoginFromReg = document.getElementById("showLoginFromReg");
    showLoginFromReg.addEventListener("click", (e) => {
        e.preventDefault();
        registerStep1.classList.remove("active");
        loginForm.classList.add("active");
    });
    const showLoginFromStep2 = document.getElementById("showLoginFromStep2");
    showLoginFromStep2.addEventListener("click", (e) => {
        e.preventDefault();
        registerStep2.classList.remove("active");
        loginForm.classList.add("active");
    });
    const nextStep = document.getElementById("nextStep");
    nextStep.addEventListener("click", (e) => {
        e.preventDefault();
        const email = document.getElementById("regEmail").value.trim();
        const pass = document.getElementById("regPassword").value.trim();
        const confirm = document.getElementById("regConfirm").value.trim();
        if (!email || !pass || !confirm) {
            alert("Please fill in all fields.");
            return;
        }
        if (pass !== confirm) {
            alert("Passwords do not match!");
            return;
        }
        registerStep1.classList.remove("active");
        registerStep2.classList.add("active");
    });
    registerStep2.addEventListener("submit", (e) => {
        e.preventDefault();
        const birthday = document.getElementById("regBirthday").value.trim();
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(birthday)) {
            alert("Please enter a valid date (dd/mm/yyyy)");
            return;
        }
        alert("Registration complete! 🎉\nYou can now login.");
        registerStep2.classList.remove("active");
        loginForm.classList.add("active");
    });
    loginForm.addEventListener("submit", OnLoginButtonClick);
    const regBirthdayHandler = () => formatDate.bind(regBirthdayInput);
    let regBirthdayInput = document.getElementById("regBirthday");
    regBirthdayInput === null || regBirthdayInput === void 0 ? void 0 : regBirthdayInput.addEventListener("input", regBirthdayHandler);
    document.removeEventListener("DOMContentLoaded", OnDocumentContentLoaded);
}
function OnLoginButtonClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        console.log("Login button clicked!");
        const email = this.querySelector('input[type="email"]')
            .value.trim();
        const password = this.querySelector('input[type="password"]')
            .value.trim();
        let loginRequest = {
            email: email,
            password: password
        };
        try {
            const api = new ApiClient(baseApiUrl);
            const response = yield api.Post('auth/login/', loginRequest);
            api.SetToken(response.accessToken);
            window.location.href = "../../../../.././Front-End/WebSite-Root/documents/home-page.html";
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