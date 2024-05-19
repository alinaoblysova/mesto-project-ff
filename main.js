(()=>{"use strict";var e=document.querySelector(".profile__image"),t=document.querySelector(".places__list"),n=document.querySelector(".profile__edit-button"),o=document.querySelector(".profile__add-button"),r=document.querySelector(".profile__image"),c=Array.from(document.querySelectorAll(".popup")),a=document.querySelector(".popup_type_edit"),u=document.querySelector(".popup_type_new-card"),i=document.querySelector(".popup_type_image"),s=document.querySelector(".popup_type_avatar"),l=document.querySelector(".popup_type_delete"),d=a.querySelector(".popup__button"),p=u.querySelector(".popup__button"),f=s.querySelector(".popup__button"),_=l.querySelector(".popup__button"),m=i.querySelector(".popup__image"),v=i.querySelector(".popup__caption"),y=document.forms.edit_profile,h=document.forms.new_place,b=document.forms.avatar,S=y.elements.name,q=y.elements.description,C=document.querySelector(".profile__title"),E=document.querySelector(".profile__description");function L(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",k)}function g(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",k)}function k(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&g(t)}var x,A={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"12cc5391-ba50-49b8-b813-21aaed4498e6","Content-Type":"application/json"}},U=function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))};function T(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-counter");return a.src=e.link,a.alt=e.name,u.textContent=e.name,d.textContent=e.likes.length,a.addEventListener("click",(function(){return o(a,u)})),e.owner._id===r?i.addEventListener("click",(function(){x=e._id,L(l),_.addEventListener("click",(function(){return t(c)}))})):(i.setAttribute("disabled",!0),i.setAttribute("style","display: none;")),e.likes.some((function(e){return e._id===r}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){x=e._id,n(s,d)})),c}function w(e){_.textContent="Удаление...",function(e){return fetch("".concat(A.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:A.headers}).then((function(e){return U(e)}))}(x).then((function(){e.remove(),g(l)})).catch((function(e){console.log(e)})).finally((function(){_.textContent="Да"}))}function B(e,t){var n=e.classList.contains("card__like-button_is-active")?"DELETE":"PUT";(function(e,t){return fetch("".concat(A.baseUrl,"/cards/likes/").concat(e),{method:t,headers:A.headers}).then((function(e){return U(e)}))})(x,n).then((function(n){e.classList.toggle("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){console.log(e)}))}var P,D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"};function N(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));j(e.querySelector(t.submitButtonSelector),t.inactiveButtonClass),n.forEach((function(n){O(e,n,t.inputErrorClass,t.errorClass)}))}function O(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.textContent="",r.classList.remove(o)}function j(e,t){e.setAttribute("disabled",!0),e.classList.add(t)}function J(e,t){m.src=e.src,v.textContent=t.textContent,L(i)}function M(e,t){t.textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(A.baseUrl,"/users/me"),{headers:A.headers}).then((function(e){return U(e)})),fetch("".concat(A.baseUrl,"/cards"),{headers:A.headers}).then((function(e){return U(e)}))]).then((function(n){var o=n[0],r=n[1];P=o._id,C.textContent=o.name,E.textContent=o.about,e.setAttribute("style","background-image: url('".concat(o.avatar,"');")),r.forEach((function(e){var n=T(e,w,B,J,P);t.append(n)}))})).catch((function(e){console.log(e)})),n.addEventListener("click",(function(){S.value=C.textContent,q.value=E.textContent,N(y,D),L(a)})),o.addEventListener("click",(function(){h.reset(),N(h,D),L(u)})),r.addEventListener("click",(function(){b.reset(),N(b,D),L(s)})),c.forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&g(e)}))})),y.addEventListener("submit",(function(e){var t,n;e.preventDefault(),M(!0,d),(t=S.value,n=q.value,fetch("".concat(A.baseUrl,"/users/me"),{method:"PATCH",headers:A.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return U(e)}))).then((function(e){C.textContent=e.name,E.textContent=e.about,g(a)})).catch((function(e){console.log(e)})).finally((function(){M(!1,d)}))})),h.addEventListener("submit",(function(e){e.preventDefault();var n,o,r=h.elements.place_name,c=h.elements.link;M(!0,p),(n=r.value,o=c.value,fetch("".concat(A.baseUrl,"/cards"),{method:"POST",headers:A.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return U(e)}))).then((function(e){var n=T(e,w,B,J,P);t.prepend(n),g(u),h.reset()})).catch((function(e){console.log(e)})).finally((function(){M(!1,p)}))})),b.addEventListener("submit",(function(t){t.preventDefault();var n,o=b.elements.avatar;M(!0,f),(n=o.value,fetch("".concat(A.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:A.headers,body:JSON.stringify({avatar:n})}).then((function(e){return U(e)}))).then((function(t){e.setAttribute("style","background-image: url('".concat(t.avatar,"');")),g(s),b.reset()})).catch((function(e){console.log(e)})).finally((function(){M(!1,f)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t,n,o,r,c){var a=Array.from(e.querySelectorAll(t)),u=e.querySelector(n);a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?O(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(e,t,r,c),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.removeAttribute("disabled"),t.classList.remove(n)):j(t,n)}(a,u,o)}))}))}(t,e.inputSelector,e.submitButtonSelector,e.inactiveButtonClass,e.inputErrorClass,e.errorClass)}))}(D)})();