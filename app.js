"use strict";

const main = document.querySelector("main");
const key = "systems-lab-workbook-v1";
const byId = id => document.getElementById(id);
const topic = week => topics.find(t => t.week === week);
const escapeHTML = x => String(x ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
const safe = escapeHTML;
const routes = ["practice","paper","explore","progress"];
let timer;
let saveFailed = false;
let state = {selected:0, q:null, input:"", checked:false, first:null, stats:{}, paper:null, byte:42};
function storedQuestion(q) {
  const textFields = ["title","prompt","answer","hint","solution","format"];
  if (!topic(q?.week) || !textFields.every(field=>typeof q[field]==="string")) return null;
  if (q.choices !== undefined && (!Array.isArray(q.choices) || q.choices.length !== 4 ||
      !q.choices.every(choice=>typeof choice==="string"))) return null;
  return q;
}
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (!saved) return;
    state.selected = topic(saved.selected) ? saved.selected : 0;
    state.q = storedQuestion(saved.q);
    state.input = typeof saved.input === "string" ? saved.input : "";
    state.checked = saved.checked === true;
    state.first = [true,false,"revealed"].includes(saved.first) ? saved.first : null;
    if (Number.isInteger(saved.byte) && saved.byte >= 0 && saved.byte <= 255) state.byte = saved.byte;
    for (const {week} of topics) {
      const score = saved.stats?.[week];
      if (Number.isSafeInteger(score?.attempts) && Number.isSafeInteger(score.correct) &&
          score.correct >= 0 && score.correct <= score.attempts) {
        state.stats[week] = {attempts:score.attempts,correct:score.correct};
      }
    }
    const paper = saved.paper;
    if (Array.isArray(paper?.items) && paper.items.length === topics.length &&
        paper.items.every(storedQuestion) && new Set(paper.items.map(q=>q.week)).size === topics.length) {
      const answers = {};
      for (let i=0;i<paper.items.length;i++) {
        if (typeof paper.answers?.[i] === "string") answers[i] = paper.answers[i];
      }
      state.paper = {items:paper.items,answers,done:paper.done===true,
        end:Number.isSafeInteger(paper.end)&&paper.end>0 ? paper.end : null};
    }
  } catch { /* Storage can be unavailable in private browsing. */ }
}
restore();
function save() {
  try {localStorage.setItem(key,JSON.stringify(state));} catch {saveFailed=true;}
}
function intro(title, text) {
  return '<div class="eyebrow">Computer Systems and Networks</div><h1>'+title+'</h1><p>'+text+'</p>';
}
function newQuestion() {
  const previous = state.q?.prompt;
  for (let n=0;n<20;n++) {
    state.q = makeQuestion(state.selected || pick(topics).week);
    if (state.q.prompt !== previous) break;
  }
  Object.assign(state,{input:"",checked:false,first:null});
  save();
}
function options() {
  return '<option value="0">Mixed topics</option>'+topics.map(t=>'<option value="'+t.week+'" '+(state.selected===t.week?'selected':'')+'>Week '+t.week+' · '+t.name+'</option>').join("");
}
function answerBox(q, name, value) {
  if (q.choices) return '<fieldset class="choices"><legend>Your answer</legend>'+q.choices.map((c,i)=>'<label><input type="radio" name="'+name+'" value="'+i+'" '+(value===c?'checked':'')+'>'+safe(c)+'</label>').join("")+'</fieldset>';
  return '<label>'+safe(q.format)+'<input type="text" name="'+name+'" autocomplete="off" spellcheck="false" value="'+safe(value)+'"></label>';
}
function inputValue(q, el) {return q.choices ? q.choices[Number(el.value)] : el.value;}
function feedback(q, value) {
  return matches(q,value) ? '<span class="good">Correct.</span> '+safe(q.solution) : '<span class="bad">Try again.</span> '+safe(q.hint);
}
function practice() {
  if (!state.q) newQuestion();
  const q=state.q, t=topic(q.week), st=state.stats[q.week] || {attempts:0,correct:0};
  main.innerHTML=intro("Practice workspace","Choose a week or mix topics. Try each question before opening the worked answer.")+
    '<div class="controls"><label>Topic<select id="topic">'+options()+'</select></label><button id="new">New question</button></div>'+
    '<div class="cols"><section class="card"><div class="between"><span class="eyebrow">Practice question</span><span class="tag">Week '+safe(q.week)+'</span></div><h2>'+safe(q.title)+'</h2><p class="question">'+safe(q.prompt)+'</p><form id="attempt">'+answerBox(q,"answer",state.input)+'<div class="row"><button class="primary">Check answer</button></div></form>'+
    '<div class="feedback" id="feedback" aria-live="polite">'+(state.checked?feedback(q,state.input):'')+'</div><details><summary>Hint</summary><p>'+safe(q.hint)+'</p></details><details id="solution"><summary>Worked answer</summary><p>'+safe(q.solution)+'</p></details></section>'+
    '<aside class="card panel"><div class="eyebrow">Topic guide · Week '+safe(q.week)+'</div><h2>'+safe(t.name)+'</h2><p>'+safe(t.method)+'</p><hr><strong id="topicScore">'+safe(st.correct)+' / '+safe(st.attempts)+'</strong><p>First checks correct in this topic</p></aside></div>';
  byId("new").onclick=()=>{newQuestion();practice();};
  byId("topic").onchange=e=>{state.selected=Number(e.target.value);newQuestion();practice();};
  byId("attempt").oninput=e=>{if(e.target.name!=="answer")return;state.input=inputValue(q,e.target);state.checked=false;byId("feedback").textContent="";save();};
  byId("solution").ontoggle=e=>{if(e.target.open && state.first===null){state.first="revealed";save();}};
  byId("attempt").onsubmit=e=>{
    e.preventDefault();
    if (!state.input.trim()) {byId("feedback").textContent="Enter or select an answer first.";return;}
    if (state.first===null) {
      state.first=matches(q,state.input); st.attempts++;if(state.first)st.correct++;state.stats[q.week]=st;
      byId("topicScore").textContent=st.correct+" / "+st.attempts;
    }
    state.checked=true;byId("feedback").innerHTML=feedback(q,state.input);save();
  };
}
function clock(p) {
  const s=Math.max(0,Math.ceil((p.end-Date.now())/1000));
  return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
}
function finishPaper() {state.paper.done=true;save();paper();}
function paper() {
  clearInterval(timer);
  const p=state.paper;
  main.innerHTML=intro("Mock paper","Work through eight original questions, one from each teaching week covered here.");
  if (!p) {
    main.insertAdjacentHTML("beforeend",'<section class="card"><h2>Start a mixed paper</h2><p>Each answer is worth one mark. Worked answers appear when you finish.</p><label>Time limit <select id="limit"><option value="0">Untimed</option><option value="10">10 minutes</option><option value="20">20 minutes</option></select></label><div class="row"><button class="primary" id="start">Start paper</button></div></section>');
    byId("start").onclick=()=>{const minutes=Number(byId("limit").value);state.paper={items:shuffle(topics).map(t=>makeQuestion(t.week)),answers:{},end:minutes?Date.now()+minutes*60000:null,done:false};save();paper();};
    return;
  }
  if (!p.done && p.end && Date.now()>=p.end) {finishPaper();return;}
  const score=p.items.filter((q,i)=>matches(q,p.answers[i]??"")).length;
  main.insertAdjacentHTML("beforeend",'<div class="card between"><strong>'+ (p.done?'Score · '+score+' / '+p.items.length:p.end?'Time remaining <span id="clock">'+clock(p)+'</span>':'Untimed paper')+'</strong><button class="primary" id="paperAction">'+(p.done?'Set up another paper':'Finish and review')+'</button></div><div class="stack">'+p.items.map((q,i)=>{
    let body=answerBox(q,"p"+i,p.answers[i]);
    if(p.done)body='<p>Your answer: <strong>'+safe(p.answers[i] || "Unanswered")+'</strong> · '+(matches(q,p.answers[i]??"")?'1/1':'0/1')+'</p><p><strong>Worked answer</strong><br>'+safe(q.solution)+'</p>';
    return '<section class="card" data-question="'+i+'"><span class="eyebrow">Question '+(i+1)+' · Week '+safe(q.week)+'</span><h2>'+safe(q.title)+'</h2><p class="paperitem">'+safe(q.prompt)+'</p>'+body+'</section>';
  }).join("")+'</div>');
  main.querySelectorAll("[data-question]").forEach(el=>el.oninput=e=>{const i=Number(el.dataset.question);p.answers[i]=inputValue(p.items[i],e.target);save();});
  byId("paperAction").onclick=()=>{
    if (p.done) {state.paper=null;save();paper();return;}
    const missing=p.items.filter((_,i)=>!(p.answers[i]??"").trim()).length;
    if (missing && !window.confirm("Finish with "+missing+" unanswered question"+(missing===1?"":"s")+"?")) return;
    finishPaper();window.scrollTo(0,0);
  };
  if (!p.done && p.end) timer=setInterval(()=>{if(Date.now()>=p.end)finishPaper();else byId("clock").textContent=clock(p);},250);
}
function explore() {
  const b=state.byte, binary=bits(b,8);
  main.innerHTML=intro("Bit explorer","Flip a bit to see how the same byte reads as unsigned, two’s complement and hexadecimal.")+
    '<div class="cols"><section class="card"><div class="eyebrow">8-bit register</div><h2>Build a byte</h2><div class="bits">'+[...binary].map((v,i)=>'<button data-bit="'+i+'" aria-label="Bit '+(7-i)+', weight '+2**(7-i)+'" aria-pressed="'+(v==="1")+'"><small>'+2**(7-i)+'</small>'+v+'</button>').join("")+'</div><dl class="values"><div><dt>Unsigned</dt><dd>'+safe(b)+'</dd></div><div><dt>Signed</dt><dd>'+(b<128?b:b-256)+'</dd></div><div><dt>Hex</dt><dd>0x'+b.toString(16).toUpperCase().padStart(2,"0")+'</dd></div></dl></section><aside class="card panel"><div class="eyebrow">Reading the byte</div><h2>Place values</h2><p>Unsigned: '+([128,64,32,16,8,4,2,1].filter(w=>w&b).join(" + ")||"0")+' = '+safe(b)+'.</p><p>In two’s complement, the leftmost bit has weight −128. '+(b>=128?'It is set, so the signed value is '+safe(b)+' − 256 = '+(b-256)+'.':'It is clear, so both readings give '+safe(b)+'.')+'</p></aside></div>';
  main.querySelectorAll("[data-bit]").forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.bit);state.byte ^= 1<<(7-i);save();explore();main.querySelectorAll("[data-bit]")[i].focus();});
}
function progress() {
  main.innerHTML=intro("Practice progress","First checks are counted once per question. Opening the worked answer first leaves that question unscored.")+
    '<section class="card"><h2>By topic</h2><table class="table"><thead><tr><th>Topic</th><th>Attempted</th><th>Correct</th></tr></thead><tbody>'+topics.map(t=>{const st=state.stats[t.week];return '<tr><td>'+safe(t.name)+'</td><td>'+safe(st?.attempts??0)+'</td><td>'+safe(st?.correct??0)+'</td></tr>';}).join("")+'</tbody></table><p class="muted">Progress is stored in this browser. Mock papers have a separate score.</p></section>';
}
function render() {
  clearInterval(timer);
  const tab=routes.includes(location.hash.slice(1))?location.hash.slice(1):"practice";
  document.querySelectorAll("nav a").forEach(a=>{if(a.hash==="#"+tab)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
  switch (tab) {
    case "paper": paper(); break;
    case "explore": explore(); break;
    case "progress": progress(); break;
    default: practice();
  }
  if(saveFailed)main.insertAdjacentHTML("beforeend",'<p>Browser storage is unavailable. This session will last until you close or refresh the page.</p>');
}
window.addEventListener("hashchange",render);
render();
