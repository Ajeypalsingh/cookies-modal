"use strict";
const overlayWindow = document.querySelector(".overlay");
const cookiesDialog = document.querySelector(".cookies");
const settingDialog = document.querySelector(".select-cookies");
const acceptCookies = document.querySelector(".accept");
const settCookies = document.querySelector(".setting");
const saveCookies = document.querySelector(".save");
const userBrowser = document.querySelector(".browser");
const userOs = document.querySelector(".os");
const screenWidth = document.querySelector(".width");
const screenHeight = document.querySelector(".height");

const showDialog = () => {
  cookiesDialog.classList.remove("hidden");
  overlayWindow.classList.remove("hidden");
};

setTimeout(showDialog, 1000);

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    SameSite: "Lax",
    ...options,
  };

  const keys = Object.keys(options);
  const values = Object.values(options);

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let i = 0; i < keys.length; i++) {
    updatedCookie += `; ${keys[i]}=${values[i]}`;
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const date = new Date();
date.setSeconds(date.getSeconds() + 10);

const userAgent = navigator.userAgent;
const width = window.screen.width;
const height = window.screen.height;

// Getting Operating system
let osInfo;
if (userAgent.indexOf("Win") !== -1) {
  osInfo = "Windows";
} else if (userAgent.indexOf("Mac") !== -1) {
  osInfo = "Macintosh";
} else if (userAgent.indexOf("Linux") !== -1) {
  osInfo = "Linux";
} else if (userAgent.indexOf("iPhone") !== -1) {
  osInfo = "iOS";
} else if (userAgent.indexOf("Android") !== -1) {
  osInfo = "Android";
} else {
  osInfo = "Unknown";
}

// Getting Browser Info
let browserName;
if (userAgent.indexOf("Firefox") !== -1) {
  browserName = "Firefox";
} else if (userAgent.indexOf("Chrome") !== -1) {
  browserName = "Chrome";
} else if (userAgent.indexOf("Safari") !== -1) {
  browserName = "Safari";
} else if (userAgent.indexOf("Opera") !== -1) {
  browserName = "Opera";
} else if (userAgent.indexOf("Edge") !== -1) {
  browserName = "Edge";
} else {
  browserName = "Unknown";
}

acceptCookies.addEventListener("click", () => {
  setCookie("browser", `${browserName}`, { "max-age": 10 });
  setCookie("os", `${osInfo}`, { "max-age": 10 });
  setCookie("width", `${width}`, { "max-age": 10 });
  setCookie("height", `${height}`, { "max-age": 10 });
  console.log(getCookie("browser"));
  console.log(getCookie("os"));
  console.log(getCookie("width"));
  console.log(getCookie("height"));
  cookiesDialog.classList.add("hidden");
  overlayWindow.classList.add("hidden");
});

settCookies.addEventListener("click", () => {
  cookiesDialog.classList.add("hidden");
  settingDialog.classList.remove("hidden");
});

userBrowser.checked = true;
userOs.checked = true;
screenHeight.checked = true;
screenWidth.checked = true;

saveCookies.addEventListener("click", () => {
  if (userBrowser.checked === true) {
    setCookie("browser", browserName, { "max-age": 10 });
    console.log(getCookie("browser"));
  }
  if (userOs.checked === true) {
    setCookie("os", osInfo, { "max-age": 10 });
    console.log(getCookie("os"));
  }
  if (screenWidth.checked === true) {
    setCookie("width", width, { "max-age": 10 });
    console.log(getCookie("width"));
  }
  if (screenHeight.checked === true) {
    setCookie("height", width, { "max-age": 10 });
    console.log(getCookie("height"));
  }

  settingDialog.classList.add("hidden");
  overlayWindow.classList.add("hidden");
});
