
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
