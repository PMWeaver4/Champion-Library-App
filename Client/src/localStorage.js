// logged in
export function isLoggedIn() {
  return getEmail() != null && getToken() != null;
}

// set email inside local storage
export function setEmail(email) {
  localStorage.setItem("email", email);
}

// get email from local storage
export function getEmail() {
  return localStorage.getItem("email");
}

// set token in local storage
export function setToken(token) {
  localStorage.setItem("token", token);
}

// get token in local storage
export function getToken() {
  return localStorage.getItem("token");
}

// get first name in local storage
export function getFirstName() {
  return localStorage.getItem("firstName");
}

// set first name in storage
export function setFirstName(firstName) {
  return localStorage.setItem("firstName", firstName);
}

// get last name in local storage
export function getLastName() {
  return localStorage.getItem("lastName");
}

// set last name in local storage
export function setLastName(lastName) {
  return localStorage.setItem("lastName", lastName);
}

// for userid
export function getUserId(){
  return localStorage.getItem("_id");
}

export function setUserId(_id){
  return localStorage.setItem("_id", _id);
}

// function to clear data in storage
export function clearStorage() {
  localStorage.clear();
}
