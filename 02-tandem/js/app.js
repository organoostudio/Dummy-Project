(()=>{
const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const ic=(n,st='')=>`<svg class="i" ${st?`style="${st}"`:''}><use href="#i-${n}"/></svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=(n,d=0)=>Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const AVC=['#00B8A9','#3D5AFE','#FF6B6B','#F2A20C','#14A3C7','#F25CA2','#22A06B','#7C8CFF','#E5890A'];
const avColor=s=>AVC[[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%AVC.length];
const ini=s=>s.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
const SRC={Email:['#4F8CF0','@'],LinkedIn:['#0A66C2','in'],WhatsApp:['#25D366','W'],Upwork:['#14A800','U']};
const av=(n,o={})=>`<span class="av" style="background:${avColor(n)}${o.s?`;width:${o.s}px;height:${o.s}px;font-size:${Math.round(o.s/2.8)}px`:''}">${esc(ini(n))}${o.on?'<span class="on"></span>':''}${o.src?`<span class="src" style="background:${SRC[o.src][0]}">${SRC[o.src][1]}</span>`:''}</span>`;
function toast(m){const t=document.createElement('div');t.className='toast';t.innerHTML=ic('check')+esc(m);$('#toasts').appendChild(t);setTimeout(()=>{t.style.transition='opacity .3s';t.style.opacity=0;setTimeout(()=>t.remove(),300)},2600)}
function lsGet(k,d){try{const v=localStorage.getItem('tandem.'+k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem('tandem.'+k,JSON.stringify(v))}catch(e){}}
function applyTheme(t){const r=document.documentElement;r.setAttribute('data-ui',t==='dark'?'dark':'light');void 0}
const isDark=()=>document.documentElement.getAttribute('data-ui')==='dark';
const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');

/* ---------- streaming "AI" ---------- */
function stream(el,text,{speed=14,onDone,think=0,steps}={}){
  let cancelled=false;
  const run=()=>{if(cancelled)return;el.classList.add('ai-out','caret');el.innerHTML='';const words=text.split(/(\s+)/);let i=0,buf='';
    const tick=()=>{if(cancelled)return;const n=1+Math.floor(Math.random()*3);for(let k=0;k<n&&i<words.length;k++)buf+=words[i++];el.innerHTML=md(buf);const sc=el.closest('[data-scroll]');if(sc)sc.scrollTop=sc.scrollHeight;
      if(i<words.length)setTimeout(tick,speed+Math.random()*speed);else{el.classList.remove('caret');onDone&&onDone()}};tick()};
  if(think){el.innerHTML=`<div class="thinking"><i></i><i></i><i></i><span class="shimmer">${esc((steps||['Thinking'])[0])}</span></div>`;let s=0;const iv=setInterval(()=>{s++;const sp=$('.shimmer',el);if(sp&&steps&&steps[s])sp.textContent=steps[s]},think/((steps||[1]).length));setTimeout(()=>{clearInterval(iv);run()},think)}else run();
  return ()=>{cancelled=true};
}

/* ---------- data ---------- */
const S={user:lsGet('user','Adam'),studio:'Northbeam Studio',ws:0,range:'30',metric:'Earnings',showActual:true,showProj:true,projTab:'Priority',clientQ:'',clientF:'All',inboxQ:'',platform:'All platforms',active:0,assistMode:'Tandem'};
const CL=[
 ['Sophie Turner','Garden Grove Designs','USA','America/New_York',92,'Email'],
 ['Sam Wilson','Flora & Fauna Studio','UK','Europe/London',78,'LinkedIn'],
 ['Olivia Reed','Vibrant Vases Studio','Australia','Australia/Sydney',64,'WhatsApp'],
 ['Liam Kent','Harbourline Legal','Australia','Australia/Melbourne',88,'Email'],
 ['Noah James','Brightpath Dental','USA','America/Chicago',41,'Upwork'],
 ['Ava Morgan','Copperleaf Coffee','Netherlands','Europe/Amsterdam',73,'WhatsApp'],
 ['Ethan Scott','Stackwise AI','USA','America/Los_Angeles',95,'LinkedIn'],
 ['Sara Olsen','Nordlys Interiors','Norway','Europe/Oslo',57,'Email'],
 ['Emma Lewis','Kindred Wellness','UK','Europe/London',36,'Email'],
 ['Bryan Cole','Cole & Partners','Canada','America/Toronto',81,'LinkedIn'],
 ['Mila Novak','Atelier Mila','Germany','Europe/Berlin',69,'Upwork'],
 ['Theo Laurent','Maison Laurent','France','Europe/Paris',85,'Email'],
 ['Grace Hall','Tidewater Realty','USA','America/New_York',47,'LinkedIn'],
 ['Ruby Chen','Lumen Health','Australia','Australia/Sydney',90,'Email']];
S.clients=CL.map((c,i)=>({id:i+1,name:c[0],co:c[1],country:c[2],tz:c[3],health:c[4],src:c[5],ltv:Math.round(1800+((c[4]*97+i*613)%9000)),last:[1,2,4,6,4,9,1,11,19,16,3,5,23,2][i],email:c[0].split(' ')[0].toLowerCase()+'@'+c[1].toLowerCase().replace(/[^a-z]/g,'').slice(0,14)+'.com'}));
const cl=n=>S.clients.find(c=>c.name===n);
S.projects=[
 {id:1,client:'Sophie Turner',title:'Garden Grove Designs',task:'Mobile application design',due:'Apr 2',price:2500,status:'Draft',prio:true,stage:'Draft',note:true},
 {id:2,client:'Sam Wilson',title:'Flora & Fauna Studio',task:'Online shopping platform',due:'Apr 1',price:5000,status:'In Progress',prio:true,stage:'In Progress',note:true},
 {id:3,client:'Olivia Reed',title:'Vibrant Vases Studio',task:'Digital commerce platform',due:'Apr 1',price:22500,status:'In Review',prio:true,stage:'In Review',note:false},
 {id:4,client:'Liam Kent',title:'Harbourline Legal',task:'Website redesign · Webflow',due:'Oct 14',price:8400,status:'In Progress',prio:false,stage:'In Progress'},
 {id:5,client:'Ethan Scott',title:'Stackwise AI',task:'Product marketing site',due:'Oct 22',price:14800,status:'In Progress',prio:false,stage:'In Progress'},
 {id:6,client:'Ava Morgan',title:'Copperleaf Coffee',task:'Shopify theme build',due:'Oct 9',price:6200,status:'In Review',prio:false,stage:'In Review'},
 {id:7,client:'Theo Laurent',title:'Maison Laurent',task:'Brand identity refresh',due:'Sep 20',price:9600,status:'Completed',prio:false,stage:'Done'},
 {id:8,client:'Ruby Chen',title:'Lumen Health',task:'Patient booking flow',due:'Sep 12',price:11200,status:'Completed',prio:false,stage:'Done'},
 {id:9,client:'Emma Lewis',title:'Kindred Wellness',task:'Membership portal',due:'Aug 30',price:4300,status:'Cancelled',prio:false,stage:'Draft'},
 {id:10,client:'Bryan Cole',title:'Cole & Partners',task:'Pitch deck design',due:'Oct 3',price:1800,status:'Draft',prio:false,stage:'Draft'},
 {id:11,client:'Grace Hall',title:'Tidewater Realty',task:'Listings site with map search',due:'Nov 2',price:12500,status:'Recommended',prio:false,stage:'Draft',rec:'Grace asked about listings twice this month'},
 {id:12,client:'Mila Novak',title:'Atelier Mila',task:'E-commerce photography direction',due:'Oct 30',price:3200,status:'Recommended',prio:false,stage:'Draft',rec:'Similar to Copperleaf project, 92% fit'}];
S.tasks=[
 {t:'Follow-ups',p:'AI reminders for client follow-ups and check-ins.',d:'Apr 1',subs:[['Reply to Sophie about pricing',true],['Check in with Noah on scope',true],['Send Emma the portal recap',false],['Nudge Grace on proposal',false]]},
 {t:'Contract review',p:'AI review and approval of contracts.',d:'Apr 1',subs:[['Stackwise AI MSA',true],['Harbourline Legal SOW v2',false]]},
 {t:'Invoices',p:'Notify customers about payment.',d:'Apr 2',subs:[['INV-118 Flora & Fauna · overdue 6 days',true],['INV-121 Copperleaf',false],['INV-122 Brightpath Dental',false]]},
 {t:'View new offers',p:'A quick response to an offer increases trust.',d:'Apr 2',subs:[['Tidewater Realty listings site',true],['Atelier Mila photo direction',true],['Kindred Wellness retainer',true],['Upwork · SaaS onboarding UX',false]]}];
const now=new Date(2026,8,29);
const TH=[
 {n:'Sophie Turner',time:'8 hours',msgs:[['them','Apr 1, 2026, 3:08 PM','Hi! Your portfolio is impressive. Looking for a designer for a tech startup landing page. Are you available?'],['me','Apr 1, 2026, 3:08 PM','Hi! Yes, I\'m available. What do you need help with?'],['them','Apr 1, 2026, 3:09 PM','Great! Before we dive into details, can you tell me about your work process and pricing?']],unread:0,star:false},
 {n:'Liam Kent',time:'1 day',msgs:[['them','Sep 28, 2026, 10:12 AM','I\'m thrilled to dive into our possibilities. When can we review the homepage wireframes?']],unread:1,star:true},
 {n:'Olivia Reed',time:'2 days',msgs:[['me','Sep 27, 2026, 4:40 PM','The product page prototype is ready for review.'],['them','Sep 27, 2026, 5:02 PM','Hope you\'re doing well! Just checking in to see how it\'s going with the checkout flow?']],unread:0,star:false},
 {n:'Noah James',time:'4 days',msgs:[['them','Sep 25, 2026, 9:30 AM','I\'m excited about what we can achieve. Can we add an online booking form for new patients?']],unread:0,star:false},
 {n:'Sam Wilson',time:'4 days',msgs:[['them','Sep 25, 2026, 1:15 PM','Let me know if you have time to go over them together. The invoice is with our finance team.']],unread:0,star:false},
 {n:'Ava Morgan',time:'5 days',msgs:[['them','Sep 24, 2026, 11:20 AM','The latest version looks great! I have a few minor tweaks to the menu page.']],unread:0,star:false},
 {n:'Ethan Scott',time:'9 days',msgs:[['them','Sep 20, 2026, 8:02 PM','I\'m looking forward to what we can invent next. Budget for phase 2 is approved.']],unread:2,star:false},
 {n:'Sara Olsen',time:'11 days',msgs:[['them','Sep 18, 2026, 2:44 PM','One thing I wanted to clarify: could you walk me through the timeline for the showroom page?']],unread:0,star:false},
 {n:'Emma Lewis',time:'10 days',msgs:[['them','Sep 19, 2026, 6:10 PM','I\'m looking forward to what we can invent. Can we pause the portal until January?']],unread:1,star:false},
 {n:'Bryan Cole',time:'16 days',msgs:[['them','Sep 13, 2026, 12:00 PM','It looks good enough for me. Ship it.']],unread:0,star:false}];
S.threads=TH;

/* daily revenue */
function series(range){
  seed=range==='90'?5:range==='7'?9:11;
  const days=range==='90'?91:range==='7'?7:29;const out=[];
  for(let i=days-1;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);let v=40+rnd()*170+(Math.sin(i/3)+1)*30;if(i===15&&range==='30')v=285;out.push({d,v:Math.round(v),proj:false})}
  let pts=out;
  if(range==='90'){pts=[];for(let k=0;k<out.length;k+=7){const chunk=out.slice(k,k+7);pts.push({d:chunk[0].d,v:chunk.reduce((a,x)=>a+x.v,0),proj:false,week:true})}}
  const pn=range==='90'?2:range==='7'?3:7;const last=pts.slice(-5).reduce((a,x)=>a+x.v,0)/5;
  for(let k=1;k<=pn;k++){const d=new Date(now);d.setDate(d.getDate()+k*(range==='90'?7:1));pts.push({d,v:Math.round(last*(1.04+k*.025)+(rnd()-.5)*last*.2),proj:true,week:range==='90'})}
  return pts;
}
const lbl=d=>d.toLocaleDateString('en-US',{month:'short',day:'numeric'});

/* ---------- AI knowledge ---------- */
function aiAnswer(q){
  const s=q.toLowerCase();
  const risk=S.clients.filter(c=>c.health<50).sort((a,b)=>a.health-b.health);
  const pts=series('30').filter(p=>!p.proj);const tot=pts.reduce((a,p)=>a+p.v,0);
  const proj=series('30').filter(p=>p.proj).reduce((a,p)=>a+p.v,0);
  const who=S.clients.find(c=>s.includes(c.name.split(' ')[0].toLowerCase()));
  if(/risk|churn|attention|health/.test(s))return `**${risk.length} clients need attention this week:**\n\n`+risk.map(c=>`• **${c.name}** (${c.co}) · health ${c.health}/100, last contact ${c.last} days ago`).join('\n')+`\n\nSuggested next step: send Emma a short check-in about the January pause, and offer Noah a 20-minute call to lock the booking-form scope. I drafted both in Inbox.`;
  if(/forecast|project|predict|next month|october/.test(s))return `**October forecast: $${fmt(Math.round(tot*1.14))}** (±9%).\n\nThe last 29 days brought in $${fmt(tot)}. The next 7 days are projected at **$${fmt(proj)}**, driven by the Stackwise AI phase 2 deposit and two Shopify builds entering review.\n\nThe biggest risk is Flora & Fauna's overdue invoice ($5,000). Collecting it this week keeps you 6% above September.`;
  if(/draft|follow|write|email|reply/.test(s)&&who)return `Here is a follow-up for **${who.name}**:\n\n"Hi ${who.name.split(' ')[0]}, thanks again for the call last week. I've put together next steps for ${who.co}: a short scope doc, a timeline, and a fixed quote. Would Thursday at 10:00 your time (${who.tz.split('/')[1].replace('_',' ')}) work to walk through it?"\n\nTone: warm and direct. Want me to send it from Inbox?`;
  if(/draft|follow|write|email/.test(s))return `Here is a friendly follow-up you can reuse:\n\n"Hi there, just checking in on the proposal I sent last week. Happy to adjust scope or timing if that helps. Would a quick 15-minute call this week work?"\n\nIt works best within 3–5 days of the proposal. 4 clients are in that window right now.`;
  if(/schedule|calendar|meeting|time/.test(s))return `**Your week, optimised:**\n\n• Mon 09:00 · Deep work: Stackwise AI homepage (3h)\n• Tue 16:00 · Call with Sophie Turner (overlaps her 10:00 in New York)\n• Wed 08:30 · Review with Liam Kent (his 17:30 in Melbourne)\n• Thu · Invoices and contract reviews (45 min batch)\n• Fri 14:00 · Weekly status updates go out automatically\n\nI moved two meetings to protect a 3-hour focus block.`;
  if(/automat|process|workflow/.test(s))return `I can automate three things you do by hand every week:\n\n1. **Invoice nudges**: remind clients 3 days before and 2 days after the due date.\n2. **Status updates**: send each active client a Friday summary from project activity.\n3. **Lead intake**: turn new Upwork and email enquiries into draft projects with a suggested quote.\n\nThat saves roughly **4.5 hours a week**. Turn them on from Inbox → Automated status updates.`;
  if(/revenue|earn|money|income|how much/.test(s))return `You earned **$${fmt(tot)}** in the last 29 days across ${S.clients.length} clients. The best day was ${lbl(pts.reduce((a,p)=>p.v>a.v?p:a).d)} ($${fmt(Math.max(...pts.map(p=>p.v)))}).\n\nTop clients by lifetime value: `+[...S.clients].sort((a,b)=>b.ltv-a.ltv).slice(0,3).map(c=>`${c.name.split(' ')[0]} ($${fmt(c.ltv)})`).join(', ')+'.';
  if(/price|pricing|quote|charge/.test(s))return `Based on your last 12 projects, a **landing page** is quoted at $2,400–$3,200 and closes 68% of the time. Quotes above $3,500 close at 31%.\n\nFor a startup landing page, I'd suggest **$2,800 fixed**, with a 50% deposit and 2 revision rounds.`;
  if(who)return `**${who.name}** · ${who.co}, ${who.country}\n\nHealth ${who.health}/100 · lifetime value $${fmt(who.ltv)} · last contact ${who.last} day${who.last>1?'s':''} ago via ${who.src}.\n\n`+(who.health<50?'Engagement dropped this month. A personal check-in is recommended.':'The relationship looks healthy. Good moment to suggest the next phase.');
  return `I checked your ${S.clients.length} clients, ${S.projects.length} projects and ${S.threads.length} conversations.\n\n• **${S.projects.filter(p=>p.stage==='In Progress').length} projects** are in progress, worth $${fmt(S.projects.filter(p=>p.stage==='In Progress').reduce((a,p)=>a+p.price,0))}\n• **${risk.length} clients** have low engagement\n• **${S.threads.reduce((a,t)=>a+t.unread,0)} unread** messages are waiting\n\nTry asking about revenue, at-risk clients, pricing or your schedule.`;
}
const STEPS=['Reading your CRM','Checking 14 clients and 12 projects','Writing'];

/* ---------- modal/drawer/menu ---------- */
function modal({title,body,submit='Save',onSubmit,cancel='Cancel',wide}){
  const ov=document.createElement('div');ov.className='overlay';
  ov.innerHTML=`<form class="modal" novalidate style="${wide?'width:min(640px,100%)':''}"><div class="modal-h"><h3>${title}</h3><button type="button" class="rm" data-close aria-label="Close">${ic('x')}</button></div><div class="modal-b">${body}</div>${onSubmit!==false?`<div class="modal-f"><button type="button" class="btn" data-close>${cancel}</button><button class="btn primary">${submit}</button></div>`:''}</form>`;
  document.body.appendChild(ov);const close=()=>{ov.remove();document.removeEventListener('keydown',k)};const k=e=>{if(e.key==='Escape')close()};document.addEventListener('keydown',k);
  ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('[data-close]'))close()});
  const f=$('form',ov);f.addEventListener('submit',e=>{e.preventDefault();if(onSubmit&&onSubmit(f)!==false)close()});
  setTimeout(()=>$('input,select,textarea',f)?.focus(),30);return {el:f,close};
}
function drawer(html){const ov=document.createElement('div');ov.className='drawer-ov';const d=document.createElement('aside');d.className='drawer';d.innerHTML=html;document.body.append(ov,d);const close=()=>{ov.remove();d.remove()};ov.onclick=close;d.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close()});return {el:d,close}}
function menu(anchor,items){$$('.menu').forEach(m=>m.remove());const r=anchor.getBoundingClientRect();const m=document.createElement('div');m.className='menu';m.innerHTML=items.map((it,i)=>it==='-'?'<hr>':`<button type="button" data-i="${i}">${it.icon?ic(it.icon):''}${esc(it.t)}</button>`).join('');document.body.appendChild(m);
  const w=m.offsetWidth;m.style.top=(r.bottom+scrollY+6)+'px';m.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w+scrollX))+'px';
  m.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b){m.remove();items[+b.dataset.i].run()}});
  setTimeout(()=>document.addEventListener('click',function h(e){if(!m.contains(e.target)){m.remove();document.removeEventListener('click',h)}}),0)}
function req(f,names){let ok=true;names.forEach(n=>{const i=f.elements[n];const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('err',bad);if(bad)ok=false});if(!ok)toast('Fill in the highlighted fields');return ok}

/* ---------- router ---------- */
const PAGES={app:'Overview','app-clients':'Clients','app-projects':'Projects','app-inbox':'Inbox','app-analytics':'Analytics'};
let stopStreams=[];
function route(){stopStreams.forEach(f=>f());stopStreams=[];$$('.overlay,.drawer,.drawer-ov,.menu').forEach(x=>x.remove());const h=(location.hash||'#').slice(1);scrollTo(0,0);if(PAGES[h])renderApp(h);else renderLanding(h)}
addEventListener('hashchange',route);

/* ================= LANDING ================= */
function renderLanding(h){
  document.title='Tandem AI CRM';
  $('#root').innerHTML=`
  <header class="l-nav"><div class="bar"><a class="logo" href="#home"><svg><use href="#logo"/></svg>Tandem</a>
   <nav class="l-links" aria-label="Main"><a href="#home" data-to="features">Product</a><a href="#home" data-to="how">How it works</a><a href="#home" data-to="pricing">Pricing</a><a href="#home" data-to="faq">FAQ</a></nav>
   <div class="l-cta"><a class="btn ghost hide-m" href="#app">Live demo</a><button class="btn primary" type="button" data-start>Get started</button></div></div></header>
  <main class="wrap">
   <section class="hero">
    <span class="badge rise"><b>New</b> Smart Reply now drafts in your own voice</span>
    <h1 class="rise d1">The CRM that <span class="serif">writes back</span></h1>
    <p class="lead rise d2">Tandem reads your inbox, projects and invoices, then tells you who needs a reply, what to charge and where revenue is heading. Built for studios and service teams that sell to clients abroad.</p>
    <div class="ask rise d3"><form id="askF"><svg class="i" style="color:var(--accent)"><use href="#i-spark"/></svg><label class="sr" for="askQ">Ask Tandem</label><input id="askQ" placeholder="Ask Tandem about the demo studio's clients…" autocomplete="off"><button class="btn primary" type="submit">Ask</button></form>
     <div class="chips">${['Which clients are at risk this week?','Forecast October revenue','Draft a follow-up to Sophie','What should I charge for a landing page?'].map(c=>`<button type="button" class="chip" data-q="${esc(c)}">${esc(c)}</button>`).join('')}</div>
     <div class="ask-ans" id="askA" hidden><div id="askOut" data-scroll></div><div class="src" id="askSrc" hidden><span class="pill acc">${ic('note','width:12px;height:12px')}14 clients</span><span class="pill acc">12 projects</span><span class="pill acc">10 conversations</span><a class="btn sm" href="#app" style="margin-left:auto">Open in the app ${ic('arrow','width:14px;height:14px')}</a></div></div></div>
    <div class="sheet-prev rise d3"><div class="inner"><div style="display:grid;gap:14px;min-width:0"><div class="kpis" id="pvK"></div><div class="box"><div class="bh"><h3>Revenue analytics</h3><span class="pill good">AI projection on</span></div><div id="pvDots"></div></div></div>
     <aside class="assist"><div class="hi"><small>Hi, ${esc(S.user)}</small><b>How can I help you?</b></div><div class="qa">${qaTiles()}</div></aside></div></div>
    <div class="logos"><span>northbeam</span><span class="serif">Maison Laurent</span><span>STACKWISE</span><span>Copperleaf</span><span class="serif">Atelier Mila</span><span>harbourline</span></div>
   </section>
   <section class="l" id="features"><div class="sh"><span class="eyebrow">Product</span><h2>Less admin. <span class="serif">More</span> client work.</h2><p>Tandem sits on top of the tools you already use and does the follow-up work for you.</p></div>
    <div class="feat">
     <div class="fc s7"><span class="eyebrow">Smart Reply</span><h3>Replies drafted in your voice, with the context filled in</h3><p>Tandem reads the whole thread, your rates and your calendar, then drafts a reply you can send, edit or rewrite in a different tone.</p>
      <div class="viz"><div class="smart"><div class="h">${ic('spark')}Smart Reply<div class="tools">${['Friendly','Formal','Concise'].map((t,i)=>`<button type="button" class="chip" data-tone="${t}" aria-pressed="${i===0}" style="height:26px">${t}</button>`).join('')}</div></div><div class="txt" id="toneOut"></div><div class="why">Builds trust, shows flexibility and keeps the conversation open.</div></div></div></div>
     <div class="fc s5"><span class="eyebrow">Forecast</span><h3>See next week's revenue before it lands</h3><p>AI projection from invoices, deal stages and your client's payment habits.</p><div class="viz" id="featDots"></div></div>
     <div class="fc s4"><span class="eyebrow">Priority</span><h3>A to-do list that writes itself</h3><p>Follow-ups, contract reviews and overdue invoices, ranked by what moves revenue.</p><div class="viz"><div class="tasks">${S.tasks.slice(0,3).map(t=>{const d=t.subs.filter(x=>x[1]).length;return `<div class="task" style="grid-template-columns:22px 1fr">${ringSVG(d/t.subs.length)}<div><b>${t.t}</b><div class="meta">${d}/${t.subs.length} completed</div></div></div>`}).join('')}</div></div></div>
     <div class="fc s4"><span class="eyebrow">Health score</span><h3>Know who is drifting away</h3><p>Response time, sentiment and payment delays combined into one score per client.</p><div class="viz" style="display:grid;gap:10px">${S.clients.slice(7,10).map(c=>healthRow(c)).join('')}</div></div>
     <div class="fc s4"><span class="eyebrow">Time zones</span><h3>Built for clients abroad</h3><p>Local time on every thread, meeting slots that respect both calendars, and invoices in USD, EUR, GBP or AUD.</p><div class="viz" style="display:flex;gap:6px;flex-wrap:wrap">${['New York','London','Amsterdam','Sydney'].map(c=>`<span class="pill neutral">${ic('globe','width:12px;height:12px')}${c}</span>`).join('')}</div></div>
    </div></section>
   <section class="l" id="how"><div class="sh c"><span class="eyebrow">How it works</span><h2>Set up in an <span class="serif">afternoon</span></h2></div>
    <div class="steps">${[['Connect your inbox','Gmail, Outlook, LinkedIn, WhatsApp Business and Upwork messages land in one place, grouped by client.'],['Tandem learns your studio','It reads past projects, quotes and replies to learn your pricing, tone and typical timelines. Nothing is used to train shared models.'],['Approve, don\'t type','Each morning you get drafted replies, ranked tasks and a revenue forecast. Approve with one click or edit first.']].map((s,i)=>`<div class="step"><span class="n">0${i+1}</span><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div></section>
   <section class="l" id="pricing"><div class="sh c"><span class="eyebrow">Pricing</span><h2>Simple plans, <span class="serif">fair</span> AI usage</h2><p>Every plan includes Smart Reply and forecasts. Add AI credits only if you need more.</p></div>
    <div style="display:flex;justify-content:center"><div class="seg" role="group" aria-label="Billing"><button type="button" data-bill="m">Monthly</button><button type="button" data-bill="y">Yearly · 2 months free</button></div></div>
    <div class="pricing" id="plans"></div>
    <div class="credits"><div><b>Extra AI credits</b><p class="fine">One credit is one drafted reply, summary or forecast. Unused credits roll over for 3 months.</p><input type="range" id="cr" min="0" max="5000" step="250" value="1000" aria-label="Extra AI credits per month" style="margin-top:10px"></div><div style="text-align:right"><b class="num" id="crN" style="font-size:22px"></b><div class="fine num" id="crP"></div></div></div></section>
   <section class="l"><div class="quotes">
    <figure class="q big"><blockquote>“Tandem answers the 11 p.m. emails from our New York clients before I wake up. I review, tweak a word, send. We closed 30% more proposals this quarter.”</blockquote><figcaption class="who">${av('Mila Novak')}<div><b>Mila Novak</b><small>Founder, Atelier Mila · Berlin</small></div></figcaption></figure>
    <div style="display:grid;gap:14px"><figure class="q"><blockquote>“The forecast is scary accurate. It told us September would dip two weeks before it did.”</blockquote><figcaption class="who">${av('Theo Laurent')}<div><b>Theo Laurent</b><small>Director, Maison Laurent · Paris</small></div></figcaption></figure>
    <figure class="q"><blockquote>“I stopped chasing invoices. Tandem does it politely, in the client's time zone.”</blockquote><figcaption class="who">${av('Ruby Chen')}<div><b>Ruby Chen</b><small>Studio lead, Lumen Health · Sydney</small></div></figcaption></figure></div></div></section>
   <section class="l" id="faq"><div class="sh c"><h2>Questions</h2></div><div class="faq">${[['Does Tandem send messages without me?','Only if you turn on an automation. By default every Smart Reply waits for your approval.'],['Where is my data stored?','In the EU (Frankfurt) or US (Oregon), your choice. Data is encrypted at rest and never used to train shared models.'],['Which inboxes can I connect?','Gmail, Outlook, LinkedIn, WhatsApp Business and Upwork. Slack Connect is in beta.'],['Can my team share one workspace?','Yes. Studio and Agency plans include shared inboxes, assignments and roles.'],['Is there a free trial?','Yes, 14 days on the Studio plan with 500 AI credits. No card needed.']].map((f,i)=>`<details ${i?'':'open'}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div></section>
   <section class="cta"><div class="orb"></div><div class="orb b"></div><div style="position:relative"><h2>Give every client a <span class="serif">fast</span> reply</h2><p>Start a 14-day trial with your own inbox, or explore the demo studio first.</p><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="btn lg" type="button" data-start style="background:var(--ink-fg);color:var(--ink);border:0">Start free trial</button><a class="btn lg" href="#app" style="background:transparent;color:inherit;border-color:color-mix(in srgb,var(--ink-fg) 30%,transparent)">Open live demo</a></div></div></section>
   <footer class="foot"><span>© 2026 Tandem Labs · Fictional product, designed and built by Organoo Studio.</span><nav><a href="#home" data-to="features">Product</a><a href="#home" data-to="pricing">Pricing</a><a href="#app">Demo</a><a href="#home" data-to="faq">Privacy</a></nav></footer>
  </main>`;
  // bindings
  $$('[data-to]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById(a.dataset.to)?.scrollIntoView({behavior:'smooth'})}));
  $$('[data-start]').forEach(b=>b.onclick=onboard);
  kpiBlock($('#pvK'));dotChart($('#pvDots'),series('30'),{compact:true});dotChart($('#featDots'),series('7'),{compact:true,mini:true});
  $$('.sheet-prev .qa button').forEach(b=>b.onclick=()=>location.hash='app');
  let stop;const ask=q=>{stop&&stop();$('#askQ').value=q;$('#askA').hidden=false;$('#askSrc').hidden=true;stop=stream($('#askOut'),aiAnswer(q),{think:1100,steps:STEPS,onDone:()=>$('#askSrc').hidden=false});stopStreams.push(stop)};
  $('#askF').onsubmit=e=>{e.preventDefault();const q=$('#askQ').value.trim();if(!q){$('#askQ').focus();return}ask(q)};
  $$('[data-q]').forEach(b=>b.onclick=()=>ask(b.dataset.q));
  const TONES={Friendly:'Of course! I start by understanding your goals, then sketch wireframes and refine the design in Figma, keeping you in the loop throughout. I offer fixed-rate and hourly pricing depending on scope. Share a few details and I\'ll send a tailored estimate. Excited to learn more!',Formal:'Certainly. My process begins with a discovery session to define your goals, followed by wireframes and high-fidelity design in Figma, with review points at each stage. Pricing is available on a fixed-fee or hourly basis. With a brief outline of the scope, I will prepare a detailed estimate.',Concise:'Sure. Discovery, then wireframes, then Figma design, with check-ins at each step. Fixed or hourly pricing. Send me the scope and I\'ll quote within 24 hours.'};
  let st;const tone=t=>{st&&st();$$('[data-tone]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tone===t));st=stream($('#toneOut'),TONES[t],{speed:10});stopStreams.push(st)};
  $$('[data-tone]').forEach(b=>b.onclick=()=>tone(b.dataset.tone));$('#toneOut').textContent=TONES.Friendly;
  let bill='y';const plans=()=>{const P=[['Solo','For freelancers with a handful of retainers.',19,['1 user · 3 inboxes','500 AI credits / month','Smart Reply & forecasts','Invoices in 4 currencies']],['Studio','For small studios juggling 10+ active clients.',49,['Up to 5 users · 15 inboxes','2,500 AI credits / month','Shared inbox & assignments','Automations & client portal'],1],['Agency','For agencies with account teams.',129,['Unlimited users & inboxes','10,000 AI credits / month','SSO, roles & audit log','Priority support in your time zone']]];
   $('#plans').innerHTML=P.map(p=>{const pr=bill==='y'?Math.round(p[2]*10/12):p[2];return `<div class="pc ${p[4]?'hl':''}"><h3>${p[0]}${p[4]?'<span class="pill acc">Most popular</span>':''}</h3><p class="muted" style="font-size:14px">${p[1]}</p><div class="pr"><b class="num">$${pr}</b><span class="muted">/ user / month</span></div><p class="fine">${bill==='y'?`$${pr*12} billed yearly`:'Billed monthly, cancel anytime'}</p><ul>${p[3].map(x=>`<li>${ic('check')}${x}</li>`).join('')}</ul><button class="btn ${p[4]?'':'primary'} lg" type="button" data-plan="${p[0]}">Start with ${p[0]}</button></div>`}).join('');
   $$('[data-bill]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.bill===bill));$$('[data-plan]').forEach(b=>b.onclick=()=>onboard(b.dataset.plan))};
  plans();$$('[data-bill]').forEach(b=>b.onclick=()=>{bill=b.dataset.bill;plans()});
  const cr=()=>{const v=+$('#cr').value;$('#crN').textContent=v?`+${fmt(v)} credits`:'No extra credits';$('#crP').textContent=v?`$${fmt(v/250*5)} / month`:'Included credits only'};$('#cr').oninput=cr;cr();
  if(h&&document.getElementById(h))setTimeout(()=>document.getElementById(h).scrollIntoView(),50);
}
function onboard(plan){
  modal({title:'Create your workspace',submit:'Continue to Tandem',body:`<p class="muted" style="font-size:14px">${typeof plan==='string'?`${plan} plan · `:''}14-day trial, no card. We'll load a demo studio so you can try everything straight away.</p>
   <div class="two"><div class="field"><label for="obN">First name</label><input class="input" id="obN" name="n" value=""></div><div class="field"><label for="obE">Work email</label><input class="input" id="obE" name="e" type="email"></div></div>
   <div class="field"><label for="obS">Studio name</label><input class="input" id="obS" name="s" placeholder="Northbeam Studio"></div>
   <div class="field"><label for="obT">Team size</label><select class="input" id="obT" name="t"><option>Just me</option><option>2–5</option><option>6–20</option><option>20+</option></select></div>`,
   onSubmit:f=>{if(!req(f,['n','e']))return false;S.user=f.elements.n.value.trim().split(' ')[0];S.studio=f.elements.s.value.trim()||S.studio;lsSet('user',S.user);location.hash='app';setTimeout(()=>toast(`Welcome, ${S.user}. Your demo studio is ready.`),200)}});
}

/* ================= shared widgets ================= */
function ringSVG(p,size=22){const r=8,c=2*Math.PI*r;return `<svg class="ring" viewBox="0 0 22 22" style="width:${size}px;height:${size}px"><circle cx="11" cy="11" r="${r}" fill="none" stroke="var(--line-2)" stroke-width="2.4"/><circle cx="11" cy="11" r="${r}" fill="none" stroke="${p>=1?'var(--mint-2)':'var(--accent)'}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="${c*p} ${c}" transform="rotate(-90 11 11)"/>${p>=1?'<path d="m7.5 11.2 2.3 2.3 4.7-4.8" fill="none" stroke="var(--mint-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':''}</svg>`}
function healthColor(h){return h>=75?'var(--mint-2)':h>=50?'var(--warn)':'var(--bad)'}
function healthRow(c){return `<div class="health">${av(c.name,{s:26})}<span style="width:92px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(c.name.split(' ')[0])}</span><span class="hbar"><i style="width:${c.health}%;background:${healthColor(c.health)}"></i></span><b class="num" style="width:26px;text-align:right">${c.health}</b></div>`}
function qaTiles(){return [['text','Text assistance','var(--good-soft)','var(--good)'],['flow','Process automation','var(--bad-soft)','var(--bad)'],['cal','Schedule optimization','var(--warn-soft)','var(--warn)'],['reply','Smart response','var(--accent-soft)','var(--accent)']].map(t=>`<button type="button" data-qa="${t[1]}"><span class="qi" style="background:${t[2]};color:${t[3]}">${ic(t[0])}</span>${t[1]}</button>`).join('')}
function kpiBlock(el){const act=series('30').filter(p=>!p.proj).reduce((a,p)=>a+p.v,0);
  el.innerHTML=[['Clients',S.clients.length,'+4','good','Compare 10 (last month)'],['Revenue','$'+fmt(act,2),'-8%','bad','$'+fmt(act/0.92,2)+' (last month)'],['Projects',S.projects.filter(p=>p.status!=='Cancelled').length,'+6','good','Compare 16 (last month)']].map(k=>`<div><div class="t">${k[0]}<span class="pill ${k[3]}">${k[2]}</span></div><div class="v"><b class="num">${k[1]}</b><small>${k[4]}</small></div></div>`).join('')}
function dotChart(el,pts,o={}){
  const rows=o.mini?8:10,n=pts.length;const W=o.mini?360:640,H=o.mini?120:(o.compact?170:210);const P={l:o.mini?0:34,r:4,t:10,b:o.mini?4:24};
  const max=Math.max(...pts.map(p=>p.v))*1.08;const cw=(W-P.l-P.r)/n,rh=(H-P.t-P.b)/rows;const rad=Math.max(1.8,Math.min(cw,rh)*.34);
  const sel=o.sel??pts.findIndex(p=>p.v===Math.max(...pts.filter(q=>!q.proj).map(q=>q.v)));
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Revenue per ${pts[0].week?'week':'day'}, dot matrix">`;
  if(!o.mini){for(let g=0;g<=3;g++){const v=max*g/3;const y=H-P.b-(g/3)*(H-P.t-P.b);s+=`<text x="0" y="${y+3}" class="ax num">$${fmt(Math.round(v/10)*10)}</text>`}}
  pts.forEach((p,i)=>{const on=Math.round(p.v/max*rows);const cx=P.l+cw*i+cw/2;const show=p.proj?S.showProj:S.showActual;
    for(let r=0;r<rows;r++){const cy=H-P.b-rh*r-rh/2;let f='var(--dot-off)';if(r<on&&show){f=p.proj?'var(--lav)':(i===sel?'var(--sec)':'var(--mint)')}s+=`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(2)}" fill="${f}"/>`}
    if(!o.mini&&(i%Math.ceil(n/7)===0))s+=`<text x="${cx}" y="${H-6}" text-anchor="middle" class="ax">${lbl(p.d)}</text>`;
    s+=`<rect x="${cx-cw/2}" y="0" width="${cw}" height="${H}" fill="transparent" data-i="${i}" class="hit"/>`});
  if(sel>=0&&!o.mini){const cx=P.l+cw*sel+cw/2;const on=Math.round(pts[sel].v/max*rows);const top=H-P.b-rh*on;s+=`<line x1="${P.l}" x2="${cx}" y1="${top}" y2="${top}" stroke="var(--sec)" stroke-dasharray="2 3" opacity=".6"/><rect x="${P.l-2}" y="${top-8}" width="${String(pts[sel].v).length*6.5+14}" height="16" rx="5" fill="var(--sec)"/><text x="${P.l+5}" y="${top+3.5}" class="num" style="font-size:10px;fill:#fff;font-weight:600">$${pts[sel].v}</text>`;
   s+=`<rect x="${cx-cw/2+1}" y="${H-P.b+6}" width="${cw-2}" height="16" rx="5" fill="var(--sec)" opacity=".15"/>`}
  el.innerHTML=`<div class="dots">${s}</svg><div class="tip"></div></div>`;
  if(o.mini)return;
  const tip=$('.tip',el),svg=$('svg',el);
  $$('.hit',el).forEach(h=>{h.addEventListener('mousemove',e=>{const i=+h.dataset.i,p=pts[i];const r=svg.getBoundingClientRect();tip.innerHTML=`<b>${p.week?'Week of ':''}${lbl(p.d)}</b><br>${p.proj?'AI projected':'Actual'}: $${fmt(p.v)}`;tip.style.left=((P.l+cw*i+cw/2)/W*r.width)+'px';tip.style.top=(e.clientY-r.top)+'px';tip.classList.add('show')});
   h.addEventListener('mouseleave',()=>tip.classList.remove('show'));h.addEventListener('click',()=>{if(o.onSel)o.onSel(+h.dataset.i)})});
}

/* ================= APP ================= */
function renderApp(page){
  document.title=PAGES[page]+' · Tandem';
  const unread=S.threads.reduce((a,t)=>a+t.unread,0);
  const WS=[['Northbeam Studio','#3CC79F','N'],['Freelance','#4F8CF0','F'],['Side projects','#F25CA2','S']];
  $('#root').innerHTML=`<div class="app"><div class="sheet"><div class="topbar">
   <a class="logo" href="#home" title="Back to website"><svg><use href="#logo"/></svg><span class="hide-s" style="font-size:15px">Tandem</span></a>
   <div class="ws" role="group" aria-label="Workspaces">${WS.map((w,i)=>`<button class="av" type="button" style="background:${w[1]}" aria-pressed="${i===S.ws}" title="${w[0]}" data-ws="${i}">${w[2]}</button>`).join('')}<button class="add" type="button" id="wsAdd" aria-label="Add workspace">${ic('plus','width:14px;height:14px')}</button></div>
   <nav class="pnav" aria-label="App">${Object.entries(PAGES).map(([h,t])=>`<a href="#${h}" ${h===page?'aria-current="page"':''}>${t}${h==='app-inbox'&&unread?`<span class="cnt num">${unread}</span>`:''}</a>`).join('')}</nav>
   <div class="tb-right"><button class="ibtn" id="srch" aria-label="Search">${ic('search')}</button><button class="ibtn" id="sync" aria-label="Sync inboxes">${ic('refresh')}</button><button class="meav" id="me" aria-label="Account menu">${esc(ini(S.user+' P'))}</button></div></div>
   <div class="content" id="C"></div></div></div>`;
  $$('[data-ws]').forEach(b=>b.onclick=()=>{S.ws=+b.dataset.ws;renderApp(page);toast('Switched to '+WS[S.ws][0])});
  $('#wsAdd').onclick=()=>modal({title:'New workspace',submit:'Create',body:`<div class="field"><label for="wsN">Workspace name</label><input class="input" id="wsN" name="n" placeholder="e.g. Retainer clients"></div>`,onSubmit:f=>{if(!req(f,['n']))return false;toast(`Workspace “${f.elements.n.value}” created. It's empty for now.`)}});
  $('#sync').onclick=e=>{const b=e.currentTarget;b.style.transition='transform .8s';b.style.transform='rotate(360deg)';setTimeout(()=>{b.style.transition='none';b.style.transform=''},820);toast('Inboxes synced · 0 new messages')};
  $('#me').onclick=e=>{e.stopPropagation();menu(e.currentTarget,[{t:`${S.user} · ${S.studio}`,icon:'home',run:()=>{}},'-',{t:isDark()?'Light mode':'Dark mode',icon:'moon',run:()=>{applyTheme(isDark()?'light':'dark');renderApp(page)}},{t:'Back to website',icon:'globe',run:()=>location.hash='home'},{t:'Sign out',icon:'out',run:()=>{location.hash='home';toast('Signed out')}}])};
  $('#srch').onclick=searchModal;
  const C=$('#C');({app:pOverview,'app-clients':pClients,'app-projects':pProjects,'app-inbox':pInbox,'app-analytics':pAnalytics})[page](C);
}
function searchModal(){const m=modal({title:'Search',onSubmit:false,body:`<input class="input" id="sq" placeholder="Clients, projects or messages" autocomplete="off"><div id="sr" style="display:grid;gap:2px;max-height:340px;overflow-y:auto"></div>`});
  const draw=()=>{const q=$('#sq').value.toLowerCase();const res=[...S.clients.filter(c=>(c.name+c.co).toLowerCase().includes(q)).map(c=>({t:c.name,s:c.co,k:'Client',go:()=>{location.hash='app-clients';setTimeout(()=>clientDrawer(c),80)}})),...S.projects.filter(p=>(p.title+p.task).toLowerCase().includes(q)).map(p=>({t:p.task,s:p.title,k:'Project',go:()=>location.hash='app-projects'}))].slice(0,9);
   $('#sr').innerHTML=res.length?res.map((r,i)=>`<button type="button" class="li" data-r="${i}" style="border-radius:10px;border:0">${av(r.t,{s:28})}<div class="mid"><b>${esc(r.t)}</b><p>${esc(r.s)}</p></div><span class="pill neutral">${r.k}</span></button>`).join(''):'<p class="muted" style="padding:12px">No matches.</p>';$$('[data-r]').forEach(b=>b.onclick=()=>{m.close();res[+b.dataset.r].go()})};draw();$('#sq').oninput=draw}

/* ---------- Overview ---------- */
function pOverview(C){
  C.innerHTML=`<div class="ov"><div class="col">
   <div class="kpis" id="k"></div>
   <div class="box"><div class="bh"><h3>Revenue Analytics</h3><div class="tools"><label class="sr" for="met">Metric</label><select class="dd" id="met"><option>Earnings</option><option>Invoices</option></select><label class="sr" for="rng">Range</label><select class="dd" id="rng"><option value="7">Last 7 days</option><option value="30">Last 30 Days</option><option value="90">Last 90 days</option></select><button class="ibtn" id="dl" aria-label="Export chart data" style="width:30px;height:30px">${ic('down','width:15px;height:15px')}</button></div></div>
    <div class="ra"><div class="ra-side"><button class="lg-btn" id="lgA" aria-pressed="${S.showActual}"><i style="background:var(--mint)"></i><span>Actual</span></button><button class="lg-btn" id="lgP" aria-pressed="${S.showProj}"><i style="background:var(--lav)"></i><span>AI Projected</span></button>
     <div class="tipbox">${ic('spark')}<div id="insight" data-scroll style="max-height:180px;overflow-y:auto">Better client communication can boost tips and repeat work. Try faster responses and follow-ups.</div></div>
     <button class="btn grad" id="run">${ic('spark')}Run Analysis</button></div><div id="dots" style="min-width:0"></div></div></div>
   <div class="box"><div class="bh"><h3>Manage Projects</h3><div class="tools"><button class="ibtn" id="pSearch" aria-label="Filter projects" style="width:30px;height:30px">${ic('search','width:15px;height:15px')}</button><button class="btn sm soft" id="pAdd">${ic('plus','width:14px;height:14px')}New project</button></div></div>
    <div class="search" id="pSearchBox" hidden style="max-width:none;margin-bottom:10px">${ic('search')}<label class="sr" for="pq">Filter projects</label><input class="input" id="pq" placeholder="Filter by client or task"></div>
    <div class="tabs" role="tablist" id="ptabs"></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Client</th><th>Task</th><th>Note</th><th>Due on</th><th>Price</th><th>Status</th><th>More</th></tr></thead><tbody id="pbody"></tbody></table></div></div>
  </div><div class="col">
   <div class="box" style="padding:14px"><div class="bh" style="margin-bottom:6px;padding:0 4px"><h3>Priority tasks</h3><button class="btn ghost sm" id="seeAll">See all</button></div><div class="tasks" id="tasks"></div></div>
   <div class="assist" id="assist"></div>
  </div></div>`;
  kpiBlock($('#k'));
  let sel;const draw=()=>{const pts=series(S.range);const f=S.metric==='Invoices'?pts.map(p=>({...p,v:Math.max(1,Math.round(p.v/60))})):pts;dotChart($('#dots'),f,{sel,onSel:i=>{sel=i;draw()}})};
  $('#rng').value=S.range;$('#met').value=S.metric;draw();
  $('#rng').onchange=e=>{S.range=e.target.value;sel=undefined;draw()};$('#met').onchange=e=>{S.metric=e.target.value;draw()};
  $('#lgA').onclick=e=>{S.showActual=!S.showActual;e.currentTarget.setAttribute('aria-pressed',S.showActual);draw()};
  $('#lgP').onclick=e=>{S.showProj=!S.showProj;e.currentTarget.setAttribute('aria-pressed',S.showProj);draw()};
  $('#dl').onclick=()=>{const pts=series(S.range);const csv='date,type,value\n'+pts.map(p=>[p.d.toISOString().slice(0,10),p.proj?'projected':'actual',p.v].join(',')).join('\n');modal({title:'Export revenue data',onSubmit:false,body:`<textarea class="input" id="csv" readonly style="min-height:180px;font-family:ui-monospace,monospace;font-size:12px">${csv}</textarea><button type="button" class="btn primary" id="cp">${ic('copy')}Copy CSV</button>`});$('#cp').onclick=()=>{try{navigator.clipboard.writeText(csv).then(()=>toast('CSV copied'),()=>{$('#csv').select();toast('Press Ctrl+C to copy')})}catch(e){$('#csv').select()}}};
  $('#run').onclick=e=>{const b=e.currentTarget;b.disabled=true;const pts=series(S.range);const act=pts.filter(p=>!p.proj),pr=pts.filter(p=>p.proj);const a=act.reduce((x,p)=>x+p.v,0),pp=pr.reduce((x,p)=>x+p.v,0);const half=Math.floor(act.length/2);const r1=act.slice(0,half).reduce((x,p)=>x+p.v,0),r2=act.slice(half).reduce((x,p)=>x+p.v,0);const best=act.reduce((x,p)=>p.v>x.v?p:x);
    stopStreams.push(stream($('#insight'),`**${r2>=r1?'Up':'Down'} ${Math.abs(Math.round((r2-r1)/r1*100))}%** in the second half of the period ($${fmt(a)} total). Best ${best.week?'week':'day'}: ${lbl(best.d)} at $${fmt(best.v)}.\n\nNext ${pr.length} ${best.week?'weeks':'days'} projected at **$${fmt(pp)}** (±11%).\n\nCollect Flora & Fauna's overdue invoice and reply to Liam today to protect the forecast.`,{think:1300,steps:['Reading invoices','Comparing periods','Writing insight'],onDone:()=>{b.disabled=false;b.innerHTML=ic('spark')+'Run again'}}))};
  // projects
  const TABS=['Priority','Active','Completed','Cancelled','Recommended'];
  const inTab=(p,t)=>t==='Priority'?p.prio:t==='Active'?['In Progress','In Review','Draft'].includes(p.status)&&!p.prio:t==='Completed'?p.status==='Completed':t==='Cancelled'?p.status==='Cancelled':p.status==='Recommended';
  const ST={Draft:'neutral','In Progress':'warn','In Review':'info',Completed:'good',Cancelled:'bad',Recommended:'acc'};
  const drawP=()=>{const q=($('#pq')?.value||'').toLowerCase();$('#ptabs').innerHTML=TABS.map(t=>{const n=S.projects.filter(p=>inTab(p,t)).length;return `<button role="tab" aria-selected="${t===S.projTab}" data-pt="${t}">${t}${n?` <span class="c num">${n}</span>`:''}</button>`}).join('');
   $$('[data-pt]').forEach(b=>b.onclick=()=>{S.projTab=b.dataset.pt;drawP()});
   const l=S.projects.filter(p=>inTab(p,S.projTab)&&(p.client+p.title+p.task).toLowerCase().includes(q));
   $('#pbody').innerHTML=l.length?l.map(p=>{const c=cl(p.client);return `<tr><td><div class="cu">${av(p.client,{on:c&&c.health>70})}<div><b>${esc(p.client)}</b><small>${esc(c?c.co:'')}</small></div></div></td><td><b style="font-weight:500">${esc(p.title)}</b><br><small class="muted">${esc(p.rec||p.task)}</small></td><td>${p.note?`<button class="rm" data-note="${p.id}" aria-label="Open note">${ic('note')}</button>`:'<span class="muted">—</span>'}</td><td class="num">${p.due}</td><td class="num">$${fmt(p.price)}</td><td><span class="pill ${ST[p.status]}"><span class="d"></span>${p.status}</span></td><td><button class="rm" data-pm="${p.id}" aria-label="Project actions">${ic('dots')}</button></td></tr>`}).join(''):`<tr><td colspan="7" class="muted" style="text-align:center;padding:28px">Nothing in ${S.projTab.toLowerCase()} right now.</td></tr>`;
   $$('[data-pm]').forEach(b=>b.onclick=e=>{e.stopPropagation();const p=S.projects.find(x=>x.id===+b.dataset.pm);menu(b,[...(p.status==='Recommended'?[{t:'Accept as draft project',icon:'check',run:()=>{p.status='Draft';p.stage='Draft';toast('Added to Projects');drawP()}}]:[]),{t:p.prio?'Remove from priority':'Mark as priority',icon:'star',run:()=>{p.prio=!p.prio;drawP()}},...['In Progress','In Review','Completed','Cancelled'].filter(s=>s!==p.status).map(s=>({t:'Set '+s.toLowerCase(),icon:'chev',run:()=>{p.status=s;p.stage=s==='Completed'?'Done':s==='Cancelled'?'Draft':s;toast(`${p.title} → ${s}`);drawP()}})),'-',{t:'Message '+p.client.split(' ')[0],icon:'mail',run:()=>{const i=S.threads.findIndex(t=>t.n===p.client);if(i>=0)S.active=i;location.hash='app-inbox'}}])});
   $$('[data-note]').forEach(b=>b.onclick=()=>{const p=S.projects.find(x=>x.id===+b.dataset.note);modal({title:'Note · '+p.title,submit:'Save note',body:`<textarea class="input" id="nt" name="t">${esc(p.noteText||`Kick-off done. ${p.client.split(' ')[0]} prefers async updates on Fridays. Waiting on brand assets.`)}</textarea>`,onSubmit:f=>{p.noteText=f.elements.t.value;toast('Note saved')}})})};
  drawP();
  $('#pSearch').onclick=()=>{const b=$('#pSearchBox');b.hidden=!b.hidden;if(!b.hidden)$('#pq').focus()};$('#pq').oninput=drawP;
  $('#pAdd').onclick=()=>projectForm(()=>{S.projTab='Active';drawP()});
  // tasks
  const drawT=()=>{$('#tasks').innerHTML=S.tasks.map((t,i)=>{const d=t.subs.filter(s=>s[1]).length;return `<div class="task ${t.open?'open':''}">${ringSVG(d/t.subs.length)}<div><b>${t.t}</b><div class="meta"><span>${ic('cal','width:12px;height:12px;vertical-align:-2px')} ${t.d}</span><span>${d}/${t.subs.length} completed</span></div><p>${t.p}</p>${t.open?`<div class="sub">${t.subs.map((s,k)=>`<label class="${s[1]?'done':''}"><input type="checkbox" data-sub="${i}-${k}" ${s[1]?'checked':''}><span>${esc(s[0])}</span></label>`).join('')}</div>`:''}</div><button class="rm" data-tt="${i}" aria-expanded="${!!t.open}" aria-label="${t.open?'Collapse':'Expand'} ${t.t}" style="transform:rotate(${t.open?90:0}deg)">${ic('chev')}</button></div>`}).join('');
   $$('[data-tt]').forEach(b=>b.onclick=()=>{const t=S.tasks[+b.dataset.tt];t.open=!t.open;drawT()});
   $$('[data-sub]').forEach(c=>c.onchange=()=>{const [i,k]=c.dataset.sub.split('-').map(Number);S.tasks[i].subs[k][1]=c.checked;drawT();if(S.tasks[i].subs.every(s=>s[1]))toast(S.tasks[i].t+' all done')})};
  drawT();$('#seeAll').onclick=()=>{const all=S.tasks.every(t=>t.open);S.tasks.forEach(t=>t.open=!all);drawT()};
  assistant($('#assist'));
}
function assistant(el){
  const hist=S.chat||(S.chat=[]);
  const draw=()=>{el.innerHTML=`<div class="hi"><small>Hi, ${esc(S.user)}</small><b>How can I help you?</b></div>
   <div class="modes"><div class="seg" role="tablist">${[['Tandem','spark'],['Write','edit'],['Research','globe']].map(m=>`<button role="tab" aria-selected="${S.assistMode===m[0]}" data-mode="${m[0]}">${ic(m[1],'width:13px;height:13px')}${m[0]}</button>`).join('')}</div></div>
   ${hist.length?`<div class="chat" data-scroll id="chat">${hist.map((m,i)=>`<div class="m ${m.r}" ${i===hist.length-1&&m.r==='a'&&m.pending?'id="pend"':''}>${m.pending?'':m.r==='a'?md(m.t):esc(m.t)}</div>`).join('')}</div><button class="btn ghost sm" id="newChat" style="align-self:center">${ic('plus','width:13px;height:13px')}New chat</button>`:`<div class="qa">${qaTiles()}</div>`}
   <form class="askrow" id="askrow"><label class="sr" for="aq">Ask Tandem</label><input id="aq" placeholder="${S.assistMode==='Write'?'What should I write?':S.assistMode==='Research'?'Research a client or market…':'Ask something…'}" autocomplete="off"><button aria-label="Send">${ic('send','width:15px;height:15px')}</button></form>`;
   $$('[data-mode]',el).forEach(b=>b.onclick=()=>{S.assistMode=b.dataset.mode;draw()});
   $$('[data-qa]',el).forEach(b=>b.onclick=()=>ask({'Text assistance':'Draft a follow-up to Sophie about pricing','Process automation':'What can I automate?','Schedule optimization':'Optimise my schedule this week','Smart response':'Which clients are at risk this week?'}[b.dataset.qa]));
   $('#newChat',el)?.addEventListener('click',()=>{hist.length=0;draw()});
   $('#askrow',el).onsubmit=e=>{e.preventDefault();const v=$('#aq',el).value.trim();if(v)ask(v)};
   const c=$('#chat',el);if(c)c.scrollTop=c.scrollHeight};
  const ask=q=>{let a=aiAnswer(q);if(S.assistMode==='Research'&&!/risk|forecast|revenue/.test(q.toLowerCase()))a=`**Research summary**\n\n`+a+`\n\nSources: your CRM notes, public company site, LinkedIn activity (last 30 days).`;hist.push({r:'u',t:q},{r:'a',t:a,pending:true});draw();
   stopStreams.push(stream($('#pend',el),a,{think:900,steps:STEPS,onDone:()=>{hist[hist.length-1].pending=false}}));$('#aq',el).focus()};
  draw();
}
function projectForm(after){modal({title:'New project',submit:'Create project',body:`<div class="field"><label for="npc">Client</label><select class="input" id="npc" name="c">${S.clients.map(c=>`<option>${esc(c.name)}</option>`).join('')}</select></div><div class="field"><label for="npt">Task</label><input class="input" id="npt" name="t" placeholder="e.g. Landing page redesign"></div><div class="two"><div class="field"><label for="npp">Price (USD)</label><input class="input" id="npp" name="p" type="number" min="0" value="2800"></div><div class="field"><label for="npd">Due date</label><input class="input" id="npd" name="d" type="date" value="2026-10-20"></div></div><p class="fine">${ic('spark','width:12px;height:12px;color:var(--accent)')} Tandem suggests $2,800 based on 12 similar projects.</p>`,
 onSubmit:f=>{if(!req(f,['t','p']))return false;const c=cl(f.elements.c.value);const d=new Date(f.elements.d.value||'2026-10-20');S.projects.unshift({id:Date.now(),client:c.name,title:c.co,task:f.elements.t.value.trim(),due:isNaN(d)?'Oct 20':lbl(d),price:+f.elements.p.value,status:'In Progress',prio:false,stage:'In Progress'});after&&after();toast('Project created')}})}

/* ---------- Clients ---------- */
function pClients(C){
  C.innerHTML=`<div class="bh" style="margin-bottom:16px"><div><h2 style="font-size:24px;letter-spacing:-.03em">Clients</h2><p class="muted" style="font-size:13.5px">${S.clients.length} clients in ${new Set(S.clients.map(c=>c.country)).size} countries · average health ${Math.round(S.clients.reduce((a,c)=>a+c.health,0)/S.clients.length)}</p></div><button class="btn primary" id="cAdd">${ic('plus')}Add client</button></div>
  <div class="toolbar"><div class="search">${ic('search')}<label class="sr" for="cq">Search clients</label><input class="input" id="cq" placeholder="Search clients" value="${esc(S.clientQ)}"></div><div class="seg" role="group" aria-label="Filter by health">${['All','Healthy','Watch','At risk'].map(f=>`<button type="button" data-cf="${f}" aria-pressed="${f===S.clientF}">${f}</button>`).join('')}</div><label class="sr" for="cs">Sort</label><select class="dd" id="cs" style="height:38px"><option value="health">Sort by health</option><option value="ltv">Sort by lifetime value</option><option value="last">Sort by last contact</option></select></div>
  <div class="cgrid" id="cg"></div>`;
  const band=h=>h>=75?'Healthy':h>=50?'Watch':'At risk';
  const draw=()=>{const q=S.clientQ.toLowerCase(),k=$('#cs').value;const l=S.clients.filter(c=>(S.clientF==='All'||band(c.health)===S.clientF)&&(c.name+c.co+c.country).toLowerCase().includes(q)).sort((a,b)=>k==='last'?a.last-b.last:b[k]-a[k]);
   $('#cg').innerHTML=l.length?l.map(c=>`<button type="button" class="cc" data-c="${c.id}"><div class="top">${av(c.name,{s:42,src:c.src})}<div style="min-width:0;flex:1"><b style="font-weight:600;display:block">${esc(c.name)}</b><small class="muted">${esc(c.co)}</small></div><span class="pill ${c.health>=75?'good':c.health>=50?'warn':'bad'}">${band(c.health)}</span></div>
    <div class="health"><span class="muted" style="width:44px">Health</span><span class="hbar"><i style="width:${c.health}%;background:${healthColor(c.health)}"></i></span><b class="num">${c.health}</b></div>
    <div class="stats"><div>Lifetime<b class="num">$${fmt(c.ltv)}</b></div><div>Last contact<b class="num">${c.last}d ago</b></div><div>Local time<b class="num">${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:c.tz})}</b></div></div></button>`).join(''):`<p class="muted" style="grid-column:1/-1;text-align:center;padding:40px">No clients match. <button class="btn sm" type="button" id="clr">Clear filters</button></p>`;
   $$('[data-c]').forEach(b=>b.onclick=()=>clientDrawer(S.clients.find(c=>c.id===+b.dataset.c)));$('#clr')?.addEventListener('click',()=>{S.clientQ='';S.clientF='All';pClients(C)})};
  draw();$('#cq').oninput=e=>{S.clientQ=e.target.value;draw()};$('#cs').onchange=draw;
  $$('[data-cf]').forEach(b=>b.onclick=()=>{S.clientF=b.dataset.cf;$$('[data-cf]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
  $('#cAdd').onclick=()=>modal({title:'Add client',submit:'Add client',body:`<div class="two"><div class="field"><label for="acn">Name</label><input class="input" id="acn" name="n"></div><div class="field"><label for="acc">Company</label><input class="input" id="acc" name="c"></div></div><div class="field"><label for="ace">Email</label><input class="input" id="ace" name="e" type="email"></div><div class="two"><div class="field"><label for="acr">Country</label><select class="input" id="acr" name="r"><option value="USA|America/New_York">USA</option><option value="UK|Europe/London">UK</option><option value="Germany|Europe/Berlin">Germany</option><option value="Australia|Australia/Sydney">Australia</option><option value="Canada|America/Toronto">Canada</option></select></div><div class="field"><label for="acs">Channel</label><select class="input" id="acs" name="s">${Object.keys(SRC).map(s=>`<option>${s}</option>`).join('')}</select></div></div>`,
   onSubmit:f=>{if(!req(f,['n','c','e']))return false;const [country,tz]=f.elements.r.value.split('|');S.clients.unshift({id:Date.now(),name:f.elements.n.value.trim(),co:f.elements.c.value.trim(),email:f.elements.e.value.trim(),country,tz,src:f.elements.s.value,health:70,ltv:0,last:0});S.clientF='All';S.clientQ='';pClients(C);toast('Client added')}});
}
function clientDrawer(c){
  const projs=S.projects.filter(p=>p.client===c.name);
  const d=drawer(`<div style="padding:20px;display:grid;gap:16px"><div style="display:flex;justify-content:space-between;align-items:start">${av(c.name,{s:56,src:c.src})}<button class="rm" data-close aria-label="Close">${ic('x')}</button></div>
   <div><h2 style="font-size:22px;letter-spacing:-.02em">${esc(c.name)}</h2><p class="muted">${esc(c.co)} · ${esc(c.country)}</p></div>
   <div style="display:flex;gap:6px;flex-wrap:wrap"><span class="pill neutral">${ic('mail','width:12px;height:12px')}${esc(c.email)}</span><span class="pill neutral">${ic('globe','width:12px;height:12px')}${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:c.tz})} local</span></div>
   <div class="box tint"><div class="bh" style="margin-bottom:8px"><h3 style="display:flex;gap:6px;align-items:center;color:var(--accent)">${ic('spark')}AI brief</h3><button class="btn sm" id="brief">Generate</button></div><div id="briefOut" data-scroll class="muted" style="font-size:13.5px">A one-paragraph summary of this relationship, with a suggested next step.</div></div>
   <div class="two" style="grid-template-columns:1fr 1fr 1fr"><div><small class="muted">Health</small><div style="font-size:20px;font-weight:600;color:${healthColor(c.health)}" class="num">${c.health}</div></div><div><small class="muted">Lifetime</small><div style="font-size:20px;font-weight:600" class="num">$${fmt(c.ltv)}</div></div><div><small class="muted">Projects</small><div style="font-size:20px;font-weight:600" class="num">${projs.length}</div></div></div>
   <div><b style="font-weight:600">Projects</b>${projs.length?projs.map(p=>`<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line);font-size:13.5px"><span>${esc(p.task)}</span><span class="num">$${fmt(p.price)}</span></div>`).join(''):'<p class="muted" style="font-size:13px;margin-top:6px">No projects yet.</p>'}</div>
   <div style="display:flex;gap:8px"><button class="btn primary" id="msgC" style="flex:1">${ic('mail')}Message</button><button class="btn" id="projC" style="flex:1">${ic('plus')}Project</button></div></div>`);
  $('#brief',d.el).onclick=e=>{e.currentTarget.disabled=true;stopStreams.push(stream($('#briefOut',d.el),`${c.name.split(' ')[0]} has worked with you on ${projs.length||'no'} project${projs.length===1?'':'s'} worth $${fmt(projs.reduce((a,p)=>a+p.price,0))}. They usually reply within ${c.health>70?'a few hours':'2–3 days'} on ${c.src}. `+(c.health<50?`Engagement has dropped: last contact was ${c.last} days ago. **Next step:** send a short, no-pressure check-in and offer a 15-minute call.`:`The relationship is strong. **Next step:** propose a phase-2 or retainer while momentum is high.`),{think:900,steps:['Reading history','Summarising']}))};
  $('#msgC',d.el).onclick=()=>{let i=S.threads.findIndex(t=>t.n===c.name);if(i<0){S.threads.unshift({n:c.name,time:'now',msgs:[],unread:0,star:false});i=0}S.active=i;d.close();location.hash='app-inbox'};
  $('#projC',d.el).onclick=()=>{d.close();projectForm(()=>toast('See it on the Projects board'));setTimeout(()=>{const s=$('#npc');if(s)s.value=c.name},40)};
}

/* ---------- Projects (kanban) ---------- */
function pProjects(C){
  const COLS=[['Draft','var(--faint)'],['In Progress','var(--warn)'],['In Review','var(--info)'],['Done','var(--mint-2)']];
  const draw=()=>{C.innerHTML=`<div class="bh" style="margin-bottom:16px"><div><h2 style="font-size:24px;letter-spacing:-.03em">Projects</h2><p class="muted" style="font-size:13.5px">Drag cards between columns. Pipeline value $${fmt(S.projects.filter(p=>p.stage!=='Done'&&!['Cancelled','Recommended'].includes(p.status)).reduce((a,p)=>a+p.price,0))}</p></div><button class="btn primary" id="kAdd">${ic('plus')}New project</button></div>
   <div class="kb">${COLS.map(([col,c])=>{const l=S.projects.filter(p=>p.stage===col&&!['Cancelled','Recommended'].includes(p.status));return `<div class="kcol" data-col="${col}"><h4><i style="width:8px;height:8px;border-radius:50%;background:${c}"></i>${col}<span class="pill neutral num" style="padding:0 7px">${l.length}</span><small class="num">$${fmt(l.reduce((a,p)=>a+p.price,0))}</small></h4>
    ${l.map(p=>`<article class="kcard" draggable="true" data-id="${p.id}"><b>${esc(p.task)}</b><button class="rm" data-km="${p.id}" aria-label="Move ${esc(p.task)}">${ic('dots')}</button><div class="row"><span class="cu">${av(p.client,{s:22})}<span>${esc(p.title)}</span></span></div><div class="row"><span>${ic('cal','width:13px;height:13px;vertical-align:-2px')} ${p.due}</span><b class="num" style="color:var(--fg)">$${fmt(p.price)}</b></div></article>`).join('')}
    <button class="kadd" type="button" data-kadd="${col}">+ Add card</button></div>`}).join('')}</div>`;
   $('#kAdd').onclick=()=>projectForm(draw);
   $$('[data-kadd]').forEach(b=>b.onclick=()=>projectForm(()=>{S.projects[0].stage=b.dataset.kadd;S.projects[0].status=b.dataset.kadd==='Done'?'Completed':b.dataset.kadd;draw()}));
   let dragId=null;
   $$('.kcard').forEach(k=>{k.addEventListener('dragstart',e=>{dragId=+k.dataset.id;k.classList.add('drag');e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',k.dataset.id)}catch(_){}});k.addEventListener('dragend',()=>k.classList.remove('drag'))});
   $$('.kcol').forEach(col=>{col.addEventListener('dragover',e=>{e.preventDefault();col.classList.add('over')});col.addEventListener('dragleave',e=>{if(!col.contains(e.relatedTarget))col.classList.remove('over')});col.addEventListener('drop',e=>{e.preventDefault();col.classList.remove('over');move(dragId,col.dataset.col)})});
   $$('[data-km]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=+b.dataset.km;const p=S.projects.find(x=>x.id===id);menu(b,[...COLS.filter(c=>c[0]!==p.stage).map(c=>({t:'Move to '+c[0],icon:'arrow',run:()=>move(id,c[0])})),'-',{t:'Cancel project',icon:'x',run:()=>{p.status='Cancelled';draw();toast('Project cancelled')}}])});
  };
  const move=(id,col)=>{const p=S.projects.find(x=>x.id===id);if(!p||p.stage===col)return;p.stage=col;p.status=col==='Done'?'Completed':col;draw();toast(`${p.task} → ${col}`)};
  draw();
}

/* ---------- Inbox ---------- */
function pInbox(C){
  S.active=Math.min(S.active,S.threads.length-1);
  C.innerHTML=`<div class="inbox"><section class="conv" id="conv"></section>
   <aside class="list"><div class="list-h"><b>All messages</b><button class="ibtn" id="lsBtn" aria-label="Search messages" style="width:30px;height:30px">${ic('search','width:14px;height:14px')}</button><label class="sr" for="plat">Platform</label><select class="dd" id="plat">${['All platforms',...Object.keys(SRC)].map(p=>`<option ${p===S.platform?'selected':''}>${p}</option>`).join('')}</select></div>
   <div id="lsBox" hidden style="padding:8px 12px;border-bottom:1px solid var(--line)"><label class="sr" for="lq">Search messages</label><input class="input" id="lq" placeholder="Search by name or text" value="${esc(S.inboxQ)}" style="height:34px"></div><div class="list-b" id="lb"></div></aside></div>`;
  const drawList=()=>{const q=S.inboxQ.toLowerCase();$('#lb').innerHTML=S.threads.map((t,i)=>{const c=cl(t.n)||{src:'Email',health:70};const last=t.msgs[t.msgs.length-1];if(S.platform!=='All platforms'&&c.src!==S.platform)return '';if(q&&!(t.n+(last?last[2]:'')).toLowerCase().includes(q))return '';
    return `<div class="li" role="button" tabindex="0" data-t="${i}" aria-current="${i===S.active}">${av(t.n,{src:c.src})}<div class="mid"><b>${esc(t.n)}</b><p>${esc(last?last[2]:'New conversation')}</p></div><div class="end"><span>${t.time}</span>${t.unread?`<span class="badge-n num">${t.unread}</span>`:`<button class="star" data-star="${i}" aria-pressed="${t.star}" aria-label="Star">${ic('star','width:14px;height:14px')}</button>`}</div></div>`}).join('')||'<p class="muted" style="padding:20px;text-align:center">No conversations match.</p>';
   $$('[data-t]').forEach(b=>{const open=e=>{if(e.target.closest('[data-star]'))return;S.active=+b.dataset.t;S.threads[S.active].unread=0;drawList();drawConv();updCnt()};b.onclick=open;b.onkeydown=e=>{if(e.key==='Enter')open(e)}});
   $$('[data-star]').forEach(s=>s.onclick=e=>{e.stopPropagation();const t=S.threads[+s.dataset.star];t.star=!t.star;drawList()})};
  const updCnt=()=>{const n=S.threads.reduce((a,t)=>a+t.unread,0);const a=$('.pnav a[href="#app-inbox"]');const c=$('.cnt',a);if(n){if(c)c.textContent=n}else c?.remove()};
  let smart=null,atts=[];
  const drawConv=()=>{const t=S.threads[S.active];const c=cl(t.n)||{co:'',country:'',tz:'UTC',src:'Email'};t.unread=0;
   $('#conv').innerHTML=`<div class="conv-h">${av(t.n,{on:true,s:38})}<div class="n"><b>${esc(t.n)}</b><small>${esc(c.country)} · Local time: ${new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:c.tz})} · via ${c.src}</small></div><button class="ibtn ${t.muted?'on':''}" id="mute" aria-label="Mute" aria-pressed="${!!t.muted}">${ic('mute','width:15px;height:15px')}</button><button class="ibtn ${t.star?'on':''}" id="starH" aria-label="Star conversation">${ic('star','width:15px;height:15px')}</button><button class="ibtn" id="more" aria-label="More">${ic('dots','width:15px;height:15px')}</button></div>
   <div class="conv-b" id="cb" data-scroll>${t.msgs.map(m=>`<div class="bub ${m[0]==='me'?'me':''}"><small>${esc(m[1])}</small><p>${esc(m[2])}</p>${m[3]?m[3].map(a=>`<span class="att">${ic('clip','width:13px;height:13px')}${esc(a)}</span>`).join(''):''}</div>`).join('')||'<p class="muted" style="text-align:center;margin:auto">Start the conversation with '+esc(t.n.split(' ')[0])+'.</p>'}<div id="aiZone"></div></div>
   <form class="composer" id="comp"><div class="atts" id="atts"></div><div class="row"><label class="sr" for="ci">Message</label><input id="ci" placeholder="Send message…" autocomplete="off"><button type="button" class="ibtn" id="improve" aria-label="Improve writing with AI" title="Improve writing">${ic('spark','width:15px;height:15px')}</button><button class="ibtn" aria-label="Send" style="background:var(--accent);color:var(--accent-fg);border:0">${ic('send','width:15px;height:15px')}</button></div><p class="fine">Tandem can make mistakes. Check important details before sending.</p></form>`;
   drawAI();drawAtts();const cb=$('#cb');cb.scrollTop=cb.scrollHeight;
   $('#starH').onclick=()=>{t.star=!t.star;drawConv();drawList()};$('#mute').onclick=()=>{t.muted=!t.muted;drawConv();toast(t.muted?'Notifications muted':'Notifications on')};
   $('#more').onclick=e=>{e.stopPropagation();menu(e.currentTarget,[{t:'View client profile',icon:'home',run:()=>{const cc=cl(t.n);if(cc)clientDrawer(cc)}},{t:'Mark as unread',icon:'mail',run:()=>{t.unread=1;drawList();updCnt()}},{t:'Summarise conversation',icon:'sum',run:()=>tool('Message Summarization')}])};
   $('#comp').onsubmit=e=>{e.preventDefault();send($('#ci').value)};
   $('#improve').onclick=()=>{const v=$('#ci').value.trim();if(!v){toast('Type a message first, then improve it');$('#ci').focus();return}const b=$('#improve');b.disabled=true;setTimeout(()=>{$('#ci').value=improve(v);b.disabled=false;toast('Rewritten: clearer and warmer')},700)}};
  const improve=v=>{let s=v.trim().replace(/\s+/g,' ');s=s[0].toUpperCase()+s.slice(1);if(!/[.!?]$/.test(s))s+='.';if(!/^(hi|hello|hey)/i.test(s))s=`Hi ${S.threads[S.active].n.split(' ')[0]}, `+s[0].toLowerCase()+s.slice(1);return s+' Let me know if anything is unclear.'};
  const drawAtts=()=>{$('#atts').innerHTML=atts.map((a,i)=>`<span>${ic('clip','width:12px;height:12px')}${esc(a)}<button type="button" data-ra="${i}" aria-label="Remove ${esc(a)}">${ic('x','width:12px;height:12px')}</button></span>`).join('');$$('[data-ra]').forEach(b=>b.onclick=()=>{atts.splice(+b.dataset.ra,1);drawAtts()})};
  const send=(txt)=>{const v=(txt||'').trim();if(!v&&!atts.length)return;const t=S.threads[S.active];t.msgs.push(['me',new Date().toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}),v||'Sharing the files here.',atts.length?[...atts]:null]);t.time='now';atts=[];smart=null;drawConv();drawList();toast('Sent via '+((cl(t.n)||{}).src||'Email'));
   const who=t;setTimeout(()=>{if(S.threads[S.active]===who&&$('#cb')){const ty=document.createElement('div');ty.className='thinking';ty.innerHTML=`<i></i><i></i><i></i>${esc(who.n.split(' ')[0])} is typing`;$('#aiZone').before(ty);$('#cb').scrollTop=1e6}},700);
   setTimeout(()=>{who.msgs.push(['them',new Date().toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}),pickReply(v)]);if(S.threads[S.active]!==who)who.unread++;if(location.hash==='#app-inbox'){if(S.threads[S.active]===who)drawConv();drawList();updCnt()}},2400)};
  const pickReply=v=>/price|\$|quote|estimate/i.test(v)?'That sounds fair. Could you send the estimate as a PDF so I can share it with my co-founder?':/call|meet|thursday|time/i.test(v)?'Thursday works. I\'ll send a calendar invite for 10:00 my time.':'Thanks, that\'s really helpful. Let me review and get back to you tomorrow.';
  const lastThem=()=>{const t=S.threads[S.active];return [...t.msgs].reverse().find(m=>m[0]==='them')};
  const REPLIES=v=>{const n=S.threads[S.active].n.split(' ')[0];const q=(v||'').toLowerCase();
   if(/process|pricing|price/.test(q))return ['Of course! I\'ll start by understanding your goals, creating wireframes, and refining the design in Figma, keeping communication open throughout. I offer fixed-rate and hourly pricing based on scope. Share more details, and I\'ll provide a tailored estimate. Excited to learn more!',`Happy to explain, ${n}. My process has four steps: discovery call, wireframes, high-fidelity design in Figma and a handover with a short Loom walkthrough. Most landing pages are a fixed $2,800 with two revision rounds.`];
   if(/wireframe|review|when/.test(q))return [`Great question, ${n}. The homepage wireframes are ready. Would Thursday at 9:30 your time work for a 30-minute walkthrough?`,`I can share the wireframes today as a Figma link, then we review live on Thursday. Does that work for you?`];
   if(/booking|form|add/.test(q))return [`Yes, we can add that, ${n}. A booking form with practice-management sync adds about 4 days and $1,200. Want me to update the quote?`,`Definitely possible. I'd suggest a simple 3-step booking flow. I'll send a quick sketch and a revised estimate tomorrow.`];
   if(/invoice|finance|pay/.test(q))return [`Thanks ${n}! For reference, INV-118 is $5,000 and was due on Sep 23. Happy to walk through the designs whenever suits you.`,`No problem. I'll resend INV-118 to your finance team with bank details for EUR transfers.`];
   if(/pause|january/.test(q))return [`Totally understand, ${n}. I'll pause the portal work and keep your files ready. Shall we pencil in a restart call for January 6?`];
   return [`Thanks for the update, ${n}! I'll take a look and come back to you by tomorrow.`,`Appreciate it, ${n}. I'll action this today and share progress by Friday.`]};
  const TONE={Friendly:s=>s.replace(/^Certainly\.|^Sure\./,'Of course!'),Formal:s=>s.replace(/^Of course!|^Happy to explain,|^Great question,|^Totally understand,|^Thanks for the update,|^Thanks /,m=>m.startsWith('Thanks')?'Thank you ':'Certainly,').replace(/I'll/g,'I will').replace(/!/g,'.').replace(/Excited to learn more\./,'I look forward to hearing from you.'),Concise:s=>s.split(/(?<=[.!?])\s/).slice(0,2).join(' ')};
  let variant=0;
  const drawAI=()=>{const z=$('#aiZone');if(!z)return;const lt=lastThem();
   if(smart){z.innerHTML=`<div class="smart"><div class="h">${ic('spark')}${esc(smart.title)}<div class="tools">${smart.kind==='reply'?`<button class="rm" id="regen" aria-label="Regenerate" title="Regenerate">${ic('refresh','width:15px;height:15px')}</button><button class="rm" id="edit" aria-label="Edit" title="Edit">${ic('edit','width:15px;height:15px')}</button>`:''}<button class="rm" id="closeAI" aria-label="Dismiss">${ic('x','width:15px;height:15px')}</button></div></div><div class="txt" id="aiTxt"></div>${smart.kind==='reply'?`<div class="why">This response builds trust, shows flexibility and keeps the conversation open.</div><div class="foot2">${['Friendly','Formal','Concise'].map(t=>`<button type="button" class="chip" data-tn="${t}" aria-pressed="${smart.tone===t}" style="height:26px">${t}</button>`).join('')}<button type="button" class="btn primary sm" id="useAI" style="margin-left:auto">${ic('send','width:13px;height:13px')}Send</button><button type="button" class="btn sm" id="insAI">Insert</button></div>`:''}${smart.kind==='list'?'<div class="foot2" id="aiList"></div>':''}</div>`;
    const tx=$('#aiTxt');if(smart.streamed)tx.innerHTML=md(smart.text);else{smart.streamed=true;stopStreams.push(stream(tx,smart.text,{think:smart.think||800,steps:['Reading thread',smart.kind==='reply'?'Drafting reply':'Working']}))}
    if(smart.kind==='list'){$('#aiList').innerHTML=smart.items.map((it,i)=>`<button type="button" class="chip" data-it="${i}">${esc(it.l)}</button>`).join('');$$('[data-it]').forEach(b=>b.onclick=()=>smart.items[+b.dataset.it].run())}
    $('#closeAI').onclick=()=>{smart=null;drawAI()};
    $('#regen')?.addEventListener('click',()=>{variant++;const arr=REPLIES(lt&&lt[2]);smart={...smart,text:TONE[smart.tone](arr[variant%arr.length]),streamed:false,think:500};drawAI()});
    $('#edit')?.addEventListener('click',()=>{const e=$('#aiTxt');const on=e.getAttribute('contenteditable')==='true';e.setAttribute('contenteditable',!on);if(!on){e.focus();toast('Edit the draft, then send')}else smart.text=e.innerText});
    $$('[data-tn]').forEach(b=>b.onclick=()=>{const arr=REPLIES(lt&&lt[2]);smart={...smart,tone:b.dataset.tn,text:TONE[b.dataset.tn](arr[variant%arr.length]),streamed:false,think:400};drawAI()});
    $('#useAI')?.addEventListener('click',()=>send($('#aiTxt').innerText));
    $('#insAI')?.addEventListener('click',()=>{$('#ci').value=$('#aiTxt').innerText;smart=null;drawAI();$('#ci').focus()});
   }else{z.innerHTML=`<div class="tiles">${[['reply','Smart Reply','var(--accent-soft)','var(--accent)'],['tone','Tone Adjustment','var(--bad-soft)','var(--bad)'],['arrow','Follow-Up Suggestions','var(--warn-soft)','var(--warn)'],['sum','Message Summarization','var(--good-soft)','var(--good)'],['clip','Suggested Attachments','var(--info-soft)','var(--info)'],['status','Automated Status Updates','var(--panel-2)','var(--muted)']].map(t=>`<button type="button" data-tool="${t[1]}"><span class="qi" style="background:${t[2]};color:${t[3]}">${ic(t[0])}</span>${t[1]}</button>`).join('')}</div>`;
    $$('[data-tool]').forEach(b=>b.onclick=()=>tool(b.dataset.tool))}
   const cb=$('#cb');if(cb)cb.scrollTop=cb.scrollHeight};
  const tool=name=>{const t=S.threads[S.active],lt=lastThem(),n=t.n.split(' ')[0];variant=0;
   if(name==='Smart Reply'){if(!lt){toast(`Nothing from ${n} to reply to yet`);return}smart={kind:'reply',title:'Smart Reply',tone:'Friendly',text:REPLIES(lt[2])[0]}}
   if(name==='Tone Adjustment'){const v=$('#ci').value.trim();if(!v&&lt){smart={kind:'reply',title:'Smart Reply · pick a tone',tone:'Formal',text:TONE.Formal(REPLIES(lt[2])[0])}}else if(v){smart={kind:'reply',title:'Rewritten in a formal tone',tone:'Formal',text:TONE.Formal(improve(v))}}else{toast('Type a message first');return}}
   if(name==='Follow-Up Suggestions'){const sug=[`Hi ${n}, just checking whether you had a chance to review my last message.`,`Hi ${n}, I've blocked time next week for your project. Shall we confirm the start date?`,`Hi ${n}, sharing a quick example of similar work. Happy to walk you through it.`];smart={kind:'list',title:'Follow-up suggestions',text:`Pick one to put it in the composer. Best time to send: **${new Date(Date.now()+3600e3*3).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:(cl(t.n)||{tz:'UTC'}).tz})} ${n}'s time**, when they usually reply fastest.`,items:sug.map((s,i)=>({l:['Gentle nudge','Confirm start','Share example'][i],run:()=>{$('#ci').value=s;$('#ci').focus()}}))}}
   if(name==='Message Summarization'){const them=t.msgs.filter(m=>m[0]==='them').length,me=t.msgs.length-them;smart={kind:'sum',title:'Summary',text:`**${t.msgs.length} messages** (${them} from ${n}, ${me} from you).\n\n${n} ${lt?'last wrote: “'+lt[2].slice(0,90)+(lt[2].length>90?'…':'')+'”':'has not written yet'}\n\n**Open question:** ${lt&&/\?/.test(lt[2])?'yes, they are waiting on your answer.':'none, the ball is in their court.'}\n**Sentiment:** positive · **Urgency:** ${t.unread?'high':'normal'}`}}
   if(name==='Suggested Attachments'){const files=['Studio process.pdf','Pricing 2026.pdf','Case study · Copperleaf.pdf','Proposal template.docx'];smart={kind:'list',title:'Suggested attachments',text:`Based on this thread, ${n} will probably want these. Click to attach.`,items:files.map(f=>({l:f,run:()=>{if(!atts.includes(f)){atts.push(f);drawAtts();toast(f+' attached')}}}))}}
   if(name==='Automated Status Updates'){t.auto=!t.auto;smart={kind:'sum',title:'Automated status updates',text:t.auto?`**On.** Every Friday at 16:00 ${n}'s time, Tandem will send a short update from project activity. You'll get a preview on Thursday to approve or edit.`:`**Off.** ${n} will no longer receive weekly status updates.`};toast(t.auto?'Weekly updates on for '+n:'Weekly updates off')}
   drawAI()};
  drawList();drawConv();updCnt();
  $('#plat').onchange=e=>{S.platform=e.target.value;drawList()};$('#lsBtn').onclick=()=>{const b=$('#lsBox');b.hidden=!b.hidden;if(!b.hidden)$('#lq').focus()};$('#lq').oninput=e=>{S.inboxQ=e.target.value;drawList()};
}

/* ---------- Analytics ---------- */
function pAnalytics(C){
  const stages=[['Leads',148,'var(--lav)'],['Qualified',86,'var(--accent-2)'],['Proposal sent',41,'var(--mint)'],['Won',19,'var(--mint-2)']];
  const src=[['Referrals',48],['LinkedIn',31],['Upwork',22],['Website',18],['Dribbble',12]];
  C.innerHTML=`<div class="bh" style="margin-bottom:16px"><div><h2 style="font-size:24px;letter-spacing:-.03em">Analytics</h2><p class="muted" style="font-size:13.5px">Last 90 days · all workspaces</p></div><div class="seg" role="group" aria-label="Currency">${['USD','EUR','AUD'].map(c=>`<button type="button" data-cur="${c}" aria-pressed="${(S.cur||'USD')===c}">${c}</button>`).join('')}</div></div>
  <div class="kpis" style="margin-bottom:16px;grid-template-columns:repeat(3,1fr)" id="ak"></div>
  <div class="an"><div class="col">
   <div class="box"><div class="bh"><h3>Revenue · actual vs AI forecast</h3><span class="pill acc">${ic('spark','width:12px;height:12px')}91% forecast accuracy</span></div><div id="line"></div></div>
   <div class="box"><div class="bh"><h3>Ask your data</h3></div><form class="askrow" id="adF" style="margin-bottom:10px"><label class="sr" for="adq">Ask about your numbers</label><input id="adq" placeholder="e.g. What is my average project value?"><button aria-label="Ask">${ic('send','width:15px;height:15px')}</button></form><div class="chips" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">${['Which source wins most deals?','What is my average project value?','Where is revenue heading?'].map(q=>`<button type="button" class="chip" data-aq="${q}">${q}</button>`).join('')}</div><div id="adOut" data-scroll style="font-size:13.5px;max-height:220px;overflow-y:auto"></div></div>
  </div><div class="col">
   <div class="box"><div class="bh"><h3>Pipeline funnel</h3></div><div class="funnel">${stages.map(s=>`<div class="fr"><span>${s[0]}</span><span class="bar"><i style="width:${s[1]/stages[0][1]*100}%;background:${s[2]}">${Math.round(s[1]/stages[0][1]*100)}%</i></span><b class="num" style="text-align:right">${s[1]}</b></div>`).join('')}</div><p class="fine" style="margin-top:12px">Win rate from proposal: <b class="num">${Math.round(19/41*100)}%</b> · industry median 32%</p></div>
   <div class="box"><div class="bh"><h3>Won deals by source</h3></div><div class="hb">${src.map(s=>`<div><span>${s[0]}</span><span class="t"><i style="width:${s[1]/48*100}%"></i></span><b class="num" style="text-align:right">${s[1]}%</b></div>`).join('')}</div></div>
   <div class="box"><div class="bh"><h3>Clients by region</h3></div><div class="hb">${Object.entries(S.clients.reduce((a,c)=>(a[c.country]=(a[c.country]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>`<div><span>${k}</span><span class="t"><i style="width:${v/5*100}%;background:var(--mint-2)"></i></span><b class="num" style="text-align:right">${v}</b></div>`).join('')}</div></div>
  </div></div>`;
  const RATE={USD:[1,'$'],EUR:[.92,'€'],AUD:[1.52,'A$']};
  const draw=()=>{const [r,sym]=RATE[S.cur||'USD'];$('#ak').innerHTML=[['Revenue (90d)',sym+fmt(41280*r),'+12%','good'],['Avg. project value',sym+fmt(7960*r),'+5%','good'],['Avg. reply time','2h 14m','-38%','good']].map(k=>`<div><div class="t">${k[0]}<span class="pill ${k[3]}">${k[2]}</span></div><div class="v"><b class="num">${k[1]}</b></div></div>`).join('');
   const m=['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];const act=[9.2,11.4,10.1,13.8,12.9,14.6,null,null].map(v=>v&&v*r),fc=[null,null,null,null,null,14.6,16.1,17.4].map(v=>v&&v*r);
   const W=600,H=220,P={l:44,r:10,t:14,b:26};const mx=20*r;const x=i=>P.l+i*(W-P.l-P.r)/(m.length-1),y=v=>H-P.b-v/mx*(H-P.t-P.b);
   let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img" aria-label="Monthly revenue with forecast">`;
   for(let g=0;g<=4;g++){const v=mx*g/4;s+=`<line x1="${P.l}" x2="${W-P.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-dasharray="3 4"/><text x="${P.l-8}" y="${y(v)+4}" text-anchor="end" class="ax num">${sym}${fmt(v,0)}k</text>`}
   m.forEach((l,i)=>s+=`<text x="${x(i)}" y="${H-6}" text-anchor="middle" class="ax">${l}</text>`);
   const band=fc.map((v,i)=>v?[i,v*1.1,v*.9]:null).filter(Boolean);s+=`<path d="${band.map((b,k)=>`${k?'L':'M'}${x(b[0])} ${y(b[1])}`).join(' ')} ${band.slice().reverse().map(b=>`L${x(b[0])} ${y(b[2])}`).join(' ')}Z" fill="var(--lav)" opacity=".45"/>`;
   const path=a=>a.map((v,i)=>v==null?'':`${a.slice(0,i).some(q=>q!=null)?'L':'M'}${x(i)} ${y(v)}`).join(' ');
   s+=`<path d="${path(act)} L${x(5)} ${H-P.b} L${x(0)} ${H-P.b}Z" fill="var(--mint)" opacity=".18"/><path d="${path(act)}" fill="none" stroke="var(--mint-2)" stroke-width="2.4"/><path d="${path(fc)}" fill="none" stroke="var(--sec)" stroke-width="2.4" stroke-dasharray="6 5"/>`;
   act.forEach((v,i)=>{if(v!=null)s+=`<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="var(--mint-2)"><title>${m[i]}: ${sym}${fmt(v,1)}k</title></circle>`});fc.forEach((v,i)=>{if(v!=null&&i>5)s+=`<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="var(--sheet)" stroke="var(--sec)" stroke-width="2"><title>${m[i]} forecast: ${sym}${fmt(v,1)}k</title></circle>`});
   $('#line').innerHTML=s+`</svg><div style="display:flex;gap:16px;font-size:12.5px;color:var(--muted);margin-top:8px"><span><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--mint-2)"></i> Actual</span><span><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--sec)"></i> AI forecast</span><span><i style="display:inline-block;width:14px;height:9px;border-radius:3px;background:var(--lav)"></i> ±10% range</span></div>`};
  draw();$$('[data-cur]').forEach(b=>b.onclick=()=>{S.cur=b.dataset.cur;$$('[data-cur]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
  const ans=q=>{const s=q.toLowerCase();let a;if(/source|channel|win/.test(s))a=`**Referrals** win the most deals (48% of won revenue) and close fastest, 9 days on average. LinkedIn is second at 31%, but its deals are 40% larger.\n\nSuggestion: ask your 5 healthiest clients for an intro this month.`;else if(/average|avg|value/.test(s))a=`Your average project value is **$7,960** over the last 90 days, up 5%. Shopify builds average $6,200, marketing sites $11,600.`;else a=aiAnswer(q);stopStreams.push(stream($('#adOut'),a,{think:900,steps:['Querying 90 days of data','Writing']}))};
  $('#adF').onsubmit=e=>{e.preventDefault();const v=$('#adq').value.trim();if(v)ans(v)};$$('[data-aq]').forEach(b=>b.onclick=()=>{$('#adq').value=b.dataset.aq;ans(b.dataset.aq)});
}

applyTheme('light');
$('#demoClose').onclick=()=>$('#demoBadge').remove();
route();
})();
