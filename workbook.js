import {courses,levels,models,make,sample,bin} from './catalogue.js';
import {cases} from './cases.js';
import {esc,figure} from './diagrams.js';
import {guidePage,guideLink,printGuide} from './study.js';
import {guidanceCheckbox,guidanceEnabled,saveGuidance} from './guided.js';
import {randomSource} from './generator.js';
import {generatorView,wireGenerator,hasSharedSet,stopPlayback} from './practice-set.js';

const root=document.getElementById('app');
const key='systems-workspace-v2';
const saved={week:1,positions:{},attempts:{},explore:{},completed:{}};
function save(){try{localStorage.setItem(key,JSON.stringify(saved));}catch{}}
let guided=guidanceEnabled();
const lessons=courses.map(c=>{
 const fixed=models.filter(m=>m.week===c.week).map(m=>{
   const q=make(m,sample(m,randomSource('systems-workspace:'+m.id)));
   return {...q,hint:m.hint,mistake:m.mistake,rule:m.rule};
 });
 const x=cases.find(q=>q.week===c.week);
 fixed.unshift({id:'case-'+c.week,title:x.title,prompt:x.prompt,type:'selection',choices:x.choices,answers:x.answers.map(i=>x.choices[i]),hint:x.hint,mistake:x.mistake,rule:c.method,
 figure:{data:x.data},steps:x.marks});
 return fixed;
});
function restore() {
 try {
  const stored=JSON.parse(localStorage.getItem(key));
  if(!stored)return;
  if(courses.some(c=>c.week===stored.week))saved.week=stored.week;
  courses.forEach(({week},index)=>{
   const position=stored.positions?.[week];
   if(Number.isInteger(position)&&position>=0&&position<lessons[index].length)saved.positions[week]=position;
   for(const q of lessons[index]){
    if(stored.completed?.[q.id]===true)saved.completed[q.id]=true;
    const answer=stored.attempts?.[q.id];
    if(!answer)continue;
    saved.attempts[q.id]={
     picks:Array.isArray(answer.picks)?(q.choices??[]).filter(choice=>answer.picks.includes(choice)):[],
     input:typeof answer.input==='string'?answer.input:'',
     message:typeof answer.message==='string'?answer.message:'',
     hint:answer.hint===true,solution:answer.solution===true,
    };
   }
   const experiment=stored.explore?.[week];
   const model=models.find(m=>m.week===week&&m.id===experiment?.id);
   if(!model)return;
   const values=sample(model,randomSource('explore:'+model.id));
   for(const field of model.fields){
    const value=experiment.values?.[field.key];
    if(Number.isInteger(value)&&value>=field.min&&value<=field.max&&(value-field.min)%field.step===0){
     values[field.key]=value;
    }
   }
   saved.explore[week]={id:model.id,values};
  });
 }catch{}
}
restore();
function pageURL(week,mode){return './?week='+week+'#'+mode;}
function weekBar(c){
 return '<div class="weeknav"><label for="week">Teaching week</label><select id="week">'+courses.map(x=>'<option value="'+x.week+'" '+(x===c?'selected':'')+'>Week '+x.week+' · '+esc(x.name)+'</option>').join('')+'</select></div>';
}
let currentPage='guide',currentWeek=1;
function course(){return courses.find(c=>c.week===currentWeek);}
function bank(){return lessons[courses.indexOf(course())];}
function position(){return Math.min(saved.positions[currentWeek]||0,bank().length-1);}
function current(){return bank()[position()];}
function attempt(q){return saved.attempts[q.id]??={picks:[],input:'',message:'',hint:false,solution:false};}
function fieldNotes(q){return '<div class="notes"><div class="notetitle">Field notes · Week '+currentWeek+'</div><h3>'+esc(q.title)+'</h3><p>'+esc(q.rule)+'</p><a href="'+guideLink(currentWeek,q.id)+'">Learn this concept</a></div>';}
function library(){return '<div class="library"><div class="libhead"><h3>Exercises</h3><small>'+bank().length+' questions</small></div>'+bank().map((q,i)=>'<button class="qrow '+(position()===i?'active':'')+'" data-position="'+i+'"><span class="qnum">'+(i+1)+'</span>'+esc(q.title)+'<span class="qstate" aria-label="'+(saved.completed[q.id]?'solved':'unsolved')+'">'+(saved.completed[q.id]?'✓':'○')+'</span></button>').join('')+'</div>';}
function workspace(){
 const q=current(),a=attempt(q);
 return '<div class="workspace"><article class="panel"><div class="panelhead"><span class="kicker">Practice · Week '+currentWeek+'</span>'+guidanceCheckbox(guided)+'</div><div class="panelbody"><h2>'+esc(q.title)+'</h2><p>'+esc(q.prompt)+'</p>'+figure(q.figure)+(guided?'<p class="message"><b>Where to start.</b> '+esc(q.hint)+'</p>':'')+
 (q.choices?'<div class="answerlabel">Select all that apply</div><div class="choices">'+q.choices.map((v,i)=>'<button class="choice" data-choice="'+i+'" aria-pressed="'+a.picks.includes(v)+'">'+esc(v)+'</button>').join('')+'</div>':'<label>Your answer<input class="set-input" id="answer" value="'+esc(a.input)+'" placeholder="Enter a decimal value"></label>')+
 '<div class="actions"><button class="primary" data-action="check">Check answer</button><button class="secondary" data-action="hint">Hint</button><button class="ghost" data-action="solution">'+(a.solution?'Hide':'Show')+' worked answer</button></div><div aria-live="polite">'+(a.message?'<p class="message">'+esc(a.message)+'</p>':'')+'</div>'+
 (a.hint?'<p class="message">'+esc(guided?q.rule:q.hint)+'</p>':'')+(a.solution?'<ol class="steps-list">'+q.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><p><b>Common mistake.</b> '+esc(q.mistake)+'</p>':'')+
 (q.calcLink?'<a href="'+esc(q.calcLink)+'">Edit these inputs in the calculator</a>':'')+
 '<div class="actions"><button class="secondary" data-action="advance">'+(position()<bank().length-1?'Next exercise':currentWeek!==9?'Next topic':'View progress')+'</button></div></div></article><aside>'+fieldNotes(q)+library()+'</aside></div>';
}
function expModel(){
 const options=models.filter(m=>m.week===currentWeek);
 return options.find(m=>m.id===saved.explore[currentWeek]?.id)||options[0];
}
function expValues(m){
 const tab=saved.explore[currentWeek];
 if(tab?.id===m.id)return tab.values;
 const values=sample(m,randomSource('explore:'+m.id));saved.explore[currentWeek]={id:m.id,values};return values;
}
function explore(){
 const m=expModel(),v=expValues(m),q=make(m,v);
 return '<div class="workspace"><section class="panel"><div class="panelhead"><span class="kicker">Explore · Week '+currentWeek+'</span></div><div class="panelbody"><h2>Change the inputs</h2><div class="calc-form"><label>Experiment<select id="experiment">'+models.filter(x=>x.week===currentWeek).map(x=>'<option value="'+x.id+'" '+(x===m?'selected':'')+'>'+esc(x.title)+'</option>').join('')+'</select></label><div class="calc-grid">'+m.fields.map(f=>'<label>'+esc(f.label)+'<input type="number" data-param="'+f.key+'" value="'+esc(v[f.key])+'" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'"></label>').join('')+'</div></div>'+
 (m.fields.some(f=>f.key==='a'&&f.max===255&&f.min===0)?'<div class="bitstrip">'+[...bin(v.a)].map((x,i)=>'<button data-flip="'+(7-i)+'" aria-label="Toggle bit '+(7-i)+'" aria-pressed="'+(x==='1')+'">'+x+'</button>').join('')+'</div>':'')+
 figure(q.figure)+'<h3>'+esc(q.prompt)+'</h3><p class="message"><b>Result.</b> '+esc(Array.isArray(q.answer)?q.answer.join(', '):q.answer)+'</p><ol>'+q.steps.slice(1).map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>'+'<a href="'+esc(q.calcLink)+'">Try these inputs yourself</a></div></section><aside>'+fieldNotes({...q,rule:m.rule})+library()+'</aside></div>';
}
function progress(){
 return '<section class="guidecard"><span class="smallcap">Saved in this browser</span><h2>Your workspace progress</h2><p>Each exercise counts once when you answer it correctly. Select a topic to practise it again.</p>'+courses.map((c,i)=>{const n=lessons[i].filter(q=>saved.completed[q.id]).length;return '<div class="prow"><a href="'+pageURL(c.week,'practice')+'">'+esc(c.name)+'</a><span>'+n+' / '+lessons[i].length+' solved</span></div><progress max="'+lessons[i].length+'" value="'+n+'">'+n+'</progress>';}).join('')+'<div class="actions"><a href="paper.html">Review a written paper</a><a href="quick.html#progress">Original first-check scores</a></div></section>';
}
function render(){
 const p=new URLSearchParams(location.search),hash=location.hash.slice(1);
 if(hash==='paper'){location.replace('paper.html');return;}
 if(hash==='explore' && !p.has('week')){location.replace('quick.html#explore');return;}
 currentPage=hasSharedSet||p.has('gen')||p.has('generator')?'generator':['practice','guide','progress','explore'].includes(hash)?hash:'guide';
 currentWeek=courses.find(c=>c.week===Number(p.get('week')))?.week??(courses.find(c=>c.week===saved.week)?.week||1);
 const c=course();saved.week=c.week;save();
 document.querySelectorAll('[data-nav]').forEach(el=>{
   const name=el.dataset.nav;const active=(name==='workspace'&&['practice','explore'].includes(currentPage))||(name===currentPage);
   if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');
   if(name==='workspace')el.href=pageURL(c.week,'practice');
   if(name==='guide')el.href=pageURL(c.week,'guide');
   if(name==='progress'){el.href='./#progress';el.textContent='Progress · '+lessons.flat().filter(q=>saved.completed[q.id]).length+'/32';}
 });
 if(currentPage==='generator'){root.innerHTML=generatorView(render,guided);return;}
 stopPlayback();
 if(currentPage==='progress'){root.innerHTML=progress();return;}
 const tabs='<div class="sectionhead"><h2>'+esc(c.name)+'</h2><div class="minitabs">'+[['guide','Learn'],['practice','Practice'],['explore','Explore']].map(([r,label])=>'<a href="'+pageURL(c.week,r)+'" class="'+(r===currentPage?'selected':'')+'">'+label+'</a>').join('')+'</div></div>';
 root.innerHTML=weekBar(c)+tabs+(currentPage==='guide'?guidePage(c,Math.max(0,Math.floor(Number(p.get('section'))||1)-1)):currentPage==='practice'?workspace():explore());
}
function check(q,a){
 if(q.choices){
   const wrong=a.picks.find(v=>!q.answers.includes(v));
   if(!a.picks.length)return 'Select an answer first.';
   if(wrong!==undefined)return 'Recheck “'+wrong+'”. '+q.hint;
   if(a.picks.length<q.answers.length)return 'Your selections so far are correct. At least one more applies.';
 }else{
   const value=a.input.trim().replaceAll('−','-');
   if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value))return 'Enter a number first.';
   if(Number(value)!==q.answer)return 'Try again. '+q.hint;
 }
 saved.completed[q.id]=true;return 'Correct. '+q.steps.at(-1);
}
wireGenerator(root);
root.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||currentPage==='generator')return;
 const d=b.dataset;
 if('printGuide' in d){printGuide(currentWeek);return;}
 if('position' in d){saved.positions[currentWeek]=Number(d.position);save();if(currentPage!=='practice')location.href=pageURL(currentWeek,'practice');else render();return;}
 if('flip' in d){const v=expValues(expModel());v.a^=1<<Number(d.flip);save();render();return;}
 if(currentPage!=='practice')return;
 const q=current(),a=attempt(q);
 if('choice' in d){const v=q.choices[Number(d.choice)];a.picks=a.picks.includes(v)?a.picks.filter(x=>x!==v):v==='None'?['None']:[...a.picks.filter(x=>x!=='None'),v];a.message='';}
 else if(d.action==='check')a.message=check(q,a);
 else if(d.action==='hint')a.hint=!a.hint;
 else if(d.action==='solution')a.solution=!a.solution;
 else if(d.action==='advance'){
   if(position()<bank().length-1)saved.positions[currentWeek]=position()+1;
   else {const next=courses[courses.indexOf(course())+1];if(next)saved.positions[next.week]=0;save();location.href=next?pageURL(next.week,'practice'):'./#progress';return;}
 }else return;
 save();render();
});
root.addEventListener('change',e=>{
 const t=e.target;
 if(t.hasAttribute('data-guided')){guided=t.checked;saveGuidance(guided);render();return;}
 if(t.id==='week'){location.href=pageURL(t.value,currentPage);return;}
 if(t.id==='experiment'){const m=models.find(m=>m.id===t.value);saved.explore[currentWeek]={id:m.id,values:sample(m,randomSource('explore:'+m.id))};save();render();return;}
 if(t.dataset.param){if(!t.reportValidity()||t.value===''){t.reportValidity();return;}expValues(expModel())[t.dataset.param]=Number(t.value);save();render();}
});
root.addEventListener('input',e=>{if(e.target.id==='answer'){const a=attempt(current());a.input=e.target.value;a.message='';root.querySelector('[aria-live]').textContent='';save();}});
root.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='answer')root.querySelector('[data-action=check]').click();});
window.addEventListener('hashchange',render);
render();
