"use strict";

const topics = [
  { week: 1, name: "Computer architecture", method: "Follow the data from input to storage, through the CPU, then to output." },
  { week: 2, name: "Integer representation", method: "Write the width and representation first. The same bits can stand for different numbers." },
  { week: 3, name: "CPU and logic", method: "Separate the inputs, intermediate result and output. For addition, track the carry separately." },
  { week: 4, name: "Memory systems", method: "Start with what stores one bit. Then explain the effects on speed, capacity or refresh." },
  { week: 5, name: "Text and real numbers", method: "Identify the encoding before you count bits or bytes. For binary fractions, label the place values." },
  { week: 6, name: "Paging and IEEE 754", method: "Split a virtual address into page and offset, or a float into sign, exponent and fraction." },
  { week: 8, name: "MIPS instructions", method: "Write the registers before and after each instruction. Keep track of which register is the destination." },
  { week: 9, name: "MIPS memory and calls", method: "Distinguish an address from the value at that address. For calls, track the stack and return address." }
];

const pick = list => list[Math.floor(Math.random() * list.length)];
const integer = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const bits = (value, width) => value.toString(2).padStart(width, "0");
function shuffle(list) {
  const result = list.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = integer(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function typed(title, prompt, answer, hint, solution, format = "Answer in decimal") {
  return {title, prompt, answer: String(answer), hint, solution, format};
}
function choice(title, prompt, answer, distractors, hint, solution) {
  return {...typed(title, prompt, answer, hint, solution), choices: shuffle([answer, ...distractors])};
}
const generators = {
  1: [
    () => choice("Follow an instruction", "A CPU is about to fetch its next instruction. Which component holds the address it will use?", "Program counter", ["Instruction register","Arithmetic logic unit","Data bus"], "Which register tells the CPU where to fetch next?", "The program counter holds the address for the next instruction fetch. The instruction register holds an instruction once fetched."),
    () => choice("Trace the data path", "A temperature logger reads a sensor, computes an average and saves the result after power is switched off. Which sequence describes those three stages?", "Input → CPU → non-volatile storage", ["Input → CPU → volatile register","CPU → input → RAM","Storage → output → CPU"], "Choose a final destination that retains its contents without power.", "The sensor supplies input, the CPU performs the arithmetic, and non-volatile storage retains the saved result."),
    () => choice("Identify a stored-program machine", "Which feature characterises the classical von Neumann model?", "Instructions and data share a memory", ["Each instruction is wired into the CPU","All memory retains data without power","Data moves only between peripheral devices"], "Think about what the processor fetches from memory.", "The classical model uses a common memory for instructions and data. The CPU fetches an instruction and carries out the specified operation.")
  ],
  2: [
    () => { const n=integer(1,119); return typed("Decode a signed byte", "Interpret "+bits(256-n,8)+" as an 8-bit two’s complement integer.", -n, "Read it as unsigned, then subtract 256 if the high bit is 1.", "The unsigned value is "+(256-n)+". Its high bit is set, so "+(256-n)+" − 256 = −"+n+"."); },
    () => { const n=integer(12,246); return typed("Encode an unsigned byte","Write "+n+" as exactly eight binary digits.", bits(n,8),"Use the weights 128, 64, 32, 16, 8, 4, 2 and 1.","The set bit weights are "+[128,64,32,16,8,4,2,1].filter(x=>x&n).join(" + ")+". Pad to eight places to get "+bits(n,8)+".","Enter eight bits"); },
    () => {const a=integer(60,95), b=integer(69,99);return typed("Trace signed overflow","Add "+a+" and "+b+" in 8-bit two’s complement arithmetic. What signed value do the stored low eight bits represent?",a+b-256,"First find the mathematical sum. Check it against +127.","The sum is "+(a+b)+", above +127. The bits "+bits(a+b,8)+" therefore represent "+(a+b-256)+" when read as signed.");}
  ],
  3: [
    () => { const a=integer(0,1),b=integer(0,1),c=integer(0,1),n=a+b+c;return typed("Trace a full adder","A full adder receives A = "+a+", B = "+b+" and carry-in = "+c+". Give the two output bits in the order carry-out, sum.",bits(n,2),"Add the three input bits as integers.","The total is "+n+" = "+bits(n,2)+" in binary. The high bit is carry-out and the low bit is the sum.","Enter two bits");},
    () => choice("Read a gate", "A circuit outputs 0 only when both inputs are 1. Which gate has this truth table?", "NAND", ["NOR","XOR","AND"],"First identify the gate that is 1 only when both inputs are 1.","AND is 1 only for 11. Negating its output gives NAND."),
    () => {const a=integer(1,15),b=integer(1,15);return typed("Apply a logic mask","Find the four-bit output of "+bits(a,4)+" AND "+bits(b,4)+".",bits(a&b,4),"Compare the inputs one column at a time.","Only columns with two 1s survive. The result is "+bits(a&b,4)+".","Enter four bits");}
  ],
  4: [
    () => choice("Explain DRAM refresh","A memory cell holds a bit as charge on a capacitor. Why must the controller refresh it?","The stored charge leaks away",["The clock changes its address","The capacitor stores only instructions","The cell has no word line"],"What happens to the physical quantity carrying the bit over time?","Charge leaks from a DRAM capacitor. Periodic sensing and restoration preserve the stored bit."),
    () => choice("Choose a cache technology","A CPU needs a small, fast on-chip data cache. Which technology normally stores its data bits?", "SRAM",["Flash","DRAM","Magnetic disk"],"Consider a cell that maintains its state using feedback while powered.","SRAM uses a bistable circuit and needs no periodic refresh while powered. Its speed suits caches, although its larger cells limit density."),
    () => { const lines=pick([32,64,128,256]), size=pick([16,32,64]); return typed("Calculate cache capacity","A cache has "+lines+" lines of "+size+" bytes. What is its data capacity in KiB, excluding tags and metadata?",lines*size/1024,"Multiply the number of lines by bytes per line. One KiB is 1024 bytes.",lines+" × "+size+" = "+lines*size+" bytes. Divide by 1024 to get "+lines*size/1024+" KiB."); }
  ],
  5: [
    () => { const n=pick([1,2,3,4,5,6,7]);return typed("Read a binary fraction","Convert 0."+bits(n,3)+"₂ to decimal.",n/8,"The fractional columns have weights 1/2, 1/4 and 1/8.","The three bits count eighths: "+n+"/8 = "+n/8+"."); },
    () => {const a=integer(2,12),b=integer(2,8);return typed("Count UTF-8 bytes","A UTF-8 string contains "+a+" ASCII letters and "+b+" copies of é (U+00E9). How many bytes encode it, excluding any terminator or byte-order mark?",a+2*b,"Each ASCII character uses one byte. U+00E9 uses two.","The letters use "+a+" bytes and the accented characters use "+2*b+". Total = "+(a+2*b)+" bytes.");},
    () => {const high=integer(16,127),low=integer(16,127);const h=n=>n.toString(16).toUpperCase();return typed("Read little-endian memory","Two consecutive bytes contain 0x"+h(low)+" then 0x"+h(high)+", in increasing address order. Read them as one unsigned little-endian 16-bit integer. Give four hex digits.",h(high)+h(low),"The byte at the lower address is the least significant.","The high byte is "+h(high)+" and the low byte is "+h(low)+". Joining in significance order gives "+h(high)+h(low)+".","Enter four hex digits");}
  ],
  6: [
    () => {const p=pick([256,512,1024,4096]), frame=integer(2,13), off=integer(5,p-1),page=integer(2,12);return typed("Translate a virtual address","Page size is "+p+" bytes. Virtual page "+page+" maps to physical frame "+frame+". What physical byte address corresponds to virtual address "+(page*p+off)+"?",frame*p+off,"Divide the virtual address by the page size. Keep the remainder.","The offset is "+(page*p+off)+" − "+page+" × "+p+" = "+off+". Frame "+frame+" starts at "+frame*p+"; add the offset to get "+(frame*p+off)+".");},
    () => {const e=integer(-7,9);return typed("Decode a binary32 exponent","A normal IEEE 754 binary32 value has exponent bits "+bits(e+127,8)+". What is its unbiased exponent?",e,"Read the field as unsigned and remove the single-precision bias.","The field is "+(e+127)+". Subtracting 127 gives "+e+".");},
    () => choice("Recognise a special value","In IEEE 754 binary32, all eight exponent bits are 1 and at least one fraction bit is 1. What does the pattern represent?","NaN",["Positive infinity","A subnormal number","Negative zero"],"For an all-ones exponent, inspect whether the fraction is zero.","An all-ones exponent with a non-zero fraction encodes NaN. Infinity has the same exponent with an all-zero fraction.")
  ],
  8: [
    () => {const a=integer(3,16),b=integer(2,12),c=integer(1,8);return typed("Trace two instructions","Initially $t0 = "+a+" and $t1 = "+b+". What is $t2 after these instructions?\n\nadd $t2, $t0, $t1\naddi $t2, $t2, -"+c,a+b-c,"The first operand names the destination in both instructions.","After add, $t2 = "+(a+b)+". The signed immediate subtracts "+c+", leaving "+(a+b-c)+".");},
    () => {const n=integer(2,18),k=integer(1,4);return typed("Trace a shift","Initially $t1 = "+n+". After sll $t0, $t1, "+k+", what decimal value is in $t0?",n*2**k,"Each left shift by one place doubles this small positive value.","Shifting left by "+k+" places multiplies by 2^"+k+" = "+2**k+". The result is "+(n*2**k)+".");},
    () => {const pc=integer(256,999)*4,off=integer(2,11);return typed("Find a branch target","A taken MIPS beq is at byte address "+pc+". Its encoded signed offset is "+off+" words. What is the target byte address?",pc+4+off*4,"Start at PC + 4 and convert the offset to bytes.","PC + 4 = "+(pc+4)+". The byte displacement is 4 × "+off+" = "+(off*4)+". Target = "+(pc+4+off*4)+".");}
  ],
  9: [
    () => {const base=integer(256,999)*4,i=integer(1,12);return typed("Address an array element","An array of 32-bit words starts at byte address "+base+". Its first index is zero. What byte address holds element "+i+"?",base+4*i,"Convert the index to a byte offset before adding the base.","Each word takes four bytes. The offset is 4 × "+i+" = "+4*i+", giving address "+(base+4*i)+".");},
    () => {const sp=integer(1024,2047)*8,frame=pick([16,24,32,48]),off=frame-4;return typed("Trace a stack frame","Initially $sp = "+sp+". Which byte address receives the first byte stored by sw?\n\naddiu $sp, $sp, -"+frame+"\nsw $ra, "+off+"($sp)",sp-frame+off,"Update the stack pointer before evaluating the store address.","The new $sp is "+(sp-frame)+". Adding the offset "+off+" gives "+(sp-frame+off)+". The register value is the data to store.");},
    () => choice("Preserve a return address","A non-leaf MIPS function needs its incoming $ra after calling another function with jal. Why save it before the call?","jal writes a new return address to $ra",["jal clears all saved registers","jr always resets the stack pointer","$ra contains the stack size"],"Which register does a jump-and-link instruction change?","The nested jal replaces $ra. Saving the incoming value and restoring it before returning lets the caller resume at the intended address.")
  ]
};
function makeQuestion(week) {
  return {week, ...pick(generators[week])()};
}
function matches(q, value) {
  let input = String(value).trim().replaceAll("−","-");
  if (q.choices) return input === q.answer;
  if (/bits|hex digits/.test(q.format)) return input.replace(/\s/g,"").toUpperCase() === q.answer.toUpperCase();
  return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(input) && Number(input) === Number(q.answer);
}
