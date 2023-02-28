"use strict";(()=>{function l(r,e,t){if(r==="success"?$(".alert-banner").css("background-color","#198754"):r==="error"&&$(".alert-banner").css("background-color","#dc3545"),t){let a=$(".alert-list");a.empty(),t.forEach(o=>{a.append($("<li>").text(o))}),a.show(),$(".alert-text-block").hide()}else $(".alert-banner > .alert-text-block > strong").text(e),$(".alert-list").hide(),$(".alert-text-block").show();$(".alert-banner").show(),setTimeout(function(){$(".alert-banner").hide()},5e3)}function Z(){document.getElementById("loading-screen").style.display="flex"}function y(){document.getElementById("loading-screen").style.display="none"}var x,T,R,q,U,v,V;window.numberPerPage;var M;window.currentPage=1;window.numberOfPages;function $e(r){r==="hair"?(x=document.querySelectorAll(".hair-collection-wrapper.black .hair-style-container"),T=document.querySelectorAll(".hair-collection-wrapper.blonde .hair-style-container"),R=document.querySelectorAll(".hair-collection-wrapper.brown .hair-style-container"),q=document.querySelectorAll(".hair-collection-wrapper.red .hair-style-container"),U=document.querySelectorAll(".hair-collection-wrapper.white .hair-style-container"),V=x.length):(v=document.querySelectorAll(`.${r}-collection-wrapper .character-item-container`),V=v.length),window.numberOfPages=Math.ceil(V/window.numberPerPage)}function ve(r){let e;if(r==="hair"){switch(window.hairColour){case"black":e=x;break;case"blonde":e=T;break;case"brown":e=R;break;case"red":e=q;break;case"white":e=U;break}e==null||e.forEach((t,a)=>{t.querySelector('input[name="hair-style"]').checked&&(M=a)})}else{let t;switch(r){case"skin":t="skin-tone";break;case"mask":t="mask";break;case"special":t="special";break}v==null||v.forEach((a,o)=>{a.querySelector(`input[name="${t}"]`).checked?M=o:M=0})}window.currentPage=Math.ceil((M+1)/9)}function w(r,e){$e(e),r||ve(e);let t=(window.currentPage-1)*window.numberPerPage,a=t+window.numberPerPage;if(e==="hair"){var o=Array.prototype.slice.call(x,t,a),n=Array.prototype.slice.call(T,t,a),c=Array.prototype.slice.call(R,t,a),i=Array.prototype.slice.call(q,t,a),s=Array.prototype.slice.call(U,t,a);f(x),f(T),f(R),f(q),f(U),d(o),d(n),d(c),d(i),d(s)}else{var h=Array.prototype.slice.call(v,t,a);f(v),d(h)}function d(S){[].forEach.call(S,function(g){g.style.display="block"})}function f(S){[].forEach.call(S,function(g){g.style.display="none"})}}function k(){return Snipcart.store.getState().customer.status==="SignedIn"?Snipcart.store.getState().customer.email:""}function Y(){Snipcart.store.getState().customer.status==="SignedIn"?($(".nav-login-btn").html("Profile"),$(".select-character").show(),$(".new-character-button").show(),window.innerWidth<=991?($(".character-selector-container-mobile").show(),$(".character-selector-container").hide()):($(".character-selector-container-mobile").hide(),$(".character-selector-container").show())):($(".nav-login-btn").html("Sign In"),$(".select-character").hide(),$(".new-character-button").hide(),$(".character-selector-container-mobile").hide(),$(".character-selector-container").hide())}function A(r,e,t){let a=[];return(r.length>t||r.length<e)&&a.push(`Your input must be between ${e} and ${t} characters!`),/^([a-zA-Z0-9 !,.?]+)$/.test(r)||a.push("Invalid character detected! Allowed characters: [a-z, 0-9, !,.?]"),!Array.isArray(a)||!a.length?!0:(l("error","",a),!1)}function te(){let r=Snipcart.store.getState().customer.status==="SignedIn",e="";if(r){let t=k();z(t).then(o=>{if(P(y),o.length>0){let n=o.reduce((c,i)=>c.fields.MODIFIED_AT>i.fields.MODIFIED_AT?c:i);H(n.fields)}else j()})}else e=F(),e.then(t=>{H(t.fields)})}function H(r){sessionStorage.setItem("currentCharacterName",r.NAME),sessionStorage.setItem("currentCharacterId",r.RECORD_ID);let e=r.HAIR.split("-"),t=r.SIDEKICK.split("-"),a=r.SPECIAL?r.SPECIAL.split(","):[];$('input[name="special"]:checkbox').removeAttr("checked"),$("input[value="+e[1]+"]").prop("checked",!0),$("input[value="+r.HAIR+"]").prop("checked",!0),$("input[value="+r.EYES+"]").prop("checked",!0),$("input[value="+r.SKIN+"]").prop("checked",!0),$("input[value="+r.COSTUME+"]").prop("checked",!0),$("input[value="+r.MASK+"]").prop("checked",!0),$("input[value="+r.CAPE+"]").prop("checked",!0),a&&a.forEach(o=>{$("input[value="+o+"]").prop("checked",!0),$("input[value="+o+"]").parent().find(".w-checkbox-input").addClass("w--redirected-checked")}),$("input[value="+r.SIDEKICK+"]").prop("checked",!0),$("input[value=sk-"+t[1]+"]").prop("checked",!0),$("input[value="+r.COVER_COLOUR+"]").prop("checked",!0),$("#hero-name-input").val(r.NAME),$("input[value="+r.PRONOUNS+"]").prop("checked",!0),$("input[value="+r.LANGUAGE+"]").prop("checked",!0),re()}function re(){window.getSelectedStyles(),O(),_(function(){w(void 0,window.stepName)}),u(function(){Snipcart.store.getState().customer.status==="SignedIn"||y()})}function ae(){if(!(Snipcart.store.getState().customer.status==="SignedIn")){l("error","You must sign in to save a character.");return}Z();let e=$("#hero-name-input").val();if(!A(e,2,50))return;let a=sessionStorage.getItem("currentCharacterId");sessionStorage.setItem("currentCharacterName",e),a===null?K(l("success",`${e} was saved successfully!`)):L(l("success",`${e} was saved successfully!`)),P(y)}function j(){$(".name-input").val("");let r=p('input[name="hair-colour"]'),e=p('input[name="hair-style"]'),t=p('input[name="Eye-Colour"]'),a=p('input[name="skin-tone"]'),o=p('input[name="costume"]'),n=p('input[name="mask"]'),c=p('input[name="cape"]'),i=p('input[name="special"]'),s=p('input[name="sidekick-colour"]'),h=p('input[name="sidekick"]'),d=p('input[name="cover"]');$('input[name="special"]:checkbox').removeAttr("checked"),$('input[name="hair-colour"]').eq(r).prop("checked",!0),$('input[name="hair-style"]').eq(e).prop("checked",!0),$('input[name="Eye-Colour"]').eq(t).prop("checked",!0),$('input[name="skin-tone"]').eq(a).prop("checked",!0),$('input[name="costume"]').eq(o).prop("checked",!0),$('input[name="mask"]').eq(n).prop("checked",!0),$('input[name="cape"]').eq(c).prop("checked",!0),$('input[name="special"]').eq(i).prop("checked",!0),$('input[name="special"]').eq(i).parent().find(".w-checkbox-input").addClass("w--redirected-checked"),$('input[name="sidekick-colour"]').eq(s).prop("checked",!0),$('input[name="sidekick"]').eq(h).prop("checked",!0),$('input[name="cover"]').eq(d).prop("checked",!0),sessionStorage.clear(),re()}function u(r){if(styleColourId)$(".hair:visible").first().hide(),$("."+styleColourId).show();else{let{length:e}=$(".hair").length,t=Math.floor(Math.random()*e);$(".hair").eq(t).show()}if(eyesId)$(".eyes:visible").first().hide(),$("."+eyesId).show();else{let{length:e}=$(".eyes").length,t=Math.floor(Math.random()*e);$(".eyes").eq(t).show()}if(skinToneId)$(".skintone:visible").first().hide(),$("."+skinToneId).show();else{let{length:e}=$(".skintone").length,t=Math.floor(Math.random()*e);$(".skintone").eq(t).show()}if(costumeId)$(".costume:visible").first().hide(),$(".sidekick-costume:visible").first().hide(),$("."+costumeId).show(),$(`.${sidekickId}-${costumeId}`).show();else{let{length:e}=$(".costume").length,t=Math.floor(Math.random()*e);$(".costume").eq(t).show()}if(maskId)$(".mask:visible").first().hide(),$(".sidekick-mask:visible").first().hide(),$("."+maskId).show(),$(`.${sidekickId}-${maskId}`).show();else{let{length:e}=$(".mask").length,t=Math.floor(Math.random()*e);$(".mask").eq(t).show()}if(capeId)$(".cape:visible").first().hide(),$(".sidekick-cape:visible").first().hide(),$("."+capeId).show(),$(`.${sidekickId}-${capeId}`).show();else{let{length:e}=$(".cape").length,t=Math.floor(Math.random()*e);$(".cape").eq(t).show()}if(specialIds)$(".special:visible").hide(),specialIds.forEach(e=>{$("."+e).show()});else{let{length:e}=$(".special").length(),t=Math.floor(Math.random()*e);$(".special").eq(t).show()}if(sidekickColourId)$(".sidekick:visible").first().hide(),$("."+sidekickColourId).show();else{let{length:e}=$(".sidekick").length,t=Math.floor(Math.random()*e);$(".sidekick").eq(t).show()}if(coverId)$(".cover:visible").first().hide(),$("."+coverId).show();else{let{length:e}=$(".cover").length,t=Math.floor(Math.random()*e);$(".cover").eq(t).show()}r&&r()}function oe(){ne().then(Ie).then(ce).then(window.randomiseOrLoadCharacter)}function ne(r){return fetch(`https://make-believe-final.webflow.io/character-items${r||""}`).then(e=>{if(e.status===404)throw new Error("Page could not be found.");return e.text()}).then(e=>{let t=document.createElement("div");t.innerHTML=e;let a=t.querySelectorAll(".character-items"),o=Array.from(a).map(c=>{let i={};return c.querySelectorAll("span").forEach(h=>{i[h.className]=h.textContent}),i});characterObjects=characterObjects.concat(o);let n=t.querySelector(".w-pagination-next");return n?ne(`?${n.href.split("?")[1]}`):characterObjects})}function Ie(){let r=document.querySelector(".character-preview");characterObjects.forEach(e=>{let t=document.createElement("div");t.classList.add("character-item");let a=document.createElement("div");a.classList.add("character-item-category");let o=document.createTextNode(e["character-item-category"]);a.appendChild(o);let n=document.createElement("div");n.classList.add("character-item-preview-label");let c=document.createTextNode(e["character-item-preview-label"]);n.appendChild(c);let i=document.createElement("img");i.classList.add("character-item-preview-image"),i.src=e["character-item-preview-image"],t.appendChild(a),t.appendChild(n),t.appendChild(i),r.appendChild(t)})}function de(){$("form#character-creation-form :input").each(function(){let r=$(this).closest("label").find("span").html();$(this).val(r)})}function ce(){$(".character-item").each(function(){let r=$(this).find(".character-item-preview-label").text(),e=$(this).find(".character-item-category").text().toLowerCase();$(this).find(".character-item-preview-image").addClass(r).addClass(e)})}function le(){$(".book-controls").each(function(){$(this).attr("id").slice(0,-9)===selectedBook?$(this).css("display","flex"):$(this).hide()})}function p(r){let{length:e}=$(r);return Math.floor(Math.random()*e)}function J(r){$("#step-"+formStep+"-button").prop("disabled",!1).removeClass("selected-form-step"),$(r).prop("disabled",!0).addClass("selected-form-step")}function P(r){let e=k(),t=z(e),a=$(".character-selector-list"),o=$(".character-dropdown-list");a.empty(),o.empty(),t.then(n=>{var c=0;$.each(n,function(i){var s=$("<div/>",{class:"character-list-item-container"}),h=$("<div/>",{class:"character-list-item",id:this.id,text:this.fields.NAME}),d=$("<div/>",{class:"character-list-item-delete",id:this.id});d.prepend('<img class="bin-icon" src="https://uploads-ssl.webflow.com/6318bc2064b174efcf6572f4/63738d42ccaf13e6da927487_recycle-bin-icon.svg"/>'),s.append(h),s.append(d),s.clone().appendTo(a),s.clone().appendTo(o),c++,c===n.length&&r&&r()}),$(".w-dropdown-list div").click(function(){$(".dropdown").triggerHandler("w-close.w-dropdown")}),$(".character-list-item").click(function(i){i.preventDefault(),i.stopPropagation();let s=$(this).attr("id");F(s).then(d=>{H(d.fields)})}),$(".character-list-item-delete").click(function(i){i.preventDefault(),i.stopPropagation();let s=$(this).attr("id"),h=$(this).parent().find(".character-list-item").text();if(sessionStorage.getItem("currentCharacterId")===s){l("error","You cannot delete a character that is currently loaded.");return}ue(s,h),$(`#${s}`).parent().remove()})})}function O(){hairColour=$("input[name=hair-colour]:checked","#character-creation-form").val().toLowerCase(),sidekickColour=$("input[name=sidekick-colour]:checked","#character-creation-form").val().toLowerCase(),sidekickColour=sidekickColour.substr(3),$(".hair-collection-wrapper").each(function(){$(this).attr("class").includes(hairColour)?$(this).show():$(this).hide()}),$(".sidekick-container :input").each(function(){$(this).val().includes(sidekickColour)?$(this).closest(".sidekick-container").show():$(this).closest(".sidekick-container").show().hide()})}function I(){styleColourId=hairstyleId+"-"+hairColour.toLowerCase(),sidekickColourId=sidekickId+"-"+sidekickColour.toLowerCase()}function _(r){I(),$('input[value="'+styleColourId+'"]').prop("checked",!0),r&&r()}function he(r){I(),$('input[value="'+sidekickColourId+'"]').prop("checked",!0),r&&r()}function z(r){var e=new Headers;e.append("Content-Type","application/json");var t={method:"get",headers:e,redirect:"follow"};return fetch(`https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula=USER_EMAIL="${r}"&t=${Date.now()}`,t).then(o=>o.text()).then(o=>(o=JSON.parse(o),o.records.slice(Math.max(o.records.length-5,0)))).catch(o=>console.log("error",o))}function F(r){let e=r||sessionStorage.getItem("currentCharacterId"),t=new Headers;t.append("Content-Type","application/json");let a={method:"get",headers:t,redirect:"follow"};return fetch(`https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula={RECORD_ID}="${e}"&t=${Date.now()}`,a).then(n=>n.json()).then(n=>n.records[0]).catch(n=>console.log("error",n))}function pe(){let r=[{CHARACTER_ID:sessionStorage.getItem("currentCharacterId"),BOOK_ID:window.selectedBook,SESSION_ID:localStorage.getItem("sessionId"),USER_EMAIL:k(),PRONOUNS:window.pronouns,LANGUAGE:window.language,DEDICATION_MESSAGE:window.dedicationMessage}],e=new Headers;e.append("Content-Type","application/json");let t={method:"post",headers:e,redirect:"follow",body:JSON.stringify(r)};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Previews",t).then(a=>a.json()).then(a=>{window.currentPreviewId=`${a[0].fields.PREVIEW_ID}`;let o=new MasterPlan(document.getElementById("masterplan"),{clientID:"5140",jobID:window.currentPreviewId,theme:"light",embedType:"frame",thumbWidth:"300",hideNavBar:!0,autoFullscreen:!0,showLoginLink:!1,clientNameLink:!1,showSpreadNums:!1,customCss:{nestedToc:!0}});fetch(`https://hook.eu1.make.com/0kxggab30625jvpqkvviz6fo9dvxzryf?string=P-${encodeURIComponent(a[0].fields.RECORD_ID)}-CHOSEN`)}).catch(a=>console.log("error",a))}function K(r){let e=[{NAME:$("#hero-name-input").val(),USER_EMAIL:k(),HAIR:styleColourId,EYES:eyesId,SKIN:skinToneId,COSTUME:costumeId,MASK:maskId,CAPE:capeId,SPECIAL:specialIds.toString(),SIDEKICK:sidekickColourId,COVER_COLOUR:coverId}],t=new Headers;t.append("Content-Type","application/json");let a={method:"post",headers:t,redirect:"follow",body:JSON.stringify(e)};return fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters",a).then(n=>n.json()).then(n=>(fetch(`https://hook.eu1.make.com/0kxggab30625jvpqkvviz6fo9dvxzryf?string=C-${encodeURIComponent(n[0].fields.RECORD_ID)}-CREATED`),sessionStorage.setItem("currentCharacterId",n[0].fields.RECORD_ID),r&&r(),n[0])).catch(n=>console.log("error",n))}function L(r){let e=[{id:sessionStorage.getItem("currentCharacterId"),fields:{NAME:$("#hero-name-input").val(),USER_EMAIL:k(),HAIR:styleColourId,EYES:eyesId,SKIN:skinToneId,COSTUME:costumeId,MASK:maskId,CAPE:capeId,SPECIAL:specialIds.toString(),SIDEKICK:sidekickColourId,COVER_COLOUR:coverId}}],t=new Headers;t.append("Content-Type","application/json");let a={method:"put",headers:t,redirect:"follow",body:JSON.stringify(e)};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters",a).then(o=>o.json()).then(o=>{fetch(`https://hook.eu1.make.com/0kxggab30625jvpqkvviz6fo9dvxzryf?string=C-${sessionStorage.getItem(encodeURIComponent("currentCharacterId"))}-MODIFIED`),r&&r()}).catch(o=>console.log("error",o))}function ue(r,e){var t=new Headers;t.append("Content-Type","application/json");var a={method:"delete",headers:t,redirect:"follow",body:JSON.stringify([r])};fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=characters",a).then(o=>o.text()).then(l("success",`${e} was successfully deleted!`)).catch(o=>console.log("error",o))}function Se(){return localStorage.getItem("sessionId")}function me(){if(Se()===null){let r=uuidv4();localStorage.setItem("sessionId",r)}}function D(){$(".book-preview-container").hide(),$(".book-selector-container").hide(),$(".book-large-container").hide(),$(".character-builder-container").show(),$(".book-preview-container").hide(),$(".basket-confirmation-container").hide();var r=document.getElementById("character-builder-container");r.scrollIntoView()}function G(){$(".book-preview-container").hide(),$(".book-selector-container").show(),$(".book-small-list-container").show(),$(".book-large-container").hide(),$(".character-builder-container").hide(),$(".book-preview-container").hide(),$(".basket-confirmation-container").hide();var r=document.getElementById("book-selector-container");r.scrollIntoView()}function we(){$(".book-preview-container").hide(),$(".book-selector-container").hide(),$(".book-small-list-container").hide(),$(".book-large-container").hide(),$(".character-builder-container").hide(),$(".book-preview-container").show(),$(".basket-confirmation-container").hide();var r=document.getElementById("book-preview-container");r.scrollIntoView()}function fe(){$(".book-preview-container").hide(),$(".book-selector-container").hide(),$(".book-small-list-container").hide(),$(".book-large-container").hide(),$(".character-builder-container").hide(),$(".book-preview-container").hide(),$(".basket-confirmation-container").show();var r=document.getElementById("basket-confirmation-container");r.scrollIntoView()}window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{window.formStep=1,window.stepName="hair",window.hairstyleId="",window.hairColour="",window.styleColourId=hairstyleId+"-"+hairColour,window.eyesId="",window.skinToneId="",window.costumeId="",window.maskId="",window.capeId="",window.specialIds=[],window.sidekickId="",window.sidekickColour="",window.sidekickColourId=sidekickId+"-"+sidekickColour,window.coverId="",window.userId="",window.sessionId="",window.sessionRow="",window.selectedBook="",window.currentCharacterName="",window.pronouns="",window.language="",window.dedicationMessage="",window.characterObjects=[],window.currentPreviewId="",window.SnipcartSettings={publicApiKey:"NzAxOWMzODUtNmVjNS00NmEyLTlkNDktNDZhOTllYzIzMjkxNjM3OTc2MjY0NTYxOTc2NzY3",modalStyle:"side",currency:"gbp"},(()=>{var e,t;(t=(e=window.SnipcartSettings).version)!=null||(e.version="3.0");var a,o;(o=(a=window.SnipcartSettings).timeoutDuration)!=null||(a.timeoutDuration=2750);var n,c;(c=(n=window.SnipcartSettings).domain)!=null||(n.domain="cdn.snipcart.com");var i,s;(s=(i=window.SnipcartSettings).protocol)!=null||(i.protocol="https");var h=window.SnipcartSettings.version.includes("v3.0.0-ci")||window.SnipcartSettings.version!="3.0"&&window.SnipcartSettings.version.localeCompare("3.4.0",void 0,{numeric:!0,sensitivity:"base"})===-1,d=["focus","mouseover","touchmove","scroll","keydown"];window.LoadSnipcart=g,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f();function f(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy==="on-user-interaction"&&(d.forEach(m=>document.addEventListener(m,g)),setTimeout(g,window.SnipcartSettings.timeoutDuration)):g()}var S=!1;function g(){if(S)return;S=!0;let m=document.getElementsByTagName("head")[0],b=document.querySelector("#snipcart"),E=document.querySelector(`src[src^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][src$="snipcart.js"]`),C=document.querySelector(`link[href^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][href$="snipcart.css"]`);b||(b=document.createElement("div"),b.id="snipcart",b.setAttribute("hidden","true"),document.body.appendChild(b)),ge(b),E||(E=document.createElement("script"),E.src=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.js`,E.async=!0,m.appendChild(E)),C||(C=document.createElement("link"),C.rel="stylesheet",C.type="text/css",C.href=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.css`,m.prepend(C)),d.forEach(ke=>document.removeEventListener(ke,g))}function ge(m){!h||(m.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(m.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(m.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(m.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(m.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})(),$(document).ready(function(){document.addEventListener("snipcart.ready",()=>{let e=Snipcart.store.getState().customer.status==="SignedIn";window.location.pathname==="/"&&Snipcart.events.on("snipcart.initialized",c=>{Y()}),window.location.href.indexOf("character-creation")>-1&&(Snipcart.events.on("customer.signedin",c=>{$(".nav-login-btn").html("Profile"),$(".select-character").show(),$(".new-character-button").show(),window.innerWidth<=991?($(".character-selector-container-mobile").show(),$(".character-selector-container").hide()):($(".character-selector-container-mobile").hide(),$(".character-selector-container").show()),window.randomiseOrLoadCharacter()}),Snipcart.events.on("customer.signedout",c=>{sessionStorage.clear(),$(".nav-login-btn").html("Sign In"),$(".select-character").hide(),$(".new-character-button").hide(),$(".character-selector-container-mobile").hide(),$(".character-selector-container").hide(),window.randomiseOrLoadCharacter()}),Snipcart.events.on("snipcart.initialized",c=>{D(),Y(),J("#step-1-button"),de(),oe()}));var t=200,a=!0,o=function(){a&&(window.innerWidth<=767?window.numberPerPage=3:window.numberPerPage=9,w(void 0,window.stepName),a=!1,e&&(window.innerWidth<=991?($(".character-selector-container-mobile").show(),$(".character-selector-container").hide()):($(".character-selector-container-mobile").hide(),$(".character-selector-container").show())))},n=setInterval(o,t);o(),$(window).resize(function(){a=!0})})}),window.randomiseOrLoadCharacter=function(){let e=Snipcart.store.getState().customer.status==="SignedIn";$('input[name="fname"]').val()||(sessionStorage.getItem("currentCharacterId")===null&&!e?j():te())},window.getSelectedStyles=function(){let t=$("input[name=hair-style]:checked","#character-creation-form").val(),a=$("input[name=sidekick]:checked","#character-creation-form").val();hairstyleId=t.slice(0,5),eyesId=$("input[name=Eye-Colour]:checked","#character-creation-form").val().toLowerCase(),skinToneId=$("input[name=skin-tone]:checked","#character-creation-form").val().toLowerCase(),costumeId=$("input[name=costume]:checked","#character-creation-form").val().toLowerCase(),maskId=$("input[name=mask]:checked","#character-creation-form").val().toLowerCase(),capeId=$("input[name=cape]:checked","#character-creation-form").val().toLowerCase(),specialIds=[],$("input:checkbox[name=special]:checked").each(function(){specialIds.push($(this).val())}),sidekickId=a.slice(0,5),coverId=$("input[name=cover]:checked","#character-creation-form").val().toLowerCase()},$(".pagination-down-arrow").click(function(){window.currentPage!==window.numberOfPages&&(window.currentPage+=1,w(window.currentPage,window.stepName))}),$(".pagination-up-arrow").click(function(){window.currentPage!==1&&(window.currentPage-=1,w(window.currentPage,window.stepName))}),$(".save-character-button").click(function(e){e.stopPropagation(),e.preventDefault(),ae()}),$(".new-character-button, .new-character-button-large").click(function(e){e.preventDefault(),e.stopPropagation(),D(),j()}),$(".checkout-button").click(function(e){e.preventDefault(),e.stopPropagation(),window.location.hash||(window.location.hash="#/checkout")});function r(e,t){t.preventDefault();let a;switch(e){case"1":a="#F080B2",window.stepName="hair",w(void 0,"hair");break;case"2":a="#01AFDA";break;case"3":a="#77B82A",window.stepName="skin",w(void 0,"skin");break;case"4":a="#FCD100";break;case"5":a="#E84E10",window.stepName="mask",w(void 0,"mask");break;case"6":a="#01A187";break;case"7":a="#E30613",window.stepName="special",w(void 0,"special");break;case"8":a="#E30F6B";break;case"9":a="#0072BB";break}J(`#step-${e}-button`),$(`.form-step-${e}-container`).fadeIn("slow"),$(`.form-step-${formStep}-container`).css({display:"none"}),$(`<style>[type=radio]:checked + img { box-shadow: 0px 0px 0px 5px ${a};}</style>`).appendTo("head"),$("<style>[type=radio]:not(:checked) + img { box-shadow: none; }</style>").appendTo("head"),formStep=e}$(".step-button").click(function(e){let t=$(this).attr("id").match(/(\d+)/)[0];r(t,e)}),$('input[name="hair-colour"]').change(function(e){O(),_(),I(),u()}),$("input[name=hair-style]").change(function(e){getSelectedStyles(),I(),u()}),$("input[name=Eye-Colour]").change(function(e){eyesId=$("input[name=Eye-Colour]:checked","#character-creation-form").val().toLowerCase(),u()}),$("input[name=skin-tone]").change(function(e){skinToneId=$("input[name=skin-tone]:checked","#character-creation-form").val().toLowerCase(),u()}),$("input[name=costume]").change(function(e){costumeId=$("input[name=costume]:checked","#character-creation-form").val().toLowerCase(),u()}),$("input[name=mask]").change(function(e){maskId=$("input[name=mask]:checked","#character-creation-form").val().toLowerCase(),u()}),$("input[name=cape]").change(function(e){capeId=$("input[name=cape]:checked","#character-creation-form").val().toLowerCase(),u()}),$("input[name=special]").change(function(e){specialIds=[],$("input:checkbox[name=special]:checked").each(function(){specialIds.push($(this).val())}),u()}),$('input[name="sidekick-colour"]').change(function(e){O(),he(),I(),u()}),$("input[name=sidekick]").change(function(e){getSelectedStyles(),I(),u()}),$("input[name=cover]").change(function(e){coverId=$("input[name=cover]:checked","#character-creation-form").val().toLowerCase(),u()}),$("textarea#dedication").change(function(){window.dedicationMessage=$(this).val()}),$("input[name=pronoun]").change(function(){window.pronouns=$(this).val()}),$("input[name=language]").change(function(){window.language=$(this).val()}),$(".pick-a-book").click(function(e){if(e.preventDefault(),!A($("input[name=fname]").val(),2,50))return;let a=sessionStorage.getItem("currentCharacterId");sessionStorage.setItem("currentCharacterName",$("#hero-name-input").val()),a===null?K(l("success",`${$("#hero-name-input").val()} was saved successfully!`)):L(l("success",`${$("#hero-name-input").val()} was saved successfully!`)),P(y),G()}),$(".edit-character-button").click(function(e){e.preventDefault(),$(".character-builder-container").show(),$(".book-selector-container").hide()}),$(".basket-confirmation_book-item").each(function(){let e=$(this).closest("div").find(".book-title").html().toLowerCase().replace(/ /g,"-");$(this).prop("id",e+"-basket-book")}),$(".book-container").each(function(){let e=$(this).closest("div").find(".book-title").html().toLowerCase().replace(/ /g,"-");$(this).prop("id",e+"-book")}),$(".book-container").click(function(e){e.preventDefault(),selectedBook=$(this).prop("id").slice(0,-5),$(".book-small-list-container").hide(),$(".book-large-container").each(function(){let t="large-"+selectedBook;if($(this).attr("id")===t){$(this).show();var a=document.getElementById($(this).attr("id"));a.scrollIntoView()}else $(this).hide()})}),$(".book-large-container").each(function(){let e=$(this).closest("div").find(".book-title").html().toLowerCase().replace(/ /g,"-");$(this).prop("id","large-"+e)}),$(".story-back-button").click(function(e){e.preventDefault(),e.stopPropagation(),$(".book-small-list-container").css("display","flex"),$(".book-large-container").hide()}),$(".see-your-story-button").click(function(e){e.preventDefault(),e.stopPropagation();var t=!0;if($("form#wf-form-pronouns-form :input:radio:visible").each(function(){var o=$(this).attr("name");$("input:radio[name="+o+"]:checked").length===0&&(t=!1)}),$("form#wf-form-language-form :input:radio:visible").each(function(){var o=$(this).attr("name");$("input:radio[name="+o+"]:checked").length===0&&(t=!1)}),!t){l("error","Please enter values for both pronouns and language!");return}if($(".textarea:visible").val()&&!A($(".textarea:visible").val(),0,300))return;me(),le();let a={characterName:window.sessionStorage.getItem("currentCharacterName"),hairstyleId:window.styleColourId,eyesId:window.eyesId,skintoneId:window.skinToneId,costumeId:window.costumeId,maskId:window.maskId,capeId:window.capeId,specialId:window.specialId,sidekickId:window.sidekickColourId,coverId:window.coverId,pronouns:window.pronouns,language:window.language,dedicationMessage:window.dedicationMessage};$(".add-to-cart-btn").attr("data-item-custom1-value",window.sessionStorage.getItem("currentCharacterName")),$(".add-to-cart-btn").attr("data-item-custom2-value",window.sessionStorage.getItem("currentCharacterId")),$(".add-to-cart-btn").attr("data-item-custom3-value",JSON.stringify(a)),pe(),L(),we()}),$(".edit-character").click(function(e){e.preventDefault(),D()}),$(".select-story").click(function(e){e.preventDefault(),G()}),$(".add-to-cart-btn").click(function(e){$(".basket-confirmation_book-item").each(function(){$(".character-name-span").text(sessionStorage.currentCharacterName);let t=`${selectedBook}-basket-book`;$(this).attr("id")===t?$(this).show():$(this).hide()}),fe()}),$("#home-button").click(function(e){D()})});})();
