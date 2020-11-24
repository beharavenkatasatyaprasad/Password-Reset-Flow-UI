const token = window.localStorage.getItem("user_token");

login();

function login() {
  if (!token) {
    custom_alert("warning", "UnAuthorized Login!!!");
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 2000);
  } else {
    custom_alert("success", "Login Successful!");
  }
}

function logout() {
  window.localStorage.removeItem("user_token");
  custom_alert("warning", "logging out!");
  setTimeout(() => (window.location.href = "./index.html"), 2000);
}