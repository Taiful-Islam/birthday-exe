const screens = ["boot","welcome","memories","codewish","final","qr"];

function showScreen(id){
  screens.forEach(s => document.getElementById(s).classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}

function runSurprise(){
  burstConfetti();
  showScreen("final");
}

function burstConfetti(){
  const colors=["#a855f7","#22c55e","#f59e0b","#38bdf8","#f472b6","#fff"];
  for(let i=0;i<110;i++){
    const el=document.createElement("div");
    el.style.position="fixed";
    el.style.left=(50+Math.random()*20-10)+"%";
    el.style.top="45%";
    el.style.width=(5+Math.random()*7)+"px";
    el.style.height=(8+Math.random()*10)+"px";
    el.style.background=colors[Math.floor(Math.random()*colors.length)];
    el.style.zIndex="999";
    el.style.borderRadius="2px";
    el.style.pointerEvents="none";
    document.body.appendChild(el);
    const x=(Math.random()-0.5)*1000, y=500+Math.random()*500, r=Math.random()*720;
    el.animate(
      [{transform:"translate(0,0) rotate(0)",opacity:1},
       {transform:`translate(${x}px,${y}px) rotate(${r}deg)`,opacity:0}],
      {duration:1800+Math.random()*1200,easing:"cubic-bezier(.2,.7,.2,1)"}
    ).onfinish=()=>el.remove();
  }
}

function makeQR(){
  const input=document.getElementById("urlInput");
  const url=input.value.trim();
  const box=document.getElementById("qrcode");
  box.innerHTML="";
  if(!url){
    alert("Paste your deployed website URL first.");
    input.focus();
    return;
  }
  if(typeof QRCode==="undefined"){
    alert("QR library is still loading. Please try again.");
    return;
  }
  new QRCode(box,{
    text:url,
    width:230,
    height:230,
    colorDark:"#000000",
    colorLight:"#ffffff",
    correctLevel:QRCode.CorrectLevel.H
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  setTimeout(()=>{
    // Keep the boot screen visible until the user clicks.
  },500);
});
