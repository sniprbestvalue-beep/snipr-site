
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

document.addEventListener("click", function(event) {
    const link = event.target.closest("a[data-snipr-outbound]");
    if (!link) return;

    if (typeof window.gtag === "function") {
        window.gtag("event", "merchant_click", {
            merchant: link.dataset.merchant || "unknown",
            deal_id: link.dataset.dealId || "",
            affiliate: link.dataset.affiliate === "true",
            transport_type: "beacon"
        });
    }
});

document.querySelectorAll("[data-share]").forEach(button => {
    button.addEventListener("click", async () => {
        if (navigator.share) {
            await navigator.share({
                title: document.title,
                url: button.dataset.share
            }).catch(() => {});
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(button.dataset.share);
            button.textContent = "LINK COPIED";
        }
    });
});
