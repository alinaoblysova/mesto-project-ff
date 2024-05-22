(()=>{"use strict";var e,t=document.querySelector(".profile__image"),n=document.querySelector(".places__list"),r=document.querySelector("#card-template").content,o=document.querySelector(".profile__edit-button"),c=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__image"),a=Array.from(document.querySelectorAll(".popup")),u=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),d=document.querySelector(".popup_type_avatar"),p=document.querySelector(".popup_type_delete"),f=p.querySelector(".popup__button"),m=s.querySelector(".popup__image"),y=s.querySelector(".popup__caption"),v=document.forms.edit_profile,_=document.forms.new_place,b=document.forms.avatar,S=v.elements.name,h=v.elements.description,C=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),q={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"12cc5391-ba50-49b8-b813-21aaed4498e6","Content-Type":"application/json"}},E=function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))},k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return"POST"===t||"PATCH"===t?fetch("".concat(q.baseUrl).concat(e),{method:t,headers:q.headers,body:JSON.stringify(n)}).then(E):fetch("".concat(q.baseUrl).concat(e),{method:t,headers:q.headers}).then(E)},L=function(e,t){return k("/cards/likes/".concat(e),t)};function A(t,n){var r=t.classList.contains("card__like-button_is-active")?"DELETE":"PUT";L(e,r).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch(console.error)}function x(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",w)}function T(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",w)}function w(e){"Escape"===e.key&&T(document.querySelector(".popup_is-opened"))}var j,B,P,D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"};function I(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));U(e.querySelector(t.submitButtonSelector),t.inactiveButtonClass),n.forEach((function(n){O(e,n,t.inputErrorClass,t.errorClass)}))}function O(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.textContent="",o.classList.remove(r)}function U(e,t){e.setAttribute("disabled",!0),e.classList.add(t)}function M(e){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M(e)}function H(e,t,n,r){t.textContent=e?r:n}function N(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...",r="object"===M(t);r&&t.preventDefault();var o=r?t.submitter:t,c=o.textContent;H(!0,o,c,n),e().then((function(){r&&t.target.reset()})).catch(console.error).finally((function(){H(!1,o,c)}))}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function z(e,t){m.src=e.src,m.alt=t.textContent,y.textContent=t.textContent,x(s)}function G(e,t){B=e,P=t,x(p)}function J(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend",c=function(t){var n=t.card,o=t.openImage,c=t.likeCard,i=t.userID,a=t.handleDeleteButton,u=r.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__image"),s=u.querySelector(".card__title"),d=u.querySelector(".card__delete-button"),p=u.querySelector(".card__like-button"),f=u.querySelector(".card__like-counter");return l.src=n.link,l.alt=n.name,s.textContent=n.name,f.textContent=n.likes.length,l.addEventListener("click",(function(){return o(l,s)})),n.owner._id===i?d.addEventListener("click",(function(){a(n._id,d)})):(d.setAttribute("disabled",!0),d.setAttribute("style","display: none;")),n.likes.some((function(e){return e._id===i}))&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){e=n._id,c(p,f)})),u}({card:t,likeCard:A,openImage:z,userID:j,handleDeleteButton:G});n[o](c)}Promise.all([k("/users/me"),k("/cards")]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,a=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return a}}(n,r)||function(e,t){if(e){if("string"==typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?V(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],i=o[1];j=c._id,C.textContent=c.name,g.textContent=c.about,t.setAttribute("style","background-image: url('".concat(c.avatar,"');")),i.forEach((function(e){J(e,"append")}))})).catch(console.error),o.addEventListener("click",(function(){S.value=C.textContent,h.value=g.textContent,I(v,D),x(u)})),c.addEventListener("click",(function(){_.reset(),I(_,D),x(l)})),i.addEventListener("click",(function(){b.reset(),I(b,D),x(d)})),a.forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&T(e)}))})),v.addEventListener("submit",(function(e){N((function(){return(e=S.value,t=h.value,k("/users/me","PATCH",{name:e,about:t})).then((function(e){C.textContent=e.name,g.textContent=e.about,T(u)}));var e,t}),e)})),_.addEventListener("submit",(function(e){N((function(){var e,t,n=_.elements.place_name,r=_.elements.link;return(e=n.value,t=r.value,k("/cards","POST",{name:e,link:t})).then((function(e){J(e),T(l)}))}),e)})),b.addEventListener("submit",(function(e){N((function(){var e;return(e=b.elements.avatar.value,k("/users/me/avatar","PATCH",{avatar:e})).then((function(e){t.setAttribute("style","background-image: url('".concat(e.avatar,"');")),T(d)}))}),e)})),f.addEventListener("click",(function(){N((function(){return function(e){return k("/cards/".concat(e),"DELETE")}(B).then((function(){P.closest(".card").remove(),T(p)}))}),f,"Удаление...")})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t,n,r,o,c){var i=Array.from(e.querySelectorAll(t)),a=e.querySelector(n);i.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?O(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,o,c),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.removeAttribute("disabled"),t.classList.remove(n)):U(t,n)}(i,a,r)}))}))}(t,e.inputSelector,e.submitButtonSelector,e.inactiveButtonClass,e.inputErrorClass,e.errorClass)}))}(D)})();