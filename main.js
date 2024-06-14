(()=>{"use strict";function e(e){e.addEventListener("click",r),document.addEventListener("keydown",n),e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened")}function t(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",r),document.removeEventListener("keydown",n)}function r(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&t(e.currentTarget)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var o={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"2fcb1210-8092-4410-b188-b75083b8dd39","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var a=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then(c)},u=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then(c)},i=document.querySelector("#card-template").content;function l(e,t,r,n,o){var c=i.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__like-button");if(a.src=e.link,a.alt=e.name,c.setAttribute("id",e._id),c.querySelector(".card__title").textContent=e.name,function(e,t){return e.likes.some((function(e){return e._id===t}))}(e,o)&&u.classList.add("card__like-button_is-active"),p(c,e),o==e.owner._id){var l=c.querySelector(".card__delete-button");l.style.display="block",l.addEventListener("click",t)}return u.addEventListener("click",r),a.addEventListener("click",n),c}function s(t){var r=t.target.closest(".card"),n=document.querySelector(".popup_type_confirm");n.setAttribute("cardId",r.getAttribute("id")),e(n)}function d(e){var t=e.target.closest(".card");(e.target.classList.contains("card__like-button_is-active")?u:a)(t.getAttribute("id")).then((function(r){p(t,r),e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log("Ошибка ".concat(e))}))}function p(e,t){e.querySelector(".card__like-counter").textContent=t.likes.length}function f(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""}function _(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))}function y(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(r){f(e,r,t)}));var n=e.querySelector(t.submitButtonSelector);e.reset(),_(r,n,t)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var v=document.querySelector(".places__list"),h=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),g=document.querySelector(".profile__edit-button"),q=document.querySelector(".popup_type_edit"),L=q.querySelector(".popup__form"),E=L.querySelector(".popup__input_type_name"),C=L.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__add-button"),A=document.querySelector(".popup_type_new-card"),x=A.querySelector(".popup__form"),U=x.querySelector(".popup__input_type_card-name"),w=x.querySelector(".popup__input_type_url"),T=document.querySelector(".popup_type_image"),j=T.querySelector(".popup__image"),I=T.querySelector(".popup__caption"),O=document.querySelector(".popup_type_confirm"),B=O.querySelector(".popup__form"),D=document.querySelector(".profile__avatar-edit-button"),P=document.querySelector(".popup_type_update-avatar"),M=P.querySelector(".popup__form"),N=P.querySelector(".popup__input_type_url"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function H(t){t.target.classList.contains("card__image")&&(j.src=t.target.src,j.alt=t.target.alt,I.textContent=t.target.alt,e(T))}function V(e,t){t.querySelector(".button").textContent=e?"Сохранение...":"Сохранить"}g.addEventListener("click",(function(){e(q),y(L,J),E.value=h.textContent,C.value=b.textContent})),L.addEventListener("submit",(function(e){var r;e.preventDefault(),V(!0,L),(r={name:E.value,about:C.value},fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify(r)}).then(c)).then((function(e){h.textContent=e.name,b.textContent=e.about,t(q)})).catch((function(e){console.log("Ошибка ".concat(e))})).finally((function(){V(!1,L)}))})),k.addEventListener("click",(function(){e(A),y(x,J)})),x.addEventListener("submit",(function(e){var r;e.preventDefault(),V(!0,x),(r={name:U.value,link:w.value},fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify(r)}).then(c)).then((function(e){var r=l(e,s,d,H,e.owner._id);v.prepend(r),x.reset(),t(A)})).catch((function(e){console.log("Ошибка ".concat(e))})).finally((function(){V(!1,x)}))})),B.addEventListener("submit",(function(e){e.preventDefault();var r=e.target.closest(".popup").getAttribute("cardId");(function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then(c)})(r).then((function(){t(O),v.querySelector('[id="'.concat(r,'"]')).remove()})).catch((function(e){console.log("Ошибка ".concat(e))}))})),D.addEventListener("click",(function(){e(P),y(M,J)})),M.addEventListener("submit",(function(e){var r;e.preventDefault(),V(!0,M),(r={avatar:N.value},fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify(r)}).then(c)).then((function(e){M.reset(),t(P),S.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.log("Ошибка ".concat(e))})).finally((function(){V(!1,M)}))})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(c),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(c)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];!function(e){h.textContent=e.name,b.textContent=e.about,S.style.backgroundImage="url(".concat(e.avatar,")")}(o),c.forEach((function(e){var t=l(e,s,d,H,o._id);v.append(t)}))})).catch((function(e){console.log("Ошибка ".concat(e))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);_(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),_(r,n,t)}))}))}(t,e)}))}(J),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")}))})();