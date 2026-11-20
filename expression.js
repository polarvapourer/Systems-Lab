// Parse a small fixed-width language. Intermediate values are bounded at each operation.
const precedence={'|':1,'^':2,'&':3,'<<':4,'>>':4,'+':5,'-':5};
export function evaluateExpression(source,width=8){
 if(![4,8,16,32].includes(width))throw Error('Choose a width of 4, 8, 16 or 32 bits.');
 if(!source.trim()||source.length>180)throw Error('Enter an expression of 1–180 characters.');
 const tokens=source.match(/0[xX][0-9a-fA-F]+|0[bB][01]+|\d+|<<|>>|[()~+&^|-]|\S/g)||[];
 const mask=(1n<<BigInt(width))-1n, steps=[];
 let i=0;
 function record(label,value){
   const result=value&mask;
   steps.push(label+' → '+result+' (0b'+result.toString(2).padStart(width,'0')+')');
   return result;
 }
 function atom(){
   const token=tokens[i++];
   if(token==='('){const x=parse(0);if(tokens[i++]!==')')throw Error('A closing parenthesis is missing.');return x;}
   if(token==='~'||token==='-'||token==='+'){const x=atom();return record(token+x,token==='~'?~x:token==='-'?-x:x);}
   if(!/^(?:0x[0-9a-f]+|0b[01]+|\d+)$/i.test(token||''))throw Error('Expected a number or an opening parenthesis.');
   const value=BigInt(token);
   return record(token,value);
 }
 function parse(min){
   let a=atom();
   while(Object.hasOwn(precedence,tokens[i])&&precedence[tokens[i]]>=min){
     const op=tokens[i++],b=parse(precedence[op]+1),x=a,y=b;
     // Logical shifts by at least one word width always clear the fixed-width result.
     const values={'|':()=>x|y,'^':()=>x^y,'&':()=>x&y,'+':()=>x+y,'-':()=>x-y,'<<':()=>y>=width?0n:x<<y,'>>':()=>y>=width?0n:x>>y};
     a=record(x+' '+op+' '+y,values[op]());
   }
   return a;
 }
 const out=parse(0);if(i!==tokens.length)throw Error('Unexpected token “'+tokens[i]+'”. Check the operators and parentheses.');
 return {answer:Number(out),visual:out.toString(2).padStart(width,'0'),steps};
}
