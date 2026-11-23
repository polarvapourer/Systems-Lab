import {courses,models,make,sample} from './catalogue.js?v=49635bc92c';
import {randomSource} from './generator.js?v=cfd102bcf5';
import {esc,figure} from './diagrams.js';
import {evaluateExpression} from './expression.js';
const root=document.querySelector('#calculator'),params=new URLSearchParams(location.search);
let m=models.find(m=>m.id===params.get('model'));
let mode=m?'model':'expression';
let values={},expression='(0b10101100 & 0x0F) + 1',width=8,proposed='',status='',show=false;
function initialise(useURL){
 if(!m)m=models[0];
 values=sample(m,randomSource('calculator:'+m.id));
 if(useURL)for(const f of m.fields){
   const raw=params.get(f.key),n=Number(raw);
   if(raw!==null&&/^-?\d+$/.test(raw)&&n>=f.min&&n<=f.max&&(n-f.min)%f.step===0)values[f.key]=n;
 }
}
initialise(true);
function modelOptions(){return courses.map(c=>'<optgroup label="Week '+c.week+' · '+esc(c.name)+'">'+models.filter(m=>m.week===c.week).map(v=>'<option value="'+v.id+'" '+(m.id===v.id?'selected':'')+'>'+esc(v.title)+'</option>').join('')+'</optgroup>').join('');}
function run(){
 if(mode==='expression')return evaluateExpression(expression,width);
 for(const f of m.fields){
   const v=values[f.key];
   if(!Number.isInteger(v)||v<f.min||v>f.max||(v-f.min)%f.step)throw Error('Enter '+f.label+' between '+f.min+' and '+f.max+' in steps of '+f.step+'.');
 }
 return make(m,values);
}
function output(){
 const out=root.querySelector('#calcOutput');
 try{
   const q=run(),answer=Array.isArray(q.answer)?q.answer.join(', '):q.answer;
   out.innerHTML=(q.figure?figure(q.figure):'')+'<p>'+esc(mode==='model'?q.prompt:'Give the unsigned value after applying the selected width to every intermediate result.')+'</p><label>Your predicted answer<input class="set-input" id="prediction" value="'+esc(proposed)+'" placeholder="'+(Array.isArray(q.answer)?'Comma-separated positions or None':'Decimal value')+'"></label><div class="actions"><button class="primary" data-check>Check my answer</button><button class="secondary" data-show>'+(show?'Hide steps':'Show result and steps')+'</button></div><p role="status">'+esc(status)+'</p>'+(show?'<h3>Result: '+esc(answer)+'</h3><ol class="steps-list">'+q.steps.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ol>':'');
 }catch(e){out.innerHTML='<p class="message" role="alert">'+esc(e.message)+'</p>';}
}
function render(){
 root.innerHTML='<div class="workspace"><section class="panel"><div class="panelbody"><div class="minitabs"><button data-mode="expression" aria-pressed="'+(mode==='expression')+'">Bitwise expression</button><button data-mode="model" aria-pressed="'+(mode==='model')+'">Systems problem</button></div>'+
 (mode==='expression'?'<div class="calc-form"><label>Word width<select id="width">'+[4,8,16,32].map(w=>'<option '+(w===width?'selected':'')+'>'+w+'</option>').join('')+'</select></label><label>Expression<input id="expr" maxlength="180" value="'+esc(expression)+'" spellcheck="false"></label></div>':'<div class="calc-form"><label>Problem<select id="model">'+modelOptions()+'</select></label><div class="calc-grid">'+m.fields.map(f=>'<label>'+esc(f.label)+'<input type="number" data-field="'+f.key+'" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'" value="'+esc(values[f.key])+'"></label>').join('')+'</div></div>')+
 '<section id="calcOutput"></section></div></section><aside class="notes"><h2>'+(mode==='expression'?'Expression guide':'How to check your work')+'</h2>'+
 (mode==='expression'?'<p>Enter decimal numbers, binary with <code>0b</code>, or hexadecimal with <code>0x</code>. Parentheses group operations.</p><dl class="set-key"><dt>&amp; | ^ ~</dt><dd>AND, OR, XOR and NOT</dd><dt>&lt;&lt; &gt;&gt;</dt><dd>Logical shifts</dd><dt>+ −</dt><dd>Add or subtract (type the minus key)</dd></dl><p>Each step keeps the low bits of the chosen width. For example, at eight bits, <code>255 + 1</code> becomes 0.</p>':'<p>'+esc(m.rule)+'</p><p>'+esc(m.hint)+'</p><a href="./?week='+m.week+'#guide">Read the concept guide</a>')+'</aside></div>';
 output();
}
root.addEventListener('input',e=>{
 const t=e.target;
 if(t.id==='prediction'){proposed=t.value;status='';root.querySelector('#calcOutput [role=status]').textContent='';return;}
 if(t.id==='expr')expression=t.value;else if(t.dataset.field)values[t.dataset.field]=t.value===''?NaN:Number(t.value);else return;
 show=false;status='';proposed='';output();
});
root.addEventListener('change',e=>{
 if(e.target.id==='width')width=Number(e.target.value);
 else if(e.target.id==='model'){m=models.find(v=>v.id===e.target.value);initialise(false);}
 else return;
 show=false;status='';proposed='';render();
});
root.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.mode){mode=b.dataset.mode;show=false;status='';proposed='';render();return;}
 if(b.hasAttribute('data-show'))show=!show;
 else if(b.hasAttribute('data-check')){
   const q=run(),p=proposed.trim().replaceAll('−','-');
   const ok=Array.isArray(q.answer)?p.split(/[\s,]+/).sort().join('|').toLowerCase()===q.answer.slice().sort().join('|').toLowerCase():/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(p)&&Number(p)===q.answer;
   status=!p?'Enter a prediction first.':ok?'Correct.':'Check the inputs and try again, or reveal the steps.';
 }else return;
 output();
});
render();
