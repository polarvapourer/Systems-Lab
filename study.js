import {guides} from './concepts.js';
import {esc} from './diagrams.js';
export const sectionFor={fetch:4,logger:2,io:3,unsigned:1,signed:6,overflow:7,setbits:0,gates:6,adder:7,capacity:0,cache:6,hits:6,utf:4,fraction:7,utfseq:5,exponent:4,paging:2,float:5,addi:3,branch:9,encode:8,array:8,stack:5,object:7};
export function guideLink(week,model){
 const url=new URLSearchParams({week,section:String((sectionFor[model]??0)+1)});
 return './?'+url+'#guide';
}
const list=(items,tag='ul')=>'<'+tag+'>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</'+tag+'>';
export function guidePage(course,section){
 const g=guides.find(g=>g.week===course.week),i=Math.max(0,Math.min(section,g.sections.length-1)),s=g.sections[i];
 const link=k=>'./?week='+course.week+'&section='+(k+1)+'#guide';
 return '<div class="workspace"><article class="panel learn"><div class="panelhead"><span class="kicker">Concept guide · Week '+course.week+'</span><span class="counter">'+(i+1)+' / '+g.sections.length+'</span></div><div class="panelbody"><h2>'+esc(s.title)+'</h2><p>'+esc(s.text)+'</p>'+
 (s.example||s.steps?'<div class="example"><h3>Worked example</h3>'+(s.example?'<p>'+esc(s.example)+'</p>':'')+(s.steps?list(s.steps,'ol'):'')+'</div>':'')+
 '<div class="actions">'+(i>0?'<a class="secondary" href="'+link(i-1)+'">Previous concept</a>':'')+(i+1<g.sections.length?'<a class="primary" href="'+link(i+1)+'">Next concept</a>':'<a class="primary" href="./?week='+course.week+'#practice">Practise this week</a>')+'</div>'+
 '<section><h3>Test your understanding</h3><p>Answer these week review questions from memory. Open a question to check your reasoning.</p>'+g.checks.map(([q,a])=>'<details class="guidecheck"><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</section><details><summary>What to be able to explain</summary>'+list(g.checklist)+'</details><details><summary>Where to read</summary>'+list(g.reading)+'</details></div></article>'+
 '<aside><div class="notes"><div class="notetitle">This week</div><p>'+esc(g.aim)+'</p><a href="./?week='+course.week+'#practice">Open related exercises</a><div class="actions"><button class="secondary" data-print-guide>Print this week’s notes</button></div></div><div class="library"><div class="libhead"><h3>Concepts</h3></div>'+g.sections.map((v,k)=>'<a class="qrow '+(i===k?'active':'')+'" href="'+link(k)+'" '+(i===k?'aria-current="step"':'')+'><span class="qnum">'+(k+1)+'</span>'+esc(v.title)+'</a>').join('')+'</div></aside></div>';
}

export function printGuide(week){
 const g=guides.find(v=>v.week===week);
 const el=document.createElement('section');el.id='printset';
 el.innerHTML='<h1>Systems-Lab · Week '+g.week+'</h1><p>'+esc(g.aim)+'</p>'+g.sections.map(s=>'<article><h2>'+esc(s.title)+'</h2><p>'+esc(s.text)+'</p>'+(s.example?'<p><strong>Example.</strong> '+esc(s.example)+'</p>':'')+(s.steps?list(s.steps,'ol'):'')+'</article>').join('')+
 '<h2>Test your understanding</h2>'+list(g.checks.map(x=>x[0]),'ol')+'<h2>Explained answers</h2>'+list(g.checks.map(x=>x[1]),'ol')+'<h2>Revision checklist</h2>'+list(g.checklist)+'<h2>Where to read</h2>'+list(g.reading);
 document.body.append(el);window.addEventListener('afterprint',()=>el.remove(),{once:true});window.print();
}
