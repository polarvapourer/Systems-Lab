export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={book:'M3 5q5-2 9 1 4-3 9-1v14q-5-2-9 1-4-3-9-1z M12 6v14',pencil:'m4 16-1 5 5-1L20 8l-4-4z M13 7l4 4'};
export const icon=name=>'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="'+paths[name]+'"/></svg>';
export function figure(f){
 const strip=f.visual?'<div class="bitstrip" aria-label="Bit positions, most significant first">'+[...f.visual].map((v,i)=>'<span class="'+(v==='1'?'on':'')+'"><small>'+ (f.visual.length-i-1)+'</small>'+esc(v)+'</span>').join('')+'</div>':'';
 return '<figure class="signalboard"><figcaption>Given information</figcaption><div class="signals">'+f.data.map(x=>'<code>'+esc(x)+'</code>').join('')+'</div>'+strip+'</figure>';
}
