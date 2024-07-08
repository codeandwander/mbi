"use strict";(()=>{var ye=Object.defineProperty;var X=Object.getOwnPropertySymbols;var Ee=Object.prototype.hasOwnProperty,Ae=Object.prototype.propertyIsEnumerable;var ee=(r,e,t)=>e in r?ye(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,te=(r,e)=>{for(var t in e||(e={}))Ee.call(e,t)&&ee(r,t,e[t]);if(X)for(var t of X(e))Ae.call(e,t)&&ee(r,t,e[t]);return r};function p(r,e,t){if(r==="success"?$(".alert-banner").css("background-color","#198754"):r==="error"&&$(".alert-banner").css("background-color","#dc3545"),t){let a=$(".alert-list");a.empty(),t.forEach(o=>{a.append($("<li>").text(o))}),a.show(),$(".alert-text-block").hide()}else $(".alert-banner > .alert-text-block > strong").text(e),$(".alert-list").hide(),$(".alert-text-block").show();$(".alert-banner").show(),setTimeout(function(){$(".alert-banner").hide()},5e3)}function I(){document.getElementById("loading-screen").style.display="flex"}function v(){document.getElementById("loading-screen").style.display="none"}var x,M,U,H,B,b,Y;window.numberPerPage;var R;window.currentPage=1;window.numberOfPages;function Oe(r){r==="hair"?(x=document.querySelectorAll(".hair-collection-wrapper.black .hair-style-container"),M=document.querySelectorAll(".hair-collection-wrapper.blonde .hair-style-container"),U=document.querySelectorAll(".hair-collection-wrapper.brown .hair-style-container"),H=document.querySelectorAll(".hair-collection-wrapper.red .hair-style-container"),B=document.querySelectorAll(".hair-collection-wrapper.white .hair-style-container"),Y=x.length):(b=document.querySelectorAll(`.${r}-collection-wrapper .character-item-container`),Y=b.length),window.numberOfPages=Math.ceil(Y/window.numberPerPage)}function xe(r){let e;if(r==="hair"){switch(window.hairColour){case"black":e=x;break;case"blonde":e=M;break;case"brown":e=U;break;case"red":e=H;break;case"white":e=B;break}e==null||e.forEach((t,a)=>{t.querySelector('input[name="hair-style"]').checked&&(R=a)})}else{let t;switch(r){case"skin":t="skin-tone";break;case"mask":t="mask";break;case"special":t="special";break}b==null||b.forEach((a,o)=>{a.querySelector(`input[name="${t}"]`).checked?R=o:R=0})}window.currentPage=Math.ceil((R+1)/9)}function f(r,e){Oe(e),r||xe(e);let t=(window.currentPage-1)*window.numberPerPage,a=t+window.numberPerPage;if(e==="hair"){var o=Array.prototype.slice.call(x,t,a),n=Array.prototype.slice.call(M,t,a),c=Array.prototype.slice.call(U,t,a),i=Array.prototype.slice.call(H,t,a),s=Array.prototype.slice.call(B,t,a);u(x),u(M),u(U),u(H),u(B),d(o),d(n),d(c),d(i),d(s)}else{var l=Array.prototype.slice.call(b,t,a);u(b),d(l)}function d(C){[].forEach.call(C,function(k){k.style.display="block"})}function u(C){[].forEach.call(C,function(k){k.style.display="none"})}}function g(){return Snipcart.store.getState().customer.status==="SignedIn"?Snipcart.store.getState().customer.email:""}function P(){Snipcart.store.getState().customer.status==="SignedIn"?($(".nav-login-btn").html("Profile"),$(".select-character").show(),$(".new-character-button").show(),window.innerWidth<=991?($(".character-selector-container-mobile").show(),$(".character-selector-container").hide()):($(".character-selector-container-mobile").hide(),$(".character-selector-container").show())):($(".nav-login-btn").html("Sign In"),$(".select-character").hide(),$(".new-character-button").hide(),$(".character-selector-container-mobile").hide(),$(".character-selector-container").hide())}function L(r,e,t){let a=[];return(r.length>t||r.length<e)&&a.push(`Your input must be between ${e} and ${t} characters!`),/^([A-zÀ-ÿ0-9 !,.?-]+)$/.test(r)||a.push("Invalid character detected! Allowed characters: [A-z, \xC0-\xFF, 0-9, !,.?-]"),!Array.isArray(a)||!a.length?!0:(p("error","",a),!1)}function ne(){let r=Snipcart.store.getState().customer.status==="SignedIn",e="";if(r){let t=g();z(t).then(o=>{if(A(v),o.length>0){let n=o.reduce((c,i)=>c.fields.MODIFIED_AT>i.fields.MODIFIED_AT?c:i);j(n.fields)}else _()})}else e=K(),e.then(t=>{j(t.fields)})}function j(r){sessionStorage.setItem("currentCharacterName",r.NAME),sessionStorage.setItem("currentCharacterId",r.RECORD_ID);let e=r.HAIR.split("-"),t=r.SIDEKICK.split("-"),a=r.SPECIAL?r.SPECIAL.split(","):[];$('input[name="special"]:checkbox').removeAttr("checked"),$("input[value="+e[1]+"]").prop("checked",!0),$("input[value="+r.HAIR+"]").prop("checked",!0),$("input[value="+r.EYES+"]").prop("checked",!0),$("input[value="+r.SKIN+"]").prop("checked",!0),$("input[value="+r.COSTUME+"]").prop("checked",!0),$("input[value="+r.MASK+"]").prop("checked",!0),$("input[value="+r.CAPE+"]").prop("checked",!0),a&&a.forEach(o=>{$("input[value="+o+"]").prop("checked",!0),$("input[value="+o+"]").parent().find(".w-checkbox-input").addClass("w--redirected-checked")}),$("input[value="+r.SIDEKICK+"]").prop("checked",!0),$("input[value=sk-"+t[1]+"]").prop("checked",!0),$("input[value="+r.COVER_COLOUR+"]").prop("checked",!0),$("#hero-name-input").val(r.NAME),$("input[value="+r.PRONOUNS+"]").prop("checked",!0),$("input[value="+r.LANGUAGE+"]").prop("checked",!0),ie()}function ie(){window.getSelectedStyles(),D(),F(function(){f(void 0,window.stepName)}),h(function(){v()})}function ce(){if(!(Snipcart.store.getState().customer.status==="SignedIn")){p("error","You must sign in to save a character.");return}I();let e=$("#hero-name-input").val();if(!L(e,2,50))return;let a=sessionStorage.getItem("currentCharacterId");sessionStorage.setItem("currentCharacterName",e),a===null?J(p("success",`${e} was saved successfully!`)):N(p("success",`${e} was saved successfully!`)),A(v)}function _(){$(".name-input").val("");let r=m('input[name="hair-colour"]'),e=m('input[name="hair-style"]'),t=m('input[name="Eye-Colour"]'),a=m('input[name="skin-tone"]'),o=m('input[name="costume"]'),n=m('input[name="mask"]'),c=m('input[name="cape"]'),i=m('input[name="sidekick-colour"]'),s=m('input[name="sidekick"]'),l=m('input[name="cover"]');$('input[name="special"]:checkbox').removeAttr("checked"),$('input[name="hair-colour"]').eq(r).prop("checked",!0),$('input[name="hair-style"]').eq(e).prop("checked",!0),$('input[name="Eye-Colour"]').eq(t).prop("checked",!0),$('input[name="skin-tone"]').eq(a).prop("checked",!0),$('input[name="costume"]').eq(o).prop("checked",!0),$('input[name="mask"]').eq(n).prop("checked",!0),$('input[name="cape"]').eq(c).prop("checked",!0),$('input[name="special"]').eq(0).prop("checked",!0),$('input[name="special"]').eq(0).parent().find(".w-checkbox-input").addClass("w--redirected-checked"),$('input[name="sidekick-colour"]').eq(i).prop("checked",!0),$('input[name="sidekick"]').eq(s).prop("checked",!0),$('input[name="cover"]').eq(l).prop("checked",!0),sessionStorage.clear(),ie()}function h(r){if(styleColourId)$(".hair:visible").first().hide(),$("."+styleColourId).show();else{let{length:e}=$(".hair").length,t=Math.floor(Math.random()*e);$(".hair").eq(t).show()}if(eyesId)$(".eyes:visible").first().hide(),$("."+eyesId).show();else{let{length:e}=$(".eyes").length,t=Math.floor(Math.random()*e);$(".eyes").eq(t).show()}if(skinToneId)$(".skintone:visible").first().hide(),$("."+skinToneId).show();else{let{length:e}=$(".skintone").length,t=Math.floor(Math.random()*e);$(".skintone").eq(t).show()}if(costumeId)$(".costume:visible").first().hide(),$(".sidekick-costume:visible").first().hide(),$("."+costumeId).show(),$(`.${sidekickId}-${costumeId}`).show();else{let{length:e}=$(".costume").length,t=Math.floor(Math.random()*e);$(".costume").eq(t).show()}if(maskId)maskId==="msk000"?($(".mask:visible").hide(),$(".sidekick-mask:visible").hide()):($(".mask:visible").first().hide(),$(".sidekick-mask:visible").first().hide(),$("."+maskId).show(),$(`.${sidekickId}-${maskId}`).show());else{let{length:e}=$(".mask").length,t=Math.floor(Math.random()*e);$(".mask").eq(t).show()}if(capeId)$(".cape:visible").first().hide(),$(".sidekick-cape:visible").first().hide(),$("."+capeId).show(),$(`.${sidekickId}-${capeId}`).show();else{let{length:e}=$(".cape").length,t=Math.floor(Math.random()*e);$(".cape").eq(t).show()}if(specialIds&&($(".special:visible").hide(),specialIds.forEach(e=>{$("."+e).show()})),sidekickColourId)$(".sidekick:visible").first().hide(),$("."+sidekickColourId).show();else{let{length:e}=$(".sidekick").length,t=Math.floor(Math.random()*e);$(".sidekick").eq(t).show()}if(coverId)$(".cover:visible").first().hide(),$("."+coverId).show();else{let{length:e}=$(".cover").length,t=Math.floor(Math.random()*e);$(".cover").eq(t).show()}r&&r()}function se(r){de().then(Pe).then(pe).then(window.randomiseOrLoadCharacter)}function de(r){return fetch(`https://make-believe-final.webflow.io/character-items${r||""}`).then(e=>{if(e.status===404)throw new Error("Page could not be found.");return e.text()}).then(e=>{let t=document.createElement("div");t.innerHTML=e;let a=t.querySelectorAll(".character-items"),o=Array.from(a).map(c=>{let i={};return c.querySelectorAll("span").forEach(l=>{i[l.className]=l.textContent}),i});characterObjects=characterObjects.concat(o);let n=t.querySelector(".w-pagination-next");return n?de(`?${n.href.split("?")[1]}`):characterObjects})}function Pe(){let r=document.querySelector(".character-preview");characterObjects.forEach(e=>{let t=document.createElement("div");t.classList.add("character-item");let a=document.createElement("div");a.classList.add("character-item-category");let o=document.createTextNode(e["character-item-category"]);a.appendChild(o);let n=document.createElement("div");n.classList.add("character-item-preview-label");let c=document.createTextNode(e["character-item-preview-label"]);n.appendChild(c);let i=document.createElement("img");i.classList.add("character-item-preview-image"),i.src=e["character-item-preview-image"],t.appendChild(a),t.appendChild(n),t.appendChild(i),r.appendChild(t)})}function ue(){$("form#character-creation-form :input").each(function(){let r=$(this).closest("label").find("span").html();$(this).val(r)})}function pe(){$(".character-item").each(function(){let r=$(this).find(".character-item-preview-label").text(),e=$(this).find(".character-item-category").text().toLowerCase();$(this).find(".character-item-preview-image").addClass(r).addClass(e)})}function Z(){$(".book-controls").each(function(){let r=localStorage.getItem("selectedBook");$(this).attr("id").slice(0,-9)===r?$(this).css("display","flex"):$(this).hide()})}function m(r){let{length:e}=$(r);return Math.floor(Math.random()*e)}function Q(r){$("#step-"+formStep+"-button").prop("disabled",!1).removeClass("selected-form-step"),$(r).prop("disabled",!0).addClass("selected-form-step")}function A(r){let e=g(),t=z(e),a=$(".character-selector-list"),o=$(".character-dropdown-list");a.empty(),o.empty(),t.then(n=>{console.log("result",n);var c=0;$.each(n,function(i){var s=$("<div/>",{class:"character-list-item-container"}),l=$("<div/>",{class:"character-list-item",id:this.id,text:this.fields.NAME}),d=$("<div/>",{class:"character-list-item-delete",id:this.id});d.prepend('<img class="bin-icon" src="https://uploads-ssl.webflow.com/6318bc2064b174efcf6572f4/63738d42ccaf13e6da927487_recycle-bin-icon.svg"/>'),s.append(l),s.append(d),s.clone().appendTo(a),s.clone().appendTo(o),c++,console.log("itemsProcessed",c,n.length),c===n.length&&r&&r()}),$(".w-dropdown-list div").click(function(){$(".dropdown").triggerHandler("w-close.w-dropdown")}),$(".character-list-item").click(function(i){i.preventDefault(),i.stopPropagation();let s=$(this).attr("id");K(s).then(d=>{j(d.fields)})}),$(".character-list-item-delete").click(function(i){i.preventDefault(),i.stopPropagation();let s=$(this).attr("id"),l=$(this).parent().find(".character-list-item").text();if(sessionStorage.getItem("currentCharacterId")===s){p("error","You cannot delete a character that is currently loaded.");return}we(s,l),$(`#${s}`).parent().remove()})})}function D(){hairColour=$("input[name=hair-colour]:checked","#character-creation-form").val().toLowerCase(),sidekickColour=$("input[name=sidekick-colour]:checked","#character-creation-form").val().toLowerCase(),sidekickColour=sidekickColour.substr(3),$(".hair-collection-wrapper").each(function(){$(this).attr("class").includes(hairColour)?$(this).show():$(this).hide()}),$(".sidekick-container :input").each(function(){$(this).val().includes(sidekickColour)?$(this).closest(".sidekick-container").show():$(this).closest(".sidekick-container").show().hide()})}function S(){styleColourId=hairstyleId+"-"+hairColour.toLowerCase(),sidekickColourId=sidekickId+"-"+sidekickColour.toLowerCase()}function F(r){S(),$('input[value="'+styleColourId+'"]').prop("checked",!0),r&&r()}function me(r){S(),$('input[value="'+sidekickColourId+'"]').prop("checked",!0),r&&r()}function fe(r){var e=new Headers;e.append("Content-Type","application/json");var t={method:"get",headers:e,redirect:"follow"};return fetch(`https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Previews&filterByFormula=PREVIEW_ID="${r}"&t=${Date.now()}`,t).then(o=>o.text()).then(o=>(o=JSON.parse(o),o.records.slice(Math.max(o.records.length-5,0)))).catch(o=>console.log("error",o))}function z(r){var e=new Headers;e.append("Content-Type","application/json");var t={method:"get",headers:e,redirect:"follow"};return fetch(`https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula=USER_EMAIL="${r}"&sortBy=CREATED_AT&sortDirection=desc&t=${Date.now()}`,t).then(o=>o.json()).then(o=>o.records.slice(0,5)).catch(o=>console.log("error",o))}function K(r){let e=r||sessionStorage.getItem("currentCharacterId"),t=new Headers;t.append("Content-Type","application/json");let a={method:"get",headers:t,redirect:"follow"};return fetch(`https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula={RECORD_ID}="${e}"&t=${Date.now()}`,a).then(n=>n.json()).then(n=>n.records[0]).catch(n=>console.log("error",n))}function ge(r){console.log("postToAirTable - currentCharacterId",sessionStorage.getItem("currentCharacterId"));let e=[{CHARACTER_ID:sessionStorage.getItem("currentCharacterId"),BOOK_ID:window.selectedBook,SESSION_ID:localStorage.getItem("sessionId"),USER_EMAIL:g(),PRONOUNS:window.pronouns,LANGUAGE:window.language,DEDICATION_MESSAGE:window.dedicationMessage}],t=new Headers;t.append("Content-Type","application/json");let a={method:"post",headers:t,redirect:"follow",body:JSON.stringify(e)};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Previews",a).then(o=>o.json()).then(o=>{let n=`${o[0].fields.PREVIEW_ID}`;localStorage.setItem("currentPreviewId",n),fetch(`https://hook.eu1.make.com/0kxggab30625jvpqkvviz6fo9dvxzryf?string=P-${encodeURIComponent(o[0].fields.RECORD_ID)}-CHOSEN`).then(c=>{r&&r(n)})}).catch(o=>console.log("error",o))}function J(r){console.log("addCharacter");let e=[{NAME:$("#hero-name-input").val(),USER_EMAIL:g(),HAIR:styleColourId,EYES:eyesId,SKIN:skinToneId,COSTUME:costumeId,MASK:maskId,CAPE:capeId,SPECIAL:specialIds.toString(),SIDEKICK:sidekickColourId,COVER_COLOUR:coverId}],t=new Headers;t.append("Content-Type","application/json");let a={method:"post",headers:t,redirect:"follow",body:JSON.stringify(e)};return fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters",a).then(n=>n.json()).then(n=>(console.log("result",n),sessionStorage.setItem("currentCharacterId",n[0].fields.RECORD_ID),localStorage.setItem("currentCharacter",JSON.stringify(n[0].fields)),r&&r(),n[0])).catch(n=>console.log("error",n))}function N(r){let e=localStorage.getItem("currentCharacter");if(!e)return;let t=JSON.parse(e);delete t.RECORD_NUMBER,delete t.RECORD_ID,delete t.MODIFIED_AT,delete t.CREATED_AT,delete t["Last Modified"];let a=[te({},t)],o=new Headers;o.append("Content-Type","application/json");let n={method:"post",headers:o,redirect:"follow",body:JSON.stringify(a)};return fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters",n).then(i=>i.json()).then(i=>{let s=new Headers;s.append("Content-Type","application/json");let l={method:"put",headers:s,redirect:"follow",body:JSON.stringify([{id:sessionStorage.getItem("currentCharacterId"),fields:{DUPLICATE_ID:i[0].fields.RECORD_ID}}])};return fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters",l).then(d=>d.json()).then(d=>(sessionStorage.setItem("currentCharacterId",i[0].fields.RECORD_ID),console.log("currentCharacterId",sessionStorage.getItem("currentCharacterId")),r&&r(),i[0])).catch(d=>console.log("error",d))}).catch(i=>console.log("error",i))}function ke(r){let e=[{id:sessionStorage.getItem("currentCharacterId"),fields:{NAME:$("#hero-name-input").val(),USER_EMAIL:g(),HAIR:styleColourId,EYES:eyesId,SKIN:skinToneId,COSTUME:costumeId,MASK:maskId,CAPE:capeId,SPECIAL:specialIds.toString(),SIDEKICK:sidekickColourId,COVER_COLOUR:coverId}}],t=new Headers;t.append("Content-Type","application/json");let a={method:"put",headers:t,redirect:"follow",body:JSON.stringify(e)};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters",a).then(o=>o.json()).then(o=>{localStorage.setItem("currentCharacter",JSON.stringify(e[0].fields)),r&&r()}).catch(o=>console.log("error",o))}function $e(r){let e=[{id:sessionStorage.getItem("currentCharacterId"),fields:{USER_EMAIL:g()}}],t=new Headers;t.append("Content-Type","application/json");let a={method:"put",headers:t,redirect:"follow",body:JSON.stringify(e)};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters",a).then(o=>o.json()).then(o=>{r&&r()}).catch(o=>console.log("error",o))}function ve(r,e){let t=[{id:r,fields:{USER_EMAIL:g()}}],a=new Headers;a.append("Content-Type","application/json");let o={method:"put",headers:a,redirect:"follow",body:JSON.stringify(t)};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Previews",o).then(n=>n.json()).then(n=>{e&&e()}).catch(n=>console.log("error",n))}function we(r,e){var t=new Headers;t.append("Content-Type","application/json");var a={method:"delete",headers:t,redirect:"follow",body:JSON.stringify([r])};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=characters",a).then(o=>o.text()).then(p("success",`${e} was successfully deleted!`)).catch(o=>console.log("error",o))}function V(){$(".book-preview-container").hide(),$(".book-selector-container").hide(),$(".book-large-container").hide(),$(".character-builder-container").show(),$(".book-preview-container").hide(),$(".basket-confirmation-container").hide();var r=document.getElementById("character-builder-container");r.scrollIntoView()}function W(){$(".book-preview-container").hide(),$(".book-selector-container").show(),$(".book-small-list-container").show(),$(".book-large-container").hide(),$(".character-builder-container").hide(),$(".book-preview-container").hide(),$(".basket-confirmation-container").hide();var r=document.getElementById("book-selector-container");r.scrollIntoView()}function Ie(){$(".book-preview-container").hide(),$(".book-selector-container").hide(),$(".book-small-list-container").hide(),$(".book-large-container").hide(),$(".character-builder-container").hide(),$(".book-preview-container").hide(),$(".basket-confirmation-container").show();var r=document.getElementById("basket-confirmation-container");r.scrollIntoView()}function De(){return localStorage.getItem("sessionId")}function be(){if(De()===null){let r=uuidv4();localStorage.setItem("sessionId",r)}}window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{window.formStep=1,window.stepName="hair",window.hairstyleId="",window.hairColour="",window.styleColourId=hairstyleId+"-"+hairColour,window.eyesId="",window.skinToneId="",window.costumeId="",window.maskId="",window.capeId="",window.specialIds=[],window.sidekickId="",window.sidekickColour="",window.sidekickColourId=sidekickId+"-"+sidekickColour,window.coverId="",window.userId="",window.sessionId="",window.sessionRow="",window.selectedBook="",window.currentCharacterName="",window.pronouns="",window.language="",window.dedicationMessage="",window.characterObjects=[],window.currentPreviewId="",window.SnipcartSettings={publicApiKey:"NzAxOWMzODUtNmVjNS00NmEyLTlkNDktNDZhOTllYzIzMjkxNjM3OTc2MjY0NTYxOTc2NzY3",modalStyle:"side",currency:"gbp"},(()=>{var e,t;(t=(e=window.SnipcartSettings).version)!=null||(e.version="3.0");var a,o;(o=(a=window.SnipcartSettings).timeoutDuration)!=null||(a.timeoutDuration=2750);var n,c;(c=(n=window.SnipcartSettings).domain)!=null||(n.domain="cdn.snipcart.com");var i,s;(s=(i=window.SnipcartSettings).protocol)!=null||(i.protocol="https");var l=window.SnipcartSettings.version.includes("v3.0.0-ci")||window.SnipcartSettings.version!="3.0"&&window.SnipcartSettings.version.localeCompare("3.4.0",void 0,{numeric:!0,sensitivity:"base"})===-1,d=["focus","mouseover","touchmove","scroll","keydown"];window.LoadSnipcart=k,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):u();function u(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy==="on-user-interaction"&&(d.forEach(w=>document.addEventListener(w,k)),setTimeout(k,window.SnipcartSettings.timeoutDuration)):k()}var C=!1;function k(){if(C)return;C=!0;let w=document.getElementsByTagName("head")[0],y=document.querySelector("#snipcart"),O=document.querySelector(`src[src^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][src$="snipcart.js"]`),E=document.querySelector(`link[href^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][href$="snipcart.css"]`);y||(y=document.createElement("div"),y.id="snipcart",y.setAttribute("hidden","true"),document.body.appendChild(y)),Se(y),O||(O=document.createElement("script"),O.src=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.js`,O.async=!0,w.appendChild(O)),E||(E=document.createElement("link"),E.rel="stylesheet",E.type="text/css",E.href=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.css`,w.prepend(E)),d.forEach(Ce=>document.removeEventListener(Ce,k))}function Se(w){!l||(w.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(w.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(w.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(w.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(w.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})(),$(document).ready(function(){document.addEventListener("snipcart.ready",()=>{let e=Snipcart.store.getState().customer.status==="SignedIn";if(window.location.pathname==="/"&&Snipcart.events.on("snipcart.initialized",c=>{P()}),window.location.href.indexOf("character-creation")>-1&&(Snipcart.events.on("customer.signedin",c=>{console.log("customer signed in"),$(".nav-login-btn").html("Profile"),$(".select-character").show(),$(".new-character-button").show(),window.innerWidth<=991?($(".character-selector-container-mobile").show(),$(".character-selector-container").hide()):($(".character-selector-container-mobile").hide(),$(".character-selector-container").show()),window.randomiseOrLoadCharacter()}),Snipcart.events.on("customer.signedout",c=>{console.log("customer signed out"),sessionStorage.clear(),$(".nav-login-btn").html("Sign In"),$(".select-character").hide(),$(".new-character-button").hide(),$(".character-selector-container-mobile").hide(),$(".character-selector-container").hide(),window.randomiseOrLoadCharacter()}),Snipcart.events.on("snipcart.initialized",c=>{console.log("snipcart initialized");let i=new URLSearchParams(location.search);i.get("page")&&(i.get("page")==="characterSelection"&&V(),i.get("page")==="bookSelection"&&W()),P(),Q("#step-1-button"),ue(),se()})),window.location.href.indexOf("preview")>-1){let c=new URLSearchParams(location.search),i=fe(c.get("id"));c.get("quick")&&I(),Snipcart.events.on("snipcart.initialized",s=>{P(),Z(),c.get("id")&&(document.getElementById("masterplan").innerHTML="",window.masterplan=new MasterPlan(document.getElementById("masterplan"),{clientID:"5140",jobID:c.get("id"),theme:"light",embedType:"frame",thumbWidth:"800",openImmediately:!1,autoFullscreen:!1,clientNameDisplay:!1,headerAtTop:!0,showLoginLink:!1,fitContentHeight:!1,iframeHeight:"500",clientNameLink:!1,showSearchBar:!1,showSpreadNums:!1,customCss:{navBar:{background:"#919191"},nestedToc:!0}}),i.then(l=>{v(),$("#email-preview-button").click(function(){Snipcart.store.getState().customer.status==="SignedIn"?(p("success","We will contact you by email when your full preview is ready"),fetch(`https://hook.eu1.make.com/0kxggab30625jvpqkvviz6fo9dvxzryf?string=F-${encodeURIComponent(l[0].fields.RECORD_ID)}-CHOSEN`).then(u=>{console.log(u)})):p("error","You must sign in to request a full preview.")})}))}),Snipcart.events.on("customer.signedin",s=>{P(),i.then(l=>{$e(()=>{ve(l[0].fields.RECORD_ID,()=>{})})})})}var t=200,a=!0,o=function(){a&&(window.innerWidth<=767?window.numberPerPage=3:window.numberPerPage=9,f(void 0,window.stepName),a=!1,e&&(window.innerWidth<=991?($(".character-selector-container-mobile").show(),$(".character-selector-container").hide()):($(".character-selector-container-mobile").hide(),$(".character-selector-container").show())))},n=setInterval(o,t);o(),$(window).resize(function(){a=!0})})}),window.randomiseOrLoadCharacter=function(){let e=Snipcart.store.getState().customer.status==="SignedIn";$('input[name="fname"]').val()||(sessionStorage.getItem("currentCharacterId")===null&&!e?_():ne())},window.getSelectedStyles=function(){let t=$("input[name=hair-style]:checked","#character-creation-form").val(),a=$("input[name=sidekick]:checked","#character-creation-form").val();hairstyleId=t.slice(0,5),eyesId=$("input[name=Eye-Colour]:checked","#character-creation-form").val().toLowerCase(),skinToneId=$("input[name=skin-tone]:checked","#character-creation-form").val().toLowerCase(),costumeId=$("input[name=costume]:checked","#character-creation-form").val().toLowerCase(),maskId=$("input[name=mask]:checked","#character-creation-form").val().toLowerCase(),capeId=$("input[name=cape]:checked","#character-creation-form").val().toLowerCase(),specialIds=[],$("input:checkbox[name=special]:checked").each(function(){specialIds.push($(this).val())}),sidekickId=a.slice(0,5),coverId=$("input[name=cover]:checked","#character-creation-form").val().toLowerCase()},$(".pagination-down-arrow").click(function(){window.currentPage!==window.numberOfPages&&(window.currentPage+=1,f(window.currentPage,window.stepName))}),$(".pagination-up-arrow").click(function(){window.currentPage!==1&&(window.currentPage-=1,f(window.currentPage,window.stepName))}),$(".save-character-button").click(function(e){e.stopPropagation(),e.preventDefault(),ce()}),$(".new-character-button, .new-character-button-large").click(function(e){e.preventDefault(),e.stopPropagation(),V(),_()}),$(".checkout-button").click(function(e){e.preventDefault(),e.stopPropagation(),window.location.hash||(window.location.hash="#/checkout")});function r(e,t){t.preventDefault();let a;switch(e){case"1":a="#F080B2",window.stepName="hair",f(void 0,"hair");break;case"2":a="#01AFDA";break;case"3":a="#77B82A",window.stepName="skin",f(void 0,"skin");break;case"4":a="#FCD100";break;case"5":a="#E84E10",window.stepName="mask",f(void 0,"mask");break;case"6":a="#01A187";break;case"7":a="#E30613",window.stepName="special",f(void 0,"special");break;case"8":a="#E30F6B";break;case"9":a="#0072BB";break}Q(`#step-${e}-button`),$(`.form-step-${e}-container`).fadeIn("slow"),$(`.form-step-${formStep}-container`).css({display:"none"}),$(`<style>
        [type=radio]:checked + img { box-shadow: 0px 0px 0px 5px ${a};}
        .pagination-up-arrow, .pagination-down-arrow { border-bottom-color: ${a}; border-top-color: ${a}; }
      </style>`).appendTo("head"),$("<style>[type=radio]:not(:checked) + img { box-shadow: none; }</style>").appendTo("head"),formStep=e}$(".step-button").click(function(e){let t=$(this).attr("id").match(/(\d+)/)[0];r(t,e)}),$('input[name="hair-colour"]').change(function(e){D(),F(),S(),h()}),$("input[name=hair-style]").change(function(e){getSelectedStyles(),S(),h()}),$("input[name=Eye-Colour]").change(function(e){eyesId=$("input[name=Eye-Colour]:checked","#character-creation-form").val().toLowerCase(),h()}),$("input[name=skin-tone]").change(function(e){skinToneId=$("input[name=skin-tone]:checked","#character-creation-form").val().toLowerCase(),h()}),$("input[name=costume]").change(function(e){costumeId=$("input[name=costume]:checked","#character-creation-form").val().toLowerCase(),h()}),$("input[name=mask]").change(function(e){maskId=$("input[name=mask]:checked","#character-creation-form").val().toLowerCase(),h()}),$("input[name=cape]").change(function(e){capeId=$("input[name=cape]:checked","#character-creation-form").val().toLowerCase(),h()}),$("input[name=special]").change(function(e){specialIds=[],$("input:checkbox[name=special]:checked").each(function(){specialIds.push($(this).val())}),h()}),$("input[name=special]").click(function(e){$(this).val()==="sp000"?($(".special:visible").hide(),$("input:checkbox[name=special]:not([value=sp000])").prop("checked",!1),$("input:checkbox[name=special]:not([value=sp000])").parent().find(".w-checkbox-input").removeClass("w--redirected-checked")):$("input:checkbox[name=special][value=sp000]").is(":checked")&&($("input:checkbox[name=special][value=sp000]").prop("checked",!1),$("input:checkbox[name=special][value=sp000]").parent().find(".w-checkbox-input").removeClass("w--redirected-checked"))}),$('input[name="sidekick-colour"]').change(function(e){D(),me(),S(),h()}),$("input[name=sidekick]").change(function(e){getSelectedStyles(),S(),h()}),$("input[name=cover]").change(function(e){coverId=$("input[name=cover]:checked","#character-creation-form").val().toLowerCase(),h()}),$("textarea#dedication").change(function(){window.dedicationMessage=$(this).val()}),$("input[name=pronoun]").change(function(){window.pronouns=$(this).val()}),$("input[name=language]").change(function(){window.language=$(this).val()}),$(".pick-a-book").click(function(e){if(e.preventDefault(),!L($("input[name=fname]").val(),2,50))return;let a=sessionStorage.getItem("currentCharacterId");sessionStorage.setItem("currentCharacterName",$("#hero-name-input").val()),console.log("pick-a-book - currentCharacterId",a),I(),a===null?J(()=>{console.log("pick-a-book - addCharacter"),p("success",`${$("#hero-name-input").val()} was saved successfully!`),A(v),W()}):N(()=>{console.log("pick-a-book - duplicateCharacter"),p("success",`${$("#hero-name-input").val()} was duplicated successfully!`),A(v),W()})}),$(".edit-character-button").click(function(e){e.preventDefault(),$(".character-builder-container").show(),$(".book-selector-container").hide()}),$(".basket-confirmation_book-item").each(function(){let e=$(this).closest("div").find(".book-title").html().toLowerCase().replace(/ /g,"-");$(this).prop("id",e+"-basket-book")}),$(".book-container").each(function(){let e=$(this).closest("div").find(".book-title").html().toLowerCase().replace(/ /g,"-");$(this).prop("id",e+"-book")}),$(".book-container").click(function(e){e.preventDefault(),selectedBook=$(this).prop("id").slice(0,-5),localStorage.setItem("selectedBook",selectedBook),$(".book-small-list-container").hide(),$(".book-large-container").each(function(){let t="large-"+selectedBook;if($(this).attr("id")===t){$(this).show();var a=document.getElementById($(this).attr("id"));a.scrollIntoView()}else $(this).hide()})}),$(".book-large-container").each(function(){let e=$(this).closest("div").find(".book-title").html().toLowerCase().replace(/ /g,"-");$(this).prop("id","large-"+e)}),$(".story-back-button").click(function(e){e.preventDefault(),e.stopPropagation(),$(".book-small-list-container").css("display","flex"),$(".book-large-container").hide()}),$(".see-your-story-button").click(function(e){e.preventDefault(),e.stopPropagation();var t=!0;if($("form#wf-form-pronouns-form :input:radio:visible").each(function(){var o=$(this).attr("name");$("input:radio[name="+o+"]:checked").length===0&&(t=!1)}),$("form#wf-form-language-form :input:radio:visible").each(function(){var o=$(this).attr("name");$("input:radio[name="+o+"]:checked").length===0&&(t=!1)}),!t){p("error","Please enter values for both pronouns and language!");return}if(I(),$(".textarea:visible").val()&&!L($(".textarea:visible").val(),0,300))return;be(),Z();let a={characterName:window.sessionStorage.getItem("currentCharacterName"),hairstyleId:window.styleColourId,eyesId:window.eyesId,skintoneId:window.skinToneId,costumeId:window.costumeId,maskId:window.maskId,capeId:window.capeId,specialId:window.specialId,sidekickId:window.sidekickColourId,coverId:window.coverId,pronouns:window.pronouns,language:window.language,dedicationMessage:window.dedicationMessage};$(".add-to-cart-btn").attr("data-item-custom1-value",window.sessionStorage.getItem("currentCharacterName")),$(".add-to-cart-btn").attr("data-item-custom2-value",window.sessionStorage.getItem("currentCharacterId")),$(".add-to-cart-btn").attr("data-item-custom3-value",JSON.stringify(a)),ge(o=>{ke(()=>{location.href="/preview?id="+o+"&quick"})})}),$(".edit-character").click(function(e){e.preventDefault(),I(),N(()=>{location.href="/character-creation?page=characterSelection&edit=true"})}),$(".select-story").click(function(e){e.preventDefault(),location.href="/character-creation?page=bookSelection"}),$(".add-to-cart-btn").click(function(e){$(".basket-confirmation_book-item").each(function(){$(".character-name-span").text(sessionStorage.currentCharacterName);let t=`${selectedBook}-basket-book`;$(this).attr("id")===t?$(this).show():$(this).hide()}),Ie()}),$("#home-button").click(function(e){V()})});})();
