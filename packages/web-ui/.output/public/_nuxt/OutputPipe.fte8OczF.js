import{_ as q}from"./SelectMenu.V8xtFF4e.js";import{h as k,r as y,P as V,o as p,c as m,a as s,b as _,l,F as I,N,m as j,j as P,t as U,g as E,k as T}from"./entry.RCh-zIuy.js";import{_ as $}from"./Textarea.Cwih0cNN.js";import{_ as D}from"./api.8WJftHjd.js";const z={class:"flex flex-col gap-2"},A=s("label",null,"Chat Ids (Channel / Group id)",-1),K={class:"flex"},S=k({__name:"OutputPipeBotConfigTelegram",props:{config:{type:Object,required:!0}},emits:["configUpdated"],setup(b,{emit:h}){var e;const c=b,v=h,r=y([...((e=c.config.telegram)==null?void 0:e.chatIds)??[]]);return V(r,()=>{v("configUpdated",{...c.config,telegram:{...c.config.telegram,chatIds:r.value}})},{deep:!0}),(w,f)=>{const o=j,t=D;return p(),m("div",null,[s("div",z,[A,s("div",null,[_(o,{size:"xs",color:"green",onClick:f[0]||(f[0]=()=>l(r).push("")),icon:"i-heroicons-plus-20-solid",label:"Add",class:"mb-2"})]),(p(!0),m(I,null,N(l(r),(n,i)=>(p(),m("div",K,[_(o,{class:"mr-2",size:"xs",color:"red",onClick:()=>l(r).splice(i,1),icon:"i-heroicons-minus-20-solid"},null,8,["onClick"]),_(t,{class:"",modelValue:l(r)[i],"onUpdate:modelValue":a=>l(r)[i]=a},null,8,["modelValue","onUpdate:modelValue"])]))),256))])])}}}),F={class:"flex flex-col gap-4"},M={class:"flex flex-col gap-2"},G=s("div",{class:"font-bold"},"Bots",-1),L={class:"flex items-center gap-2"},R={class:"flex flex-col gap-4"},H={class:"border border-gray-500 px-2 py-2 flex flex-col gap-2"},J={class:"flex justify-between"},Q={class:"mb-2 font-semibold"},W={class:"flex flex-col gap-4"},X={class:"flex flex-col gap-2"},Y=s("label",null,"Content",-1),ne=k({__name:"OutputPipe",props:{i:{type:Number,required:!0},trigger:{type:Object,required:!0},config:{type:Object,required:!0},runtimeContext:{type:Object,required:!0},bots:{type:Array,required:!0}},emits:["config-updated"],setup(b,{emit:h}){const c=b,v=h,r=y({...c.config}),e=y([...r.value.option.bots]);V(e,()=>{v("config-updated",e.value.map(o=>({id:o.id,content:o.content,telegram:o.telegram,twitter:o.twitter})))},{deep:!0});const w=o=>{console.log(o);const t=c.bots.find(i=>i.id===o);if(!t)return;let n={id:t.id,content:"",bot:t};t.service==="twitter"?n.twitter={}:t.service==="telegram"&&(n.telegram={chatIds:[]}),e.value.push(n)},f=async()=>{const o=e.value.map(a=>a.id),t=[...e.value],n=c.bots.filter(a=>o.includes(a.id)),i=[];console.log("AOKEOKOKE",c.bots.map(a=>a.name),e.value,t,n);for(const a of n){const g=t.find(d=>d.id===a.id);g&&i.push({...g,bot:a})}e.value=i};return P(async()=>{let o=3,t=0;for(;t<o;)try{if(await f(),console.log("getted data bot",e.value.length,e.value),console.warn({botsOptions:e.value,props:{bots:c.bots,config:c.config}}),e.value.length===0)throw await new Promise(n=>setTimeout(n,250)),new Error("No bots");break}catch(n){console.error(n),t++}}),(o,t)=>{const n=q,i=j,a=$,g=S;return p(),m("div",null,[s("div",F,[s("div",M,[G,s("div",L,[_(n,{options:[...c.bots].filter(d=>!l(e).find(u=>u.id===d.id)),placeholder:"Select bots to add","value-attribute":"id","option-attribute":"name",onChange:t[0]||(t[0]=async d=>{w(d)})},null,8,["options"])]),s("div",R,[(p(!0),m(I,null,N(l(e),(d,u)=>{var B,C,O;return p(),m("div",H,[s("div",J,[s("div",Q,"["+U((B=d.bot)==null?void 0:B.service)+"] "+U((C=d.bot)==null?void 0:C.name),1),_(i,{size:"xs",color:"red",onClick:()=>l(e).splice(u,1),icon:"i-heroicons-trash-20-solid",label:"Remove"},null,8,["onClick"])]),s("div",W,[s("div",X,[Y,_(a,{modelValue:l(e)[u].content,"onUpdate:modelValue":x=>l(e)[u].content=x,rows:10},null,8,["modelValue","onUpdate:modelValue"])])]),((O=l(e)[u].bot)==null?void 0:O.service)==="telegram"?(p(),E(g,{key:0,config:l(e)[u],onConfigUpdated:x=>{l(e)[u].telegram=x.telegram}},null,8,["config","onConfigUpdated"])):T("",!0)])}),256))])])])])}}});export{ne as default};
