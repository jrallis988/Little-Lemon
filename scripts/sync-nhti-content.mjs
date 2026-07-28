#!/usr/bin/env node
/**
 * Sync curated NHTI content snapshots.
 * Usage: node scripts/sync-nhti-content.mjs
 *
 * Pulls the public catalog degrees page + news RSS when reachable.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "src/data");

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
}

console.log("Fetching catalog + news…");
sh(
  `curl -sL -A 'Mozilla/5.0' -o /tmp/nhti-degrees.html https://catalog.nhti.edu/degrees`
);
sh(
  `curl -sL -A 'Mozilla/5.0' -o /tmp/nhti-news.xml https://www.nhti.edu/news/feed/`
);

const py = `
import re, json, html
from pathlib import Path
from email.utils import parsedate_to_datetime
html_doc = Path('/tmp/nhti-degrees.html').read_text(errors='ignore')
hrefs=[]; seen=set()
for href in re.findall(r'href="(/[a-z0-9-]+/(?:associate-of-[a-z-]+|certificate)/[a-z0-9-]+)"', html_doc):
    if href in seen: continue
    seen.add(href); hrefs.append(href)
FOCUS={'accounting':'business','business':'business','hospitality':'business','medical-coding':'business','paralegal':'business','sport':'business','nursing':'healthcare','dental':'healthcare','radiologic':'healthcare','diagnostic':'healthcare','paramedic':'healthcare','orthopaedic':'healthcare','radiation':'healthcare','health-science':'healthcare','computer':'stem','mechanical':'stem','architectural':'stem','civil':'stem','electronic':'stem','information':'stem','robot':'stem','animation':'stem','mathematics':'stem','manufacturing':'stem','industrial':'stem','automation':'stem','software':'stem','criminal':'public','early':'public','education':'public','child':'public','human':'public','addiction':'public','social':'public','teacher':'public','career-and-technical':'public'}
def focus_for(area,name):
  blob=f'{area} {name}'.lower()
  for k,v in FOCUS.items():
    if k in blob: return v
  return 'arts'
programs=[]
for href in hrefs:
  parts=href.strip('/').split('/'); area,cred_slug,slug=parts[0],parts[1],parts[2]
  name=slug.replace('-',' ').replace(' and ',' & ').title()
  credential=cred_slug.replace('-',' ').title().replace('Of ','of ')
  ptype='certificate' if 'certificate' in cred_slug else 'degree'
  pid=slug; base=pid; i=2
  while any(p['id']==pid for p in programs):
    pid=f'{base}-{i}'; i+=1
  programs.append({'id':pid,'name':name,'credential':credential,'focus':focus_for(area,name),'type':ptype,'online':area in {'accounting','business-administration','criminal-justice','liberal-arts','general-studies'},'summary':f'Study {name} at NHTI – Concord’s Community College. Open the catalog for course requirements, then work with advising on scheduling, transfer, and career planning.','highlights':['Official catalog curriculum','Advising and transfer guidance','Flexible course formats where offered'],'careers':['Direct-to-work pathways','Stackable credentials','Bachelor’s transfer options'],'catalogUrl':'https://catalog.nhti.edu'+href})
Path('${outDir}/programs.generated.json').write_text(json.dumps(programs, indent=2))
xml=Path('/tmp/nhti-news.xml').read_text(errors='ignore')
items=[]
for block in re.findall(r'<item>([\\s\\S]*?)</item>', xml)[:8]:
  title=html.unescape(re.search(r'<title>([\\s\\S]*?)</title>', block).group(1).replace('<![CDATA[','').replace(']]>',''))
  link=re.search(r'<link>([\\s\\S]*?)</link>', block).group(1).strip()
  desc_m=re.search(r'<description><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></description>', block) or re.search(r'<description>([\\s\\S]*?)</description>', block)
  desc=re.sub('<[^>]+>',' ',html.unescape(desc_m.group(1) if desc_m else '')); desc=re.sub(r'\\s+',' ',desc).strip()
  pub=re.search(r'<pubDate>([\\s\\S]*?)</pubDate>', block).group(1).strip()
  enc=re.search(r'content:encoded><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>', block)
  image='/media/campus-hero.jpg'; body=desc
  if enc:
    im=re.search(r'src="(https://www\\.nhti\\.edu/wp-content/uploads/[^\"]+)"', enc.group(1))
    if im: image=im.group(1)
    text=re.sub('<[^>]+>',' ',html.unescape(enc.group(1))); text=re.sub(r'\\s+',' ',text).strip()
    if text: body=text[:1000]
  dt=parsedate_to_datetime(pub)
  items.append({'id':link.rstrip('/').split('/')[-1],'date':dt.strftime('%Y-%m-%d'),'displayDate':f"{dt.strftime('%B')} {dt.day}, {dt.strftime('%Y')}",'title':title,'summary':desc[:240],'body':body,'image':image,'sourceUrl':link})
Path('${outDir}/news.generated.json').write_text(json.dumps(items, indent=2))
print('programs', len(programs), 'news', len(items))
`;

fs.writeFileSync("/tmp/nhti-sync-run.py", py);
sh("python3 /tmp/nhti-sync-run.py");
console.log("Done. Review src/data/*.generated.json");
