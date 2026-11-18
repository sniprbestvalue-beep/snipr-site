
const search=document.querySelector("#search");
const buttons=[...document.querySelectorAll("[data-filter]")];
let category="all";
function refresh(){
 const query=(search?.value||"").toLowerCase();
 document.querySelectorAll(".card").forEach(card=>{
  card.hidden=!(card.textContent.toLowerCase().includes(query)
   &&(category==="all"||card.dataset.category===category));
 });
}
search?.addEventListener("input",refresh);
buttons.forEach(button=>button.addEventListener("click",()=>{
 category=button.dataset.filter;
 buttons.forEach(b=>b.classList.toggle("active",b===button));
 refresh();
}));
