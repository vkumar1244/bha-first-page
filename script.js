const $ = s => document.querySelector(s), W = 1654, H = 2339, KEY = 'bha-cover-v2';
const IMG = { en: 'english.jpg', hi: 'hindi.jpg', en2: 'english_uid.jpg', hi2: 'hindi_uid.jpg' };
const FONTS = ['Caladea', 'Merriweather', 'Noto Serif', 'Poppins', 'Hind', 'Mukta', 'Baloo 2', 'Noto Serif Devanagari'];
const TEACH = ['Mohd. Javed Khan', 'Mr. Praveen Kushwaha', 'Mr. Hanumat Kumar Mishra', 'Mr. David Prakash', 'Mr. Shobhit Jaiswal', 'Mr. Gordon Menezes', 'Mr. Adarsh Kumar Jaiswar', 'Mrs. Manisha Passi', 'Mrs. Preeti Singh', 'Miss Maitreyi', 'Mrs. Arti Kushwaha', 'Sr. Thejus CSN'];
const SUBJ = ['English Literature', 'English Language', 'Mathematics', 'Biology', 'Physics', 'Chemistry', 'History & Civics', 'Geography', 'Computer', 'Physical Education', 'SUPW', 'General Knowledge', 'Moral Science'];
const R = '#c00000', K = '#111111', TITLE_HI = 'हिंदी परियोजना';
const TEACH_HI = ['डॉ वीणा वर्मा', 'श्रीमती वीणा वर्मा'];
// adj:1 = position, size and font can be changed. colr:1 = color can be changed. hid:1 = not shown in the form.
const DEF = {
    en: [
        { k: 'title', l: 'Topic / title', ph: 'e.g. Excretory System', x: .506, y: .478, sz: 94, c: R, f: 'Caladea', a: 'center', m: .8, wrap: 3, mh: .18, adj: 1, colr: 1 },
        { k: 'ses', l: 'Session', x: .485, y: .6425, sz: 27, c: K, f: 'Caladea', a: 'center', m: .5, pre: '(SESSION:- ', suf: ')', hid: 1 },
        { k: 'to', l: 'Submitted to (teacher)', x: .072, y: .7355, sz: 33, c: R, f: 'Caladea', a: 'left', m: .5, adj: 1, colr: 1 },
        { k: 'by', l: 'Submitted by (your name)', ph: 'e.g. Rubi Singh', x: .6176, y: .7355, sz: 33, c: R, f: 'Caladea', a: 'left', m: .34, adj: 1, colr: 1 },
        { k: 'sub', l: 'Subject', x: .215, y: .838, sz: 32, c: K, f: 'Caladea', a: 'left', m: .4 },
        { k: 'cls', l: 'Class & section', ph: 'e.g. 10th-B', x: .7386, y: .8376, sz: 32, c: K, f: 'Caladea', a: 'left', m: .2 },
        { k: 'roll', l: 'Roll no. / Unique ID', ph: 'e.g. 21', x: .7687, y: .8906, sz: 32, c: K, f: 'Caladea', a: 'left', m: .17, lab: { t: 'UNIQUE ID :-', x: .6155, y: .8892, sz: 33, g: .007 } },
        { k: 'date', l: 'Date', x: .5, y: .925, sz: 20, c: K, f: 'Caladea', a: 'center', m: .5, off: 1, adj: 1 }],
    hi: [
        { k: 'title', l: 'Topic / title', ph: 'जैसे: हिंदी परियोजना', x: .5, y: .531, sz: 125, c: R, f: 'Hind', a: 'center', m: .85, wrap: 3, mh: .2, adj: 1, colr: 1 },
        { k: 'ses', l: 'Session', x: .503, y: .661, sz: 26, c: K, f: 'Hind', a: 'center', m: .5, pre: '(सत्र :- ', suf: ')', hid: 1 },
        { k: 'to', l: 'Teacher name', x: .056, y: .760, sz: 40, c: R, f: 'Hind', a: 'left', m: .4, adj: 1, colr: 1 },
        { k: 'by', l: 'Your name', ph: 'जैसे: रूबी सिंह', x: .598, y: .759, sz: 40, c: R, f: 'Hind', a: 'left', m: .37, adj: 1, colr: 1 },
        { k: 'cls', l: 'Class & section', ph: 'जैसे: 10 - ब', x: .699, y: .900, sz: 34, c: K, f: 'Hind', a: 'left', m: .24 },
        { k: 'roll', l: 'Roll no. / Unique ID', ph: 'जैसे: 21', x: .774, y: .953, sz: 34, c: K, f: 'Hind', a: 'left', m: .19, lab: { t: 'UNIQUE ID :-', x: .5944, y: .952, sz: 32, g: .007 } },
        { k: 'date', l: 'Date', x: .5, y: .93, sz: 26, c: K, f: 'Hind', a: 'center', m: .5, off: 1, adj: 1 }]
};
const today = () => new Date().toLocaleDateString('en-GB');
// April rule: April to December -> this year to next year. January to March -> last year to this year.
const session = () => { const d = new Date(), y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1; return y + '-' + String(y + 1).slice(2) };
const S = { en: {}, hi: {} };
const base = d => ({ t: '', x: d.x, y: d.y, sz: d.sz, c: d.c, f: d.f, on: !d.off });
for (const l in DEF) DEF[l].forEach(d => S[l][d.k] = base(d));
let lang = 'en', sel = 'title', boxes = [], drag = null, SES = session();
const D = k => DEF[lang].find(d => d.k == k);
try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j) { lang = j.lang || 'en'; for (const l in S) DEF[l].forEach(d => { const v = j.S && j.S[l] && j.S[l][d.k]; if (v) Object.assign(S[l][d.k], d.adj ? v : { t: v.t, id: v.id }) }) }}catch (e) { }
// Values that fill themselves when the page opens (or when you press Clear all)
const fill = l => { S[l].date.t = today(); S[l].ses.t = SES; if (l == 'hi') { S.hi.title.t = TITLE_HI; if (!S.hi.to.t) S.hi.to.t = TEACH_HI[0] } else S.en.title.t = '' };
for (const l in S) fill(l);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ lang, S })) } catch (e) { } };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const toast = m => { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => t.hidden = true, 5000) };

const cv = $('#cv'), cx = cv.getContext('2d'); cv.width = W; cv.height = H;
const imgs = {};
for (const l in IMG) { const i = new Image(); i.onload = () => draw(); i.src = IMG[l]; imgs[l] = i }
function layout(tx, d, px, fn) {
    const mw = d.m * W, mh = (d.mh || 9) * H;
    for (; ;) {
        cx.font = fn(px); const ls = []; let cur = '';
        tx.split(/\s+/).forEach(w => { const t = cur ? cur + ' ' + w : w; if (!cur || cx.measureText(t).width <= mw) cur = t; else { ls.push(cur); cur = w } });
        ls.push(cur);
        const wd = Math.max(...ls.map(l => cx.measureText(l).width));
        if (px < 14 || (ls.length <= d.wrap && wd <= mw && ls.length * px * 1.15 <= mh)) return { ls, px };
        px *= .94
    }
}
function draw(clean) {
    cx.clearRect(0, 0, W, H);
    const RL = D('roll').lab, uid = S[lang].roll.id && RL, im = imgs[lang + (uid ? '2' : '')];
    if (im && im.naturalWidth) cx.drawImage(im, 0, 0, W, H); else { cx.fillStyle = '#fff'; cx.fillRect(0, 0, W, H) }
    let LX = 0;
    if (uid) { cx.font = `700 ${RL.sz / 1000 * W}px "${D('roll').f}","Hind",serif`; cx.fillStyle = K; cx.textAlign = 'left'; cx.textBaseline = 'middle'; cx.fillText(RL.t, RL.x * W, RL.y * H); LX = RL.x * W + cx.measureText(RL.t).width + RL.g * W }
    boxes = [];
    DEF[lang].forEach(d => {
        const s = S[lang][d.k]; if (!s.on || !s.t.trim()) return;
        const q = d.adj ? s : d, c = d.colr ? s.c : d.c, tx = (d.pre || '') + s.t + (d.suf || ''), u = d.k == 'roll' && uid, X = u ? LX : q.x * W, mw = u ? .95 * W - X : d.m * W;
        const fn = p => `700 ${p}px "${q.f}","Hind","Noto Serif Devanagari",serif`;
        let px = q.sz / 1000 * W, ls = [tx];
        if (d.wrap) { const r = layout(tx, d, px, fn); ls = r.ls; px = r.px }
        cx.font = fn(px); let w = Math.max(...ls.map(l => cx.measureText(l).width));
        if (!d.wrap && w > mw) { px *= mw / w; cx.font = fn(px); w = cx.measureText(tx).width }
        const lh = px * 1.15, top = q.y * H - (ls.length - 1) * lh / 2;
        cx.fillStyle = c; cx.textAlign = d.a; cx.textBaseline = 'middle';
        ls.forEach((l, i) => cx.fillText(l, X, top + i * lh));
        if (d.adj) boxes.push({ k: d.k, x: d.a == 'center' ? q.x * W - w / 2 : q.x * W, y: top - px * .75, w, h: (ls.length - 1) * lh + px * 1.5 });
    });
    const b = boxes.find(b => b.k == sel);
    if (!clean && b) { cx.save(); cx.setLineDash([14, 10]); cx.lineWidth = 4; cx.strokeStyle = '#2f6fed'; cx.strokeRect(b.x - 10, b.y, b.w + 20, b.h); cx.restore() }
}
Promise.all(FONTS.map(f => document.fonts.load(`700 40px "${f}"`, 'Aaअ'))).then(() => draw()).catch(() => { });

function buildForm() {
    let h = '';
    DEF[lang].forEach(d => {
        if (d.hid) return;
        const k = d.k, s = S[lang][k], L = lang == 'en' ? (k == 'to' ? TEACH : k == 'sub' ? SUBJ : 0) : (k == 'to' ? TEACH_HI : 0);
        if (k == 'date') {
            h += `<div class="fld"><label class="chk"><input type="checkbox" data-k="date" data-r="on"${s.on ? ' checked' : ''}> Show date on the page</label><input id="in_date" data-k="date" value="${esc(s.t)}" placeholder="dd/mm/yyyy" autocomplete="off" aria-label="Date" ${s.on ? '' : 'hidden'}></div>`; return
        }
        h += `<div class="fld"><label for="in_${k}">${d.l}</label>`;
        if (k == 'roll') h += `<select data-k="roll" data-r="id" aria-label="Roll no. or Unique ID"><option value="0"${s.id ? '' : ' selected'}>${lang == 'en' ? 'Roll no.' : 'अनुक्रमांक'}</option><option value="1"${s.id ? ' selected' : ''}>UNIQUE ID</option></select>`;
        if (L) {
            const o = s.t && !L.includes(s.t);
            h += `<select data-k="${k}" data-r="sel" aria-label="${d.l}">${lang == 'en' ? '<option value="">Choose…</option>' : ''}${L.map(x => `<option${x == s.t ? ' selected' : ''}>${esc(x)}</option>`).join('')}<option${o ? ' selected' : ''}>Other</option></select><input id="in_${k}" data-k="${k}" value="${esc(s.t)}" placeholder="Type here" ${o ? '' : 'hidden'} autocomplete="off">`
        }
        else h += `<input id="in_${k}" data-k="${k}" value="${esc(s.t)}" placeholder="${d.ph || ''}" autocomplete="off">`;
        h += '</div>'
    });
    $('#form').innerHTML = h;
}
function sync() {
    const d = D(sel), s = S[lang][sel];
    $('#fnt').value = s.f; $('#sz').value = s.sz; $('#szo').textContent = s.sz; $('#px').value = s.x * 100; $('#py').value = s.y * 100; $('#col').value = s.c; $('#colrow').hidden = !d.colr;
    $('#chips').innerHTML = DEF[lang].filter(d => d.adj && (d.k != 'date' || S[lang].date.on)).map(d => `<button class="chip${d.k == sel ? ' on' : ''}" data-k="${d.k}">${d.l.replace(/ \(.*\)/, '')}</button>`).join('');
}
function setLang(l) { lang = l; const d = D(sel); if (!d || !d.adj || (sel == 'date' && !S[l].date.on)) sel = 'title'; document.querySelectorAll('#lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l == l)); buildForm(); sync(); draw(); save() }
$('#fnt').innerHTML = FONTS.map(f => `<option>${f}</option>`).join('');

$('#lang').onclick = e => { const l = e.target.dataset.l; if (l) setLang(l) };
$('#tabs').onclick = e => { const t = e.target.dataset.t; if (!t) return; document.body.dataset.tab = t; document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-pressed', b.dataset.t == t)) };
$('#form').oninput = $('#form').onchange = e => {
    const t = e.target, k = t.dataset.k; if (!k) return; const s = S[lang][k];
    if (t.dataset.r == 'sel') { const o = t.value == 'Other', i = $('#in_' + k); i.hidden = !o; s.t = o ? i.value : t.value }
    else if (t.dataset.r == 'id') s.id = +t.value;
    else if (t.dataset.r == 'on') { s.on = t.checked; $('#in_date').hidden = !t.checked; sel = t.checked ? 'date' : (sel == 'date' ? 'title' : sel); sync() }
    else s.t = t.value;
    if (t.dataset.r != 'on' && D(k).adj && sel != k) { sel = k; sync() }
    draw(); save()
};
$('#chips').onclick = e => { const k = e.target.dataset.k; if (k) { sel = k; sync(); draw() } };
const set = (p, v) => { S[lang][sel][p] = v; draw(); save() };
$('#fnt').onchange = e => { const f = e.target.value; set('f', f); document.fonts.load(`700 40px "${f}"`, 'Aaअ').then(() => draw()) };
$('#sz').oninput = e => { $('#szo').textContent = e.target.value; set('sz', +e.target.value) };
$('#px').oninput = e => set('x', e.target.value / 100);
$('#py').oninput = e => set('y', e.target.value / 100);
$('#col').oninput = e => set('c', e.target.value);
const all = c => { DEF[lang].forEach(d => { if (d.colr) S[lang][d.k].c = c }); sync(); draw(); save() };
$('#allred').onclick = () => all(R); $('#allblk').onclick = () => all(K);
$('#rst').onclick = () => { const d = DEF[lang].find(d => d.k == sel), s = S[lang][sel]; Object.assign(s, base(d), { t: s.t }); sync(); draw(); save() };
$('#clr').onclick = () => { DEF[lang].forEach(d => S[lang][d.k] = base(d)); fill(lang); buildForm(); sync(); draw(); save(); toast('Cleared. Your details are reset.') };

$('#drag').onchange = e => cv.style.touchAction = e.target.checked ? 'none' : 'auto';
cv.style.touchAction = 'none';
const pt = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H } };
cv.onpointerdown = e => {
    if (!$('#drag').checked) return; const p = pt(e);
    const b = boxes.slice().reverse().find(b => p.x >= b.x - 30 && p.x <= b.x + b.w + 30 && p.y >= b.y - 30 && p.y <= b.y + b.h + 30); if (!b) return;
    sel = b.k; const s = S[lang][b.k]; drag = { k: b.k, dx: p.x / W - s.x, dy: p.y / H - s.y }; cv.setPointerCapture(e.pointerId); sync(); draw()
};
cv.onpointermove = e => {
    if (!drag) return; const p = pt(e), s = S[lang][drag.k], c = v => Math.min(1, Math.max(0, v));
    s.x = c(p.x / W - drag.dx); s.y = c(p.y / H - drag.dy); $('#px').value = s.x * 100; $('#py').value = s.y * 100; draw()
};
cv.onpointerup = cv.onpointercancel = () => { if (drag) { drag = null; save() } };

const png = async () => { draw(true); const b = await new Promise(r => cv.toBlob(r, 'image/png')); draw(); return b };
$('#dl').onclick = async () => {
    const b = await png(), clean = t => (t || '').trim().replace(/[^\p{L}\p{M}\p{N}]+/gu, '_').replace(/^_+|_+$/g, '');
    const name = `${clean(S[lang].title.t) || 'topic'}_${clean(S[lang].by.t) || 'student'}.png`;
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name;
    document.body.appendChild(a); a.click(); a.remove()
};
$('#full').onclick = async () => { $('#ovi').src = URL.createObjectURL(await png()); $('#ov').hidden = false };
$('#ov').onclick = () => $('#ov').hidden = true;

$('#ses').value = SES; $('#ses').oninput = e => { SES = e.target.value; for (const l in S) S[l].ses.t = SES; draw() };
setLang(lang);
