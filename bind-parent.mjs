import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url)),id=process.argv[2];
if(!/^[a-f0-9]{64}i\d+$/.test(id||''))throw Error('Provide the actual parent inscription ID: 64 lowercase hexadecimal characters, i, then its index.');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(await fs.readFile(path.join(root,'manifest.json'),'utf8'));
const source=path.join(root,'on-chain-templates');
const parent=await fs.readFile(path.join(source,manifest.parent.file));
if(sha(parent)!==manifest.parent.sha256)throw Error('The parent has changed. Rebuild and verify the package before proceeding.');
const children=[];
for(const work of manifest.works){
 const template=await fs.readFile(path.join(source,work.file),'utf8');
 if(sha(template)!==work.templateSha256)throw Error('Child template changed: '+work.file);
 // Only bind the URL. Leave the guard string intact so it detects unbound files.
 const html=template.replace('/content/__PARENT_INSCRIPTION_ID__','/content/'+id);
 if(!html.includes('/content/'+id+'#work='+work.number))throw Error('Missing recursive reference');
 children.push({work,html});
}
const dest=path.join(root,'inscription-ready');await fs.mkdir(dest); // Never overwrite an already bound release.
await fs.writeFile(path.join(dest,manifest.parent.file),parent);
const report={parentInscriptionId:id,parent:manifest.parent,children:[]};
for(const {work,html}of children){await fs.writeFile(path.join(dest,work.file),html);report.children.push({file:work.file,bytes:Buffer.byteLength(html),sha256:sha(html)});}
await fs.writeFile(path.join(dest,'checksums.json'),JSON.stringify(report,null,2)+'\n');
console.log('Prepared 12 children in '+dest+'\nThe parent is unchanged. Confirm this ID is the inscription of the included parent before inscribing the children.');
