import {courses,models,make,sample} from './catalogue.js?v=78d977e0b5';
import {randomSource} from './generator.js?v=a5fdb39473';
import {cases} from './cases.js?v=14b078535e';
import {esc} from './diagrams.js';
export const topics=courses.map(t=>t.name);
export const questions=[],reviewTips={},variationAnswers={};
function add(q,mistake,variation,answer){
 questions.push(q);reviewTips[q.id]=[mistake,variation];variationAnswers[q.id]=answer;
}
for(const m of models){
 const rng=randomSource('systems-paper-1:'+m.id);
 const inputs=sample(m,rng),q=make(m,inputs);
 const f=m.fields[0],next={...inputs,[f.key]:inputs[f.key]===f.max?f.min:inputs[f.key]+f.step};
 const alt=make(m,next);
 const tasks=[m.prompt,'Show the intermediate representation or calculation that justifies your result.'];
 const alternative=alt.data.join(' · ')+'. '+m.prompt;
 add({id:m.id,week:m.week,topic:q.subject,title:q.title,data:q.data,tasks,marks:q.steps.slice(1),hints:[m.hint,m.rule]},m.mistake,alternative,alt.steps.slice(1).join(' '));
}
for(const c of cases){
 add({...c,id:'case-'+c.week,topic:courses.find(t=>t.week===c.week).name,hints:[c.hint,courses.find(t=>t.week===c.week).method]},c.mistake,c.follow,c.followAnswer);
}
export function modelDiagram(id,steps){
 const q=questions.find(q=>q.id===id);
 if(steps<q.marks.length || q.week!==9)return '';
 const shown=q.id==='stack'||q.id==='case-9'?['old $sp','subtract frame bytes','new $sp + slot offset']:q.id==='array'?['array base','index × word size','element address']:['pointer slot','load object base','add field offset'];
 return '<figure class="signalboard"><figcaption>Address calculation</figcaption><div class="signals">'+shown.map((v,i)=>'<code>'+String(i+1)+'. '+esc(v)+'</code>').join('')+'</div></figure>';
}
