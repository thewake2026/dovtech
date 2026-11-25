(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches, touch=window.matchMedia("(hover: none)").matches;

// scroll progress + header
var bar=$("#bar"),hd=$("header");
function onScroll(){var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);if(bar)bar.style.width=(p*100)+"%";hd.classList.toggle("s",h.scrollTop>30)}
addEventListener("scroll",onScroll,{passive:true});onScroll();
var bg=$(".burger"),lk=$(".links");
if(bg){bg.onclick=function(){var o=lk.classList.toggle("open");bg.setAttribute("aria-expanded",o)};$$(".links a").forEach(function(a){a.addEventListener("click",function(){lk.classList.remove("open")})})}

// split headings into animated words
var n=0;
function split(el){
  Array.prototype.slice.call(el.childNodes).forEach(function(c){
    if(c.nodeType===3){
      var f=document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(function(t){
        if(!t)return;
        if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(" "));return}
        var w=document.createElement("span");w.className="w";w.setAttribute("aria-hidden","true");
        var s=document.createElement("span");s.textContent=t;s.style.setProperty("--i",n++);w.appendChild(s);f.appendChild(w);
      });
      c.parentNode.replaceChild(f,c);
    }else if(c.nodeType===1){split(c)}
  });
}
$$("[data-split]").forEach(function(el){
  var label=el.textContent.trim();el.setAttribute("aria-label",label);n=0;
  if(!reduce)split(el);
});

// reveal on scroll
var io="IntersectionObserver" in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");if(e.target.dataset.count)count(e.target);io.unobserve(e.target)}})},{threshold:.15}):null;
$$(".rv,[data-split],.steps").forEach(function(el,i){
  if(el.classList.contains("rv"))el.style.transitionDelay=(i%3)*90+"ms";
  io?io.observe(el):el.classList.add("in");
});
setTimeout(function(){$$(".hero [data-split]").forEach(function(e){e.classList.add("in")})},120);

// counters
function count(el){
  var to=+el.dataset.count,t0=null;
  if(reduce){el.textContent=to;return}
  (function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1200,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)})(performance.now());
}
$$("[data-count]").forEach(function(el){io?io.observe(el):count(el)});

// typed words
var tw=$("#typed");
if(tw){
  var words=["websites","web apps","dashboards","order systems","booking tools"],wi=0,ci=0,del=false;
  if(reduce){tw.textContent=words[0]}else(function tick(){
    var w=words[wi];ci+=del?-1:1;tw.textContent=w.slice(0,ci);
    var d=del?45:85;
    if(!del&&ci===w.length){d=1500;del=true}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=300}
    setTimeout(tick,d);
  })();
}

// live dashboard mock
var rows=$("#rows");
if(rows){
  var names=["Emma R.","Daniel K.","Aisha M.","Liam O.","Sofia L.","Noah T.","Grace A.","Mateo P."],items=["2 items","1 item","3 items","4 items"],labels=["Received","Preparing","On the way","Delivered"];
  var num=1040,list=[],orders=0,done=0,oe=$("#sOrders"),de=$("#sDone");
  function draw(full){
    if(full){rows.innerHTML="";list.forEach(function(o){var r=document.createElement("div");r.className="row";r.id="r"+o.id;r.innerHTML='<span><b>#'+o.id+'</b> · '+o.n+' · '+o.i+'</span><span class="chip c'+o.s+'">'+labels[o.s]+'</span>';rows.appendChild(r)})}
  }
  function addOrder(){
    num++;orders++;var o={id:num,n:names[num%names.length],i:items[num%items.length],s:0};list.unshift(o);
    var r=document.createElement("div");r.className="row";r.id="r"+o.id;r.innerHTML='<span><b>#'+o.id+'</b> · '+o.n+' · '+o.i+'</span><span class="chip c0">Received</span>';
    rows.insertBefore(r,rows.firstChild);
    if(list.length>4){var x=list.pop(),xe=$("#r"+x.id);if(xe)xe.remove()}
    if(oe)oe.textContent=orders;
  }
  function advance(){
    var c=list.filter(function(o){return o.s<3});if(!c.length)return;
    var o=c[c.length-1];o.s++;var ch=$("#r"+o.id+" .chip");
    if(ch){ch.textContent=labels[o.s];ch.className="chip c"+o.s}
    if(o.s===3){done++;if(de)de.textContent=done}
  }
  addOrder();addOrder();addOrder();advance();advance();
  if(!reduce){var k=0;setInterval(function(){k++;if(k%2===0)addOrder();else advance()},1500)}
}

// 3D tilt + magnetic buttons (mouse only)
if(!touch&&!reduce){
  $$(".card").forEach(function(c){
    c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(900px) rotateY("+x*9+"deg) rotateX("+(-y*9)+"deg) translateY(-6px)"});
    c.addEventListener("mouseleave",function(){c.style.transform=""});
  });
  $$(".btn").forEach(function(b){
    b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.22)+"px,"+((e.clientY-r.top-r.height/2)*.32)+"px)"});
    b.addEventListener("mouseleave",function(){b.style.transform=""});
  });
  var gl=$("#glow");
  if(gl)addEventListener("mousemove",function(e){gl.style.left=e.clientX+"px";gl.style.top=e.clientY+"px"},{passive:true});
}

// live preview loader on case pages
var pb=$(".play");
if(pb){pb.onclick=function(){var s=pb.parentNode,f=document.createElement("iframe");f.src=pb.dataset.src;f.title=pb.dataset.title;f.loading="lazy";s.appendChild(f);pb.remove()}}

// contact form -> sends to our inbox (no email app needed)
var fm=$("#f");
if(fm){fm.onsubmit=function(e){
  e.preventDefault();
  var btn=$("button",fm),out=$("#fs"),old=btn.textContent;
  btn.disabled=true;btn.textContent="Sending...";out.textContent="";
  fetch("https://formsubmit.co/ajax/dovtechagency@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
    body:JSON.stringify({name:$("#n").value,email:$("#e").value,business:$("#b").value||"-",message:$("#m").value,_subject:"New project enquiry from "+$("#n").value,_template:"table",_captcha:"false",_honey:$("#h").value})})
  .then(function(r){return r.json()})
  .then(function(j){
    if(j&&(j.success===true||j.success==="true")){fm.reset();out.style.color="#7BEFA6";out.textContent="Thank you. Your message was sent. We will reply by email."}
    else throw new Error("fail");
  })
  .catch(function(){out.style.color="#FFC94D";out.textContent="Sorry, that did not send. Please email us directly at dovtechagency@gmail.com."})
  .then(function(){btn.disabled=false;btn.textContent=old});
}}
})();
