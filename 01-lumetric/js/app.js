(()=>{
/* ================= helpers ================= */
const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const ic=(n,cls='i')=>`<svg class="${cls}"><use href="#i-${n}"/></svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=(n,d=0)=>Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const money=(n,d=2)=>'$'+fmt(n,d);
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const pick=a=>a[Math.floor(rnd()*a.length)];
const AVC=['#E6399B','#6C5CE7','#00B89C','#FF8A3D','#3D8BFD','#F25CA2','#0EA5A4','#B84ED6','#F2A20C'];
const avColor=s=>AVC[[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%AVC.length];
const initials=s=>s.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
const av=(name,size)=>`<span class="av" style="background:${avColor(name)}${size?`;width:${size}px;height:${size}px`:''}">${esc(initials(name))}</span>`;
function toast(msg){const t=document.createElement('div');t.className='toast';t.innerHTML=ic('check')+esc(msg);$('#toasts').appendChild(t);setTimeout(()=>{t.style.transition='opacity .3s';t.style.opacity='0';setTimeout(()=>t.remove(),300)},2600)}
function lsGet(k,d){try{const v=localStorage.getItem('lumetric.'+k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem('lumetric.'+k,JSON.stringify(v))}catch(e){}}
function copyText(txt,el){try{navigator.clipboard.writeText(txt).then(()=>toast('Copied to clipboard'),()=>{sel(el)})}catch(e){sel(el)}function sel(el){if(el){el.select?.();toast('Press Ctrl+C to copy')}}}

/* ================= theme ================= */
function applyTheme(t){const r=document.documentElement;r.setAttribute('data-ui',t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t);void 0;S.theme=t}
function isDark(){return document.documentElement.getAttribute('data-ui')==='dark'}

/* ================= data ================= */
const FIRST=['Olivia','Liam','Emma','Noah','Ava','Ethan','Sophia','Mason','Mia','Lucas','Isla','Jack','Chloe','Leo','Grace','Henry','Zoe','Oscar','Ruby','Felix','Hannah','Theo','Freya','Max','Elena','Jonas','Clara','Mateo','Lena','Hugo'];
const LAST=['Carter','Nguyen','Fischer','Walsh','Bennett','Moreau','Kowalski','Hughes','van Dijk','Russo','Taylor','Schmidt','Okafor','Lindqvist','Murphy','Silva','Andersen','Kim','Dubois','Novak'];
const COS=['Brightline Labs','Northwind Goods','Kelp & Co','Harbor Health','Oakridge Realty','Pillar Finance','Sunday Skincare','Tallow Coffee','Everfield Apparel','Mosaic Learning','Quartz Legal','Nimbus Travel','Fernway Fitness','Atlas Freight','Juniper Home','Cobalt Studio'];
const COUNTRIES=['United States','United Kingdom','Germany','Australia','Netherlands','Canada','France','Sweden'];
const PLANS=['Starter','Growth','Scale','Enterprise'];
const S={theme:'light',range:'30d',currency:'USD',billing:'annual',seats:5,
  customers:[],payments:[],invoices:[],products:[],threads:[],workflows:[],team:[],connected:new Set(['Shopify','Google Ads','Meta Ads','Stripe','HubSpot']),
  custQ:'',custStatus:'All',custSort:{k:'joined',d:-1},custPage:1,payStatus:'All',invStatus:'All',activeThread:0,
  notif:{weekly:true,anomaly:true,budget:true,product:false,digest:true},legend:{},distPeriod:'Monthly',anMetric:'Revenue',anModel:'Data-driven',intCat:'All',intQ:'',
  profile:{name:'Adam Pratama',email:'adam@northwindgoods.com',company:'Northwind Goods',role:'Head of Growth',tz:'Europe/London'}};
for(let i=0;i<46;i++){const n=pick(FIRST)+' '+pick(LAST);const plan=pick(PLANS);const status=rnd()<.72?'Active':rnd()<.6?'Trial':'Churned';const d=new Date(2026,8,28);d.setDate(d.getDate()-Math.floor(rnd()*420));
  S.customers.push({id:1000+i,name:n,company:pick(COS),email:n.toLowerCase().replace(/[^a-z]+/g,'.')+'@'+pick(['gmail.com','outlook.com','proton.me','company.io']),plan,mrr:status==='Churned'?0:({Starter:29,Growth:129,Scale:349,Enterprise:1200}[plan]*(1+Math.floor(rnd()*3))),status,country:pick(COUNTRIES),joined:d})}
const METHODS=['Visa •• 4242','Mastercard •• 8810','PayPal','SEPA Debit','Amex •• 1005','Apple Pay'];
for(let i=0;i<38;i++){const c=pick(S.customers);const d=new Date(2026,8,28);d.setDate(d.getDate()-Math.floor(rnd()*60));const r=rnd();
  S.payments.push({id:'pay_'+(8123400+i*37).toString(36),cust:c.name,company:c.company,amount:Math.round((40+rnd()*1900)*100)/100,method:pick(METHODS),status:r<.72?'Succeeded':r<.84?'Pending':r<.93?'Refunded':'Failed',date:d})}
S.payments.sort((a,b)=>b.date-a.date);
for(let i=0;i<14;i++){const c=pick(S.customers);const d=new Date(2026,8,28);d.setDate(d.getDate()-Math.floor(rnd()*75));const due=new Date(d);due.setDate(due.getDate()+14);const r=rnd();
  const items=[{desc:c.plan+' plan · monthly',qty:1,price:({Starter:29,Growth:129,Scale:349,Enterprise:1200}[c.plan])},{desc:'Additional seats',qty:1+Math.floor(rnd()*4),price:12}];
  S.invoices.push({no:'INV-'+(2041+i),cust:c.name,company:c.company,email:c.email,date:d,due,items,status:r<.5?'Paid':r<.75?'Due':r<.9?'Overdue':'Draft'})}
S.invoices.sort((a,b)=>b.date-a.date);
S.products=[
 {id:1,name:'Cold Brew Concentrate',sku:'TC-CB-01',price:24,stock:320,rev:48210,active:true,c:'#E6399B'},
 {id:2,name:'Ceramic Pour-Over Set',sku:'TC-PO-07',price:68,stock:42,rev:31980,active:true,c:'#23A7C9'},
 {id:3,name:'Single Origin · Ethiopia',sku:'TC-SO-12',price:19,stock:0,rev:22740,active:false,c:'#E0527A'},
 {id:4,name:'Monthly Beans Club',sku:'TC-SUB-01',price:32,stock:999,rev:88400,active:true,c:'#12A150'},
 {id:5,name:'Travel Grinder',sku:'TC-GR-03',price:89,stock:17,rev:15230,active:true,c:'#F08A24'},
 {id:6,name:'Oat Milk Barista 6-pack',sku:'TC-OM-06',price:21,stock:210,rev:9870,active:true,c:'#6C5CE7'}];
S.threads=[
 {name:'Sophie Turner',co:'Sunday Skincare',unread:true,msgs:[['them','Hi Adam, the Meta Ads numbers in the weekly report look lower than Ads Manager. Is that expected?','09:12'],['me','Hi Sophie. Yes, we deduplicate view-through conversions. I can switch your model to include them.','09:20'],['them','Please do, and can you add TikTok as a channel too?','09:24']]},
 {name:'Lucas Moreau',co:'Everfield Apparel',unread:true,msgs:[['them','Our Black Friday dashboard is ready to share with the board?','Yesterday']]},
 {name:'Freya Lindqvist',co:'Harbor Health',unread:false,msgs:[['me','The HIPAA data processing addendum is attached. Let me know if legal has questions.','Mon'],['them','Thanks, signed and returned.','Mon']]},
 {name:'Jonas Fischer',co:'Pillar Finance',unread:true,msgs:[['them','Can we get SSO set up for 12 more analysts next week?','Sep 24']]},
 {name:'Grace Okafor',co:'Mosaic Learning',unread:false,msgs:[['them','The cohort retention view is exactly what we needed.','Sep 22'],['me','Glad to hear it. I added a monthly export for your finance team.','Sep 22']]},
 {name:'Hugo Dubois',co:'Nimbus Travel',unread:false,msgs:[['them','Invoice INV-2049 has the wrong VAT number.','Sep 19']]}];
S.workflows=[
 {name:'Pause ads when ROAS drops',trigger:'ROAS below 1.5 for 24h',cond:'Channel is Meta Ads',action:'Pause ad set + Slack #growth',on:true,runs:38},
 {name:'Weekly revenue digest',trigger:'Every Monday 08:00',cond:'All workspaces',action:'Email PDF report to leadership',on:true,runs:52},
 {name:'High-value lead alert',trigger:'New lead with score > 80',cond:'Source is LinkedIn Ads',action:'Create HubSpot task for AE',on:true,runs:214},
 {name:'Budget pacing guard',trigger:'Spend exceeds 90% of monthly budget',cond:'Any paid channel',action:'Notify finance + lower daily cap 20%',on:false,runs:6},
 {name:'Churn risk nudge',trigger:'Usage drops 40% week over week',cond:'Plan is Growth or Scale',action:'Send Customer.io win-back sequence',on:true,runs:91}];
S.team=[{name:'Adam Pratama',email:'adam@northwindgoods.com',role:'Owner'},{name:'Mia Hughes',email:'mia@northwindgoods.com',role:'Admin'},{name:'Leo Russo',email:'leo@northwindgoods.com',role:'Analyst'},{name:'Clara Schmidt',email:'clara@northwindgoods.com',role:'Viewer'}];

const INTEGRATIONS=[
 ['Shopify','E-commerce','Sync orders, refunds and product catalogue in real time.','#5E8E3E'],
 ['WooCommerce','E-commerce','Pull orders and customers from any WordPress store.','#7F54B3'],
 ['BigCommerce','E-commerce','Revenue and SKU data for headless storefronts.','#34313F'],
 ['Stripe','Payments','Subscriptions, MRR and failed payments as events.','#635BFF'],
 ['Paddle','Payments','Merchant-of-record billing for SaaS teams.','#1F6FEB'],
 ['PayPal','Payments','Checkout and payout data across 200 markets.','#0070BA'],
 ['Google Ads','Advertising','Import cost, clicks and conversions per campaign.','#E8A500'],
 ['Meta Ads','Advertising','Facebook and Instagram spend with CAPI dedupe.','#1877F2'],
 ['LinkedIn Ads','Advertising','B2B campaign cost, leads and company matches.','#0A66C2'],
 ['TikTok Ads','Advertising','Spend and conversions from TikTok campaigns.','#111111'],
 ['Microsoft Ads','Advertising','Bing search cost and conversion import.','#00A4EF'],
 ['HubSpot','CRM','Two-way sync of contacts, deals and lifecycle stages.','#FF7A59'],
 ['Salesforce','CRM','Opportunities and pipeline attribution for sales-led teams.','#00A1E0'],
 ['Pipedrive','CRM','Deal stages and won revenue by source.','#1A1A1A'],
 ['Klaviyo','Email','Email and SMS revenue by flow and campaign.','#232426'],
 ['Mailchimp','Email','Campaign clicks and list growth.','#E6B800'],
 ['Customer.io','Email','Trigger lifecycle messages from Lumetric segments.','#6E4DE0'],
 ['Slack','Collaboration','Alerts, anomalies and weekly digests in any channel.','#4A154B'],
 ['Notion','Collaboration','Embed live charts in docs and wikis.','#2F2F2F'],
 ['Google Analytics 4','Analytics','Import sessions and events for blended reports.','#E37400'],
 ['Segment','Data','Stream events from your existing CDP.','#52BD95'],
 ['BigQuery','Data','Warehouse export of every touchpoint, hourly.','#4285F4'],
 ['Snowflake','Data','Reverse ETL and raw attribution tables.','#29B5E8'],
 ['Zapier','Automation','Connect Lumetric to 6,000+ apps without code.','#FF4F00']];
const INT_CATS=['All','E-commerce','Payments','Advertising','CRM','Email','Analytics','Data','Collaboration','Automation'];

/* ================= charts ================= */
const REGIONS=[['China','#E6399B'],['UK','#F27CBC'],['USA','#6C5CE7'],['Canada','#00D1B2'],['Other','#8FEBDC']];
function salesData(range){
  const months=range==='90d'||range==='30d'||range==='7d'?['Oct','Nov','Dec']:['Jul','Aug','Sep','Oct','Nov','Dec'];
  const base={Jul:1600,Aug:2100,Sep:2400,Oct:2988.2,Nov:1765.09,Dec:4005.65};
  return months.map(m=>{const tot=base[m];const w=[.26,.22,.2,.18,.14];return {m,parts:REGIONS.map((r,i)=>({k:r[0],c:r[1],v:tot*w[i]}))}});
}
function stackedChart(el,range){
  const data=salesData(range);const vis=REGIONS.filter(r=>S.legend[r[0]]!==false).map(r=>r[0]);
  const W=560,H=250,P={l:6,r:6,t:34,b:26};const n=data.length;const slot=(W-P.l-P.r)/n;const bw=Math.min(78,slot*.46);
  const tot=d=>d.parts.filter(p=>vis.includes(p.k)).reduce((a,p)=>a+p.v,0);const max=Math.max(...data.map(tot),1)*1.08;
  const y=v=>(H-P.b)-v/max*(H-P.t-P.b);const gap=4;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sales by region, stacked bar chart"><defs><linearGradient id="flow" x1="0" x2="1"><stop offset="0" stop-color="var(--accent-2)" stop-opacity=".22"/><stop offset="1" stop-color="var(--teal)" stop-opacity=".08"/></linearGradient></defs>`;
  const tops=[];
  data.forEach((d,i)=>{const cx=P.l+slot*i+slot/2;const x=cx-bw/2;let acc=0;const T=tot(d);tops.push({x,cx,top:y(T),T});
    d.parts.forEach(p=>{if(!vis.includes(p.k))return;const y1=y(acc+p.v),y0=y(acc);const h=Math.max(2,y0-y1-gap);s+=`<rect x="${x}" y="${y1}" width="${bw}" height="${h}" rx="5" fill="${p.c}" data-i="${i}" class="seg-r"/>`;acc+=p.v});
    s+=`<text x="${cx}" y="${H-6}" text-anchor="middle" class="ax">${d.m}</text>`;
    s+=`<text x="${cx}" y="${y(T)-10}" text-anchor="middle" class="ax-s num">$${fmt(T,2)}</text>`});
  for(let i=0;i<tops.length-1;i++){const a=tops[i],b=tops[i+1];s=s.replace('</defs>',`</defs>`);s+=`<path d="M${a.x+bw} ${a.top} L${b.x} ${b.top} L${b.x} ${H-P.b} L${a.x+bw} ${H-P.b}Z" fill="url(#flow)"/>`}
  s+=`<line x1="0" x2="${W}" y1="${H-P.b}" y2="${H-P.b}" stroke="var(--line)"/></svg>`;
  el.innerHTML=`<div class="chart">${s}<div class="tip"></div></div>`;
  const tip=$('.tip',el),box=$('.chart',el);
  $$('.seg-r',el).forEach(r=>{r.addEventListener('mousemove',e=>{const d=data[+r.dataset.i];const b=box.getBoundingClientRect();tip.innerHTML=`<b>${d.m} 2025</b><br>`+d.parts.filter(p=>vis.includes(p.k)).map(p=>`<span style="color:${p.c}">●</span> ${p.k}: $${fmt(p.v,2)}`).join('<br>');tip.style.left=(e.clientX-b.left)+'px';tip.style.top=(e.clientY-b.top)+'px';tip.classList.add('show')});r.addEventListener('mouseleave',()=>tip.classList.remove('show'))});
}
function weekBars(el,vals,labels,hi){
  const W=320,H=200,P={t:28,b:24};const max=Math.max(...vals)*1.1;const slot=W/vals.length;const bw=slot*.56;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Subscribers by weekday">`;
  vals.forEach((v,i)=>{const h=v/max*(H-P.t-P.b);const x=slot*i+(slot-bw)/2;const on=i===hi;
    s+=`<rect x="${x}" y="${H-P.b-h}" width="${bw}" height="${h}" rx="7" fill="${on?'var(--accent)':'var(--accent-soft)'}" class="wb" data-i="${i}" style="cursor:pointer"/>`;
    if(on)s+=`<text x="${x+bw/2}" y="${H-P.b-h-9}" text-anchor="middle" class="ax-s num">${fmt(v)}</text>`;
    s+=`<text x="${x+bw/2}" y="${H-5}" text-anchor="middle" class="${on?'ax-s':'ax'}">${labels[i]}</text>`});
  el.innerHTML=s+'</svg>';
  $$('.wb',el).forEach(b=>b.addEventListener('mouseenter',()=>weekBars(el,vals,labels,+b.dataset.i)));
}
function gauge(el,parts){
  const W=260,H=150,cx=130,cy=135,R=110,sw=22;const tot=parts.reduce((a,p)=>a+p.v,0);let a0=Math.PI;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sales distribution">`;
  s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}" stroke="var(--surface-2)" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`;
  parts.forEach(p=>{const a1=a0+Math.PI*(p.v/tot);const pad=.03;const x0=cx+R*Math.cos(a0+pad),y0=cy+R*Math.sin(a0+pad),x1=cx+R*Math.cos(a1-pad),y1=cy+R*Math.sin(a1-pad);
    s+=`<path d="M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}" stroke="${p.c}" stroke-width="${sw}" fill="none" stroke-linecap="round"><title>${p.k}: $${fmt(p.v,2)}</title></path>`;a0=a1});
  s+=`<text x="${cx}" y="${cy-22}" text-anchor="middle" class="ax">Total</text><text x="${cx}" y="${cy-2}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:var(--fg)" class="num">$${fmt(tot,2)}</text></svg>`;
  el.innerHTML=s;
}
function lineChart(el,series,labels,opt={}){
  const W=640,H=240,P={l:44,r:12,t:16,b:26};const all=series.flatMap(s=>s.v);const max=Math.max(...all)*1.1,min=0;
  const x=i=>P.l+i*(W-P.l-P.r)/(labels.length-1);const y=v=>H-P.b-(v-min)/(max-min)*(H-P.t-P.b);
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${opt.label||'Line chart'}"><defs>`;
  series.forEach((se,k)=>s+=`<linearGradient id="lg${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${se.c}" stop-opacity=".22"/><stop offset="1" stop-color="${se.c}" stop-opacity="0"/></linearGradient>`);
  s+='</defs>';
  for(let g=0;g<=4;g++){const v=min+(max-min)*g/4;s+=`<line class="gridl" x1="${P.l}" x2="${W-P.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${P.l-8}" y="${y(v)+4}" text-anchor="end" class="ax num">${opt.fmt?opt.fmt(v):fmt(v)}</text>`}
  labels.forEach((l,i)=>{if(i%Math.ceil(labels.length/7)===0||i===labels.length-1)s+=`<text x="${x(i)}" y="${H-6}" text-anchor="middle" class="ax">${l}</text>`});
  series.forEach((se,k)=>{const d=se.v.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
    if(k===0)s+=`<path d="${d} L${x(se.v.length-1)} ${H-P.b} L${x(0)} ${H-P.b}Z" fill="url(#lg${k})"/>`;
    s+=`<path d="${d}" fill="none" stroke="${se.c}" stroke-width="2.2" ${se.dash?'stroke-dasharray="5 5"':''}/>`;
    const li=se.v.length-1;s+=`<circle cx="${x(li)}" cy="${y(se.v[li])}" r="4" fill="${se.c}" stroke="var(--surface)" stroke-width="2"/>`});
  s+=`<line class="hv" x1="0" x2="0" y1="${P.t}" y2="${H-P.b}" stroke="var(--line-2)" opacity="0"/><rect x="${P.l}" y="0" width="${W-P.l-P.r}" height="${H}" fill="transparent" class="hit"/></svg>`;
  el.innerHTML=`<div class="chart">${s}<div class="tip"></div></div>`;
  const svg=$('svg',el),tip=$('.tip',el),hv=$('.hv',el),box=$('.chart',el);
  $('.hit',el).addEventListener('mousemove',e=>{const r=svg.getBoundingClientRect();const px=(e.clientX-r.left)/r.width*W;const i=Math.max(0,Math.min(labels.length-1,Math.round((px-P.l)/((W-P.l-P.r)/(labels.length-1)))));
    hv.setAttribute('x1',x(i));hv.setAttribute('x2',x(i));hv.setAttribute('opacity',1);
    tip.innerHTML=`<b>${labels[i]}</b><br>`+series.map(se=>`<span style="color:${se.c}">●</span> ${se.n}: ${opt.fmt?opt.fmt(se.v[i],true):fmt(se.v[i])}`).join('<br>');
    tip.style.left=(x(i)/W*r.width)+'px';tip.style.top=(y(series[0].v[i])/H*r.height)+'px';tip.classList.add('show')});
  $('.hit',el).addEventListener('mouseleave',()=>{tip.classList.remove('show');hv.setAttribute('opacity',0)});
}

/* ================= modal / drawer ================= */
function modal({title,body,submit='Save',onSubmit,wide,cancel='Cancel'}){
  const ov=document.createElement('div');ov.className='overlay';
  ov.innerHTML=`<form class="modal" style="${wide?'width:min(720px,100%)':''}" novalidate><div class="modal-h"><h3>${title}</h3><button type="button" class="row-menu" data-close aria-label="Close">${ic('x')}</button></div><div class="modal-b">${body}</div>${onSubmit!==false?`<div class="modal-f"><button type="button" class="btn" data-close>${cancel}</button><button class="btn primary" type="submit">${submit}</button></div>`:''}</form>`;
  document.body.appendChild(ov);
  const close=()=>{ov.remove();document.removeEventListener('keydown',k)};const k=e=>{if(e.key==='Escape')close()};document.addEventListener('keydown',k);
  ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('[data-close]'))close()});
  const f=$('form',ov);f.addEventListener('submit',e=>{e.preventDefault();if(onSubmit&&onSubmit(f)!==false)close()});
  setTimeout(()=>{const first=$('input,select,textarea',f);first&&first.focus()},30);
  return {el:f,close};
}
function drawer(html){
  const ov=document.createElement('div');ov.className='drawer-ov';const d=document.createElement('aside');d.className='drawer';d.innerHTML=html;
  document.body.append(ov,d);const close=()=>{ov.remove();d.remove()};ov.onclick=close;d.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close()});return {el:d,close};
}
function req(f,names){let ok=true;names.forEach(n=>{const i=f.elements[n];const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('err',bad);if(bad)ok=false});if(!ok)toast('Fill in the highlighted fields');return ok}

/* ================= router ================= */
const APP_PAGES={'app':'Dashboard','app-payments':'Payments','app-customers':'Customers','app-messages':'Messages','app-products':'Products','app-invoices':'Invoices','app-analytics':'Analytics','app-automation':'Automation','app-settings':'Settings','app-security':'Security','app-help':'Help'};
function route(){
  const h=(location.hash||'#').slice(1)||'home';
  window.scrollTo(0,0);
  $$('.overlay,.drawer,.drawer-ov').forEach(x=>x.remove());
  if(h.startsWith('app')){renderApp(APP_PAGES[h]?h:'app')}
  else if(h==='login'||h==='signup'){renderAuth(h)}
  else renderSite(['pricing','integrations'].includes(h)?h:'home',h);
}
window.addEventListener('hashchange',route);

/* ================= marketing site ================= */
function siteNav(cur){return `
<header class="site-nav" id="siteNav"><div class="wrap">
  <a class="logo" href="#home"><svg class="logo-mark"><use href="#logo"/></svg>Lumetric</a>
  <nav class="nav-links" aria-label="Main">
    <a href="#home" ${cur==='home'?'aria-current="page"':''}>Product</a>
    <a href="#pricing" ${cur==='pricing'?'aria-current="page"':''}>Pricing</a>
    <a href="#integrations" ${cur==='integrations'?'aria-current="page"':''}>Integrations</a>
    <a href="#home" data-jump="customers">Customers</a>
    <a href="#app">Live demo</a>
  </nav>
  <div class="nav-cta"><a class="btn ghost hide-m" href="#login">Log in</a><a class="btn ink" href="#signup">Start free trial</a>
  <button class="icon-btn nav-burger" id="burger" aria-label="Open menu" aria-expanded="false">${ic('menu')}</button></div>
</div>
<nav class="mobile-menu" id="mMenu"><a href="#home">Product</a><a href="#pricing">Pricing</a><a href="#integrations">Integrations</a><a href="#app">Live demo</a><a href="#login">Log in</a></nav>
</header>`}
function siteFoot(){return `
<footer class="site"><div class="wrap">
 <div class="foot-grid">
  <div><a class="logo" href="#home"><svg class="logo-mark"><use href="#logo"/></svg>Lumetric</a><p class="muted" style="margin-top:12px;max-width:34ch;font-size:14px">Revenue attribution and marketing analytics for growth teams in e-commerce and SaaS.</p>
   <form class="news" id="newsForm" novalidate><label class="sr" for="newsEmail">Email</label><input class="input" id="newsEmail" type="email" placeholder="you@company.com" style="border-radius:999px"><button class="btn primary">Subscribe</button></form><p class="hint" id="newsHint" style="margin-top:6px">Monthly notes on attribution. No spam.</p></div>
  <div><h4>Product</h4><a href="#home">Attribution</a><a href="#app-analytics">Analytics</a><a href="#app-automation">Automation</a><a href="#integrations">Integrations</a><a href="#pricing">Pricing</a></div>
  <div><h4>Company</h4><a href="#home" data-jump="customers">Customers</a><a href="#home">About</a><a href="#home">Careers · 4 open</a><a href="#home">Press</a></div>
  <div><h4>Trust</h4><a href="#app-security">Security</a><a href="#home">GDPR & DPA</a><a href="#home">SOC 2 Type II</a><a href="#app-help">Help centre</a></div>
 </div>
 <div class="foot-bottom"><span>© 2026 Lumetric Inc. · Fictional brand, designed and built by Organoo Studio.</span><span>London · Austin · Melbourne</span></div>
</div></footer>`}
function bindSiteCommon(){
  const nav=$('#siteNav');const onS=()=>nav&&nav.classList.toggle('scrolled',scrollY>8);addEventListener('scroll',onS,{passive:true});onS();
  $('#burger')?.addEventListener('click',e=>{const m=$('#mMenu');m.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',m.classList.contains('open'))});
  $$('[data-jump]').forEach(a=>a.addEventListener('click',e=>{const id=a.dataset.jump;setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}),60)}));
  $('#newsForm')?.addEventListener('submit',e=>{e.preventDefault();const v=$('#newsEmail').value.trim();const ok=/^\S+@\S+\.\S+$/.test(v);$('#newsEmail').classList.toggle('err',!ok);$('#newsHint').className='hint'+(ok?'':' err');$('#newsHint').textContent=ok?`Subscribed ${v}. First issue lands on the 1st.`:'Enter a valid email address.';if(ok)$('#newsEmail').value=''});
}
function renderSite(page,raw){
  document.body.style.overflow='';
  const root=$('#root');
  if(page==='home')root.innerHTML=siteNav('home')+homeHTML()+siteFoot();
  if(page==='pricing')root.innerHTML=siteNav('pricing')+pricingHTML()+siteFoot();
  if(page==='integrations')root.innerHTML=siteNav('integrations')+integrationsHTML()+siteFoot();
  bindSiteCommon();
  if(page==='home')bindHome();if(page==='pricing')bindPricing();if(page==='integrations')bindIntegrations();
  document.title=({home:'Lumetric',pricing:'Pricing · Lumetric',integrations:'Integrations · Lumetric'})[page];
}
function homeHTML(){return `
<main>
<section class="hero"><div class="wrap">
  <a class="tag rise" href="#app-analytics"><b>NEW</b> Data-driven attribution for TikTok and LinkedIn ${ic('arrow')}</a>
  <h1 class="rise d1">Know which channel <em>actually</em> made the sale.</h1>
  <p class="lead rise d2">Lumetric joins your ad spend, store orders and CRM deals into one revenue model, so you can move budget with evidence instead of gut feel.</p>
  <form class="hero-form rise d3" id="heroForm" novalidate><label class="sr" for="heroEmail">Work email</label><input id="heroEmail" type="email" placeholder="Work email"><button class="btn primary">Start 14-day trial</button></form>
  <p class="hero-note" id="heroNote">No credit card. Connects to Shopify, Stripe and Google Ads in under 5 minutes.</p>
  <div class="preview rise d3"><div class="preview-inner">
    <div class="preview-side"><div class="on">${ic('grid')}Dashboard</div><div>${ic('card')}Payment</div><div>${ic('users')}Customers</div><div>${ic('chart')}Analytics</div><div>${ic('bolt')}Automation</div></div>
    <div class="preview-main">
      <div class="kpis" style="margin:0;grid-template-columns:repeat(3,1fr)">
        <div class="card kpi"><div class="k">${ic('eye')}Page views</div><div class="row"><span class="v num">12,450</span><span class="pill up">15.8% ${ic('up','i" style="width:12px;height:12px')}</span></div></div>
        <div class="card kpi"><div class="k">${ic('wallet')}Revenue</div><div class="row"><span class="v num"><small>$</small>9,257.51</span></div></div>
        <div class="card kpi hide-s"><div class="k">${ic('bounce')}Bounce rate</div><div class="row"><span class="v num">36.5%</span><span class="pill up">4.1%</span></div></div>
      </div>
      <div class="card"><div class="card-h"><h3>${ic('bars')}Sales overview by region</h3><div class="seg" role="group" aria-label="Range"><button type="button" aria-pressed="true" data-pr="90d">Quarter</button><button type="button" aria-pressed="false" data-pr="6m">6 months</button></div></div><div id="heroChart"></div><div class="legend">${REGIONS.map(r=>`<span style="display:inline-flex;gap:6px;align-items:center"><i style="background:${r[1]}"></i>${r[0]}</span>`).join('')}</div></div>
    </div></div></div>
</div></section>

<section class="logos"><div class="wrap"><p>Growth teams at 1,400+ brands measure with Lumetric</p><div class="logo-row"><span>northwind</span><span>Kelp&amp;Co</span><span>SUNDAY</span><span>Everfield</span><span>pillar.</span><span>Tallow</span></div></div></section>

<section class="block" id="features"><div class="wrap">
 <div class="sec-head"><span class="eyebrow">Product</span><h2>One model for every dollar you spend</h2><p>Stop reconciling five dashboards on Monday morning. Lumetric does the joining, deduping and modelling for you.</p></div>
 <div class="bento">
  <div class="cell c-4"><span class="eyebrow">Attribution</span><h3>See the full path to purchase</h3><p>Switch models and watch credit move between touchpoints. Each journey is stitched from ad clicks, email opens and CRM activity.</p>
   <div class="viz"><div class="model-tabs" id="modelTabs">${['First touch','Linear','Data-driven','Last touch'].map((m,i)=>`<button class="chip" type="button" aria-pressed="${i===2}">${m}</button>`).join('')}</div>
   <div class="touch-path" id="touchPath" style="margin-top:14px"></div></div></div>
  <div class="cell c-2"><span class="eyebrow">Accuracy</span><h3>Server-side tracking</h3><p>First-party events that survive ad blockers and iOS consent prompts.</p><div class="viz"><div class="big-stat num">+31%</div><p style="margin-top:6px">more conversions recovered on average</p></div></div>
  <div class="cell c-2"><span class="eyebrow">Alerts</span><h3>Anomaly detection</h3><p>Get a Slack message when CPA spikes or a pixel stops firing, before the budget is gone.</p><div class="viz"><div class="card" style="padding:12px;display:flex;gap:10px;align-items:center;font-size:13px"><span class="pill down">CPA +48%</span><span class="muted">Meta · Prospecting UK</span></div></div></div>
  <div class="cell c-2"><span class="eyebrow">Forecast</span><h3>Budget planner</h3><p>Model next quarter's spend and see projected revenue by channel.</p><div class="viz" id="miniLine"></div></div>
  <div class="cell c-2"><span class="eyebrow">Privacy</span><h3>GDPR ready by default</h3><p>EU data residency in Frankfurt, consent mode v2 and a signed DPA on every plan.</p><div class="viz" style="display:flex;gap:6px;flex-wrap:wrap"><span class="pill accent">GDPR</span><span class="pill accent">SOC 2 Type II</span><span class="pill accent">CCPA</span></div></div>
 </div>
</div></section>

<section class="block" style="padding-top:0"><div class="wrap">
 <div class="sec-head"><span class="eyebrow">ROI calculator</span><h2>What is misattribution costing you?</h2><p>Move the sliders to your numbers. The estimate uses the median results of Lumetric customers in their first 90 days.</p></div>
 <div class="roi">
  <div>
   <div class="range-row"><div class="top"><label for="rSpend">Monthly ad spend</label><span class="num" id="rSpendV"></span></div><input type="range" id="rSpend" min="5000" max="500000" step="5000" value="60000"></div>
   <div class="range-row"><div class="top"><label for="rCh">Paid channels</label><span class="num" id="rChV"></span></div><input type="range" id="rCh" min="1" max="8" value="4"></div>
   <div class="range-row"><div class="top"><label for="rRoas">Current blended ROAS</label><span class="num" id="rRoasV"></span></div><input type="range" id="rRoas" min="0.5" max="8" step="0.1" value="2.4"></div>
  </div>
  <div class="roi-out"><div><div class="k">Estimated wasted spend recovered per year</div><div class="v num" id="rOut">$0</div></div>
   <div class="row"><span>Projected ROAS</span><b class="num" id="rOutRoas"></b></div><div class="row"><span>Hours saved on reporting / month</span><b class="num" id="rOutHrs"></b></div><div class="row"><span>Recommended plan</span><b id="rOutPlan"></b></div>
   <a href="#signup" class="btn primary lg" style="margin-top:auto">Get these numbers for real</a></div>
 </div>
</div></section>

<section class="block" id="customers" style="padding-top:0"><div class="wrap">
 <div class="sec-head"><span class="eyebrow">Customers</span><h2>Teams that stopped arguing about the numbers</h2></div>
 <div class="quotes">
  <figure class="quote" style="margin:0"><blockquote>“We cut 22% of our Meta budget in the first month and revenue went up. Lumetric showed us those campaigns were only taking credit for email sales.”</blockquote><figcaption class="who">${av('Sophie Turner')}<div><b>Sophie Turner</b><small>VP Growth, Sunday Skincare · Austin</small></div></figcaption></figure>
  <figure class="quote" style="margin:0"><blockquote>“Our board deck used to take two analysts three days. Now it is a saved view we share on Monday morning.”</blockquote><figcaption class="who">${av('Jonas Fischer')}<div><b>Jonas Fischer</b><small>CFO, Pillar Finance · Berlin</small></div></figcaption></figure>
  <figure class="quote" style="margin:0"><blockquote>“Setup took one afternoon. The Shopify and Klaviyo sync just worked, and support answered in Melbourne hours.”</blockquote><figcaption class="who">${av('Isla Walsh')}<div><b>Isla Walsh</b><small>Founder, Tallow Coffee · Melbourne</small></div></figcaption></figure>
 </div>
 <div class="metric-strip"><div><b class="num">$2.1B</b><span>revenue attributed in 2025</span></div><div><b class="num">1,400+</b><span>brands in 31 countries</span></div><div><b class="num">4.8/5</b><span>average G2 rating</span></div><div><b class="num">&lt; 5 min</b><span>median time to first report</span></div></div>
</div></section>

<section class="wrap"><div class="cta-band"><div class="glow"></div><div style="position:relative"><h2>Put every channel on the same scoreboard</h2><p>Start free for 14 days. Keep your data if you leave. Plans from $49 a month.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn primary lg" href="#signup">Start free trial</a><a class="btn lg" href="#app">Explore the live demo</a></div></div></div></section>
</main>`}
function bindHome(){
  let pr='90d';const draw=()=>stackedChart($('#heroChart'),pr);draw();
  $$('[data-pr]').forEach(b=>b.onclick=()=>{pr=b.dataset.pr;$$('[data-pr]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
  $('#heroForm').addEventListener('submit',e=>{e.preventDefault();const v=$('#heroEmail').value.trim();if(!/^\S+@\S+\.\S+$/.test(v)){$('#heroNote').textContent='Enter a valid work email to start your trial.';$('#heroNote').classList.add('err');return}S.pendingEmail=v;location.hash='signup'});
  const credit={'First touch':[70,10,10,10],'Linear':[25,25,25,25],'Data-driven':[18,12,41,29],'Last touch':[0,0,0,100]};
  const steps=[['TikTok Ads','Day 1'],['Instagram Reel','Day 3'],['Google Search','Day 6'],['Klaviyo email','Day 8']];
  const drawPath=m=>{const c=credit[m];const mx=Math.max(...c);$('#touchPath').innerHTML=steps.map((s,i)=>`<div class="node ${c[i]===mx?'win':''}">${s[0]}<small>${s[1]} · ${c[i]}% credit</small></div>`).join(`<span class="arr">${ic('arrow')}</span>`)+`<span class="arr">${ic('arrow')}</span><div class="node" style="background:var(--ink-bg);color:var(--ink-fg)">Order $184<small style="color:inherit;opacity:.7">Day 8</small></div>`};
  drawPath('Data-driven');
  $$('#modelTabs .chip').forEach(b=>b.onclick=()=>{$$('#modelTabs .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPath(b.textContent)});
  lineChart($('#miniLine'),[{n:'Projected',c:'var(--accent)',v:[40,44,47,52,58,61,67,74]},{n:'Last year',c:'var(--teal)',dash:1,v:[38,39,42,41,45,47,50,52]}],['Q1','','Q2','','Q3','','Q4',''],{label:'Projected revenue',fmt:(v,t)=>t?'$'+fmt(v)+'k':''});
  const calc=()=>{const sp=+$('#rSpend').value,ch=+$('#rCh').value,ro=+$('#rRoas').value;const waste=sp*12*Math.min(.32,.08+ch*.022+(ro<2?.05:0));
    $('#rSpendV').textContent='$'+fmt(sp);$('#rChV').textContent=ch;$('#rRoasV').textContent=ro.toFixed(1)+'×';$('#rOut').textContent='$'+fmt(Math.round(waste/100)*100);
    $('#rOutRoas').textContent=(ro*(1.14+ch*.015)).toFixed(2)+'×';$('#rOutHrs').textContent=Math.round(6+ch*3.5)+' h';$('#rOutPlan').textContent=sp<40000?'Starter':sp<200000?'Growth':'Scale'};
  ['rSpend','rCh','rRoas'].forEach(id=>$('#'+id).addEventListener('input',calc));calc();
}

/* ---------- pricing ---------- */
const PRICE={USD:{s:'$',p:[0,49,129]},EUR:{s:'€',p:[0,45,119]},AUD:{s:'A$',p:[0,75,199]}};
const SEAT={USD:12,EUR:11,AUD:18};
function pricingHTML(){return `<main class="wrap">
 <div class="page-head"><span class="eyebrow">Pricing</span><h1>Plans that pay for themselves in the first month</h1><p>Every plan includes unlimited dashboards, GDPR tooling and a 14-day free trial. Prices exclude VAT and GST.</p>
  <div class="price-ctrl"><div class="seg" role="group" aria-label="Billing period"><button type="button" data-bill="monthly">Monthly</button><button type="button" data-bill="annual">Annual <span class="save">−20%</span></button></div>
  <div class="seg" role="group" aria-label="Currency">${Object.keys(PRICE).map(c=>`<button type="button" data-cur="${c}">${c}</button>`).join('')}</div></div></div>
 <div class="plans" id="plans"></div>
 <div class="compare-wrap"><table class="compare"><thead><tr><th>Compare plans</th><th>Starter</th><th>Growth</th><th>Scale</th><th>Enterprise</th></tr></thead><tbody>
  ${[['grp','Tracking'],['Tracked monthly visitors','10k','250k','2M','Custom'],['Server-side events','n','y','y','y'],['Data history','3 months','2 years','5 years','Unlimited'],['grp','Attribution'],['Attribution models','2','6','6 + custom','6 + custom'],['Data-driven model','n','y','y','y'],['Incrementality tests','n','n','y','y'],['grp','Team & security'],['Seats included','1','3','10','Unlimited'],['SSO / SAML','n','n','y','y'],['EU data residency','y','y','y','y'],['Dedicated success manager','n','n','n','y']].map(r=>r[0]==='grp'?`<tr class="grp"><td colspan="5">${r[1]}</td></tr>`:`<tr><td>${r[0]}</td>${r.slice(1).map(v=>`<td>${v==='y'?`<span class="yes">${ic('check')}</span><span class="sr">Included</span>`:v==='n'?`<span class="no">—</span><span class="sr">Not included</span>`:v}</td>`).join('')}</tr>`).join('')}
 </tbody></table></div>
 <div class="faq"><div class="sec-head center"><h2>Questions, answered</h2></div>
  ${[['How does the free trial work?','You get the full Growth plan for 14 days. We ask for a card only if you decide to continue, and your dashboards stay intact when you upgrade.'],['Can I pay in EUR or AUD?','Yes. Pick your currency above and you will be invoiced in it. VAT is handled for EU businesses and GST for Australian businesses.'],['Where is my data stored?','Customers in the EU and UK are hosted in Frankfurt by default. US and APAC customers can choose Virginia or Sydney.'],['What counts as a tracked visitor?','A unique visitor who triggers at least one event in a calendar month. Bots and internal traffic are filtered out and never billed.'],['Can I change plans later?','Upgrade any time and pay the prorated difference. Downgrades take effect at the next billing date.'],['Do you offer discounts for startups or non-profits?','Startups under $1M ARR and registered non-profits get 50% off Growth for the first year. Ask us through the Enterprise form.']].map((q,i)=>`<details ${i===0?'open':''}><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}
 </div>
</main>`}
function planCards(){
  const C=PRICE[S.currency],ann=S.billing==='annual';const f=v=>Math.round(ann?v*.8:v);
  const extra=Math.max(0,S.seats-3)*SEAT[S.currency];
  const plans=[
   {n:'Starter',d:'For founders validating their first paid channels.',p:f(C.p[0]),feats:['10k tracked visitors','2 attribution models','Shopify, Stripe & Google Ads','Email support'],cta:'Start free',href:'#signup'},
   {n:'Growth',d:'For teams scaling spend across 3+ channels.',p:f(C.p[1]+extra),feats:['250k tracked visitors','Data-driven attribution','All 24 integrations','Slack alerts & automations'],cta:'Start 14-day trial',href:'#signup',feat:true,seats:true},
   {n:'Scale',d:'For multi-brand and multi-market operators.',p:f(C.p[2]),feats:['2M tracked visitors','Incrementality testing','SSO / SAML','Warehouse export'],cta:'Start 14-day trial',href:'#signup'},
   {n:'Enterprise',d:'For custom volume, contracts and security reviews.',p:null,feats:['Unlimited everything','Custom data residency','99.9% uptime SLA','Dedicated success manager'],cta:'Talk to sales',ent:true}];
  $('#plans').innerHTML=plans.map(p=>`<div class="plan ${p.feat?'feat':''}">${p.feat?'<span class="badge">Most popular</span>':''}<h3>${p.n}</h3><p class="desc">${p.d}</p>
   <div class="price">${p.p===null?'<b>Custom</b>':`<b class="num">${C.s}${fmt(p.p)}</b><span>/ month</span>`}</div>
   <div class="billed">${p.p===null?'Annual contract':p.p===0?'Free forever':ann?`Billed ${C.s}${fmt(p.p*12)} yearly`:'Billed monthly'}</div>
   ${p.seats?`<div class="seat-box"><div style="display:flex;justify-content:space-between"><label for="seatR"><b>Seats</b></label><span class="num"><b id="seatV">${S.seats}</b> · 3 included</span></div><input type="range" id="seatR" min="1" max="25" value="${S.seats}"><span class="muted">${C.s}${SEAT[S.currency]} per extra seat</span></div>`:''}
   <ul>${p.feats.map(x=>`<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>
   ${p.ent?`<button class="btn block" type="button" id="entBtn">${p.cta}</button>`:`<a class="btn block ${p.feat?'primary':''}" href="${p.href}" data-plan="${p.n}">${p.cta}</a>`}</div>`).join('');
  $('#seatR')?.addEventListener('input',e=>{S.seats=+e.target.value;planCards();$('#seatR').focus()});
  $('#entBtn').onclick=entForm;
  $$('[data-plan]').forEach(a=>a.onclick=()=>{S.chosenPlan=a.dataset.plan});
  $$('[data-bill]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.bill===S.billing));
  $$('[data-cur]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cur===S.currency));
}
function entForm(){modal({title:'Talk to sales',submit:'Request a call',body:`<p class="muted" style="font-size:14px">We reply within one business day, in your time zone.</p>
 <div class="two"><div class="field"><label for="eN">Full name</label><input class="input" id="eN" name="n" placeholder="Jane Cooper"></div><div class="field"><label for="eE">Work email</label><input class="input" id="eE" name="e" type="email" placeholder="jane@company.com"></div></div>
 <div class="two"><div class="field"><label for="eC">Company</label><input class="input" id="eC" name="c"></div><div class="field"><label for="eS">Monthly ad spend</label><select class="input" id="eS" name="s"><option>$50k – $250k</option><option>$250k – $1M</option><option>Over $1M</option></select></div></div>
 <div class="field"><label for="eR">Region</label><select class="input" id="eR" name="r"><option>North America</option><option>Europe & UK</option><option>Australia & NZ</option><option>Asia</option></select></div>
 <div class="field"><label for="eM">What should we prepare?</label><textarea class="input" id="eM" name="m" placeholder="Security review, SSO, multi-brand setup…"></textarea></div>`,
 onSubmit:f=>{if(!req(f,['n','e','c']))return false;toast(`Thanks ${f.elements.n.value.split(' ')[0]}. A specialist for ${f.elements.r.value} will email you.`)}})}
function bindPricing(){planCards();$$('[data-bill]').forEach(b=>b.onclick=()=>{S.billing=b.dataset.bill;planCards()});$$('[data-cur]').forEach(b=>b.onclick=()=>{S.currency=b.dataset.cur;planCards()})}

/* ---------- integrations ---------- */
function integrationsHTML(){return `<main class="wrap">
 <div class="page-head"><span class="eyebrow">Integrations</span><h1>Plugs into the stack you already run</h1><p>24 native connectors, set up in a few clicks. Data syncs every 15 minutes, or in real time for Shopify and Stripe.</p></div>
 <div class="int-tools"><div class="int-search">${ic('search')}<label class="sr" for="intQ">Search integrations</label><input class="input" id="intQ" placeholder="Search integrations" value="${esc(S.intQ)}"></div><span class="muted num" id="intCount" style="font-size:14px"></span></div>
 <div class="chips" id="intCats" style="margin-bottom:22px">${INT_CATS.map(c=>`<button class="chip" type="button" aria-pressed="${c===S.intCat}">${c}</button>`).join('')}</div>
 <div class="int-grid" id="intGrid"></div>
 <div class="card" style="margin-top:32px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding:26px;border-radius:20px"><div><h3 style="font-size:18px">Missing a tool?</h3><p class="muted" style="font-size:14px">Tell us what you use. Requests with 20+ votes ship within a quarter.</p></div><button class="btn primary" type="button" id="reqInt">Request an integration</button></div>
</main>`}
function intCard(i){const on=S.connected.has(i[0]);return `<button class="int-card" type="button" data-int="${esc(i[0])}"><div class="top"><span class="mono" style="background:${i[3]}">${esc(i[0].replace(/[^A-Za-z0-9]/g,'').slice(0,2))}</span>${on?'<span class="pill up">Connected</span>':`<span class="pill neutral">${i[1]}</span>`}</div><h3>${esc(i[0])}</h3><p>${esc(i[2])}</p></button>`}
function drawInts(){const q=S.intQ.toLowerCase();const list=INTEGRATIONS.filter(i=>(S.intCat==='All'||i[1]===S.intCat)&&(i[0]+i[1]+i[2]).toLowerCase().includes(q));
  $('#intGrid').innerHTML=list.length?list.map(intCard).join(''):`<div class="int-empty" style="grid-column:1/-1">No integrations match “${esc(S.intQ)}”. <button class="btn sm" type="button" id="clrInt" style="margin-left:8px">Clear search</button></div>`;
  $('#intCount').textContent=`${list.length} of ${INTEGRATIONS.length} · ${S.connected.size} connected`;
  $('#clrInt')?.addEventListener('click',()=>{S.intQ='';S.intCat='All';$('#intQ').value='';$$('#intCats .chip').forEach(x=>x.setAttribute('aria-pressed',x.textContent==='All'));drawInts()});
  $$('[data-int]').forEach(b=>b.onclick=()=>intDetail(b.dataset.int,drawInts))}
function intDetail(name,after){const i=INTEGRATIONS.find(x=>x[0]===name);const on=S.connected.has(name);
  const d=drawer(`<div style="padding:22px;display:grid;gap:18px"><div style="display:flex;justify-content:space-between;align-items:center"><span class="mono" style="background:${i[3]};width:52px;height:52px;font-size:18px">${esc(name.replace(/[^A-Za-z0-9]/g,'').slice(0,2))}</span><button class="row-menu" data-close aria-label="Close">${ic('x')}</button></div>
   <div><h2 style="font-size:24px">${esc(name)}</h2><p class="muted" style="margin-top:6px">${esc(i[2])}</p></div>
   <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="pill neutral">${i[1]}</span><span class="pill neutral">Sync every 15 min</span><span class="pill neutral">Built by Lumetric</span></div>
   <div class="card" style="display:grid;gap:10px;font-size:14px"><b>What syncs</b>${['Historical data for the last 24 months','Cost, revenue and conversion events','Campaign and ad-level naming for UTM matching'].map(x=>`<div style="display:flex;gap:8px">${ic('check','i" style="color:var(--accent)')}${x}</div>`).join('')}</div>
   <div class="set-row" style="border:0"><div><b>Status</b><small id="intSt">${on?'Connected · last sync 4 minutes ago':'Not connected'}</small></div><button class="btn ${on?'danger':'primary'}" id="intTog" type="button">${on?'Disconnect':'Connect '+esc(name)}</button></div></div>`);
  $('#intTog',d.el).onclick=e=>{const b=e.currentTarget;if(S.connected.has(name)){S.connected.delete(name);toast(name+' disconnected');d.close();after&&after()}else{b.disabled=true;b.textContent='Authorising…';setTimeout(()=>{S.connected.add(name);toast(name+' connected. First sync started.');d.close();after&&after()},900)}}}
function bindIntegrations(){drawInts();$('#intQ').addEventListener('input',e=>{S.intQ=e.target.value;drawInts()});
  $$('#intCats .chip').forEach(b=>b.onclick=()=>{S.intCat=b.textContent;$$('#intCats .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));drawInts()});
  $('#reqInt').onclick=()=>modal({title:'Request an integration',submit:'Send request',body:`<div class="field"><label for="riT">Tool name</label><input class="input" id="riT" name="t" placeholder="e.g. Amazon Ads"></div><div class="field"><label for="riE">Your email</label><input class="input" id="riE" name="e" type="email"></div><div class="field"><label for="riU">How would you use it?</label><textarea class="input" id="riU" name="u"></textarea></div>`,onSubmit:f=>{if(!req(f,['t','e']))return false;toast(`Request for ${f.elements.t.value} logged. We'll email you when it ships.`)}})}

/* ================= auth ================= */
function renderAuth(mode){
  const su=mode==='signup';document.title=(su?'Create account':'Log in')+' · Lumetric';
  $('#root').innerHTML=`<div class="auth"><div style="display:flex;flex-direction:column;padding:24px"><a class="logo" href="#home"><svg class="logo-mark"><use href="#logo"/></svg>Lumetric</a>
   <form class="auth-form" id="authForm" novalidate><div><h1>${su?'Start your free trial':'Welcome back'}</h1><p class="muted" style="margin-top:8px">${su?`14 days of Growth${S.chosenPlan&&S.chosenPlan!=='Growth'?` (you picked ${S.chosenPlan})`:''}. No card required.`:'Log in to your Lumetric workspace.'}</p></div>
   <button type="button" class="btn block lg" id="gBtn">${ic('google')}Continue with Google</button><div class="or">or with email</div>
   ${su?`<div class="field"><label for="aN">Full name</label><input class="input" id="aN" name="n" autocomplete="name"><span class="hint err" hidden id="aNe">Enter your name.</span></div>`:''}
   <div class="field"><label for="aE">Work email</label><input class="input" id="aE" name="e" type="email" autocomplete="email" value="${esc(S.pendingEmail||(su?'':'adam@northwindgoods.com'))}"><span class="hint err" hidden id="aEe">Enter a valid email, like name@company.com.</span></div>
   <div class="field"><label for="aP">Password</label><input class="input" id="aP" name="p" type="password" autocomplete="${su?'new-password':'current-password'}" value="${su?'':'demo-password'}">${su?`<div class="pw-meter" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="hint" id="pwH">Use 8+ characters with a number and a symbol.</span>`:''}<span class="hint err" hidden id="aPe">Password must be at least 8 characters.</span></div>
   ${su?`<label style="display:flex;gap:10px;font-size:13px;color:var(--muted);align-items:flex-start"><input type="checkbox" id="aT" style="margin-top:3px;accent-color:var(--accent)"> I agree to the Terms and the Data Processing Addendum.</label><span class="hint err" hidden id="aTe">Accept the terms to continue.</span>`:`<div style="display:flex;justify-content:space-between;font-size:13px"><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" checked style="accent-color:var(--accent)"> Remember me</label><button type="button" class="btn ghost sm" id="forgot">Forgot password?</button></div>`}
   <button class="btn primary lg block" type="submit">${su?'Create workspace':'Log in'}</button>
   <p class="muted" style="font-size:14px;text-align:center">${su?'Already have an account? <a href="#login">Log in</a>':'New to Lumetric? <a href="#signup">Create an account</a>'}</p></form></div>
   <div class="auth-art"><div class="glow" style="position:absolute;inset:40% -20% -30% -20%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 60%,transparent),transparent)"></div>
    <span class="eyebrow" style="color:inherit;opacity:.6;position:relative">Customer story</span>
    <blockquote style="position:relative">“We found $38k a month of spend that was only taking credit for organic sales.”</blockquote>
    <div class="who" style="position:relative;margin-top:0">${av('Lucas Moreau')}<div><b>Lucas Moreau</b><small style="color:inherit;opacity:.6">Head of Performance, Everfield Apparel · Paris</small></div></div></div></div>`;
  const f=$('#authForm');
  if(su)$('#aP').addEventListener('input',e=>{const v=e.target.value;let sc=0;if(v.length>=8)sc++;if(/\d/.test(v))sc++;if(/[^A-Za-z0-9]/.test(v))sc++;if(v.length>=12&&/[A-Z]/.test(v))sc++;const cols=['var(--bad)','var(--warn)','var(--teal)','var(--good)'];$$('.pw-meter i').forEach((x,i)=>x.style.background=i<sc?cols[sc-1]:'var(--line)');$('#pwH').textContent=['Too short','Weak','Fair','Good','Strong'][sc]+' password'});
  const go=(name)=>{S.profile.name=name||S.profile.name;toast(su?'Workspace created. Welcome to Lumetric.':'Logged in');location.hash='app'};
  $('#gBtn').onclick=e=>{e.currentTarget.textContent='Connecting to Google…';setTimeout(()=>go(),700)};
  $('#forgot')?.addEventListener('click',()=>{const v=$('#aE').value.trim();if(!/^\S+@\S+\.\S+$/.test(v)){$('#aEe').hidden=false;$('#aE').classList.add('err');return}toast('Reset link sent to '+v)});
  f.addEventListener('submit',e=>{e.preventDefault();let ok=true;const chk=(id,bad)=>{$('#'+id).classList.toggle('err',bad);$('#'+id+'e').hidden=!bad;if(bad)ok=false};
    if(su)chk('aN',!$('#aN').value.trim());chk('aE',!/^\S+@\S+\.\S+$/.test($('#aE').value.trim()));chk('aP',$('#aP').value.length<8);if(su){const bad=!$('#aT').checked;$('#aTe').hidden=!bad;if(bad)ok=false}
    if(ok){f.querySelector('[type=submit]').textContent=su?'Creating workspace…':'Logging in…';setTimeout(()=>go(su?$('#aN').value.trim():null),600)}});
}

/* ================= app ================= */
function renderApp(page){
  const title=APP_PAGES[page];document.title=title+' · Lumetric';
  const unread=S.threads.filter(t=>t.unread).length;
  const link=(h,icn,label,extra='')=>`<a href="#${h}" ${h===page?'aria-current="page"':''}>${ic(icn)}${label}${extra}</a>`;
  $('#root').innerHTML=`<div class="app">
  <aside class="side" id="side"><a class="logo" href="#home"><svg class="logo-mark"><use href="#logo"/></svg>Lumetric</a>
   <h6>General</h6>${link('app','grid','Dashboard')}${link('app-payments','card','Payments')}${link('app-customers','users','Customers')}${link('app-messages','chat','Messages',unread?`<span class="count num">${unread}</span>`:'')}
   <h6>Tools</h6>${link('app-products','box','Products')}${link('app-invoices','doc','Invoices')}${link('app-analytics','chart','Analytics')}${link('app-automation','bolt','Automation','<span class="beta">BETA</span>')}
   <h6>Support</h6>${link('app-settings','gear','Settings')}${link('app-security','shield','Security')}${link('app-help','help','Help')}
   <div class="upgrade" style="margin-top:20px"><b>Growth trial · 9 days left</b><span class="muted">Keep data-driven attribution and Slack alerts.</span><a class="btn primary sm" href="#pricing">Upgrade plan</a></div>
   <div class="user-row">${av(S.profile.name)}<div style="min-width:0;flex:1"><b style="display:block;font-size:13px">${esc(S.profile.name)}</b><small class="muted">${esc(S.profile.company)}</small></div><a class="row-menu" href="#home" title="Sign out" aria-label="Sign out">${ic('out')}</a></div>
  </aside><div class="scrim" id="scrim"></div>
  <div class="main"><div class="topbar">
   <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open navigation">${ic('menu')}</button>
   <button class="search-btn" id="searchBtn" type="button">${ic('search')}<span>Search or jump to…</span><kbd>Ctrl K</kbd></button>
   <div class="top-actions"><div style="position:relative"><button class="icon-btn" id="bellBtn" aria-label="Notifications">${ic('bell')}<span class="dot"></span></button></div>
    <button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">${ic(isDark()?'sun':'moon')}</button>
    <a class="btn ghost hide-s" href="#home">Back to site</a></div></div>
   <div class="canvas" id="canvas"></div></div></div>`;
  const side=$('#side'),scrim=$('#scrim');$('#menuBtn').onclick=()=>{side.classList.add('open');scrim.classList.add('open')};scrim.onclick=()=>{side.classList.remove('open');scrim.classList.remove('open')};
  $('#searchBtn').onclick=palette;
  $('#themeBtn').onclick=()=>{applyTheme(isDark()?'light':'dark');renderApp(page)};
  $('#bellBtn').onclick=e=>{e.stopPropagation();const host=e.currentTarget.parentElement;const ex=$('.popover',host);if(ex){ex.remove();return}
    const p=document.createElement('div');p.className='popover';p.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px"><b style="font-size:14px">Notifications</b><button class="btn ghost sm" type="button" id="markRead">Mark all read</button></div>
     ${[['bolt','CPA spike on Meta · Prospecting UK','12 min ago'],['users','3 trials converted to Growth','1 h ago'],['doc','INV-2049 is overdue','Today'],['plug','Klaviyo sync finished','Yesterday']].map(n=>`<div class="it">${ic(n[0],'i" style="color:var(--accent)')}<div>${n[1]}<small>${n[2]}</small></div></div>`).join('')}`;
    host.appendChild(p);$('#markRead',p).onclick=()=>{$('.dot',host)?.remove();p.remove();toast('All notifications marked as read')};
    setTimeout(()=>document.addEventListener('click',function h(ev){if(!p.contains(ev.target)){p.remove();document.removeEventListener('click',h)}}),0)};
  const C=$('#canvas');
  ({'app':pDash,'app-payments':pPay,'app-customers':pCust,'app-messages':pMsg,'app-products':pProd,'app-invoices':pInv,'app-analytics':pAn,'app-automation':pAuto,'app-settings':pSet,'app-security':pSec,'app-help':pHelp})[page](C);
}
const RANGE_MULT={'7d':.26,'30d':1,'90d':2.7,'12m':10.4};
function pDash(C){
  const m=RANGE_MULT[S.range];
  C.innerHTML=`<div class="page-title"><h1>Dashboard</h1><div class="actions"><label class="sr" for="rangeSel">Date range</label><select class="dd" id="rangeSel">${[['7d','Last 7 days'],['30d','Last 30 days'],['90d','Last quarter'],['12m','Last 12 months']].map(r=>`<option value="${r[0]}" ${r[0]===S.range?'selected':''}>${r[1]}</option>`).join('')}</select><button class="btn sm" id="expBtn">${ic('export')}Export</button></div></div>
  <div class="kpis">
   ${kpi('eye','Page views',fmt(12450*m),'15.8%',true,'vs previous period')}
   ${kpi('wallet','Total revenue','<small>$</small>'+fmt(363.95*m*25.4,2),'34.0%',false,'Refund spike on Sep 21')}
   ${kpi('bounce','Bounce rate','86.5%','24.2%',true,'Improved after checkout fix')}
   ${kpi('mail','Total subscribers',fmt(24473*Math.sqrt(m)),'8.3%',true,'+749 this period')}
  </div>
  <div class="grid-2">
   <div class="card"><div class="card-h"><h3>${ic('bars')}Sales overview</h3><div class="tools"><button class="btn sm" id="salesFilter">${ic('filter')}Filter</button><button class="btn sm" id="salesSort">${ic('sort')}Sort</button></div></div>
    <div class="big num"><small>$</small>9,257.51</div><div style="display:flex;gap:8px;align-items:center;margin-top:6px;font-size:13px"><span class="pill up">15.8% ${ic('up','i" style="width:12px;height:12px')}</span><span class="muted">+ $143.50 increased</span></div>
    <div id="salesChart" style="margin-top:14px"></div><div class="legend" id="salesLegend"></div></div>
   <div class="card"><div class="card-h"><h3>${ic('users')}Total subscriber</h3><select class="dd" id="subSel" aria-label="Subscriber period"><option>Weekly</option><option>Last week</option></select></div>
    <div class="big num" id="subBig">24,473</div><div style="display:flex;gap:8px;align-items:center;margin-top:6px;font-size:13px"><span class="pill up">8.3%</span><span class="muted">+ 749 increased</span></div><div id="weekChart" style="margin-top:14px"></div><p class="hint" style="text-align:center">Hover a bar to inspect the day</p></div>
  </div>
  <div class="grid-2b">
   <div class="card"><div class="card-h"><h3>${ic('grid')}Sales distribution</h3><select class="dd" id="distSel" aria-label="Distribution period">${['Monthly','Quarterly','Yearly'].map(x=>`<option ${x===S.distPeriod?'selected':''}>${x}</option>`).join('')}</select></div>
    <div id="distNums" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px"></div><div id="gauge"></div></div>
   <div class="card"><div class="card-h"><h3>${ic('plug')}List of integration</h3><a class="btn ghost sm" href="#integrations">See all</a></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th><input type="checkbox" id="allInt" aria-label="Select all" style="accent-color:var(--accent)"></th><th>Application</th><th>Type</th><th>Rate</th><th class="r">Profit</th></tr></thead><tbody>
    ${[['Stripe','Finance',40,650],['Zapier','CRM',80,720.5],['Shopify','Marketplace',20,432.25],['Klaviyo','Email',64,1208.9],['Google Ads','Advertising',52,980.4]].map(r=>`<tr><td><input type="checkbox" class="intChk" aria-label="Select ${r[0]}" style="accent-color:var(--accent)"></td><td><div class="cell-user"><span class="mono" style="width:30px;height:30px;font-size:11px;border-radius:8px;background:${(INTEGRATIONS.find(i=>i[0]===r[0])||[0,0,0,'#E6399B'])[3]}">${r[0].slice(0,2)}</span><b>${r[0]}</b></div></td><td class="muted">${r[1]}</td><td><div class="bar-mini"><span><i style="width:${r[2]}%"></i></span><b class="num">${r[2]}%</b></div></td><td class="r num">$${fmt(r[3],2)}</td></tr>`).join('')}
    </tbody></table></div><div id="intSel" class="hint" style="margin-top:10px">Select rows to bulk-sync.</div></div>
  </div>`;
  const drawSales=()=>{stackedChart($('#salesChart'),S.range==='12m'?'6m':S.range);$('#salesLegend').innerHTML=REGIONS.map(r=>`<button type="button" aria-pressed="${S.legend[r[0]]!==false}" data-lg="${r[0]}"><i style="background:${r[1]}"></i>${r[0]}</button>`).join('');$$('[data-lg]').forEach(b=>b.onclick=()=>{const k=b.dataset.lg;S.legend[k]=S.legend[k]===false;if(REGIONS.every(r=>S.legend[r[0]]===false))S.legend[k]=true;drawSales()})};drawSales();
  const wk={Weekly:[1420,2210,3874,1560,2890,2540,3120],'Last week':[1650,1980,2980,2210,3410,2020,2800]};
  const drawWeek=()=>{const v=wk[$('#subSel').value];weekBars($('#weekChart'),v,['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],v.indexOf(Math.max(...v)));$('#subBig').textContent=fmt(v.reduce((a,b)=>a+b)*1.4)};drawWeek();$('#subSel').onchange=drawWeek;
  const dist={Monthly:[374.82,241.6,213.42],Quarterly:[1180.4,806.12,590.3],Yearly:[4620.9,3310.25,2204.8]};
  const drawDist=()=>{const d=dist[S.distPeriod];const parts=[['Website','var(--accent)'],['Mobile app','var(--blue)'],['Other','var(--teal)']].map((p,i)=>({k:p[0],c:p[1],v:d[i]}));
   $('#distNums').innerHTML=parts.map(p=>`<div><div style="font-size:12px;color:var(--muted);display:flex;gap:6px;align-items:center"><i style="width:8px;height:8px;border-radius:50%;background:${p.c};display:inline-block"></i>${p.k}</div><b class="num" style="font-size:17px">$${fmt(p.v,2)}</b></div>`).join('');gauge($('#gauge'),parts)};drawDist();
  $('#distSel').onchange=e=>{S.distPeriod=e.target.value;drawDist()};
  $('#rangeSel').onchange=e=>{S.range=e.target.value;pDash(C);toast('Showing '+e.target.selectedOptions[0].text.toLowerCase())};
  $('#expBtn').onclick=()=>exportModal('dashboard-summary.csv','metric,value\npage_views,'+Math.round(12450*m)+'\nrevenue,'+(363.95*m*25.4).toFixed(2)+'\nbounce_rate,86.5\nsubscribers,'+Math.round(24473*Math.sqrt(m)));
  $('#salesFilter').onclick=()=>modal({title:'Filter regions',submit:'Apply',body:REGIONS.map(r=>`<label style="display:flex;gap:10px;align-items:center"><input type="checkbox" name="${r[0]}" ${S.legend[r[0]]!==false?'checked':''} style="accent-color:var(--accent)"><i style="width:10px;height:10px;border-radius:50%;background:${r[1]}"></i>${r[0]}</label>`).join(''),onSubmit:f=>{const any=REGIONS.some(r=>f.elements[r[0]].checked);if(!any){toast('Keep at least one region selected');return false}REGIONS.forEach(r=>S.legend[r[0]]=f.elements[r[0]].checked);drawSales()}});
  let asc=false;$('#salesSort').onclick=()=>{asc=!asc;REGIONS.reverse();drawSales();toast(asc?'Stack order reversed':'Stack order restored')};
  const upd=()=>{const n=$$('.intChk').filter(c=>c.checked).length;$('#intSel').innerHTML=n?`${n} selected · <button class="btn sm" type="button" id="bulkSync">Sync now</button>`:'Select rows to bulk-sync.';$('#bulkSync')?.addEventListener('click',()=>{toast(`Sync started for ${n} integration${n>1?'s':''}`);$$('.intChk').forEach(c=>c.checked=false);$('#allInt').checked=false;upd()})};
  $$('.intChk').forEach(c=>c.onchange=upd);$('#allInt').onchange=e=>{$$('.intChk').forEach(c=>c.checked=e.target.checked);upd()};
}
function kpi(icn,label,val,delta,up,sub){return `<div class="card kpi"><div class="k">${ic(icn)}${label}<button class="row-menu" style="margin-left:auto;width:24px;height:24px" title="${label} across all tracked properties" aria-label="About ${label}">${ic('help','i" style="width:15px;height:15px')}</button></div><div class="row"><span class="v num">${val}</span><span class="pill ${up?'up':'down'}">${delta} ${ic(up?'up':'down','i" style="width:12px;height:12px')}</span></div><div class="sub">${sub}</div></div>`}
function exportModal(name,csv){modal({title:'Export '+name,onSubmit:false,body:`<p class="muted" style="font-size:14px">Copy the CSV below or download it as a file.</p><textarea class="input" id="csvOut" readonly style="min-height:160px;font-family:ui-monospace,monospace;font-size:12px">${esc(csv)}</textarea><div style="display:flex;gap:8px;justify-content:flex-end"><button type="button" class="btn" id="dlCsv">${ic('export')}Download</button><button type="button" class="btn primary" id="cpCsv">Copy CSV</button></div>`});
  $('#cpCsv').onclick=()=>copyText(csv,$('#csvOut'));
  $('#dlCsv').onclick=()=>{try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=name;document.body.appendChild(a);a.click();a.remove();toast('Download started')}catch(e){toast('Downloads are blocked here. Use Copy CSV.')}}}
const dstr=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
const statusPill=s=>{const m={Active:'up',Succeeded:'up',Paid:'up',Trial:'accent',Pending:'warn',Due:'warn',Draft:'neutral',Churned:'down',Failed:'down',Overdue:'down',Refunded:'neutral'};return `<span class="pill ${m[s]||'neutral'}">${s}</span>`};

function pCust(C){
  const per=8;
  C.innerHTML=`<div class="page-title"><h1>Customers</h1><div class="actions"><button class="btn sm" id="cExp">${ic('export')}Export</button><button class="btn primary sm" id="cAdd">${ic('plus')}Add customer</button></div></div>
  <div class="stat-grid" id="cStats"></div>
  <div class="card"><div class="filters"><label class="sr" for="cQ">Search customers</label><input class="input" id="cQ" placeholder="Search name, company or email" value="${esc(S.custQ)}"><div class="chips">${['All','Active','Trial','Churned'].map(s=>`<button class="chip" type="button" data-cs="${s}" aria-pressed="${s===S.custStatus}">${s}</button>`).join('')}</div></div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr>${[['name','Customer'],['plan','Plan'],['country','Country'],['mrr','MRR'],['status','Status'],['joined','Joined']].map(c=>`<th class="${c[0]==='mrr'?'r':''}"><button type="button" data-sort="${c[0]}">${c[1]}${S.custSort.k===c[0]?(S.custSort.d>0?' ↑':' ↓'):''}</button></th>`).join('')}<th><span class="sr">Actions</span></th></tr></thead><tbody id="cBody"></tbody></table></div>
  <div class="pager"><span id="cInfo"></span><div class="btns"><button class="btn sm" id="cPrev">Previous</button><button class="btn sm" id="cNext">Next</button></div></div></div>`;
  const stats=()=>{const act=S.customers.filter(c=>c.status==='Active');$('#cStats').innerHTML=[['Active customers',act.length,'up','+6 this month'],['Monthly recurring revenue','$'+fmt(S.customers.reduce((a,c)=>a+c.mrr,0)),'up','+12.4% vs August'],['Monthly churn',(S.customers.filter(c=>c.status==='Churned').length/S.customers.length/12*100).toFixed(1)+'%','down','Target under 2%']].map(s=>`<div class="card kpi"><div class="k">${s[0]}</div><div class="row"><span class="v num">${s[1]}</span></div><div class="sub">${s[3]}</div></div>`).join('')};
  const list=()=>{const q=S.custQ.toLowerCase();let l=S.customers.filter(c=>(S.custStatus==='All'||c.status===S.custStatus)&&(c.name+c.company+c.email).toLowerCase().includes(q));const {k,d}=S.custSort;l.sort((a,b)=>(a[k]>b[k]?1:a[k]<b[k]?-1:0)*d);return l};
  const draw=()=>{stats();const l=list();const pages=Math.max(1,Math.ceil(l.length/per));S.custPage=Math.min(S.custPage,pages);const sl=l.slice((S.custPage-1)*per,S.custPage*per);
   $('#cBody').innerHTML=sl.length?sl.map(c=>`<tr data-id="${c.id}" style="cursor:pointer"><td><div class="cell-user">${av(c.name)}<div><b>${esc(c.name)}</b><small>${esc(c.company)}</small></div></div></td><td>${c.plan}</td><td class="muted">${c.country}</td><td class="r num">$${fmt(c.mrr)}</td><td>${statusPill(c.status)}</td><td class="muted num">${dstr(c.joined)}</td><td><button class="row-menu" data-del="${c.id}" aria-label="Delete ${esc(c.name)}">${ic('trash')}</button></td></tr>`).join(''):`<tr><td colspan="7"><div class="empty">No customers match these filters.</div></td></tr>`;
   $('#cInfo').textContent=l.length?`Showing ${(S.custPage-1)*per+1}–${Math.min(S.custPage*per,l.length)} of ${l.length}`:'0 results';$('#cPrev').disabled=S.custPage<=1;$('#cNext').disabled=S.custPage>=pages;
   $$('#cBody tr[data-id]').forEach(tr=>tr.onclick=e=>{const id=+tr.dataset.id;if(e.target.closest('[data-del]')){confirmDel(id);return}custDrawer(S.customers.find(c=>c.id===id),draw)})};
  const confirmDel=id=>{const c=S.customers.find(x=>x.id===id);modal({title:'Delete customer?',submit:'Delete',body:`<p>This removes <b>${esc(c.name)}</b> (${esc(c.company)}) and their attribution history from this workspace.</p>`,onSubmit:()=>{S.customers=S.customers.filter(x=>x.id!==id);draw();toast(c.name+' deleted')}})};
  draw();
  $('#cQ').addEventListener('input',e=>{S.custQ=e.target.value;S.custPage=1;draw()});
  $$('[data-cs]').forEach(b=>b.onclick=()=>{S.custStatus=b.dataset.cs;S.custPage=1;$$('[data-cs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
  $$('[data-sort]').forEach(b=>b.onclick=()=>{const k=b.dataset.sort;S.custSort={k,d:S.custSort.k===k?-S.custSort.d:1};pCust(C)});
  $('#cPrev').onclick=()=>{S.custPage--;draw()};$('#cNext').onclick=()=>{S.custPage++;draw()};
  $('#cExp').onclick=()=>exportModal('customers.csv','name,company,email,plan,mrr,status,country\n'+list().map(c=>[c.name,c.company,c.email,c.plan,c.mrr,c.status,c.country].join(',')).join('\n'));
  $('#cAdd').onclick=()=>modal({title:'Add customer',submit:'Add customer',body:`<div class="two"><div class="field"><label for="nN">Full name</label><input class="input" id="nN" name="n"></div><div class="field"><label for="nC">Company</label><input class="input" id="nC" name="c"></div></div><div class="field"><label for="nE">Email</label><input class="input" id="nE" name="e" type="email"></div><div class="two"><div class="field"><label for="nP">Plan</label><select class="input" id="nP" name="p">${PLANS.map(p=>`<option>${p}</option>`).join('')}</select></div><div class="field"><label for="nCo">Country</label><select class="input" id="nCo" name="co">${COUNTRIES.map(p=>`<option>${p}</option>`).join('')}</select></div></div>`,
   onSubmit:f=>{if(!req(f,['n','c','e']))return false;const p=f.elements.p.value;S.customers.unshift({id:Date.now(),name:f.elements.n.value.trim(),company:f.elements.c.value.trim(),email:f.elements.e.value.trim(),plan:p,mrr:{Starter:29,Growth:129,Scale:349,Enterprise:1200}[p],status:'Trial',country:f.elements.co.value,joined:new Date()});S.custSort={k:'joined',d:-1};S.custPage=1;S.custStatus='All';S.custQ='';pCust(C);toast('Customer added')}});
}
function custDrawer(c,after){const pays=S.payments.filter(p=>p.cust===c.name).slice(0,4);
  const d=drawer(`<div style="padding:22px;display:grid;gap:18px"><div style="display:flex;justify-content:space-between">${av(c.name,52)}<button class="row-menu" data-close aria-label="Close">${ic('x')}</button></div>
   <div><h2 style="font-size:22px">${esc(c.name)}</h2><p class="muted">${esc(c.company)} · ${esc(c.email)}</p></div>
   <div class="two"><div class="card" style="padding:14px"><small class="muted">MRR</small><div class="big num" style="font-size:22px">$${fmt(c.mrr)}</div></div><div class="card" style="padding:14px"><small class="muted">Customer since</small><div style="font-weight:700;margin-top:4px">${dstr(c.joined)}</div></div></div>
   <div class="field"><label for="dPlan">Plan</label><select class="input" id="dPlan">${PLANS.map(p=>`<option ${p===c.plan?'selected':''}>${p}</option>`).join('')}</select></div>
   <div class="field"><label for="dSt">Status</label><select class="input" id="dSt">${['Active','Trial','Churned'].map(p=>`<option ${p===c.status?'selected':''}>${p}</option>`).join('')}</select></div>
   <div><b style="font-size:14px">Recent payments</b>${pays.length?pays.map(p=>`<div class="set-row"><div><b class="num">$${fmt(p.amount,2)}</b><small>${dstr(p.date)} · ${p.method}</small></div>${statusPill(p.status)}</div>`).join(''):'<p class="muted" style="font-size:14px;margin-top:8px">No payments yet.</p>'}</div>
   <button class="btn primary" id="dSave">Save changes</button></div>`);
  $('#dSave',d.el).onclick=()=>{c.plan=$('#dPlan',d.el).value;c.status=$('#dSt',d.el).value;c.mrr=c.status==='Churned'?0:{Starter:29,Growth:129,Scale:349,Enterprise:1200}[c.plan];d.close();after();toast('Customer updated')}}

function pPay(C){
  const tot=s=>S.payments.filter(p=>p.status===s).reduce((a,p)=>a+p.amount,0);
  C.innerHTML=`<div class="page-title"><h1>Payments</h1><div class="actions"><button class="btn sm" id="pExp">${ic('export')}Export</button><button class="btn primary sm" id="pNew">${ic('plus')}Record payment</button></div></div>
  <div class="stat-grid">${[['Collected',tot('Succeeded'),'up'],['Pending',tot('Pending'),'warn'],['Refunded & failed',tot('Refunded')+tot('Failed'),'down']].map(s=>`<div class="card kpi"><div class="k">${s[0]}</div><div class="row"><span class="v num"><small>$</small>${fmt(s[1],2)}</span></div><div class="sub">Last 60 days</div></div>`).join('')}</div>
  <div class="card"><div class="tabs" role="tablist">${['All','Succeeded','Pending','Refunded','Failed'].map(s=>`<button role="tab" aria-selected="${s===S.payStatus}" data-ps="${s}">${s} <span class="muted num">${s==='All'?S.payments.length:S.payments.filter(p=>p.status===s).length}</span></button>`).join('')}</div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Payment</th><th>Customer</th><th>Method</th><th>Date</th><th>Status</th><th class="r">Amount</th><th></th></tr></thead><tbody>
  ${S.payments.filter(p=>S.payStatus==='All'||p.status===S.payStatus).map(p=>`<tr><td class="muted" style="font-family:ui-monospace,monospace;font-size:12px">${p.id}</td><td><div class="cell-user">${av(p.cust)}<div><b>${esc(p.cust)}</b><small>${esc(p.company)}</small></div></div></td><td>${p.method}</td><td class="muted num">${dstr(p.date)}</td><td>${statusPill(p.status)}</td><td class="r num"><b>$${fmt(p.amount,2)}</b></td><td>${p.status==='Succeeded'?`<button class="btn sm" data-refund="${p.id}">Refund</button>`:p.status==='Failed'?`<button class="btn sm" data-retry="${p.id}">Retry</button>`:''}</td></tr>`).join('')||`<tr><td colspan="7"><div class="empty">No payments with this status.</div></td></tr>`}
  </tbody></table></div></div>`;
  $$('[data-ps]').forEach(b=>b.onclick=()=>{S.payStatus=b.dataset.ps;pPay(C)});
  $$('[data-refund]').forEach(b=>b.onclick=()=>{const p=S.payments.find(x=>x.id===b.dataset.refund);modal({title:'Refund payment',submit:'Refund $'+fmt(p.amount,2),body:`<p>Refund <b>$${fmt(p.amount,2)}</b> to ${esc(p.cust)} on ${p.method}? Funds arrive in 5–10 business days.</p><div class="field"><label for="rfR">Reason</label><select class="input" id="rfR"><option>Requested by customer</option><option>Duplicate</option><option>Fraudulent</option></select></div>`,onSubmit:()=>{p.status='Refunded';pPay(C);toast('Refund issued')}})});
  $$('[data-retry]').forEach(b=>b.onclick=()=>{const p=S.payments.find(x=>x.id===b.dataset.retry);b.textContent='Retrying…';b.disabled=true;setTimeout(()=>{p.status='Succeeded';pPay(C);toast('Payment succeeded on retry')},900)});
  $('#pExp').onclick=()=>exportModal('payments.csv','id,customer,amount,method,status,date\n'+S.payments.map(p=>[p.id,p.cust,p.amount,p.method,p.status,p.date.toISOString().slice(0,10)].join(',')).join('\n'));
  $('#pNew').onclick=()=>modal({title:'Record payment',submit:'Record',body:`<div class="field"><label for="npC">Customer</label><select class="input" id="npC" name="c">${S.customers.slice(0,20).map(c=>`<option>${esc(c.name)}</option>`).join('')}</select></div><div class="two"><div class="field"><label for="npA">Amount (USD)</label><input class="input" id="npA" name="a" type="number" min="1" step="0.01"></div><div class="field"><label for="npM">Method</label><select class="input" id="npM" name="m">${METHODS.map(m=>`<option>${m}</option>`).join('')}</select></div></div>`,
   onSubmit:f=>{const a=parseFloat(f.elements.a.value);if(!(a>0)){f.elements.a.classList.add('err');toast('Enter an amount above zero');return false}const c=S.customers.find(x=>x.name===f.elements.c.value);S.payments.unshift({id:'pay_'+Date.now().toString(36),cust:c.name,company:c.company,amount:a,method:f.elements.m.value,status:'Succeeded',date:new Date()});S.payStatus='All';pPay(C);toast('Payment recorded')}});
}

function pMsg(C){
  C.innerHTML=`<div class="page-title"><h1>Messages</h1><div class="actions"><button class="btn primary sm" id="mNew">${ic('plus')}New message</button></div></div><div class="card msg-shell"><div class="msg-list" id="mList"></div><div class="thread" id="mThread"></div></div>`;
  const drawList=()=>{$('#mList').innerHTML=S.threads.map((t,i)=>`<button class="msg-item" data-t="${i}" aria-current="${i===S.activeThread}">${av(t.name)}<div class="meta"><b>${esc(t.name)}<small>${t.msgs[t.msgs.length-1][2]}</small></b><p>${esc(t.msgs[t.msgs.length-1][1])}</p></div>${t.unread?'<span class="unread" aria-label="Unread"></span>':''}</button>`).join('');$$('[data-t]').forEach(b=>b.onclick=()=>{S.activeThread=+b.dataset.t;S.threads[S.activeThread].unread=false;drawList();drawThread();updBadge()})};
  const updBadge=()=>{const n=S.threads.filter(t=>t.unread).length;const a=$('a[href="#app-messages"]');const c=$('.count',a);if(n){if(c)c.textContent=n}else c?.remove()};
  const drawThread=()=>{const t=S.threads[S.activeThread];t.unread=false;$('#mThread').innerHTML=`<div class="thread-h">${av(t.name)}<div><b>${esc(t.name)}</b><small class="muted" style="display:block;font-size:12px">${esc(t.co)}</small></div></div><div class="thread-body" id="tb">${t.msgs.map(m=>`<div class="bubble ${m[0]==='me'?'me':''}">${esc(m[1])}<small>${m[2]}</small></div>`).join('')}</div><form class="composer" id="comp"><label class="sr" for="cIn">Message</label><input class="input" id="cIn" placeholder="Write a reply to ${esc(t.name.split(' ')[0])}…" autocomplete="off"><button class="btn primary" aria-label="Send">${ic('send')}</button></form>`;
   const tb=$('#tb');tb.scrollTop=tb.scrollHeight;
   $('#comp').onsubmit=e=>{e.preventDefault();const v=$('#cIn').value.trim();if(!v)return;const now=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});t.msgs.push(['me',v,now]);drawThread();drawList();$('#cIn').focus();
    const ty=document.createElement('div');ty.className='typing';ty.textContent=t.name.split(' ')[0]+' is typing…';setTimeout(()=>{$('#tb')?.appendChild(ty);const b=$('#tb');if(b)b.scrollTop=b.scrollHeight},500);
    setTimeout(()=>{t.msgs.push(['them',pick(['Perfect, thank you!','Got it. I will share this with the team.','That works for us. Can you send the updated report by Friday?','Great, appreciate the quick reply.']),new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})]);if(S.threads[S.activeThread]===t&&$('#tb'))drawThread();drawList()},1900)}};
  drawList();drawThread();updBadge();
  $('#mNew').onclick=()=>modal({title:'New message',submit:'Send',body:`<div class="field"><label for="nmT">To</label><select class="input" id="nmT" name="t">${S.customers.slice(0,15).map(c=>`<option value="${esc(c.name)}|${esc(c.company)}">${esc(c.name)} · ${esc(c.company)}</option>`).join('')}</select></div><div class="field"><label for="nmM">Message</label><textarea class="input" id="nmM" name="m"></textarea></div>`,onSubmit:f=>{if(!req(f,['m']))return false;const [n,co]=f.elements.t.value.split('|');S.threads.unshift({name:n,co,unread:false,msgs:[['me',f.elements.m.value.trim(),'Now']]});S.activeThread=0;pMsg(C);toast('Message sent to '+n)}});
}

function pProd(C){
  C.innerHTML=`<div class="page-title"><h1>Products</h1><div class="actions"><label class="sr" for="prS">Sort products</label><select class="dd" id="prS"><option value="rev">Top revenue</option><option value="stock">Lowest stock</option><option value="name">Name A–Z</option></select><button class="btn primary sm" id="prAdd">${ic('plus')}Add product</button></div></div><p class="muted" style="margin:-8px 0 18px;font-size:14px">Revenue attributed to marketing in the last 30 days, from your Shopify store.</p><div class="prod-grid" id="prG"></div>`;
  const draw=()=>{const k=$('#prS').value;const l=[...S.products].sort((a,b)=>k==='name'?a.name.localeCompare(b.name):k==='stock'?a.stock-b.stock:b.rev-a.rev);
   $('#prG').innerHTML=l.map(p=>`<div class="card prod"><div class="thumb" style="background:linear-gradient(135deg,${p.c},color-mix(in srgb,${p.c} 55%,#fff))">${esc(initials(p.name))}</div><div><b>${esc(p.name)}</b><div class="muted" style="font-size:12px">${p.sku}</div></div>
    <div class="line"><span>Price</span><b class="num">$${fmt(p.price,2)}</b></div><div class="line"><span>Attributed revenue</span><b class="num">$${fmt(p.rev)}</b></div><div class="line"><span>Stock</span>${p.stock===0?'<span class="pill down">Out of stock</span>':p.stock<50?`<span class="pill warn">${p.stock} left</span>`:`<b class="num">${p.stock}</b>`}</div>
    <div class="line" style="border-top:1px solid var(--line);padding-top:12px"><span>Visible in store</span><label class="switch"><input type="checkbox" data-pa="${p.id}" ${p.active?'checked':''} aria-label="Visible in store: ${esc(p.name)}"><span></span></label></div></div>`).join('');
   $$('[data-pa]').forEach(i=>i.onchange=()=>{const p=S.products.find(x=>x.id===+i.dataset.pa);p.active=i.checked;toast(p.name+(p.active?' is visible':' is hidden'))})};
  draw();$('#prS').onchange=draw;
  $('#prAdd').onclick=()=>modal({title:'Add product',submit:'Add product',body:`<div class="field"><label for="apN">Product name</label><input class="input" id="apN" name="n"></div><div class="two"><div class="field"><label for="apP">Price (USD)</label><input class="input" id="apP" name="p" type="number" min="0" step="0.01"></div><div class="field"><label for="apS">Stock</label><input class="input" id="apS" name="s" type="number" min="0"></div></div>`,onSubmit:f=>{if(!req(f,['n','p','s']))return false;S.products.push({id:Date.now(),name:f.elements.n.value.trim(),sku:'TC-NEW-'+String(S.products.length+1).padStart(2,'0'),price:+f.elements.p.value,stock:+f.elements.s.value,rev:0,active:true,c:pick(AVC)});draw();toast('Product added')}});
}

function invTotal(i){return i.items.reduce((a,x)=>a+x.qty*x.price,0)}
function pInv(C){
  C.innerHTML=`<div class="page-title"><h1>Invoices</h1><div class="actions"><button class="btn primary sm" id="iNew">${ic('plus')}Create invoice</button></div></div>
  <div class="stat-grid">${[['Outstanding',S.invoices.filter(i=>i.status==='Due').reduce((a,i)=>a+invTotal(i),0)],['Overdue',S.invoices.filter(i=>i.status==='Overdue').reduce((a,i)=>a+invTotal(i),0)],['Paid this quarter',S.invoices.filter(i=>i.status==='Paid').reduce((a,i)=>a+invTotal(i),0)]].map(s=>`<div class="card kpi"><div class="k">${s[0]}</div><div class="row"><span class="v num"><small>$</small>${fmt(s[1],2)}</span></div></div>`).join('')}</div>
  <div class="card"><div class="tabs" role="tablist">${['All','Paid','Due','Overdue','Draft'].map(s=>`<button role="tab" aria-selected="${s===S.invStatus}" data-is="${s}">${s}</button>`).join('')}</div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Invoice</th><th>Client</th><th>Issued</th><th>Due</th><th>Status</th><th class="r">Total</th><th></th></tr></thead><tbody>
  ${S.invoices.filter(i=>S.invStatus==='All'||i.status===S.invStatus).map(i=>`<tr data-inv="${i.no}" style="cursor:pointer"><td><b>${i.no}</b></td><td><div class="cell-user">${av(i.cust)}<div><b>${esc(i.cust)}</b><small>${esc(i.company)}</small></div></div></td><td class="muted num">${dstr(i.date)}</td><td class="muted num">${dstr(i.due)}</td><td>${statusPill(i.status)}</td><td class="r num"><b>$${fmt(invTotal(i),2)}</b></td><td>${i.status!=='Paid'?`<button class="btn sm" data-pay="${i.no}">Mark paid</button>`:''}</td></tr>`).join('')||`<tr><td colspan="7"><div class="empty">No invoices here.</div></td></tr>`}
  </tbody></table></div></div>`;
  $$('[data-is]').forEach(b=>b.onclick=()=>{S.invStatus=b.dataset.is;pInv(C)});
  $$('[data-inv]').forEach(tr=>tr.onclick=e=>{const inv=S.invoices.find(x=>x.no===tr.dataset.inv);if(e.target.closest('[data-pay]')){inv.status='Paid';pInv(C);toast(inv.no+' marked as paid');return}invView(inv,C)});
  $('#iNew').onclick=()=>invForm(C);
}
function invView(i,C){const m=modal({title:i.no,wide:true,onSubmit:false,body:`<div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap"><div><a class="logo" style="font-size:17px"><svg class="logo-mark" style="width:22px;height:22px"><use href="#logo"/></svg>Lumetric Inc.</a><p class="muted" style="font-size:13px;margin-top:6px">221 Kingsland Rd, London E2 8AN<br>VAT GB 318 4410 72</p></div><div style="text-align:right;font-size:13px">${statusPill(i.status)}<p style="margin-top:8px">Issued ${dstr(i.date)}<br>Due ${dstr(i.due)}</p></div></div>
  <div style="font-size:14px"><span class="muted">Bill to</span><br><b>${esc(i.company)}</b><br>${esc(i.cust)} · ${esc(i.email)}</div>
  <div class="tbl-wrap" style="margin:0;padding:0"><table class="tbl" style="min-width:0"><thead><tr><th>Description</th><th class="r">Qty</th><th class="r">Price</th><th class="r">Amount</th></tr></thead><tbody>${i.items.map(x=>`<tr><td>${esc(x.desc)}</td><td class="r num">${x.qty}</td><td class="r num">$${fmt(x.price,2)}</td><td class="r num">$${fmt(x.qty*x.price,2)}</td></tr>`).join('')}<tr><td colspan="3" class="r"><b>Total</b></td><td class="r num"><b>$${fmt(invTotal(i),2)}</b></td></tr></tbody></table></div>
  <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap">${i.status!=='Paid'?`<button type="button" class="btn" id="ivRem">${ic('mail')}Send reminder</button><button type="button" class="btn primary" id="ivPay">Mark as paid</button>`:'<span class="muted" style="font-size:13px">Paid in full. Thank you.</span>'}</div>`});
  $('#ivRem')?.addEventListener('click',()=>{toast('Reminder emailed to '+i.email)});$('#ivPay')?.addEventListener('click',()=>{i.status='Paid';m.close();pInv(C);toast(i.no+' marked as paid')})}
function invForm(C){const m=modal({title:'Create invoice',wide:true,submit:'Create invoice',body:`<div class="two"><div class="field"><label for="ifC">Client</label><select class="input" id="ifC" name="c">${S.customers.filter(c=>c.status!=='Churned').slice(0,20).map(c=>`<option value="${c.id}">${esc(c.company)} · ${esc(c.name)}</option>`).join('')}</select></div><div class="field"><label for="ifD">Due in</label><select class="input" id="ifD" name="d"><option value="7">7 days</option><option value="14" selected>14 days</option><option value="30">30 days</option></select></div></div>
  <div><b style="font-size:13px">Line items</b><div id="lines" style="display:grid;gap:8px;margin-top:8px"></div><button type="button" class="btn sm" id="addLine" style="margin-top:10px">${ic('plus')}Add line</button></div>
  <div style="display:flex;justify-content:flex-end;gap:24px;font-size:14px"><span class="muted">Subtotal <b class="num" id="ifSub" style="color:var(--fg)">$0.00</b></span><span class="muted">VAT 20% <b class="num" id="ifVat" style="color:var(--fg)">$0.00</b></span><span>Total <b class="num" id="ifTot">$0.00</b></span></div>
  <label style="display:flex;gap:8px;align-items:center;font-size:14px"><input type="checkbox" name="draft" style="accent-color:var(--accent)"> Save as draft instead of sending</label>`,
  onSubmit:f=>{const items=$$('.ln',f).map(r=>({desc:$('.ld',r).value.trim(),qty:+$('.lq',r).value,price:+$('.lp',r).value})).filter(x=>x.desc&&x.qty>0);if(!items.length){toast('Add at least one line with a description');return false}
   const c=S.customers.find(x=>x.id===+f.elements.c.value);const due=new Date();due.setDate(due.getDate()+ +f.elements.d.value);const no='INV-'+(2041+S.invoices.length);
   S.invoices.unshift({no,cust:c.name,company:c.company,email:c.email,date:new Date(),due,items,status:f.elements.draft.checked?'Draft':'Due'});S.invStatus='All';pInv(C);toast(f.elements.draft.checked?no+' saved as draft':no+' sent to '+c.email)}});
  const f=m.el;const calc=()=>{const sub=$$('.ln',f).reduce((a,r)=>a+(+$('.lq',r).value||0)*(+$('.lp',r).value||0),0);$('#ifSub').textContent='$'+fmt(sub,2);$('#ifVat').textContent='$'+fmt(sub*.2,2);$('#ifTot').textContent='$'+fmt(sub*1.2,2)};
  const add=(d='',q=1,p='')=>{const r=document.createElement('div');r.className='ln';r.style.cssText='display:grid;grid-template-columns:1fr 70px 100px 32px;gap:8px';r.innerHTML=`<input class="input ld" placeholder="Description" aria-label="Description" value="${esc(d)}"><input class="input lq" type="number" min="1" value="${q}" aria-label="Quantity"><input class="input lp" type="number" min="0" step="0.01" placeholder="Price" aria-label="Unit price" value="${p}"><button type="button" class="row-menu" aria-label="Remove line">${ic('x')}</button>`;$('#lines',f).appendChild(r);$('button',r).onclick=()=>{r.remove();calc()};$$('input',r).forEach(i=>i.oninput=calc);calc()};
  add('Growth plan · October',1,129);add('Attribution audit (hours)',4,150);$('#addLine',f).onclick=()=>add();}

function pAn(C){
  const labels=[];const d0=new Date(2026,7,30);for(let i=0;i<30;i++){const d=new Date(d0);d.setDate(d.getDate()+i);labels.push(d.toLocaleDateString('en-US',{day:'numeric',month:'short'}))}
  seed=42;const base={Revenue:[8200,1600],Sessions:[5200,900],Conversions:[180,40]};
  const gen=(b,v,tr)=>labels.map((_,i)=>Math.round(b+i*tr+Math.sin(i/2.3)*v*.5+rnd()*v));
  const CH=[['Google Ads',42100,1210,18400],['Meta Ads',38900,980,21300],['LinkedIn Ads',9800,210,11200],['TikTok Ads',15400,340,7900],['Organic search',51200,1420,0],['Email (Klaviyo)',12800,690,1200]];
  const W={'First touch':[.9,1.3,.8,1.5,1.1,.4],'Last touch':[1.2,.8,.9,.6,1.1,1.6],'Linear':[1,1,1,1,1,1],'Data-driven':[1.05,.92,1.2,1.1,1,1.15]};
  C.innerHTML=`<div class="page-title"><h1>Analytics</h1><div class="actions"><label class="sr" for="anModel">Attribution model</label><select class="dd" id="anModel">${Object.keys(W).map(m=>`<option ${m===S.anModel?'selected':''}>${m}</option>`).join('')}</select><button class="btn sm" id="anExp">${ic('export')}Export</button></div></div>
  <div class="card" style="margin-bottom:16px"><div class="card-h"><h3>${ic('chart')}Performance · last 30 days</h3><div class="seg" role="group" aria-label="Metric">${['Revenue','Sessions','Conversions'].map(m=>`<button type="button" data-am="${m}" aria-pressed="${m===S.anMetric}">${m}</button>`).join('')}</div></div><div id="anChart"></div><div class="legend"><span style="display:inline-flex;gap:6px;align-items:center"><i style="background:var(--accent)"></i>This period</span><span style="display:inline-flex;gap:6px;align-items:center"><i style="background:var(--teal)"></i>Previous period</span></div></div>
  <div class="card"><div class="card-h"><h3>${ic('bars')}Channel performance</h3><span class="pill accent" id="anModelPill">${S.anModel}</span></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Channel</th><th class="r">Sessions</th><th class="r">Conversions</th><th class="r">Conv. rate</th><th class="r">Spend</th><th class="r">Revenue</th><th class="r">ROAS</th></tr></thead><tbody id="anBody"></tbody></table></div></div>`;
  const draw=()=>{const [b,v]=base[S.anMetric];const f=S.anMetric==='Revenue'?(x,t)=>t?'$'+fmt(x):'$'+fmt(x/1000,1)+'k':(x)=>fmt(x);seed=42;
   lineChart($('#anChart'),[{n:'This period',c:'var(--accent)',v:gen(b,v,b*.012)},{n:'Previous',c:'var(--teal)',dash:1,v:gen(b*.85,v,b*.004)}],labels,{fmt:f,label:S.anMetric+' over 30 days'});
   const w=W[S.anModel];$('#anBody').innerHTML=CH.map((c,i)=>{const conv=Math.round(c[2]*w[i]);const rev=conv*96;const roas=c[3]?rev/c[3]:null;return `<tr><td><b>${c[0]}</b></td><td class="r num">${fmt(c[1])}</td><td class="r num">${fmt(conv)}</td><td class="r num">${(conv/c[1]*100).toFixed(2)}%</td><td class="r num">${c[3]?'$'+fmt(c[3]):'—'}</td><td class="r num">$${fmt(rev)}</td><td class="r">${roas===null?'<span class="pill neutral">Organic</span>':`<span class="pill ${roas>=3?'up':roas>=1.5?'warn':'down'}">${roas.toFixed(2)}×</span>`}</td></tr>`}).join('');$('#anModelPill').textContent=S.anModel};
  draw();$$('[data-am]').forEach(b=>b.onclick=()=>{S.anMetric=b.dataset.am;$$('[data-am]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
  $('#anModel').onchange=e=>{S.anModel=e.target.value;draw();toast('Credit recalculated with '+S.anModel)};
  $('#anExp').onclick=()=>exportModal('channels.csv','channel,sessions,spend\n'+CH.map(c=>[c[0],c[1],c[3]].join(',')).join('\n'));
}

function pAuto(C){
  C.innerHTML=`<div class="page-title"><h1>Automation <span class="pill accent" style="vertical-align:middle;font-size:11px">BETA</span></h1><div class="actions"><button class="btn primary sm" id="wNew">${ic('plus')}New workflow</button></div></div>
  <p class="muted" style="margin:-8px 0 18px;font-size:14px">${S.workflows.filter(w=>w.on).length} of ${S.workflows.length} workflows running · ${fmt(S.workflows.reduce((a,w)=>a+w.runs,0))} runs this month</p>
  <div class="card" id="wList">${S.workflows.map((w,i)=>`<div class="wf" style="${i?'padding-top:12px;border-top:1px solid var(--line)':''}"><div style="min-width:0"><h4>${esc(w.name)}</h4><div class="flow"><span class="t">When: ${esc(w.trigger)}</span>${ic('arrow','i" style="color:var(--faint)')}<span>If: ${esc(w.cond)}</span>${ic('arrow','i" style="color:var(--faint)')}<span class="a">Then: ${esc(w.action)}</span></div><div class="stats">${w.runs} runs · last run ${w.on?'2 hours ago':'paused'} · <button class="btn ghost sm" style="height:24px;padding:0 6px" data-wt="${i}">Test run</button><button class="btn ghost sm danger" style="height:24px;padding:0 6px" data-wd="${i}">Delete</button></div></div><label class="switch"><input type="checkbox" data-w="${i}" ${w.on?'checked':''} aria-label="Enable ${esc(w.name)}"><span></span></label></div>`).join('')||'<div class="empty">No workflows yet.</div>'}</div>`;
  $$('[data-w]').forEach(i=>i.onchange=()=>{const w=S.workflows[+i.dataset.w];w.on=i.checked;toast(w.name+(w.on?' enabled':' paused'));pAuto(C)});
  $$('[data-wt]').forEach(b=>b.onclick=()=>{const w=S.workflows[+b.dataset.wt];b.textContent='Running…';setTimeout(()=>{w.runs++;pAuto(C);toast('Test run passed: '+w.action)},800)});
  $$('[data-wd]').forEach(b=>b.onclick=()=>{const w=S.workflows[+b.dataset.wd];modal({title:'Delete workflow?',submit:'Delete',body:`<p>“${esc(w.name)}” will stop running immediately.</p>`,onSubmit:()=>{S.workflows.splice(+b.dataset.wd,1);pAuto(C);toast('Workflow deleted')}})});
  $('#wNew').onclick=()=>modal({title:'New workflow',submit:'Create workflow',body:`<div class="field"><label for="wfN">Name</label><input class="input" id="wfN" name="n" placeholder="e.g. Alert on ROAS drop"></div>
   <div class="field"><label for="wfT">When</label><select class="input" id="wfT" name="t"><option>ROAS below 1.5 for 24h</option><option>CPA rises 30% day over day</option><option>New order over $500</option><option>Every Monday 08:00</option><option>Pixel stops firing</option></select></div>
   <div class="field"><label for="wfC">If</label><select class="input" id="wfC" name="c"><option>Any channel</option><option>Channel is Google Ads</option><option>Channel is Meta Ads</option><option>Market is EU</option></select></div>
   <div class="field"><label for="wfA">Then</label><select class="input" id="wfA" name="a"><option>Send Slack message to #growth</option><option>Email the account owner</option><option>Pause the campaign</option><option>Create a HubSpot task</option></select></div>`,
   onSubmit:f=>{if(!req(f,['n']))return false;S.workflows.unshift({name:f.elements.n.value.trim(),trigger:f.elements.t.value,cond:f.elements.c.value,action:f.elements.a.value,on:true,runs:0});pAuto(C);toast('Workflow created and running')}});
}

function pSet(C){
  let tab=S.setTab||'Profile';
  C.innerHTML=`<div class="page-title"><h1>Settings</h1></div><div class="tabs" role="tablist">${['Profile','Notifications','Team','Appearance'].map(t=>`<button role="tab" data-st="${t}" aria-selected="${t===tab}">${t}</button>`).join('')}</div><div id="setBody"></div>`;
  $$('[data-st]').forEach(b=>b.onclick=()=>{S.setTab=b.dataset.st;pSet(C)});const B=$('#setBody');const P=S.profile;
  if(tab==='Profile'){B.innerHTML=`<form class="card" id="pf" style="max-width:720px;display:grid;gap:16px" novalidate><div style="display:flex;gap:16px;align-items:center">${av(P.name,60)}<div><b>${esc(P.name)}</b><div class="muted" style="font-size:13px">${esc(P.role)} at ${esc(P.company)}</div></div></div>
   <div class="set-grid"><div class="field"><label for="pN">Full name</label><input class="input" id="pN" name="name" value="${esc(P.name)}"></div><div class="field"><label for="pE">Email</label><input class="input" id="pE" name="email" type="email" value="${esc(P.email)}"></div><div class="field"><label for="pC">Company</label><input class="input" id="pC" name="company" value="${esc(P.company)}"></div><div class="field"><label for="pR">Role</label><input class="input" id="pR" name="role" value="${esc(P.role)}"></div>
   <div class="field"><label for="pT">Time zone</label><select class="input" id="pT" name="tz">${['America/New_York','America/Los_Angeles','Europe/London','Europe/Berlin','Australia/Sydney','Asia/Jakarta'].map(z=>`<option ${z===P.tz?'selected':''}>${z}</option>`).join('')}</select></div><div class="field"><label for="pCur">Reporting currency</label><select class="input" id="pCur"><option>USD</option><option>EUR</option><option>GBP</option><option>AUD</option></select></div></div>
   <div style="display:flex;justify-content:flex-end;gap:8px"><button type="reset" class="btn">Discard</button><button class="btn primary">Save profile</button></div></form>`;
   $('#pf').onsubmit=e=>{e.preventDefault();const f=e.target;if(!req(f,['name','email','company']))return;['name','email','company','role','tz'].forEach(k=>P[k]=f.elements[k].value.trim());renderApp('app-settings');toast('Profile saved')}}
  if(tab==='Notifications'){const N=[['weekly','Weekly performance report','Every Monday at 08:00 in your time zone'],['anomaly','Anomaly alerts','CPA, ROAS or tracking changes above your threshold'],['budget','Budget pacing','When a channel reaches 90% of its monthly budget'],['digest','Daily Slack digest','Posted to #growth at 09:00'],['product','Product updates','New features and release notes']];
   B.innerHTML=`<div class="card" style="max-width:720px">${N.map(n=>`<div class="set-row"><div><b>${n[1]}</b><small>${n[2]}</small></div><label class="switch"><input type="checkbox" data-n="${n[0]}" ${S.notif[n[0]]?'checked':''} aria-label="${n[1]}"><span></span></label></div>`).join('')}</div>`;
   $$('[data-n]').forEach(i=>i.onchange=()=>{S.notif[i.dataset.n]=i.checked;toast('Notification preference saved')})}
  if(tab==='Team'){B.innerHTML=`<div class="card" style="max-width:820px"><form id="inv" class="filters" novalidate><label class="sr" for="invE">Email</label><input class="input" id="invE" type="email" placeholder="colleague@company.com" style="max-width:none;flex:1;min-width:200px"><label class="sr" for="invR">Role</label><select class="dd" id="invR" style="height:38px"><option>Analyst</option><option>Admin</option><option>Viewer</option></select><button class="btn primary">Send invite</button></form>
   <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Member</th><th>Role</th><th></th></tr></thead><tbody>${S.team.map((m,i)=>`<tr><td><div class="cell-user">${av(m.name)}<div><b>${esc(m.name)}</b><small>${esc(m.email)}</small></div></div></td><td>${m.role==='Owner'?'<span class="pill accent">Owner</span>':`<select class="dd" data-tr="${i}" aria-label="Role for ${esc(m.name)}">${['Admin','Analyst','Viewer'].map(r=>`<option ${r===m.role?'selected':''}>${r}</option>`).join('')}</select>`}${m.pending?' <span class="pill warn">Invite sent</span>':''}</td><td class="r">${m.role!=='Owner'?`<button class="row-menu" data-tx="${i}" aria-label="Remove ${esc(m.name)}">${ic('trash')}</button>`:''}</td></tr>`).join('')}</tbody></table></div></div>`;
   $('#inv').onsubmit=e=>{e.preventDefault();const v=$('#invE').value.trim();if(!/^\S+@\S+\.\S+$/.test(v)){$('#invE').classList.add('err');toast('Enter a valid email address');return}S.team.push({name:v.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),email:v,role:$('#invR').value,pending:true});pSet(C);toast('Invite sent to '+v)};
   $$('[data-tr]').forEach(s=>s.onchange=()=>{S.team[+s.dataset.tr].role=s.value;toast('Role updated')});$$('[data-tx]').forEach(b=>b.onclick=()=>{const m=S.team.splice(+b.dataset.tx,1)[0];pSet(C);toast(m.name+' removed')})}
  if(tab==='Appearance'){B.innerHTML=`<div class="card" style="max-width:720px"><b>Theme</b><p class="muted" style="font-size:13px;margin:4px 0 14px">Light is the default every time the dashboard opens.</p><div class="theme-opts">${[['light','Light','linear-gradient(135deg,#fff 50%,#FFF6FB 50%)'],['dark','Dark','linear-gradient(135deg,#1D1029 50%,#140A1E 50%)'],['system','System','linear-gradient(135deg,#fff 50%,#1D1029 50%)']].map(t=>`<button type="button" class="theme-opt" data-th="${t[0]}" aria-pressed="${S.theme===t[0]}"><i style="background:${t[2]}"></i>${t[1]}</button>`).join('')}</div>
   <div class="set-row" style="margin-top:12px"><div><b>Compact tables</b><small>Show more rows on screen</small></div><label class="switch"><input type="checkbox" id="compact" aria-label="Compact tables"><span></span></label></div></div>`;
   $$('[data-th]').forEach(b=>b.onclick=()=>{applyTheme(b.dataset.th);renderApp('app-settings');toast('Theme set to '+b.dataset.th)});
   $('#compact').onchange=e=>{document.documentElement.style.setProperty('--compact',e.target.checked?1:0);$$('table.tbl td').forEach(td=>td.style.padding=e.target.checked?'7px 12px':'');toast(e.target.checked?'Compact tables on':'Compact tables off')}}
}
function pSec(C){
  C.innerHTML=`<div class="page-title"><h1>Security</h1></div><div class="set-grid" style="max-width:980px">
  <div class="card"><div class="card-h"><h3>${ic('shield')}Account protection</h3></div>
   <div class="set-row"><div><b>Two-factor authentication</b><small id="tfaS">Off · recommended for all admins</small></div><label class="switch"><input type="checkbox" id="tfa" aria-label="Two-factor authentication"><span></span></label></div>
   <div class="set-row"><div><b>Enforce SSO (SAML)</b><small>Available on Scale and Enterprise</small></div><a class="btn sm" href="#pricing">Upgrade</a></div>
   <div class="set-row"><div><b>Password</b><small>Last changed 94 days ago</small></div><button class="btn sm" id="pwChg">Change</button></div></div>
  <div class="card"><div class="card-h"><h3>${ic('eye')}Active sessions</h3><button class="btn sm danger" id="sesOut">Sign out others</button></div><div id="ses">${[['MacBook Pro · Chrome','London, UK · this device',1],['iPhone 16 · Safari','London, UK · 2 hours ago'],['Windows · Edge','Berlin, DE · 3 days ago']].map(s=>`<div class="set-row"><div><b>${s[0]}</b><small>${s[1]}</small></div>${s[2]?'<span class="pill up">Current</span>':''}</div>`).join('')}</div></div>
  <div class="card" style="grid-column:1/-1"><div class="card-h"><h3>${ic('doc')}Audit log</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Event</th><th>User</th><th>IP</th><th>When</th></tr></thead><tbody>${[['Connected Klaviyo','Mia Hughes','81.2.69.142','Today 09:41'],['Exported customers.csv','Adam Pratama','81.2.69.142','Yesterday 17:02'],['Invited leo@northwindgoods.com','Adam Pratama','81.2.69.142','Sep 24'],['Changed attribution model to Data-driven','Mia Hughes','185.16.4.21','Sep 22']].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td class="muted num">${r[2]}</td><td class="muted">${r[3]}</td></tr>`).join('')}</tbody></table></div></div></div>`;
  $('#tfa').onchange=e=>{if(e.target.checked){e.target.checked=false;modal({title:'Set up two-factor authentication',submit:'Verify and enable',body:`<p style="font-size:14px">Open your authenticator app and enter this setup key, then type the 6-digit code it shows.</p><div class="card" style="font-family:ui-monospace,monospace;text-align:center;font-size:17px;letter-spacing:.12em">LMTR 7Q4K 2XPA 9FJD</div><div class="field"><label for="tfaC">6-digit code</label><input class="input" id="tfaC" name="c" inputmode="numeric" maxlength="6" placeholder="123456"></div><p class="hint">Demo: any 6 digits work.</p>`,onSubmit:f=>{if(!/^\d{6}$/.test(f.elements.c.value)){f.elements.c.classList.add('err');toast('Enter the 6-digit code from your app');return false}$('#tfa').checked=true;$('#tfaS').textContent='On · authenticator app';toast('Two-factor authentication enabled')}})}else{$('#tfaS').textContent='Off · recommended for all admins';toast('Two-factor authentication disabled')}};
  $('#sesOut').onclick=()=>{$$('#ses .set-row').slice(1).forEach(r=>r.remove());toast('Signed out of 2 other sessions')};
  $('#pwChg').onclick=()=>modal({title:'Change password',submit:'Update password',body:`<div class="field"><label for="op">Current password</label><input class="input" id="op" name="o" type="password"></div><div class="field"><label for="np">New password</label><input class="input" id="np" name="n" type="password"></div><p class="hint">At least 8 characters.</p>`,onSubmit:f=>{if(!f.elements.o.value||f.elements.n.value.length<8){toast('New password needs 8+ characters');return false}toast('Password updated')}});
}
function pHelp(C){
  const A=[['Connect Shopify and import 24 months of orders','Getting started'],['How data-driven attribution assigns credit','Attribution'],['Set up server-side tracking with Google Tag Manager','Tracking'],['Why Meta reports more conversions than Lumetric','Attribution'],['Invite teammates and set roles','Workspace'],['Create a budget pacing alert in Slack','Automation'],['Export raw touchpoints to BigQuery','Data'],['Request a signed DPA for GDPR','Security']];
  C.innerHTML=`<div class="page-title"><h1>Help centre</h1></div><div class="grid-2b" style="grid-template-columns:1.4fr 1fr"><div class="card"><div class="filters"><label class="sr" for="hQ">Search help articles</label><input class="input" id="hQ" placeholder="Search articles" style="max-width:none"></div><div id="hL"></div></div>
  <form class="card" id="hF" style="display:grid;gap:14px;align-content:start" novalidate><h3 style="font-size:16px">Contact support</h3><p class="muted" style="font-size:13px">Median first reply: 38 minutes, 24/5 across US, EU and APAC hours.</p><div class="field"><label for="hS">Subject</label><input class="input" id="hS" name="s"></div><div class="field"><label for="hP">Priority</label><select class="input" id="hP" name="p"><option>Normal</option><option>High · data is missing</option><option>Urgent · tracking is down</option></select></div><div class="field"><label for="hM">Describe the issue</label><textarea class="input" id="hM" name="m"></textarea></div><button class="btn primary">Send to support</button></form></div>`;
  const draw=q=>{const l=A.filter(a=>(a[0]+a[1]).toLowerCase().includes(q.toLowerCase()));$('#hL').innerHTML=l.length?l.map(a=>`<div class="set-row"><div><b>${a[0]}</b><small>${a[1]} · 3 min read</small></div>${ic('arrow','i" style="color:var(--muted)')}</div>`).join(''):`<div class="empty">No articles for “${esc(q)}”. Ask support on the right.</div>`};
  draw('');$('#hQ').oninput=e=>draw(e.target.value);
  $('#hF').onsubmit=e=>{e.preventDefault();if(!req(e.target,['s','m']))return;toast('Ticket #'+(48200+Math.floor(Math.random()*900))+' created. We will reply by email.');e.target.reset()};
}

/* ---------- command palette ---------- */
function palette(){
  if($('.palette'))return;
  const items=[...Object.entries(APP_PAGES).map(([h,t])=>({t:'Go to '+t,k:'Page',run:()=>location.hash=h})),{t:'Toggle dark mode',k:'Action',run:()=>{applyTheme(isDark()?'light':'dark');route()}},{t:'Create invoice',k:'Action',run:()=>{location.hash='app-invoices';setTimeout(()=>$('#iNew')?.click(),50)}},{t:'Add customer',k:'Action',run:()=>{location.hash='app-customers';setTimeout(()=>$('#cAdd')?.click(),50)}},{t:'View pricing',k:'Site',run:()=>location.hash='pricing'},{t:'Browse integrations',k:'Site',run:()=>location.hash='integrations'},...S.customers.slice(0,12).map(c=>({t:c.name+' · '+c.company,k:'Customer',run:()=>{location.hash='app-customers';setTimeout(()=>custDrawer(c,()=>{}),60)}}))];
  const ov=document.createElement('div');ov.className='overlay';ov.innerHTML=`<div class="palette" role="dialog" aria-label="Command menu"><input id="palQ" placeholder="Type a command or search…" aria-label="Search commands"><ul id="palL"></ul></div>`;document.body.appendChild(ov);
  let sel=0,cur=items;const close=()=>ov.remove();
  const draw=()=>{const q=$('#palQ').value.toLowerCase();cur=items.filter(i=>i.t.toLowerCase().includes(q)).slice(0,9);sel=Math.min(sel,Math.max(0,cur.length-1));$('#palL').innerHTML=cur.length?cur.map((i,k)=>`<li class="${k===sel?'on':''}" data-k="${k}">${esc(i.t)}<small>${i.k}</small></li>`).join(''):'<li style="cursor:default" class="muted">No matches</li>';$$('#palL li[data-k]').forEach(li=>li.onclick=()=>{close();cur[+li.dataset.k].run()})};
  draw();$('#palQ').focus();$('#palQ').oninput=()=>{sel=0;draw()};
  ov.addEventListener('click',e=>{if(e.target===ov)close()});
  $('#palQ').addEventListener('keydown',e=>{if(e.key==='ArrowDown'){sel=Math.min(cur.length-1,sel+1);draw();e.preventDefault()}if(e.key==='ArrowUp'){sel=Math.max(0,sel-1);draw();e.preventDefault()}if(e.key==='Enter'&&cur[sel]){close();cur[sel].run()}if(e.key==='Escape')close()});
}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();palette()}});

/* ---------- boot ---------- */
applyTheme(S.theme);
$('#demoClose').onclick=()=>$('#demoBadge').remove();
route();
})();
