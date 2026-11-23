// Each model computes a result from editable inputs. The same inputs drive the
// figure and written working in every practice mode.
export const courses = [
  [1,'Computer architecture','Trace data between the processor, memory and peripherals.','Week 1 lecture slides, PDF pp. 39–64 (devices and operating systems) and 74–96 (architecture and servers). Week 1 course notes, printed pp. 19–30 (device-level architecture).'],
  [2,'Integer representation','Label the width and signedness before interpreting bits.','Week 2 lecture slides, PDF pp. 34–60 (arithmetic and bitwise logic), 64–112 (integer formats) and 114–130 (byte order). Week 2 course notes, printed pp. 107–130 (bases and signed integers).'],
  [3,'CPU and logic','Work one bit position at a time. Separate the sum from the carry.','Week 3 lecture slides, PDF pp. 136–178 (switches and gates) and 179–196 (adders). Week 3 course notes, PDF pp. 18–22 (latches and DRAM).'],
  [4,'Memory systems','Distinguish data capacity from addresses, tags and metadata.','Week 4 lecture slides, PDF pp. 9–87 (memory hierarchy and cells) and 102–129 (cache and locality). Week 4 course notes, PDF pp. 1–12 (storage).'],
  [5,'Text and real numbers','Label byte lengths or binary place values before calculating.','Week 5 lecture slides, PDF pp. 31–110 (character encodings) and 111–163 (floating point). Week 5 course notes, printed pp. 131–144 (floating point and text).'],
  [6,'Paging and IEEE 754','Separate fields before translating an address or decoding a number.','Week 6 lecture slides (ECS404-6-2024-actual), PDF pp. 43–86 (virtualisation and virtual memory). IEEE 754 companion slides, PDF pp. 9–18 (fields and special exponents).'],
  [8,'MIPS instructions','Trace each instruction in order and keep register values distinct from addresses.','Week 8 lecture slides, PDF pp. 8–54 (ISA and registers), 75–98 (branches and loops) and 99–107 (instruction formats).'],
  [9,'MIPS memory and calls','Update the base register first, then apply the byte offset.','Week 9 lecture slides, PDF pp. 9–50 (memory layout and addressing), 51–93 (calls and frames) and 94–120 (objects and references).'],
  [10,'Network foundations and links','Follow one packet across a link. Label bits, frames and time units.','Weeks 10–11 slides, pp. 4–38 and 58–87. Kurose and Ross, chapter 1, §§1.1–1.5. Stallings, §§2.1–2.4.'],
  [11,'IP, transport and applications','Identify the next hop, the destination interface and the application endpoint separately.','Weeks 10–11 slides, pp. 39–56 and 88–148. Stallings, §§2.3–2.5. Kurose and Ross, chapter 1, §§1.5–1.7.']
].map(([week,name,method,reading])=>({week,name,method,reading}));
export const levels=['Accessible','Moderate','Stretch'];
export const bin=(v,w=8)=>v.toString(2).padStart(w,'0');
const hex=v=>'0x'+v.toString(16).toUpperCase();
const field=(key,label,min,max,step=1)=>({key,label,min,max,step});
const byte=(k,l)=>field(k,l,0,255);
const base=field('base','Base byte address',256,32764,4);
const word=field('i','Word index',0,127);
const both=[byte('a','Byte A'),byte('b','Byte B')];
const block=field('size','Block size (bytes)',4,256,4);
const result=(data,answer,steps,visual)=>({data,answer,steps,visual});
function model(id,week,level,title,prompt,fields,rule,hint,mistake,run){
  return {id,week,level,title,prompt,fields,rule,hint,mistake,run};
}
export const models=[
 model('fetch',1,0,'Advance the program counter','What byte address will be fetched next after one sequential instruction?',[base,field('width','Instruction length (bytes)',1,8)],'next PC = current PC + instruction length','Move forward by the number of bytes in one instruction.','Adding one assumes each instruction occupies one byte.',({base,width})=>result(['PC = '+base,'Instruction length = '+width+' bytes'],base+width,['Start at byte address '+base+'.','The instruction occupies '+width+' bytes.','Next address = '+base+' + '+width+' = '+(base+width)+'.'])),
 model('logger',1,1,'Size a sensor log','How many bytes of non-volatile storage will the readings occupy? Ignore headers.',[field('n','Readings per second',1,99),field('t','Seconds recorded',2,75),field('width','Bytes per reading',1,8)],'data bytes = rate × time × bytes per reading','Count readings first, then convert to bytes.','Sampling rate alone is not the total number of readings.',({n,t,width})=>result(['Sensor input: '+n+' readings/s','Duration: '+t+' s','Store: '+width+' bytes/reading'],n*t*width,['Count '+n+' × '+t+' = '+n*t+' readings.','Each reading uses '+width+' bytes.','Storage = '+n*t+' × '+width+' = '+n*t*width+' bytes.'])),
 model('io',1,2,'Follow a buffered transfer','A logger collects fixed-size records and sends only full blocks. How many bytes remain in its buffer?',[field('n','Readings collected',5,255),field('width','Bytes per record',1,16),block],'buffer remainder = total bytes mod block size','Work out the byte count before dividing it into blocks.','The quotient counts full blocks. The remainder counts bytes left.',({n,width,size})=>{const total=n*width;return result(['Input: '+n+' readings','Record: '+width+' bytes','Transfer block: '+size+' bytes'],total%size,['Total data = '+n+' × '+width+' = '+total+' bytes.','The device sends '+Math.floor(total/size)+' complete blocks of '+size+' bytes.','The remainder is '+total%size+' bytes.']);}),
 model('unsigned',2,0,'Read an unsigned byte','What unsigned decimal value do these bits represent?',[byte('a','Byte value')],'unsigned = sum of set bit weights','Start at the right with weight 1 and double as you move left.','Leading zeroes do not change the value.',({a})=>result(['Stored byte: '+bin(a)],a,['Label the columns 128, 64, 32, 16, 8, 4, 2, 1.','Set weights: '+([128,64,32,16,8,4,2,1].filter(w=>w&a).join(' + ')||'none')+'.','Unsigned value = '+a+'.'],bin(a))),
 model('signed',2,1,'Interpret two’s complement','Read the byte as a signed two’s complement integer.',[byte('a','Stored byte')],'signed = unsigned − 256 if bit 7 is set','First interpret the bits as unsigned, then check the sign bit.','The high bit has weight −128 in a signed byte.',({a})=>result(['Stored byte: '+bin(a)],a>=128?a-256:a,['Unsigned value = '+a+'.','Bit 7 is '+(a>>7)+'. '+(a>=128?'Subtract 256.':'Keep the unsigned value.'),'Signed value = '+(a>=128?a-256:a)+'.'],bin(a))),
 model('overflow',2,2,'Trace signed addition','Add the two stored bytes. What signed value remains in the 8-bit destination?',both,'store the low eight bits, then decode the sign','Calculate the low byte before interpreting the sign bit.','Discarded carry and signed overflow describe different conditions.',({a,b})=>{const n=(a+b)&255,s=n>=128?n-256:n;return result(['A = '+bin(a),'B = '+bin(b)],s,['As unsigned patterns the sum is '+a+' + '+b+' = '+(a+b)+'.','Keep the low byte: '+bin(n)+'.','Read as two’s complement: '+s+'.']);}),
 model('setbits',3,0,'Identify active signal lines','Select every bit position carrying a 1. Position 0 is the rightmost bit. If all are clear, select None.',[byte('a','Signal byte')],'bit i has weight 2 to the power i','Read the signal from right to left, starting at position zero.','A bit position is an index, not its weight.',({a})=>{const picks=[0,1,2,3,4,5,6,7].filter(i=>a&(1<<i)).map(String);return {...result(['Signal: '+bin(a)],picks.length?picks:['None'],['Label the positions from 7 down to 0.','Select only positions whose displayed bit is 1.','Active positions: '+(picks.join(', ')||'None')+'.'],bin(a)),choices:['0','1','2','3','4','5','6','7','None']};}),
 model('gates',3,1,'Apply a logic mask','What decimal byte leaves an AND gate array with these inputs?',both,'output bit = A AND B','Only columns containing two ones survive.','OR keeps either input bit. AND requires both.',({a,b})=>result(['A = '+bin(a),'B = '+bin(b)],a&b,['Align the two 8-bit words.','AND gives '+bin(a&b)+'.','Read the result as unsigned decimal: '+(a&b)+'.'])),
 model('adder',3,2,'Trace a ripple-carry stage','Give the high four sum bits as an unsigned decimal number after adding A, B and carry-in. Ignore the final carry-out.',[...both,field('cin','Carry-in',0,1)],'low nibble produces a carry into the high nibble','Add the low four bits and carry-in first. Pass their carry to the high half.','The carry into bit 4 comes from the low half, not directly from the original carry-in.',({a,b,cin})=>{const low=(a&15)+(b&15)+cin,high=(a>>4)+(b>>4)+(low>>4);return result(['A = '+bin(a),'B = '+bin(b),'Carry-in = '+cin],high&15,['Low-half sum = '+(a&15)+' + '+(b&15)+' + '+cin+' = '+low+'.','Carry into bit 4 = '+(low>>4)+'. High-half sum = '+high+'.','Keep four high-half bits: '+bin(high&15,4)+' = '+(high&15)+'.']);}),
 model('capacity',4,0,'Calculate cache data capacity','How many data bytes fit in this cache? Exclude tags and metadata.',[field('lines','Cache lines',1,256),block],'capacity = lines × bytes per line','Treat a cache line as one block.','Tags and valid bits are not part of the data capacity.',({lines,size})=>result(['Lines: '+lines,'Line size: '+size+' bytes'],lines*size,['There are '+lines+' data blocks.','Each contributes '+size+' bytes.','Capacity = '+lines+' × '+size+' = '+lines*size+' bytes.'])),
 model('cache',4,1,'Map an address to a cache line','In this direct-mapped cache, which line index receives the byte? Number the lines from zero.',[field('addr','Byte address',0,65535),block,field('lines','Number of cache lines',2,64)],'line = floor(address / block size) mod line count','Find the memory block number before choosing the cache line.','Using address modulo line count skips the block conversion.',({addr,size,lines})=>{const n=Math.floor(addr/size);return result(['Byte address: '+addr,'Block size: '+size+' bytes','Cache: '+lines+' lines'],n%lines,['The address belongs to memory block floor('+addr+' / '+size+') = '+n+'.','Direct mapping cycles through '+lines+' lines.','Line index = '+n+' mod '+lines+' = '+n%lines+'.']);}),
 model('hits',4,2,'Count sequential cache misses','Read one byte at each address in the range, in order, starting with an empty cache. How many different blocks must be fetched?',[field('addr','First address',0,8191),field('n','Bytes read',1,256),block],'blocks touched = last block − first block + 1','Use the inclusive last address, start + length − 1.','Rounding the length alone misses the effect of an unaligned start.',({addr,n,size})=>{const first=Math.floor(addr/size),last=Math.floor((addr+n-1)/size);return result(['Start: '+addr,'Consecutive bytes: '+n,'Block size: '+size+' bytes'],last-first+1,['First block = '+first+'.','Last address = '+(addr+n-1)+' and its block is '+last+'.','Count inclusively: '+last+' − '+first+' + 1 = '+(last-first+1)+'.']);}),
 model('utf',5,0,'Count UTF-8 bytes','Find the byte length of the text. Count no terminator or BOM.',[field('n','ASCII letters A',1,80),field('m','Copies of é (U+00E9)',1,80)],'ASCII uses 1 UTF-8 byte; é uses 2','Count the bytes used by each group separately.','Character count and byte length can differ.',({n,m})=>result([n+' copies of A',m+' copies of é'],n+2*m,['The ASCII letters use '+n+' bytes.','The accented characters use 2 × '+m+' = '+2*m+' bytes.','Total = '+(n+2*m)+' bytes.'])),
 model('fraction',5,1,'Read a fixed-point fraction','Convert the binary fraction to decimal.',[byte('a','Fraction field')],'the eight fraction bits have weights 1/2 to 1/256','Treat the bits as a count of 256ths.','The first bit after the point is one half.',({a})=>result(['Binary: 0.'+bin(a)+'₂'],a/256,['There are 8 bits after the point.','The field counts '+a+' units of 1/256.','Decimal = '+a+' / 256 = '+a/256+'.'],bin(a))),
 model('utfseq',5,2,'Encode a UTF-8 continuation byte','This code point uses two UTF-8 bytes. What is the decimal value of its second byte?',[field('cp','Unicode code point (decimal)',128,2047)],'continuation = 10xxxxxx, using the low six payload bits','Extract the six least significant bits, then supply the 10 prefix.','The leading UTF-8 prefix bits are not payload.',({cp})=>result(['Unicode: U+'+cp.toString(16).toUpperCase().padStart(4,'0')],128+(cp&63),['Convert the code point to bits: '+bin(cp,11)+'.','Low six bits: '+bin(cp&63,6)+'. Prefix them with 10.','Continuation byte = '+bin(128+(cp&63))+' = '+(128+(cp&63))+'.'])),
 model('exponent',6,0,'Unbias a binary32 exponent','Find the actual exponent of this normal binary32 value.',[field('e','Stored exponent',1,254)],'E = stored exponent − 127','Read the field as unsigned, then remove the bias.','Field values 0 and 255 are reserved and excluded in this exercise.',({e})=>result(['Exponent bits: '+bin(e)],e-127,['Read the eight bits as '+e+'.','The binary32 exponent bias is 127.','Actual exponent = '+e+' − 127 = '+(e-127)+'.'],bin(e))),
 model('paging',6,1,'Translate a virtual address','Use the page-table entry to find the physical byte address.',[field('addr','Virtual address',0,65535),field('pow','Page offset bits',4,12),field('frame','Mapped frame',0,255)],'physical address = frame × page size + offset','Keep the offset unchanged across translation.','A frame number is not a byte address.',({addr,pow,frame})=>{const size=2**pow,off=addr%size;return result(['Virtual byte address: '+addr,'Page size: '+size+' bytes','Page '+Math.floor(addr/size)+' maps to frame '+frame],frame*size+off,['Divide by '+size+'; virtual page = '+Math.floor(addr/size)+', offset = '+off+'.','Physical frame starts at '+frame*size+'.','Add the offset: '+(frame*size+off)+'.']);}),
 model('float',6,2,'Decode a normal binary32 value','Give the exact decimal value of this IEEE 754 binary32 pattern.',[field('sign','Sign bit',0,1),field('e','Unbiased exponent',-4,7),byte('a','First eight fraction bits')],'value = (−1)^sign × (1 + fraction) × 2^E','Recover the unbiased exponent and restore the implicit leading 1.','The leading 1 is implicit for a normal value.',({sign,e,a})=>{const v=(sign?-1:1)*(1+a/256)*2**e;return result(['Sign: '+sign,'Exponent: '+bin(e+127),'Fraction: '+bin(a)+'0'.repeat(15)],v,['The sign is '+(sign?'negative':'positive')+' and the unbiased exponent is '+e+'.','The significand is 1 + '+a+'/256 = '+(1+a/256)+'.','Scale by 2^'+e+' and apply the sign: '+v+'.']);}),
 model('addi',8,0,'Trace an immediate addition','What decimal value is in $t1 after the instruction?',[field('a','Initial $t0',-256,255),field('imm','Signed immediate',-64,63)],'addi rt, rs, k stores rs + k in rt','Identify the source register and read the immediate with its sign.','The destination is the first register in assembly syntax.',({a,imm})=>result(['$t0 = '+a,'addi $t1, $t0, '+imm],a+imm,['The source value is '+a+'.','Add the signed immediate '+imm+'.','$t1 becomes '+(a+imm)+'.'])),
 model('branch',8,1,'Find a taken branch target','What byte address is the target of the taken MIPS branch?',[base,field('off','Signed offset in words',-32,127)],'target = PC + 4 + 4 × offset','Start at the instruction following the branch.','The encoded offset counts words rather than bytes.',({base,off})=>result(['Branch PC: '+base,'Encoded word displacement: '+off],base+4+4*off,['PC + 4 = '+(base+4)+'.','Byte displacement = 4 × '+off+' = '+4*off+'.','Target = '+(base+4+4*off)+'.'])),
 model('encode',8,2,'Encode a MIPS addi','Give the unsigned decimal value of the 32-bit instruction word.',[field('rs','Source register number',0,31),field('rt','Destination register number',0,31),field('imm','Signed immediate',-32768,32767)],'I format: opcode[6] | rs[5] | rt[5] | immediate[16]','Place opcode 8 in the high six bits and mask the signed immediate to 16 bits.','Assembly operand order differs from the rs, rt field order.',({rs,rt,imm})=>{const n=8*2**26+rs*2**21+rt*2**16+(imm&65535);return result(['addi $'+rt+', $'+rs+', '+imm,'opcode = 8'],n,['Fields are 001000 | '+bin(rs,5)+' | '+bin(rt,5)+' | '+bin(imm&65535,16)+'.','Concatenating gives '+hex(n)+'.','The unsigned decimal word is '+n+'.']);}),
 model('array',9,0,'Locate a word in memory','At which byte address does this array element start?',[base,word],'address = base + 4 × index','MIPS words occupy four bytes and the first index is zero.','Adding the raw index treats words as bytes.',({base,i})=>result(['Word array starts at '+base,'Element index: '+i],base+i*4,['The element is '+i+' words beyond the base.','The byte offset is '+4*i+'.','Address = '+base+' + '+4*i+' = '+(base+4*i)+'.'])),
 model('stack',9,1,'Trace a stack-frame store','At which byte address does the saved register begin?',[field('sp','Initial stack pointer',4096,32760,8),field('n','Frame size in words',2,64),field('k','Saved slot from top (0 or 1)',0,1)],'new SP = old SP − frame bytes; address = new SP + offset','Update $sp before evaluating the store.','The register being saved contains data; the stack pointer supplies the base.',({sp,n,k})=>{const off=4*(n-1-k);return result(['Initial $sp: '+sp,'addiu $sp, $sp, -'+4*n,'sw $ra, '+off+'($sp)'],sp-4*n+off,['Allocate '+4*n+' bytes. New $sp = '+(sp-4*n)+'.','The store uses byte offset '+off+'.','Store address = '+(sp-4*n+off)+'.']);}),
 model('object',9,2,'Follow an object reference','Which byte address is accessed by the second load?',[base,field('ptr','Pointer read from memory',1024,65532,4),field('i','Field index in words',1,63)],'load a pointer, then address relative to its value','The first load fetches the pointer stored at the slot. Use that value as the next base.','The address of the pointer slot and the address stored there are different.',({base,ptr,i})=>result(['$s0 = '+base,'Memory word at '+base+' contains '+ptr,'lw $t0, 0($s0)','lw $t1, '+4*i+'($t0)'],ptr+4*i,['Read the word at '+base+': $t0 becomes '+ptr+'.','The field offset is '+i+' × 4 = '+4*i+'.','Effective address = '+ptr+' + '+4*i+' = '+(ptr+4*i)+'.'])),
 model('symbolrate', 10, 0, 'Convert symbols to bits',
   'What is the raw data rate in kbit/s? Assume one symbol per interval and no overhead.',
   [field('bits','Bits per symbol',1,6), field('rate','Symbol rate (ksymbol/s)',10,2000)],
   'raw bit rate = symbol rate × bits per symbol',
   'Count how many bits select one of the available states.',
   'Symbol rate counts intervals. One interval can encode several bits.',
   ({bits,rate}) => result(
     [`Distinct signal states: ${2**bits}`, `Symbol rate: ${rate} ksymbol/s`],
     rate * bits,
     [`There are ${2**bits} states, so each symbol can carry ${bits} bits (2^${bits} states).`,
      `Each millisecond contains ${rate} symbols.`,
      `The raw rate is ${rate} × ${bits} = ${rate * bits} kbit/s.`])),
 model('framepayload', 10, 1, 'Separate framing from payload',
   'How many payload bits arrive in this run of full frames? The stated overhead includes all non-payload bits.',
   [field('count','Complete frames',1,160), field('width','Bits per frame',8,64), field('overhead','Overhead bits per frame',1,7)],
   'payload bits = complete frames × (frame width − overhead)',
   'Work out the useful data in one frame first.',
   'Every frame carries its own overhead.',
   ({count,width,overhead}) => {
     const payload = width - overhead;
     return result([`Frames: ${count}`, `Each frame: ${width} bits including ${overhead} overhead bits`],
       count * payload,
       [`Each frame contains ${width} − ${overhead} = ${payload} payload bits.`,
        `Across ${count} frames the payload is ${count} × ${payload} = ${count * payload} bits.`,
        `Check against the full stream: ${count * width} bits sent, including ${count * overhead} overhead bits.`]);
   }),
 model('linkdelay', 10, 2, 'Time a store-and-forward path',
   'When does the last bit reach the destination, in microseconds, measured from the start of transmission? Ignore processing and queuing.',
   [field('bytes','Packet length (bytes)',64,1500), field('km','Distance per link (km)',1,400), field('links','Identical links',1,8)],
   'path delay for one packet = number of links × (transmission + propagation)',
   'Use the same time unit for putting bits on the link and for their travel.',
   'Count each link transmission, including the first one from the source.',
   ({bytes,km,links}) => {
     const perLink = bytes + 5 * km;
     return result([`One ${bytes}-byte packet · ${links} identical store-and-forward links`,
       `Each link: ${km} km at 8 Mbit/s · signal speed 200,000 km/s`], links * perLink,
       [`Transmission: ${bytes * 8} bits ÷ 8 bits/µs = ${bytes} µs per link.`,
        `Propagation: 1 km takes 5 µs at this speed, so ${km} km takes ${km * 5} µs.`,
        `Store-and-forward adds the delays for the whole packet on each link: ${links} × ${perLink} = ${links * perLink} µs.`]);
   }),
 model('tcpack', 11, 0, 'Read a cumulative TCP acknowledgement',
   'What acknowledgement number should the receiver send? These data bytes follow all previous bytes in order, without SYN or FIN.',
   [field('seq','First byte sequence number',1,60000), field('length','Payload length (bytes)',1,1460)],
   'cumulative ACK = first sequence number + in-order data length',
   'Number the bytes inclusively, then identify the next expected byte.',
   'An ACK names the next byte expected.',
   ({seq,length}) => result([`First data byte: ${seq}`, `TCP payload: ${length} bytes`], seq + length,
     [`The first byte occupies position ${seq}.`,
      `The last byte is ${seq} + ${length} − 1 = ${seq + length - 1}.`,
      `The next expected byte is ${seq + length}, so ACK = ${seq + length}.`])),
 model('nextlink', 11, 1, 'Choose a route by longest prefix',
   'Which numbered routing-table row will forward this packet?',
   [field('subnet','Third octet (destination)',1,2), field('host','Last octet (destination)',1,254)],
   'choose the matching destination prefix with the greatest length',
   'Test /0, /24 and /25. The /25 here covers the upper half of its /24.',
   'The default route matches every IPv4 address, but a longer match takes priority.',
   ({subnet,host}) => {
     const local = subnet === 1, upper = local && host >= 128;
     const row = upper ? 3 : local ? 2 : 1;
     return result([`Destination: 192.0.${subnet}.${host}`, 'Row 1: 0.0.0.0/0 → gateway A',
       'Row 2: 192.0.1.0/24 → gateway B', 'Row 3: 192.0.1.128/25 → gateway C'], row,
       [`Row 1 always matches. Row 2 requires the first three octets 192.0.1, so it ${local ? 'matches' : 'does not match'}.`,
        `Row 3 covers 192.0.1.128–192.0.1.255. The destination falls ${upper ? 'inside' : 'outside'} that range.`,
        `The longest matching prefix is /${[0,24,25][row - 1]}. Forward using row ${row}.`]);
   }),
 model('tcpwindow', 11, 2, 'Find the remaining TCP allowance',
   'How many additional kB may the sender transmit under these two window limits? Assume data is ready to send.',
   [field('rwnd','Advertised receive window (kB)',1,128), field('cwnd','Congestion window (kB)',1,128), field('flight','Already outstanding (kB)',0,100)],
   'new allowance = max(0, min(receive window, congestion window) − outstanding data)',
   'Choose the tighter window before taking account of bytes already sent.',
   'A window is a limit on total outstanding data, so it includes bytes in flight.',
   ({rwnd,cwnd,flight}) => {
     const limit = Math.min(rwnd,cwnd), available = Math.max(0,limit-flight);
     return result([`Receiver advertises ${rwnd} kB · congestion window ${cwnd} kB`, `Already in flight: ${flight} kB`], available,
       [`Receiver buffer space permits ${rwnd} kB outstanding. Network congestion control permits ${cwnd} kB.`,
        `Both limits apply, so the outstanding-data limit is ${limit} kB.`,
        `With ${flight} kB already outstanding, the sender can add ${available} kB.` +
          (flight > limit ? ' The window has shrunk below the outstanding amount. Wait for acknowledgements or a window increase.' : '')]);
   })
];
export function make(model,values){
 const out=model.run(values);
 const url=new URLSearchParams({model:model.id,...values});
 return {...out,id:model.id,subject:courses.find(c=>c.week===model.week).name,level:levels[model.level],title:model.title,prompt:model.prompt,type:out.choices?'selection':'number',
  answers:out.choices?out.answer:undefined,figure:{data:out.data,visual:out.visual},steps:[model.hint,...out.steps],calcLink:'calculator.html?'+url};
}
export function sample(model,rng){
 return Object.fromEntries(model.fields.map(f=>[f.key,f.min+f.step*Math.floor(rng()*(1+Math.floor((f.max-f.min)/f.step)))]));
}
