const fs=require("fs");const dir=process.argv[2];
const ax={H:1,C:12,N:14,O:16,Na:23,Mg:24,Al:27,S:32,K:39,Ca:40,Fe:56,Zn:65,Cl:35.5,Cu:63.5,P:31,Ag:108,Ba:137,Mn:55,Cr:52,Br:80,I:127};
const b=JSON.parse(fs.readFileSync(dir+"/bowser.json")).elements;
const p=JSON.parse(fs.readFileSync(dir+"/pubchem.json")).Table.Row.map(r=>r.Cell);
console.log("sim\taxiom\tbowser\tpubchem\tredondeo\toxidacion(pubchem)\tcoincide");
for(const [s,v] of Object.entries(ax)){const be=b.find(e=>e.symbol===s);const pe=p.find(c=>c[1]===s);const pm=parseFloat(pe[3]);const r=Math.round(pm*2)/2;
console.log([s,v,be.atomic_mass,pe[3],Math.round(pm),pe[10],Math.round(pm)===v?"si":"NO"].join("\t"));}
console.log("bowser n=",b.length,"pubchem n=",p.length);
