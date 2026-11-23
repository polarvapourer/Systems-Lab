import {courses,models,make,sample,levels} from './catalogue.js?v=49635bc92c';
export {levels};
export const VERSION=2, subjects=courses.map(c=>c.name);
export const defaultConfig={subject:'Mixed revision',level:'Mixed difficulty',count:10,seed:''};
export function randomSource(seed){
  let x=2166136261;
  for(const c of seed)x=Math.imul(x^c.charCodeAt(0),16777619);
  if(!x)x=1;
  return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;};
}
function shuffle(values,rng){
 const a=values.slice();
 for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a;
}
// Shared links and saved attempts must replay the original deck.
const originalCourses = courses.filter(course => course.week < 10);
export function configOK(c){
 return !!c && [1,VERSION].includes(c.version ?? VERSION)
  && (c.version !== 1 || c.subject === 'Mixed revision' || originalCourses.some(course => course.name === c.subject))
  && [...subjects,'Mixed revision'].includes(c.subject) && [...levels,'Mixed difficulty'].includes(c.level)
  && Number.isInteger(c.count) && c.count>=1 && c.count<=100 && typeof c.seed==='string' && c.seed.trim().length>0 && c.seed.length<=64;
}
export function generate(c){
 if(!configOK(c))throw Error('Choose 1–100 questions and enter a seed of 1–64 characters.');
 const version = c.version ?? VERSION;
 const pool = version === 1 ? originalCourses : courses;
 const rng=randomSource(JSON.stringify([version,c.subject,c.level,c.count,c.seed]));
 const easy=Math.round(.3*c.count), hard=Math.round(.2*c.count);
 const order=[],seen=new Set(),deck=[];
 while(order.length<c.count)order.push(...shuffle(pool,rng));
 for(let i=0;i<c.count;i++){
   const course=c.subject==='Mixed revision'?order[i]:courses.find(w=>w.name===c.subject);
   const level=c.level==='Mixed difficulty'?(i<easy?0:i<c.count-hard?1:2):levels.indexOf(c.level);
   const model=models.find(m=>m.week===course.week&&m.level===level);
   for(let attempt=0;;attempt++){
     if(attempt===3000)throw Error('Could not fill the set with distinct inputs.');
     const q=make(model,sample(model,rng)), key=JSON.stringify([q.id,q.data]);
     if(seen.has(key))continue;
     seen.add(key);deck.push({...q,week:model.week});break;
   }
 }
 return deck;
}
