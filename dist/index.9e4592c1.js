!function(){let e=[];async function t(){try{let t=await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");if(!t.ok)throw Error("fel vid hämtning av data..");e=await t.json(),n(e)}catch(e){console.error(e),document.querySelector("#error").innerHTML="<p>fel vid anslutning - prova igen senare</p>"}}function n(e){let t=document.querySelector("#tabell tbody");t.innerHTML="",e.forEach(e=>{let n=document.createElement("tr");n.innerHTML=`
            <td>${e.code}</td>
            <td>${e.coursename}</td>
            <td>${e.progression}</td>
        `,t.appendChild(n)})}function o(t){let o=[...e];o.sort((e,n)=>e[t]<n[t]?-1:+(e[t]>n[t])),n(o)}window.onload=()=>{t()},document.querySelector("#sok").addEventListener("input",function(){(function(){let t=document.querySelector("#sok").value.toLowerCase();n(e.filter(e=>e.code.toLowerCase().includes(t)||e.coursename.toLowerCase().includes(t)))})()}),document.querySelector("#kod").addEventListener("click",()=>o("code")),document.querySelector("#namn").addEventListener("click",()=>o("coursename")),document.querySelector("#progression").addEventListener("click",()=>o("progression"))}();
//# sourceMappingURL=index.9e4592c1.js.map
