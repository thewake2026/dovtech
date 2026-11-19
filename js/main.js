(async function(){
var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var paras=function(t){return String(t||"").split(/\n\s*\n/).filter(Boolean).map(function(p){return "<p>"+esc(p).replace(/\n/g,"<br>")+"</p>"}).join("")};
var page=document.body.dataset.page, app=$("#app"), D=null;
try{ D=await (await fetch("content/site.json",{cache:"no-cache"})).json(); }catch(e){}
if(!D){ app.innerHTML='<section><div class="wrap"><h2>This page needs to be opened from a website.</h2><p>Upload the files to GitHub Pages (or any host) and open the link. Opening the file straight from your phone or computer will not load the content.</p></div></section>'; return; }
var C=D.contact||{}, wa=function(t){return "https://wa.me/"+C.whatsapp+"?text="+encodeURIComponent(t)};
var hello="Hi Victor, I'd like to talk about a website/app for my business.";

// header + footer
var pages=[["index.html","Home","home"],["services.html","Services","services"],["portfolio.html","Portfolio","portfolio"],["about.html","About","about"],["contact.html","Contact","contact"]];
$("#hdr").innerHTML='<div class="wrap"><nav aria-label="Main"><a class="logo" href="index.html">DOV<span> TECH</span></a><button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button><div class="links">'+pages.map(function(p){return '<a href="'+p[0]+'"'+(p[2]===page?' class="on" aria-current="page"':'')+'>'+p[1]+'</a>'}).join("")+'</div></nav></div>';
var bg=$(".burger"), lk=$(".links");
bg.onclick=function(){var o=lk.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
$("#ftr").innerHTML='<div class="wrap"><div><strong style="color:#fff">DOV TECH</strong><br>Websites and apps for business owners.</div><div>WhatsApp: <a href="'+wa(hello)+'" target="_blank" rel="noopener">+'+esc(C.whatsapp)+'</a><br>Email: <a href="mailto:'+esc(C.email)+'">'+esc(C.email)+'</a></div><div>© 2026 DOV TECH</div></div>';

var shapes='<span class="shape c1"></span><span class="shape c2"></span><span class="shape c3"></span><span class="shape s1"></span><span class="shape s2"></span><span class="shape s3"></span><span class="shape l1"></span><span class="shape l2"></span><span class="shape l3"></span>';
var hero=function(h,s,extra,small){return '<div class="hero'+(small?' small':'')+'">'+shapes+'<div class="wrap"><h1>'+h+'</h1><p class="sub">'+s+'</p>'+(extra||"")+'</div></div>'};
var icon=function(k){return k==="gr"?'<div class="ico i-gr"><i></i><i></i><i></i><i></i></div>':'<div class="ico i-'+esc(k||"sq")+'"></div>'};
var cover=function(p){return p.cover?'<div class="cover"><img src="'+esc(p.cover)+'" alt="'+esc(p.title)+' screenshot" loading="lazy"></div>':'<div class="cover ph">'+esc((p.title||"").split(" ").map(function(w){return w[0]}).join("").slice(0,3))+'</div>'};
var card=function(p){return '<a class="box rv" href="portfolio.html#'+esc(p.slug)+'">'+cover(p)+'<span class="tag">'+esc(p.category)+'</span><h3 style="margin-top:2px">'+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p></a>'};
var ctaBlock=function(){return '<section class="cta"><span class="orb o1"></span><span class="orb o2"></span><div class="wrap"><h2>Ready to run your business from one place?</h2><p>Send me a message about your business and what you need. Know a business owner who could use this? Send them my way.</p><a class="btn" href="'+wa(hello)+'" target="_blank" rel="noopener">Message me on WhatsApp</a><p class="small" style="margin:20px auto 0;font-family:Segoe UI,Arial,sans-serif;font-size:15px">Prefer email? <a href="mailto:'+esc(C.email)+'">'+esc(C.email)+'</a></p></div></section>'};

var H="";
if(page==="home"){
  H=hero(esc(D.hero.headline),esc(D.hero.sub),'<a class="btn" href="portfolio.html">Check out my work</a><a class="btn alt" href="contact.html">Let’s talk</a><div class="tracker" aria-label="Example of an order tracker your customers would see"><div class="top"><span><strong>Order #0142</strong> &nbsp;Two bags of rice, one crate of eggs</span><span>Updated by the owner with one tap</span></div><ol class="steps" id="steps"><li class="done">Received</li><li class="done now">Preparing</li><li>On the way</li><li>Delivered</li></ol><p class="note">This is what your customers see, so they stop asking “Is my order ready?”</p></div>');
  H+='<section><span class="ring"></span><div class="wrap"><h2 class="rv">It’s not you. It’s the system.</h2><p class="q rv">Do you still write orders in a notebook?</p><p class="q rv">Do customers keep asking if their order is ready?</p><p class="q rv">Do you forget who paid and who didn’t?</p><p class="rv" style="max-width:34em">Most business owners work hard and still lose time and money because everything lives in chats and memory. That can be fixed, and it doesn’t have to be complicated.</p></div></section>';
  H+='<section class="soft"><div class="wrap"><h2 class="rv">What I build</h2><p class="lead rv">Everything is made to be simple for you and easy for your customers.</p><div class="grid">'+D.services.map(function(s){return '<a class="box rv" href="services.html">'+icon(s.icon)+'<h3>'+esc(s.title)+'</h3><p>'+esc(s.summary)+'</p></a>'}).join("")+'</div></div></section>';
  H+='<section><div class="wrap"><h2 class="rv">Recent work</h2><p class="lead rv">Systems I’ve made to solve real problems, the same way I’ll approach yours.</p><div class="grid">'+D.projects.slice(0,3).map(card).join("")+'</div><p style="margin-top:26px"><a class="btn dark" href="portfolio.html">See all work</a></p></div></section>';
  H+='<section class="soft"><div class="wrap"><h2 class="rv">How it works</h2><ol class="how" id="how"><span class="rail"></span><li><span class="n">1</span><div><h3>Tell me about your business</h3><p>A short chat about what you sell and how you work now.</p></div></li><li><span class="n">2</span><div><h3>We agree on what you need</h3><p>Clear features and a clear price, so there are no surprises.</p></div></li><li><span class="n">3</span><div><h3>I build it and launch it</h3><p>You get a working system, and I stay available for updates and support.</p></div></li></ol></div></section>';
  H+=ctaBlock();
}
if(page==="services"){
  H=hero("What I build","Pick one, or combine them. Each one is built to be simple for you and easy for your customers.","",1);
  H+='<section><div class="wrap">'+D.services.map(function(s){return '<div class="svc-row rv">'+icon(s.icon)+'<div><h3>'+esc(s.title)+'</h3><p>'+esc(s.summary)+'</p><p class="who">Best for: '+esc(s.who)+'</p><ul>'+(s.includes||[]).map(function(i){return '<li>'+esc(i)+'</li>'}).join("")+'</ul></div></div>'}).join("")+'</div></section>'+ctaBlock();
}
if(page==="portfolio"){
  var draw=function(){
    var slug=location.hash.slice(1), p=D.projects.filter(function(x){return x.slug===slug})[0];
    window.scrollTo(0,0);
    if(p){
      app.innerHTML='<section class="detail"><div class="wrap"><a class="back" href="portfolio.html">← All work</a><span class="tag">'+esc(p.category)+'</span><h1>'+esc(p.title)+'</h1><p class="lead">'+esc(p.summary)+'</p>'+cover(p)+'<h3>The problem</h3>'+paras(p.problem)+'<h3>What I built</h3>'+paras(p.solution)+(p.result?'<h3>Result</h3>'+paras(p.result):'')+((p.gallery&&p.gallery.length)?'<h3>More images</h3><div class="shots">'+p.gallery.map(function(g){return '<figure><img src="'+esc(g.image)+'" alt="'+esc(g.caption||p.title)+'" loading="lazy">'+(g.caption?'<figcaption>'+esc(g.caption)+'</figcaption>':'')+'</figure>'}).join("")+'</div>':'')+(p.link?'<p style="margin-top:26px"><a class="btn dark" href="'+esc(p.link)+'" target="_blank" rel="noopener">Visit it live</a></p>':'')+'</div></section>'+ctaBlock();
    }else{
      var cats=["All"].concat(D.projects.map(function(x){return x.category}).filter(function(c,i,a){return c&&a.indexOf(c)===i}));
      app.innerHTML=hero("My work","Things I’ve built and the problems they solve. Click any project to see the full story.","",1)+'<section><div class="wrap"><div class="chips" role="group" aria-label="Filter projects">'+cats.map(function(c,i){return '<button class="chip'+(i?'':' on')+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join("")+'</div><div class="grid" id="pg">'+D.projects.map(card).join("")+'</div></div></section>'+ctaBlock();
      app.querySelectorAll(".chip").forEach(function(b){b.onclick=function(){
        app.querySelectorAll(".chip").forEach(function(x){x.classList.remove("on")});b.classList.add("on");
        var list=b.dataset.c==="All"?D.projects:D.projects.filter(function(x){return x.category===b.dataset.c});
        $("#pg").innerHTML=list.map(card).join("");reveal();
      }});
    }
    reveal();
  };
  window.addEventListener("hashchange",draw); draw(); H=null;
}
if(page==="about"){
  var a=D.about;
  H=hero(esc(a.title),"The person behind DOV TECH.","",1)+'<section><div class="wrap"><div class="about'+(a.photo?' has-photo':'')+'">'+(a.photo?'<img src="'+esc(a.photo)+'" alt="Victor Olubodun">':'')+'<div class="rv">'+paras(a.story)+'<p><a class="btn dark" href="contact.html">Let’s talk</a></p></div></div></div></section>';
}
if(page==="contact"){
  H=hero("Let’s talk about your business","Tell me what you sell and what is slowing you down. I’ll reply and we’ll take it from there.","",1)+'<section><div class="wrap"><div class="cards2"><a class="box" href="'+wa(hello)+'" target="_blank" rel="noopener"><h3>WhatsApp</h3><p>+'+esc(C.whatsapp)+'<br>Fastest way to reach me.</p></a><a class="box" href="mailto:'+esc(C.email)+'"><h3>Email</h3><p>'+esc(C.email)+'</p></a></div><h2>Or write your message here</h2><p class="lead">It opens WhatsApp with your message ready to send.</p><form id="f"><label for="n">Your name</label><input id="n" required><label for="b">Your business</label><input id="b" placeholder="What do you sell?"><label for="m">What do you need?</label><textarea id="m" required placeholder="Example: I want customers to order and track their orders online."></textarea><p style="margin-top:18px"><button class="btn" type="submit">Send on WhatsApp</button></p></form></div></section>';
}
if(H!==null){ app.innerHTML=H; }
if(page==="contact"){ $("#f").onsubmit=function(e){e.preventDefault();window.open(wa("Hi Victor, my name is "+$("#n").value+". My business: "+($("#b").value||"-")+". "+$("#m").value),"_blank")}; }

// scroll reveal
var io="IntersectionObserver" in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12}):null;
function reveal(){document.querySelectorAll(".rv:not(.in),.how:not(.in)").forEach(function(el,i){el.style.transitionDelay=(i%3)*90+"ms";io?io.observe(el):el.classList.add("in")})}
reveal();

// tracker loop
var li=document.querySelectorAll("#steps li");
if(li.length&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  var n=1,show=function(k){li.forEach(function(x,i){x.classList.toggle("done",i<=k);x.classList.toggle("now",i===k&&k<li.length-1)})};
  setInterval(function(){n=(n+1)%(li.length+1);show(n===li.length?-1:n)},1800);
}
})();
