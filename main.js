
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var menu=$('#menu');
$('#burger').addEventListener('click',function(){menu.classList.toggle('open')});
$$('#menu a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open')})});
function open(id){$(id).classList.add('open')}
function closeAll(){$$('.modal').forEach(function(m){m.classList.remove('open')})}
$$('[data-enquiry]').forEach(function(b){b.addEventListener('click',function(){
$('#svc').value=b.getAttribute('data-enquiry');
$('#tEnq').textContent='Enquiry: '+b.getAttribute('data-enquiry');
open('#mEnq')})});
$$('[data-apply]').forEach(function(b){b.addEventListener('click',function(){
var p=b.getAttribute('data-apply');$('#pos').value=p;$('#jobName').textContent=p;open('#mJob')})});
$$('[data-close]').forEach(function(b){b.addEventListener('click',closeAll)});
$$('.modal').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)closeAll()})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});
$$('form[data-ajax]').forEach(function(f){f.addEventListener('submit',function(e){
e.preventDefault();
var btn=$('button[type=submit]',f),ok=$('.ok',f);btn.disabled=true;
var multi=f.enctype==='multipart/form-data';
var fd=new FormData(f),opts={method:'POST'};
if(multi){opts.body=fd}else{opts.headers={'Content-Type':'application/x-www-form-urlencoded'};opts.body=new URLSearchParams(fd).toString()}
fetch('/',opts).then(function(r){
if(!r.ok)throw new Error();
ok.style.display='block';f.reset();btn.disabled=false;
}).catch(function(){
ok.style.display='block';ok.style.background='#fdecea';ok.style.color='#a12622';
ok.textContent='Could not send. Please call +91-8800927010 or email chandrakar@zenalphasolution.com.';btn.disabled=false;
})})});
})();

(function(){
var S=[["Artificial Intelligence","ai.html","AI agents, chatbots and workflow automation for your business."],["Software & Apps","software.html","Custom web and mobile apps built with React, Node.js and Python."],["IT Consulting & vCTO","consulting.html","Technology strategy, system architecture and security audits."],["Bulk SMS","bulk-sms.html","DLT-compliant transactional and promotional SMS with delivery reports."],["Bulk Email","bulk-email.html","Email campaigns with SPF, DKIM and DMARC for better inbox placement."],["WhatsApp API","bulk-whatsapp.html","Official Meta WhatsApp Business API, templates and chatbots."],["Website Development","website-development.html","Fast, mobile-friendly, SEO-ready websites and online stores."],["SEO / PPC","seo-ppc.html","Organic SEO plus Google and Meta ad campaigns."],["Hiring & Staff","hiring.html","Pre-vetted developers, marketers and support staff, full or part time."],["Freelancing Projects","freelancing.html","Milestone-based delivery for modules, apps and campaigns."],["BPO & Consultancy","consultancy-bpo.html","Support, telecalling, lead generation and back-office teams."]];
var K=[[/sms/,3],[/e-?mail/,4],[/whats/,5],[/seo|ppc|google|\bads?\b|marketing/,7],[/website|web ?site|ecommerce|e-commerce/,6],[/\bai\b|chatbot|automat|gpt/,0],[/\bapps?\b|software|develop/,1],[/consult|cto|audit/,2],[/hire|hiring|staff|outsourc/,8],[/freelanc/,9],[/bpo|telecall|lead/,10]];
var btn=document.createElement('button');btn.className='cb-btn';btn.textContent='Chat with us';btn.setAttribute('aria-label','Open chat');
var box=document.createElement('div');box.className='cb-box';box.setAttribute('role','dialog');box.setAttribute('aria-label','Zen Alpha chat assistant');
box.innerHTML='<div class="cb-h"><span>Zen Alpha Assistant</span><button aria-label="Close chat">&times;</button></div><div class="cb-m" aria-live="polite"></div><form class="cb-f"><input placeholder="Type your question..." aria-label="Type your message" autocomplete="off"><button type="submit">Send</button></form>';
document.body.appendChild(btn);document.body.appendChild(box);
var m=box.querySelector('.cb-m'),inp=box.querySelector('input'),step=null,d={},started=false;
function scroll(){m.scrollTop=m.scrollHeight}
function msg(t,c,link){var e=document.createElement('div');e.className=c;e.textContent=t;if(link){e.appendChild(document.createTextNode(' '));var a=document.createElement('a');a.href=link[1];a.textContent=link[0];e.appendChild(a)}m.appendChild(e);scroll()}
function bot(t,link){msg(t,'bot',link)}
function chips(list){var w=document.createElement('div');w.className='cb-q';list.forEach(function(x){var b=document.createElement('button');b.type='button';b.textContent=x[0];b.onclick=function(){w.remove();msg(x[0],'me');x[1]()};w.appendChild(b)});m.appendChild(w);scroll()}
function menu(){chips([["Our services",services],["Get a quote",quote],["Careers",function(){bot("We are hiring developers, designers and AI engineers.",["See open positions","careers.html"]);menu()}],["Contact details",contact]])}
function services(){bot("Which service are you interested in?");chips(S.map(function(x,i){return [x[0],function(){svc(i)}]}))}
function svc(i){bot(S[i][2],["Learn more",S[i][1]]);d.service=S[i][0];chips([["Get a quote",quote],["Other services",services]])}
function contact(){bot("Call +91-8800927010 or email chandrakar@zenalphasolution.com. Office: Westend Mall, Janakpuri West, New Delhi.",["Contact page","contact.html"]);chips([["Get a quote",quote],["Main menu",menu]])}
function quote(){step='name';bot("Happy to help. What is your name?")}
function fail(){bot("Sorry, we could not send that. Please call +91-8800927010 or use the contact page.",["Contact page","contact.html"])}
function send(){var b=new URLSearchParams({'form-name':'chatlead',name:d.name,phone:d.phone,service:d.service||'Chat enquiry',message:'Lead from website chatbot'});fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:b.toString()}).then(function(r){if(!r.ok)throw 0;bot("Thank you, "+d.name+". Our team will call you within 6 working hours.");chips([["Main menu",menu]])}).catch(fail)}
function answer(t){
 var x=t.toLowerCase();
 if(/price|cost|rate|quote|charge|budget/.test(x)){bot("Pricing depends on your requirement. Share your details and our team will send a quote.");return quote()}
 if(/career|job|vacanc|hiring for|resume/.test(x)){bot("You can apply for open roles here.",["Careers page","careers.html"]);return}
 if(/contact|phone|call|address|where|location|email id/.test(x)){return contact()}
 if(/hello|hi\b|hey|namaste/.test(x)){bot("Hello! How can I help you today?");return menu()}
 for(var i=0;i<K.length;i++){if(K[i][0].test(x))return svc(K[i][1])}
 bot("I can help with our services, quotes and contact details. You can also talk to our team directly.",["WhatsApp","https://wa.me/918800927010"]);menu()}
function open(){box.classList.add('open');if(!started){started=true;bot("Hi! I am the Zen Alpha assistant. How can I help you today?");menu()}inp.focus()}
btn.onclick=function(){box.classList.contains('open')?box.classList.remove('open'):open()};
box.querySelector('.cb-h button').onclick=function(){box.classList.remove('open')};
document.addEventListener('keydown',function(e){if(e.key==='Escape')box.classList.remove('open')});
box.querySelector('form').addEventListener('submit',function(e){
 e.preventDefault();var t=inp.value.trim();if(!t)return;inp.value='';msg(t,'me');
 if(step==='name'){d.name=t.slice(0,60);step='phone';return bot("Thanks "+d.name+". What is your phone number?")}
 if(step==='phone'){if(!/^[+\d][\d\s-]{7,14}$/.test(t)){return bot("Please enter a valid phone number, for example 8800927010.")}d.phone=t;step=null;return send()}
 answer(t)});
})();
