import {baseApiUrl} from "../Global.js";
import type {LoginByEmailAndPasswordRequest} from "../DataTypes/Users/LoginByEmailAndPasswordRequest.js";
import type {TokenDto} from "../DataTypes/Users/TokenDto.js";
import {ApiClient} from "../ApiClient.js";
import type {RegisterUserRequest} from "../DataTypes/Users/RegisterUserRequest";

const registerUserRequest: RegisterUserRequest = {};
let loginForm: HTMLFormElement;
let registerStep1: HTMLFormElement;
let registerStep2: HTMLFormElement;

document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);

function OnDocumentContentLoaded() {
    loginForm = <HTMLFormElement> document.getElementById("loginForm");
    registerStep1 = <HTMLFormElement> document.getElementById("registerStep1");
    registerStep2 = <HTMLFormElement> document.getElementById("registerStep2");

    const showRegister = <HTMLParagraphElement> document.getElementById("showRegister");
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("active");
        registerStep1.classList.add("active");
    });

    const showLoginFromReg = <HTMLParagraphElement> document.getElementById("showLoginFromReg");
    showLoginFromReg.addEventListener("click", (e) => {
        e.preventDefault();
        registerStep1.classList.remove("active");
        loginForm.classList.add("active");
    });

    const showLoginFromStep2 = <HTMLParagraphElement> document.getElementById("showLoginFromStep2");
    showLoginFromStep2.addEventListener("click", (e) => {
        e.preventDefault();
        registerStep2.classList.remove("active");
        loginForm.classList.add("active");
    });

    const nextStep = <HTMLButtonElement> document.getElementById("nextStep");
    
    
    nextStep.addEventListener("click", OnNextStepButtonInRegisterFormClick);
    

    registerStep2.addEventListener("submit", OnSubmitRegistrationFormClick);
    

    loginForm.addEventListener("submit", OnLoginButtonClick);

    
    const regBirthdayHandler= () => formatDate.bind(regBirthdayInput);
    let regBirthdayInput = <HTMLInputElement> document.getElementById("regBirthday");
    regBirthdayInput?.addEventListener("input", regBirthdayHandler);
    
    
    document.removeEventListener("DOMContentLoaded", OnDocumentContentLoaded);
}

async function OnLoginButtonClick(this: HTMLFormElement, e: Event) {
    e.preventDefault();
    
    const email = (<HTMLInputElement> this.querySelector('input[type="email"]'))
        .value.trim();

    const password = (<HTMLInputElement> this.querySelector('input[type="password"]'))
        .value.trim();
    
    let loginRequest: LoginByEmailAndPasswordRequest = {
        email: email, 
        password: password
    };
    
    try {
        const api = new ApiClient(baseApiUrl);
        
        const response = await api.Post<TokenDto>('auth/login/', loginRequest);
        
        api.SetToken(response.accessToken);
        
        window.location.href = "../../../../.././Front-End/WebSite-Root/documents/home-page.html";
    }
    catch (error) {
        alert(error);
    }
}

async function OnNextStepButtonInRegisterFormClick(this: HTMLFormElement, e: Event) {
    e.preventDefault();
    
    const email = (<HTMLInputElement> document.getElementById("regEmail"))
        .value.trim();
    const password = (<HTMLInputElement> document.getElementById("regPassword"))
        .value.trim();
    const confirmPassword = (<HTMLInputElement> document.getElementById("regConfirm"))
        .value.trim();
    
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    }

    registerUserRequest.email = email;
    registerUserRequest.password = password;
    
    registerStep1.classList.remove("active");
    registerStep2.classList.add("active");
}

async function OnSubmitRegistrationFormClick(this: HTMLFormElement, e: Event) {
    e.preventDefault();
    
    const birthdayInputElm = <HTMLInputElement> document.getElementById("regBirthday");
    const regex: RegExp = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regex.test(birthdayInputElm.value.trim())) {
        birthdayInputElm.focus();
        alert("Please enter a valid date (dd/mm/yyyy)");
        return;
    }
    
    
    registerUserRequest.dateOfBirth = birthdayInputElm.value.trim();

    
    registerStep2.classList.remove("active");
    loginForm.classList.add("active");
}


function formatDate(input: HTMLInputElement) : void {
    let value: string = input.value.replace(/\D/g, "");

    if (value.length >= 5)
        input.value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    else if (value.length >= 3)
        input.value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    else input.value = value;
}
