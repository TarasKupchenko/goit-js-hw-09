const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body;let a=null;function l(){d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}t.addEventListener("click",(()=>{t.disabled=!0,e.disabled=!1,a=setInterval(l,1e3)})),e.addEventListener("click",(()=>{t.disabled=!1,e.disabled=!0,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.4bfb87b2.js.map