import {GetNewEmptyRegisterUserRequest} from "../DataTypes/Users/RegisterUserRequest.js";
import {Api, CurrentUserObject} from "../Global.js";
import type {LoginByEmailAndPasswordRequest} from "../DataTypes/Users/LoginByEmailAndPasswordRequest.js";
import type {TokenDto} from "../DataTypes/Users/TokenDto.js";
import type {RegisterUserRequest} from "../DataTypes/Users/RegisterUserRequest.js";
import type {RegisterUserResponse} from "../DataTypes/Users/RegisterUserResponse.js";
import {Guid} from "../DataTypes/Guid.js";

const homePagePath: string = "../../../../.././Front-End/WebSite-Root/documents/home-page.html";

const RegisterUserRequest: RegisterUserRequest = GetNewEmptyRegisterUserRequest();
let LoginFormElm: HTMLFormElement;
let RegisterStep1FormElm: HTMLFormElement;
let RegisterStep2FormElm: HTMLFormElement;

document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);


function OnDocumentContentLoaded() {
    LoginFormElm = <HTMLFormElement> document.getElementById("loginForm");
    RegisterStep1FormElm = <HTMLFormElement> document.getElementById("registerStep1");
    RegisterStep2FormElm = <HTMLFormElement> document.getElementById("registerStep2");

    const showRegister = <HTMLParagraphElement> document.getElementById("showRegister");
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        LoginFormElm.classList.remove("active");
        RegisterStep1FormElm.classList.add("active");
    });

    const showLoginFromReg = <HTMLParagraphElement> document.getElementById("showLoginFromReg");
    showLoginFromReg.addEventListener("click", (e) => {
        e.preventDefault();
        RegisterStep1FormElm.classList.remove("active");
        LoginFormElm.classList.add("active");
    });

    const showLoginFromStep2 = <HTMLParagraphElement> document.getElementById("showLoginFromStep2");
    showLoginFromStep2.addEventListener("click", (e) => {
        e.preventDefault();
        RegisterStep2FormElm.classList.remove("active");
        LoginFormElm.classList.add("active");
    });

    const nextStep = <HTMLButtonElement> document.getElementById("nextStep");
    
    
    nextStep.addEventListener("click", OnNextStepButtonInRegisterFormClick);
    

    RegisterStep2FormElm.addEventListener("submit", OnSubmitRegistrationFormClick);
    

    LoginFormElm.addEventListener("submit", OnLoginButtonClick);

    
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
        const response = await Api.Post<TokenDto>('auth/login/', loginRequest);
        
        Api.SetToken(response.accessToken);
        
        CurrentUserObject.Email = email;
        CurrentUserObject.AccessToken = response.accessToken;
        CurrentUserObject.RefreshToken = response.refreshToken;
        
        window.location.href = homePagePath;
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
        return;
    }

    RegisterUserRequest.Email = email;
    RegisterUserRequest.Password = password;
    
    RegisterStep1FormElm.classList.remove("active");
    RegisterStep2FormElm.classList.add("active");
}

async function OnSubmitRegistrationFormClick(this: HTMLFormElement, e: Event) {
    e.preventDefault();
    
    const birthdayInputElm = <HTMLInputElement> document.getElementById("regBirthday");
    
    const dateOfBirthAsDate = birthdayInputElm.valueAsDate;
    
    if (!dateOfBirthAsDate || 
        Object.prototype.toString.call(dateOfBirthAsDate) !== "[object Date]") {
        
        birthdayInputElm.focus();
        alert("Please enter a valid date (dd/mm/yyyy)");
        return;
    }
    
    const firstNameInputElm = <HTMLInputElement> document.getElementById("regFirstName"); 
    const lastNameInputElm = <HTMLInputElement> document.getElementById("regLastName"); 
    
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
        dateOfBirthAsDate?.toISOString().split("T")[0]!;
    
    try {
        const result:RegisterUserResponse = await Api.Post('auth/register', RegisterUserRequest);
        Api.SetToken(result.accessToken);
        
        CurrentUserObject.Id = Guid.Restore(result.userId)!;
        CurrentUserObject.Email = result.email;
        CurrentUserObject.FirstName = result.firstName;
        CurrentUserObject.LastName = result.lastName;
        CurrentUserObject.DateOfBirthAsDateOnlyAsString = result.dateOfBirth;
        CurrentUserObject.AccessToken = result.accessToken;
        CurrentUserObject.RefreshToken = result.refreshToken;
        
        window.location.href = homePagePath;
    }
    catch (error) {
        alert(error);
    }
}


function formatDate(input: HTMLInputElement) : void {
    let value: string = input.value.replace(/\D/g, "");

    if (value.length >= 5)
        input.value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    else if (value.length >= 3)
        input.value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    else input.value = value;
}
