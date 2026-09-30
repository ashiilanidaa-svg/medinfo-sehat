const D={
otak:{n:"Otak",x:100,y:36,f:"Pusat kendali pikiran, gerakan, ingatan, dan emosi. Otak memakai sekitar seperlima energi tubuh.",t:["Sakit kepala hebat mendadak","Sulit bicara atau lemah sebelah tubuh","Pingsan atau kejang"],k:["Tidur cukup","Kontrol tekanan darah","Tetap belajar hal baru","Kelola stres"]},
paru:{n:"Paru-paru",x:78,y:108,x2:122,f:"Menukar oksigen dari udara dengan karbon dioksida dari darah, sekitar belasan kali setiap menit saat istirahat.",t:["Batuk lebih dari 2 minggu","Batuk berdarah","Napas pendek saat aktivitas ringan"],k:["Tidak merokok","Hindari asap dan polusi","Latihan napas dan olahraga aerobik"]},
jantung:{n:"Jantung",x:108,y:128,f:"Memompa darah ke seluruh tubuh tanpa henti, sekitar 100.000 kali per hari.",t:["Nyeri atau rasa tertekan di dada","Jantung berdebar disertai pusing","Bengkak di kaki dan mudah lelah"],k:["Periksa tekanan darah rutin (hipertensi bila 140/90 atau lebih)","Kurangi garam dan lemak jenuh","Jalan cepat rutin"]},
hati:{n:"Hati",x:84,y:160,f:"Menyaring racun, membuat empedu, dan menyimpan energi. Hati mampu memulihkan diri, tetapi kerusakan lama bisa permanen.",t:["Mata dan kulit menguning","Urine sangat pekat","Perut membesar atau nyeri kanan atas"],k:["Batasi alkohol","Vaksin hepatitis B","Jaga berat badan ideal"]},
lambung:{n:"Lambung",x:118,y:156,f:"Mengaduk makanan dengan asam lambung agar mudah dicerna oleh usus.",t:["Nyeri ulu hati berulang","Muntah darah atau tinja hitam","Sulit menelan"],k:["Makan teratur","Kurangi kopi, pedas, dan rokok","Jangan langsung berbaring setelah makan"]},
usus:{n:"Usus",x:100,y:196,f:"Menyerap nutrisi dan air. Rumah bagi triliunan bakteri yang memengaruhi kekebalan tubuh.",t:["Diare lebih dari beberapa hari","BAB berdarah","Perubahan pola BAB tanpa sebab jelas"],k:["Makan serat dari sayur dan buah","Cukup minum","Batasi makanan ultra-olahan"]}
};
const OC={otak:'#8E6CFF',paru:'#2FA4E0',jantung:'#E0457B',hati:'#C9822B',lambung:'#F26B3A',usus:'#2A9D8F'};
const hots=document.getElementById('hots'),chips=document.getElementById('chips'),panel=document.getElementById('panel');
const NS='http://www.w3.org/2000/svg';
function show(k){
  const o=D[k];panel.style.setProperty('--oc',OC[k]);
  document.querySelectorAll('.hot').forEach(e=>e.classList.toggle('on',e.dataset.k===k));
  document.querySelectorAll('.chip').forEach(e=>e.setAttribute('aria-pressed',e.dataset.k===k));
  const li=a=>a.map(s=>'<li>'+s+'</li>').join('');
  panel.classList.remove('swap');void panel.offsetWidth;panel.classList.add('swap');
  panel.innerHTML='<h2>'+o.n+'</h2><p>'+o.f+'</p><h3>Tanda yang perlu diperiksakan</h3><ul>'+li(o.t)+'</ul><h3>Cara menjaganya</h3><ul>'+li(o.k)+'</ul>';
}
Object.keys(D).forEach(k=>{
  const o=D[k];
  [[o.x,o.y],o.x2?[o.x2,o.y]:null].filter(Boolean).forEach(([x,y])=>{
    const c=document.createElementNS(NS,'circle');
    c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',13);
    c.setAttribute('class','hot');c.style.fill=OC[k];c.dataset.k=k;c.setAttribute('tabindex','0');
    c.setAttribute('role','button');c.setAttribute('aria-label',o.n);
    c.addEventListener('click',()=>show(k));
    c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(k)}});
    hots.appendChild(c);
  });
  const b=document.createElement('button');b.className='chip';b.dataset.k=k;b.textContent=o.n;
  b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>show(k));chips.appendChild(b);
});
show('jantung');

const cats=[[18.5,'Kurus','#5B9BD5'],[25.05,'Normal','#1F8A7D'],[27.05,'Gemuk (berat badan lebih)','#E8A317'],[999,'Obesitas','#E0457B']];
document.getElementById('calc').addEventListener('click',()=>{
  const w=parseFloat(document.getElementById('w').value),h=parseFloat(document.getElementById('h').value)/100;
  const r=document.getElementById('res');
  if(!(w>0)||!(h>0.5)){r.innerHTML='<p style="margin:0">Masukkan berat (kg) dan tinggi (cm) dengan angka yang valid.</p>';return}
  const b=w/(h*h),c=cats.find(x=>b<x[0]);
  const pos=Math.min(100,Math.max(0,(b-14)/(40-14)*100));
  const note={Kurus:'Berat badan di bawah rentang normal. Bicarakan pola makan dengan tenaga kesehatan.',Normal:'Berada dalam rentang normal. Pertahankan pola makan dan aktivitas.','Gemuk (berat badan lebih)':'Sedikit di atas rentang normal. Perubahan kecil pada pola makan dan aktivitas sudah membantu.',Obesitas:'Risiko diabetes dan penyakit jantung meningkat. Konsultasikan rencana yang aman dengan dokter.'}[c[1]];
  r.innerHTML='<div class="big" id="num" style="color:'+c[2]+'">0.0</div><strong style="font-family:Bricolage Grotesque,sans-serif">'+c[1]+'</strong>'
   +'<div class="scale"><i style="background:#5B9BD5;flex:4.5"></i><i style="background:#1F8A7D;flex:6.5"></i><i style="background:#E8A317;flex:2"></i><i style="background:#E0457B;flex:13"></i></div>'
   +'<div class="pin"><b id="pn" style="left:0"></b></div><p style="margin:8px 0 0">'+note+' Kategori mengikuti pedoman Kemenkes RI untuk orang dewasa (normal 18,5–25,0; gemuk 25,1–27,0; obesitas di atas 27,0). Standar WHO Asia-Pasifik lebih ketat: risiko meningkat mulai IMT 23. IMT tidak berlaku untuk anak-anak dan ibu hamil, dan kurang akurat bagi atlet berotot.</p>';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{document.getElementById('pn').style.left=pos+'%'}));
  const t0=performance.now(),el=document.getElementById('num');
  (function tick(t){const q=Math.min(1,(t-t0)/1100);el.textContent=(b*(1-Math.pow(1-q,3))).toFixed(1);if(q<1)requestAnimationFrame(tick)})(t0);
});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.habits div').forEach((d,i)=>{d.classList.add('rv');d.style.transitionDelay=(i*90)+'ms';io.observe(d)});

const DB=[
{t:'o',n:'Paracetamol',k:'demam panas sakit kepala nyeri parasetamol',ic:'💊',g:'Obat bebas',d:'Menurunkan demam dan meredakan nyeri ringan hingga sedang.',c:'Sakit kepala, sakit gigi, nyeri badan, demam.',w:'Jangan melebihi batas harian di kemasan. Dosis berlebih merusak hati, dan hindari bersamaan dengan alkohol atau produk lain yang mengandung paracetamol.'},
{t:'o',n:'Ibuprofen',k:'nyeri radang sakit gigi haid nsaid',ic:'💊',g:'Bebas terbatas / keras (menurut sediaan)',d:'Antiradang nonsteroid untuk nyeri, radang, dan demam.',c:'Nyeri otot dan sendi, nyeri haid, sakit gigi.',w:'Minum sesudah makan. Hati-hati pada riwayat maag, penyakit ginjal, asma, dan kehamilan. Jangan dipakai saat dicurigai demam berdarah.'},
{t:'o',n:'Amoksisilin',k:'antibiotik infeksi bakteri amoxicillin',ic:'🧫',g:'Obat keras (resep)',d:'Antibiotik untuk infeksi akibat bakteri tertentu.',c:'Infeksi telinga, saluran napas, dan saluran kemih sesuai penilaian dokter.',w:'Tidak mempan untuk flu atau pilek karena virus. Habiskan sesuai anjuran dokter agar tidak memicu resistensi. Tanyakan bila alergi penisilin.'},
{t:'o',n:'Omeprazol',k:'maag asam lambung gerd ulu hati ppi',ic:'💊',g:'Obat keras (resep)',d:'Menekan produksi asam lambung.',c:'GERD, tukak lambung, gastritis.',w:'Biasanya diminum sebelum makan. Pemakaian jangka panjang perlu pengawasan dokter.'},
{t:'o',n:'Antasida',k:'maag perih lambung kembung mylanta promag',ic:'🥛',g:'Bebas / bebas terbatas',d:'Menetralkan asam lambung dengan cepat.',c:'Nyeri ulu hati, perih, dan kembung sesekali.',w:'Beri jeda dengan obat lain sekitar 2 jam. Bila keluhan berulang, periksakan ke dokter.'},
{t:'o',n:'Cetirizine',k:'alergi gatal bersin biduran antihistamin',ic:'🤧',g:'Bebas terbatas / keras (menurut sediaan)',d:'Antihistamin untuk gejala alergi.',c:'Bersin, hidung berair, mata gatal, biduran.',w:'Bisa menimbulkan kantuk pada sebagian orang, jadi berhati-hati saat berkendara.'},
{t:'o',n:'Oralit',k:'diare dehidrasi cairan garam elektrolit',ic:'🧂',g:'Obat bebas',d:'Larutan garam dan gula pengganti cairan yang hilang.',c:'Mencegah dan mengatasi dehidrasi akibat diare atau muntah.',w:'Larutkan sesuai petunjuk kemasan. Segera ke dokter bila diare disertai darah, demam tinggi, atau lemas berat.'},
{t:'o',n:'Metformin',k:'diabetes gula darah kencing manis',ic:'🩸',g:'Obat keras (resep)',d:'Menurunkan gula darah dengan meningkatkan kepekaan tubuh terhadap insulin.',c:'Diabetes melitus tipe 2.',w:'Diminum bersama atau sesudah makan. Jangan berhenti atau mengubah dosis tanpa arahan dokter.'},
{t:'o',n:'Amlodipin',k:'darah tinggi hipertensi tekanan',ic:'❤️',g:'Obat keras (resep)',d:'Melebarkan pembuluh darah sehingga tekanan darah turun.',c:'Hipertensi dan nyeri dada angina.',w:'Efek samping umum: kaki bengkak dan pusing. Diminum rutin, bukan hanya saat merasa tidak enak.'},
{t:'p',n:'Demam berdarah dengue (DBD)',k:'dbd demam berdarah nyamuk aedes trombosit',ic:'🦟',g:'Infeksi virus',d:'Ditularkan nyamuk Aedes aegypti. Demam tinggi mendadak 2–7 hari.',c:'Nyeri di belakang mata, nyeri otot, ruam, mual, bintik perdarahan.',w:'Fase kritis muncul saat demam turun: nyeri perut hebat, muntah terus, mimisan, lemas. Segera ke IGD. Perbanyak minum dan lakukan 3M plus.'},
{t:'p',n:'Hipertensi',k:'darah tinggi tekanan tensi',ic:'❤️',g:'Penyakit kronis',d:'Tekanan darah terus tinggi (umumnya 140/90 atau lebih) dan sering tanpa gejala.',c:'Sering tanpa keluhan; kadang pusing atau tengkuk berat.',w:'Bila tidak terkontrol, risikonya stroke, serangan jantung, dan gagal ginjal. Kurangi garam, olahraga, dan cek tekanan darah rutin.'},
{t:'p',n:'Diabetes melitus',k:'kencing manis gula darah sering haus',ic:'🩸',g:'Penyakit kronis',d:'Kadar gula darah tinggi karena kekurangan atau resistensi insulin.',c:'Sering haus, sering buang air kecil, cepat lapar, luka lama sembuh, berat badan turun.',w:'Diagnosis lewat pemeriksaan darah. Pola makan, aktivitas, dan kontrol rutin sama penting dengan obat.'},
{t:'p',n:'Maag (gastritis) dan GERD',k:'maag gerd asam lambung perih ulu hati',ic:'🔥',g:'Gangguan pencernaan',d:'Peradangan lambung atau naiknya asam lambung ke kerongkongan.',c:'Perih ulu hati, mual, rasa terbakar di dada, sendawa asam.',w:'Waspada bila ada muntah darah, tinja hitam, atau sulit menelan. Makan teratur, kurangi kopi dan pedas, hindari rokok.'},
{t:'p',n:'Diare',k:'mencret bab cair dehidrasi',ic:'🚽',g:'Gangguan pencernaan',d:'Buang air besar cair 3 kali atau lebih dalam sehari, sering akibat infeksi.',c:'Mulas, mual, lemas, kadang demam.',w:'Kunci utama adalah mengganti cairan. Segera ke dokter pada bayi, lansia, tinja berdarah, atau tanda dehidrasi berat.'},
{t:'p',n:'Influenza dan pilek',k:'flu batuk pilek demam pusing meriang',ic:'🤒',g:'Infeksi virus',d:'Infeksi virus saluran napas atas yang biasanya sembuh sendiri dalam 1–2 minggu.',c:'Demam, batuk, pilek, sakit tenggorokan, badan pegal.',w:'Istirahat dan minum banyak. Antibiotik tidak diperlukan. Cari bantuan bila sesak napas atau demam lebih dari 3 hari.'},
{t:'p',n:'Asma',k:'sesak napas mengi bengek',ic:'🫁',g:'Penyakit kronis',d:'Penyempitan saluran napas yang datang berulang dan dipicu debu, dingin, atau aktivitas.',c:'Mengi, batuk malam hari, dada sesak.',w:'Kenali pemicunya dan selalu bawa inhaler. Sesak yang tidak membaik dengan inhaler adalah keadaan darurat.'}
];
let filt='all';
const out=document.getElementById('out'),q=document.getElementById('q'),tabs=document.getElementById('tabs');
[['all','Semua'],['o','💊 Obat'],['p','🩺 Penyakit']].forEach(([k,l])=>{
  const b=document.createElement('button');b.className='chip';b.textContent=l;b.dataset.k=k;
  b.setAttribute('aria-pressed',k==='all');b.onclick=()=>{filt=k;tabs.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));render()};
  tabs.appendChild(b);
});
function render(){
  const v=q.value.trim().toLowerCase();
  const r=DB.filter(x=>(filt==='all'||x.t===filt)&&(!v||(x.n+' '+x.k).toLowerCase().includes(v)));
  out.innerHTML=r.length?r.map((x,i)=>'<details class="card" style="animation-delay:'+i*40+'ms"><summary><span class="ic">'+x.ic+'</span><span><h3>'+x.n+'</h3><span class="tag'+(x.g.includes('resep')?' rx':'')+'">'+x.g+'</span></span></summary><div class="more"><p>'+x.d+'</p><p><b>'+(x.t==='o'?'Kegunaan: ':'Gejala: ')+'</b>'+x.c+'</p><p class="wn"><b>Perhatian: </b>'+x.w+'</p></div></details>').join(''):'<p class="empty">Tidak ada hasil untuk "'+v.replace(/[<>&"]/g,'')+'". Coba kata lain, misalnya gejala (demam, batuk) atau nama obat.</p>';
}
q.addEventListener('input',render);render();

const HB=['Minum air putih 8 gelas','Bergerak minimal 30 menit','Makan sayur dan buah','Tidur sebelum pukul 23.00','Jeda layar 1 jam sebelum tidur','Napas dalam atau meditasi 5 menit'];
const chk=document.getElementById('chk'),fg=document.getElementById('fg');
HB.forEach((h,i)=>{const li=document.createElement('li');li.innerHTML='<label><input type="checkbox"><span>'+h+'</span></label>';li.firstChild.firstChild.addEventListener('change',upd);chk.appendChild(li)});
function upd(){
  const n=chk.querySelectorAll('input:checked').length,f=n/HB.length;
  if(f===1&&fg.dataset.d!=='1')burst();fg.dataset.d=f===1?'1':'0';
  fg.style.strokeDashoffset=327*(1-f);fg.style.stroke=f===1?'var(--acc)':'var(--teal)';
  document.getElementById('pc').textContent=Math.round(f*100)+'%';
  document.getElementById('ps').textContent=f===1?'Hebat, hari ini lengkap!':n+' dari '+HB.length+' selesai';
}
document.querySelectorAll('#mind div').forEach((d,i)=>{d.classList.add('rv');d.style.transitionDelay=(i*90)+'ms';io.observe(d)});

function burst(){
  const r=document.querySelector('.ring'),cols=['var(--acc)','var(--teal)','#FFC247','#8E6CFF','#2FA4E0'];
  for(let i=0;i<28;i++){const c=document.createElement('i');c.className='cf';const a=Math.random()*6.28,d=60+Math.random()*80;
    c.style.cssText='background:'+cols[i%5]+';--x:'+Math.cos(a)*d+'px;--y:'+(Math.sin(a)*d+30)+'px;--r:'+(Math.random()*720-360)+'deg';
    r.appendChild(c);setTimeout(()=>c.remove(),1300)}
}
const FACTS=[['❤️','Jantung orang dewasa berdetak sekitar 100.000 kali dalam sehari.'],['💧','Sekitar 50–60% tubuh orang dewasa terdiri dari air.'],['🦴','Orang dewasa memiliki 206 tulang.'],['🫁','Saat istirahat, orang dewasa bernapas sekitar 12–20 kali per menit.'],['🧠','Otak memakai sekitar 20% energi tubuh, padahal beratnya hanya sekitar 2% dari berat badan.'],['😴','Orang dewasa umumnya butuh tidur 7–9 jam setiap malam.']];
let fi=0;const ft=document.getElementById('ft'),fe=document.getElementById('fi');
function fact(n){ft.classList.add('out');setTimeout(()=>{fi=n%FACTS.length;fe.textContent=FACTS[fi][0];ft.textContent=FACTS[fi][1];ft.classList.remove('out')},300)}
ft.textContent=FACTS[0][1];fe.textContent=FACTS[0][0];
let ftm;const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function auto(){if(!reduce){clearInterval(ftm);ftm=setInterval(()=>fact(fi+1),8000)}}
document.getElementById('fn').onclick=()=>{fact(fi+1);auto()};auto();

const bg=document.querySelector('.bgfx');
if(!reduce)for(let i=0;i<14;i++){const b=document.createElement('i');b.className='bub';const z=8+Math.random()*24;
  b.style.cssText='width:'+z+'px;height:'+z+'px;left:'+Math.random()*100+'%;animation-duration:'+(16+Math.random()*20)+'s;animation-delay:-'+Math.random()*30+'s';bg.appendChild(b)}

const pr=document.getElementById('prog');
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;pr.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')'},{passive:true});
document.querySelectorAll('h2.sec').forEach(h=>io.observe(h));

function pal(n){
  if(n==='samudra')document.documentElement.removeAttribute('data-pal');else document.documentElement.setAttribute('data-pal',n);
  document.querySelectorAll('.pal button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===n));
  try{localStorage.setItem('pal',n)}catch(e){}
}
document.querySelectorAll('.pal button').forEach(b=>b.onclick=()=>pal(b.dataset.p));
try{const sv=localStorage.getItem('pal');if(sv&&['samudra','senja','hutan'].includes(sv))pal(sv)}catch(e){}