import { useState, useEffect } from "react";

const SUPABASE_URL = "https://dirqvqxjkjeatptbvxje.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpcnF2cXhqa2plYXRwdGJ2eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTU3NDcsImV4cCI6MjA4ODk5MTc0N30.NNj0dX0POwzgzUWEdzZubKMMO_yURxe8PFPfPV5m2TY";

const api = (path, opts = {}) =>
  fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...opts.headers,
    },
    ...opts,
  }).then(r => r.json());

const css = `
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1117;--surface:#161b22;--surface2:#1c2333;--surface3:#21262d;--border:#30363d;--text:#e6edf3;--text2:#8b949e;--text3:#6e7681;--blue:#1f6feb;--blue-light:#388bfd;--blue-dim:#1f6feb22;--green:#3fb950;--green-dim:#3fb95022;--yellow:#d29922;--yellow-dim:#d2992222;--red:#f85149;--red-dim:#f8514922;--purple:#a371f7;--radius:8px;--radius-lg:12px}
body{font-family:'Heebo',sans-serif;background:var(--bg);color:var(--text);direction:rtl;line-height:1.6}
.app{max-width:1300px;margin:0 auto;padding:20px}
.hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:12px}
.hdr-logo{display:flex;align-items:center;gap:10px}
.hdr-icon{width:40px;height:40px;background:linear-gradient(135deg,var(--blue),#0d4a9e);border-radius:10px;display:grid;place-items:center;font-size:18px}
.hdr-title{font-size:18px;font-weight:700}.hdr-sub{font-size:12px;color:var(--text3)}
.tabs{display:flex;gap:4px;margin-bottom:20px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:4px;width:fit-content}
.tab{padding:7px 18px;border-radius:6px;font-family:'Heebo',sans-serif;font-size:13px;font-weight:600;cursor:pointer;border:none;background:none;color:var(--text3);transition:all .15s}
.tab.active{background:var(--blue);color:#fff}
.tab:hover:not(.active){color:var(--text);background:var(--surface2)}
.stats{display:flex;gap:10px;flex-wrap:wrap}
.sp{text-align:center;padding:8px 14px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
.sn{font-size:20px;font-weight:700}.sl{font-size:11px;color:var(--text3)}
.filters{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;align-items:flex-end}
.fg{display:flex;flex-direction:column;gap:3px}
.fl{font-size:11px;color:var(--text3);font-weight:500}
select,input[type=number],input[type=text]{background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:var(--radius);padding:6px 10px;font-family:'Heebo',sans-serif;font-size:13px;outline:none;direction:rtl}
select:focus,input:focus{border-color:var(--blue)}
input[type=number]{width:75px}
.rst{background:none;border:1px solid var(--border);color:var(--text3);border-radius:var(--radius);padding:6px 12px;font-family:'Heebo',sans-serif;font-size:13px;cursor:pointer}
.rst:hover{color:var(--text)}
.abar{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;min-height:30px}
.al{display:flex;gap:8px;align-items:center}
.tw{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden}
.th{display:grid;padding:9px 14px;background:var(--surface2);border-bottom:1px solid var(--border);font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;gap:8px;align-items:center}
.th-cands{grid-template-columns:32px 1.6fr 1.2fr .8fr .7fr .6fr 100px 80px 90px}
.th-jobs{grid-template-columns:1.8fr 1fr .7fr .7fr .7fr .7fr 80px 90px}
.row{display:grid;padding:10px 14px;border-bottom:1px solid var(--border);align-items:center;cursor:pointer;gap:8px;transition:background .1s}
.row-cands{grid-template-columns:32px 1.6fr 1.2fr .8fr .7fr .6fr 100px 80px 90px}
.row-jobs{grid-template-columns:1.8fr 1fr .7fr .7fr .7fr .7fr 80px 90px}
.row:last-child{border-bottom:none}
.row:hover{background:var(--surface2)}
.row.sel{background:var(--blue-dim)}
.rck{width:14px;height:14px;accent-color:var(--blue);cursor:pointer}
.cn{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cp{font-size:12px;color:var(--text3);margin-top:1px;direction:ltr;text-align:right}
.jb{display:inline-block;padding:3px 8px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap}
.j0{background:#1f6feb22;color:var(--blue-light);border:1px solid #1f6feb44}
.j1{background:#a371f722;color:var(--purple);border:1px solid #a371f744}
.j2{background:var(--yellow-dim);color:var(--yellow);border:1px solid #d2992244}
.j3{background:var(--green-dim);color:var(--green);border:1px solid #3fb95044}
.sw{display:flex;align-items:center;gap:6px}
.snum{font-size:13px;font-weight:700;min-width:22px}
.sbg{flex:1;height:5px;background:var(--surface3);border-radius:3px;overflow:hidden}
.sf{height:100%;border-radius:3px}
.sh .snum{color:var(--green)}.sh .sf{background:var(--green)}
.sm .snum{color:var(--yellow)}.sm .sf{background:var(--yellow)}
.sl2 .snum{color:var(--red)}.sl2 .sf{background:var(--red)}
.pill{padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;display:inline-block}
.p0{background:var(--blue-dim);color:var(--blue-light)}
.p1{background:var(--yellow-dim);color:var(--yellow)}
.p2{background:var(--green-dim);color:var(--green)}
.p3{background:var(--red-dim);color:var(--red)}
.dc{font-size:12px;color:var(--text3)}
.btn{padding:5px 10px;border-radius:var(--radius);font-family:'Heebo',sans-serif;font-size:12px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;transition:all .15s}
.bi{background:none;border:1px solid var(--border);color:var(--text2)}.bi:hover{color:var(--text)}
.bp{background:var(--blue);color:#fff}.bp:hover{background:var(--blue-light)}
.bg{background:var(--green);color:#000;font-weight:700}.bg:hover{opacity:.85}
.bd{background:var(--red-dim);color:var(--red);border:1px solid #f8514933}
.bw{background:var(--yellow-dim);color:var(--yellow);border:1px solid #d2992244}
.empty{padding:60px;text-align:center;color:var(--text3);font-size:14px}
.loading{padding:60px;text-align:center;color:var(--text3)}
.spin{width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--blue);border-radius:50%;animation:sp .7s linear infinite;margin:0 auto 12px}
@keyframes sp{to{transform:rotate(360deg)}}
.mb{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px}
.mo{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);width:100%;max-width:680px;max-height:90vh;overflow-y:auto;animation:su .2s ease}
.mo-wide{max-width:820px}
@keyframes su{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
.mh{padding:18px 22px 14px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;gap:12px}
.mt{font-size:16px;font-weight:700}.ms{font-size:13px;color:var(--text3);margin-top:2px}
.mc{background:none;border:none;color:var(--text3);font-size:22px;cursor:pointer;line-height:1;padding:0 4px}.mc:hover{color:var(--text)}
.mbody{padding:18px 22px}.mf{padding:12px 22px;border-top:1px solid var(--border);display:flex;gap:8px;justify-content:flex-end}
.sbig{display:flex;align-items:center;gap:14px;padding:13px;background:var(--surface2);border-radius:var(--radius);margin-bottom:14px}
.scir{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;font-size:18px;font-weight:800;flex-shrink:0}
.sch{background:var(--green-dim);color:var(--green);border:2px solid #3fb95055}
.scm{background:var(--yellow-dim);color:var(--yellow);border:2px solid #d2992255}
.scl{background:var(--red-dim);color:var(--red);border:2px solid #f8514955}
.sdesc{font-size:13px;color:var(--text2)}.sdesc strong{color:var(--text);display:block;font-size:14px;margin-bottom:2px}
.dg{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:14px}
.dg3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin-bottom:14px}
.df{background:var(--surface2);border-radius:var(--radius);padding:10px 12px}
.dfl{font-size:10px;color:var(--text3);font-weight:600;text-transform:uppercase;letter-spacing:.3px;margin-bottom:3px}
.dfv{font-size:13px;font-weight:500}
.tag{display:inline-flex;padding:2px 7px;border-radius:4px;font-size:11px;font-weight:600}
.ty{background:var(--green-dim);color:var(--green)}.tn{background:var(--red-dim);color:var(--red)}.tp{background:var(--yellow-dim);color:var(--yellow)}
.aib{background:var(--surface2);border:1px solid #1f6feb44;border-radius:var(--radius);padding:14px;margin-top:14px}
.ait{font-size:11px;font-weight:700;color:var(--blue-light);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.aitxt{font-size:13px;line-height:1.75;color:var(--text2);white-space:pre-wrap}
.spin2{width:14px;height:14px;border:2px solid var(--border);border-top-color:var(--blue);border-radius:50%;animation:sp .7s linear infinite;display:inline-block;margin-right:6px}
.ail{display:flex;align-items:center;font-size:13px;color:var(--text3)}
.stit{font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;margin-top:14px}
.rta{width:100%;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:var(--radius);padding:11px;font-family:'Heebo',sans-serif;font-size:13px;line-height:1.7;resize:vertical;min-height:100px;outline:none;direction:rtl}.rta:focus{border-color:var(--blue)}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--green);color:#000;font-weight:700;padding:9px 20px;border-radius:var(--radius);font-size:13px;z-index:200;pointer-events:none}
.err-banner{background:var(--red-dim);border:1px solid #f8514933;border-radius:var(--radius);padding:12px 16px;margin-bottom:16px;font-size:13px;color:var(--red)}
.form-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}
.form-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.form-field{display:flex;flex-direction:column;gap:4px}
.form-label{font-size:11px;color:var(--text3);font-weight:600;text-transform:uppercase;margin-bottom:2px}
.form-input{background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:var(--radius);padding:8px 12px;font-family:'Heebo',sans-serif;font-size:13px;outline:none;direction:rtl;width:100%}
.form-input:focus{border-color:var(--blue)}
.cb-row{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:12px}
.cb-item{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text2);cursor:pointer}
.section-divider{border:none;border-top:1px solid var(--border);margin:16px 0}
.match-row{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--border);font-size:13px}
.match-row:last-child{border-bottom:none}
.match-row:hover{background:var(--surface2)}
.active-dot{width:8px;height:8px;border-radius:50%;background:var(--green);display:inline-block;margin-left:4px}
.inactive-dot{width:8px;height:8px;border-radius:50%;background:var(--red);display:inline-block;margin-left:4px}
`;

const STATUSES = ["חדש","בבדיקה","נשלח","נדחה"];
const EDUCATION = ["ללא דרישה","8 שנות לימוד","10 שנות לימוד","12 שנות לימוד (בגרות)","תואר ראשון"];
const WORK_DAYS_OPTS = ["ראשון–שישי","שני–שישי","שישי–שבת","סופ\"ש בלבד","גמיש"];
const REGIONS = ["תל אביב והמרכז","גוש דן","שפלה","ירושלים","צפון","דרום","השרון"];

const calcScore = (c, job) => {
  if (!job) return Math.min(100,(c.military_background?20:0)+(c.has_license?25:0)+(c.nights_availability==="כן"?20:c.nights_availability==="חלקי"?10:0)+(c.shabbat_availability==="כן"?20:c.shabbat_availability==="חלקי"?10:0)+(c.has_car?15:0));
  let score=0,total=0;
  if(job.requires_military){total+=25;if(c.military_background)score+=25;}
  if(job.requires_license){total+=25;if(c.has_license)score+=25;}
  if(job.requires_car){total+=15;if(c.has_car)score+=15;}
  if(job.min_age||job.max_age){total+=10;const age=c.age||0;if((!job.min_age||age>=job.min_age)&&(!job.max_age||age<=job.max_age))score+=10;}
  if(job.min_education){total+=10;const edu=EDUCATION.indexOf(c.education||"ללא דרישה");const req=EDUCATION.indexOf(job.min_education);if(edu>=req)score+=10;}
  if(job.work_days){total+=15;if(c.work_days===job.work_days||c.work_days==="גמיש")score+=15;}
  total=total||75;
  score+=(c.nights_availability==="כן"?5:c.nights_availability==="חלקי"?2:0);
  score+=(c.shabbat_availability==="כן"?5:c.shabbat_availability==="חלקי"?2:0);
  return Math.min(100,Math.round((score/total)*100));
};

const sTier=s=>s>=70?"sh":s>=45?"sm":"sl2";
const sCirc=s=>s>=70?"sch":s>=45?"scm":"scl";
const tC=v=>v==="כן"?"ty":v==="חלקי"?"tp":"tn";
const jC=j=>!j?"j3":j.startsWith("חמ")?"j0":j.startsWith("סד")?"j1":j.startsWith("בו")?"j2":"j3";
const sC=s=>s==="חדש"?"p0":s==="בבדיקה"?"p1":s==="נשלח"?"p2":"p3";
function CandModal({c, jobs, onClose, onUpdate, onSend}) {
  const [status, setStatus] = useState(c.status);
  const job = jobs.find(j=>j.title===c.job_type);
  const score = calcScore(c, job);
  const tier = score>=70?"מועמד מצוין – מומלץ לראיון":score>=45?"סביר – ראוי לבדיקה":"חלש – לבחינה זהירה";

  const changeStatus = async s => {
    setStatus(s);
    await api(`/candidates?id=eq.${c.id}`,{method:"PATCH",body:JSON.stringify({status:s})});
    onUpdate({...c,status:s});
  };

  return (
    <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mo">
        <div className="mh">
          <div><div className="mt">{c.name}</div><div className="ms">{c.job_type} · {c.city} · {new Date(c.created_at).toLocaleDateString("he-IL")}</div></div>
          <button className="mc" onClick={onClose}>×</button>
        </div>
        <div className="mbody">
          <div className="sbig">
            <div className={`scir ${sCirc(score)}`}>{score}</div>
            <div className="sdesc"><strong>{tier}</strong>{job?"ציון מותאם למשרה: "+job.title:"ציון כללי"}</div>
          </div>
          <div className="stit">פרטים אישיים</div>
          <div className="dg3">
            {[["טלפון",<span style={{direction:"ltr",display:"block",textAlign:"right"}}>{c.phone}</span>],["עיר",c.city||"—"],["אזור",c.region||"—"],["גיל",c.age?c.age+" שנים":"—"],["השכלה",c.education||"—"],["ימי עבודה",c.work_days||"—"]].map(([l,v],i)=>(
              <div key={i} className="df"><div className="dfl">{l}</div><div className="dfv">{v}</div></div>
            ))}
          </div>
          <div className="stit">כישורים</div>
          <div className="dg">
            {[["רקע צבאי",<span className={`tag ${c.military_background?"ty":"tn"}`}>{c.military_background?"✓ כן":"✗ לא"}</span>],["רישיון/קורס",<span className={`tag ${c.has_license?"ty":"tn"}`}>{c.has_license?"✓ יש":"✗ אין"}</span>],["רכב",<span className={`tag ${c.has_car?"ty":"tn"}`}>{c.has_car?"✓ יש":"✗ אין"}</span>],["לילות",<span className={`tag ${tC(c.nights_availability||"לא")}`}>{c.nights_availability||"לא"}</span>],["שבתות",<span className={`tag ${tC(c.shabbat_availability||"לא")}`}>{c.shabbat_availability||"לא"}</span>],["קורסים",<span style={{fontSize:12}}>{c.courses||"—"}</span>]].map(([l,v],i)=>(
              <div key={i} className="df"><div className="dfl">{l}</div><div className="dfv">{v}</div></div>
            ))}
          </div>
          {c.notes&&<><div className="stit">הערות</div><div className="df"><div className="dfv" style={{fontSize:13,color:"var(--text2)"}}>{c.notes}</div></div></>}
          <div className="stit">סטטוס</div>
          <select value={status} onChange={e=>changeStatus(e.target.value)} style={{background:"var(--surface3)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:"6px",padding:"6px 12px",fontSize:"13px",direction:"rtl"}}>
            {STATUSES.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>סגור</button>
          <button className="btn bg" onClick={()=>{onSend([c]);onClose();}}>✈ שלח למנהל גיוס</button>
        </div>
      </div>
    </div>
  );
}

function CandFormModal({initial, onClose, onSave, jobs}) {
  const blank = {name:"",phone:"",job_type:jobs[0]?.title||"",city:"",region:"",age:"",education:"ללא דרישה",work_days:"גמיש",courses:"",military_background:false,has_license:false,has_car:false,nights_availability:"לא",shabbat_availability:"לא",status:"חדש",notes:""};
  const [form, setForm] = useState(initial||blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const isEdit = !!initial;

  const save = async () => {
    if (!form.name||!form.phone){setErr("שם וטלפון הם שדות חובה");return;}
    setSaving(true);
    const job = jobs.find(j=>j.title===form.job_type);
    const score = calcScore(form, job);
    const payload = {...form, score, age: form.age?parseInt(form.age):null};
    let result;
    if (isEdit) {
      result = await api(`/candidates?id=eq.${initial.id}`,{method:"PATCH",body:JSON.stringify(payload)});
    } else {
      result = await api("/candidates",{method:"POST",body:JSON.stringify(payload)});
    }
    if (result?.error||(!Array.isArray(result)&&!isEdit)){setErr("שגיאה בשמירה");setSaving(false);return;}
    onSave(isEdit?{...initial,...payload,score}:result[0]);
    onClose();
  };

  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  return (
    <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mo mo-wide">
        <div className="mh"><div><div className="mt">{isEdit?"עריכת מועמד":"הוספת מועמד"}</div></div><button className="mc" onClick={onClose}>×</button></div>
        <div className="mbody">
          {err&&<div className="err-banner">{err}</div>}
          <div className="stit">פרטים אישיים</div>
          <div className="form-grid">
            {[["name","שם מלא"],["phone","טלפון"],["city","עיר"]].map(([k,l])=>(
              <div key={k} className="form-field"><div className="form-label">{l}</div><input className="form-input" value={form[k]} onChange={e=>f(k,e.target.value)} placeholder={l}/></div>
            ))}
          </div>
          <div className="form-grid">
            <div className="form-field"><div className="form-label">אזור</div>
              <select className="form-input" value={form.region} onChange={e=>f("region",e.target.value)}>
                <option value="">בחר אזור</option>{REGIONS.map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-field"><div className="form-label">גיל</div><input className="form-input" type="number" value={form.age} onChange={e=>f("age",e.target.value)} placeholder="גיל"/></div>
            <div className="form-field"><div className="form-label">השכלה</div>
              <select className="form-input" value={form.education} onChange={e=>f("education",e.target.value)}>
                {EDUCATION.map(e=><option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <hr className="section-divider"/>
          <div className="stit">פרמטרי משרה</div>
          <div className="form-grid">
            <div className="form-field"><div className="form-label">משרה מבוקשת</div>
              <select className="form-input" value={form.job_type} onChange={e=>f("job_type",e.target.value)}>
                {jobs.map(j=><option key={j.id}>{j.title}</option>)}
              </select>
            </div>
            <div className="form-field"><div className="form-label">ימי עבודה</div>
              <select className="form-input" value={form.work_days} onChange={e=>f("work_days",e.target.value)}>
                {WORK_DAYS_OPTS.map(w=><option key={w}>{w}</option>)}
              </select>
            </div>
            <div className="form-field"><div className="form-label">סטטוס</div>
              <select className="form-input" value={form.status} onChange={e=>f("status",e.target.value)}>
                {STATUSES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-grid2">
            <div className="form-field"><div className="form-label">זמינות לילות</div>
              <select className="form-input" value={form.nights_availability} onChange={e=>f("nights_availability",e.target.value)}>
                {["כן","לא","חלקי"].map(x=><option key={x}>{x}</option>)}
              </select>
            </div>
            <div className="form-field"><div className="form-label">זמינות שבתות</div>
              <select className="form-input" value={form.shabbat_availability} onChange={e=>f("shabbat_availability",e.target.value)}>
                {["כן","לא","חלקי"].map(x=><option key={x}>{x}</option>)}
              </select>
            </div>
          </div>
          <div className="cb-row">
            {[["military_background","רקע צבאי"],["has_license","רישיון/קורס"],["has_car","רכב"]].map(([k,l])=>(
              <label key={k} className="cb-item"><input type="checkbox" checked={form[k]} onChange={e=>f(k,e.target.checked)} style={{accentColor:"var(--blue)"}}/>{l}</label>
            ))}
          </div>
          <div className="form-field" style={{marginBottom:12}}><div className="form-label">קורסים / הכשרות</div><input className="form-input" value={form.courses||""} onChange={e=>f("courses",e.target.value)} placeholder="לדוג' קורס בודקים, רישיון נשק..."/></div>
          <div className="form-field"><div className="form-label">הערות</div><textarea className="rta" style={{minHeight:70}} value={form.notes||""} onChange={e=>f("notes",e.target.value)} placeholder="הערות נוספות..."/></div>
        </div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>ביטול</button>
          <button className="btn bp" onClick={save} disabled={saving}>{saving?"שומר...":isEdit?"💾 עדכן":"💾 שמור"}</button>
        </div>
      </div>
    </div>
  );
}

function JobModal({initial, onClose, onSave}) {
  const blank = {title:"",category:"",hourly_rate:"",bonus:"",min_age:"",max_age:"",min_education:"ללא דרישה",requires_military:false,requires_license:false,requires_car:false,work_days:"ראשון–שישי",location:"",is_active:true,notes:""};
  const [form, setForm] = useState(initial||blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const isEdit = !!initial;
  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  const save = async () => {
    if (!form.title){setErr("שם המשרה הוא שדה חובה");return;}
    setSaving(true);
    const payload = {...form,hourly_rate:form.hourly_rate?parseInt(form.hourly_rate):null,bonus:form.bonus?parseInt(form.bonus):null,min_age:form.min_age?parseInt(form.min_age):null,max_age:form.max_age?parseInt(form.max_age):null};
    let result;
    if (isEdit) {
      result = await api(`/jobs?id=eq.${initial.id}`,{method:"PATCH",body:JSON.stringify(payload)});
    } else {
      result = await api("/jobs",{method:"POST",body:JSON.stringify(payload)});
    }
    if (result?.error){setErr("שגיאה בשמירה");setSaving(false);return;}
    onSave(isEdit?{...initial,...payload}:(Array.isArray(result)?result[0]:result));
    onClose();
  };

  return (
    <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mo mo-wide">
        <div className="mh"><div><div className="mt">{isEdit?"עריכת משרה":"הוספת משרה חדשה"}</div></div><button className="mc" onClick={onClose}>×</button></div>
        <div className="mbody">
          {err&&<div className="err-banner">{err}</div>}
          <div className="stit">פרטי המשרה</div>
          <div className="form-grid">
            <div className="form-field"><div className="form-label">שם המשרה</div><input className="form-input" value={form.title} onChange={e=>f("title",e.target.value)} placeholder="לדוג' חמוש – מועדונים"/></div>
            <div className="form-field"><div className="form-label">קטגוריה</div><input className="form-input" value={form.category||""} onChange={e=>f("category",e.target.value)} placeholder="מועדונים / פארקים / ביטחוני"/></div>
            <div className="form-field"><div className="form-label">מיקום</div><input className="form-input" value={form.location||""} onChange={e=>f("location",e.target.value)} placeholder="עיר / אזור"/></div>
          </div>
          <div className="form-grid">
            <div className="form-field"><div className="form-label">שכר לשעה (₪)</div><input className="form-input" type="number" value={form.hourly_rate||""} onChange={e=>f("hourly_rate",e.target.value)}/></div>
            <div className="form-field"><div className="form-label">מענק הצטרפות (₪)</div><input className="form-input" type="number" value={form.bonus||""} onChange={e=>f("bonus",e.target.value)}/></div>
            <div className="form-field"><div className="form-label">ימי עבודה</div>
              <select className="form-input" value={form.work_days} onChange={e=>f("work_days",e.target.value)}>
                {WORK_DAYS_OPTS.map(w=><option key={w}>{w}</option>)}
              </select>
            </div>
          </div>
          <hr className="section-divider"/>
          <div className="stit">דרישות המשרה</div>
          <div className="form-grid">
            <div className="form-field"><div className="form-label">גיל מינ'</div><input className="form-input" type="number" value={form.min_age||""} onChange={e=>f("min_age",e.target.value)}/></div>
            <div className="form-field"><div className="form-label">גיל מקס'</div><input className="form-input" type="number" value={form.max_age||""} onChange={e=>f("max_age",e.target.value)}/></div>
            <div className="form-field"><div className="form-label">השכלה מינימלית</div>
              <select className="form-input" value={form.min_education} onChange={e=>f("min_education",e.target.value)}>
                {EDUCATION.map(e=><option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <div className="cb-row">
            {[["requires_military","רקע צבאי נדרש"],["requires_license","רישיון/קורס נדרש"],["requires_car","רכב נדרש"]].map(([k,l])=>(
              <label key={k} className="cb-item"><input type="checkbox" checked={form[k]} onChange={e=>f(k,e.target.checked)} style={{accentColor:"var(--blue)"}}/>{l}</label>
            ))}
          </div>
          <div className="form-grid2">
            <div className="form-field"><div className="form-label">סטטוס</div>
              <select className="form-input" value={form.is_active?"active":"inactive"} onChange={e=>f("is_active",e.target.value==="active")}>
                <option value="active">פעילה</option><option value="inactive">לא פעילה</option>
              </select>
            </div>
          </div>
          <div className="form-field"><div className="form-label">הערות</div><textarea className="rta" style={{minHeight:60}} value={form.notes||""} onChange={e=>f("notes",e.target.value)} placeholder="הערות נוספות..."/></div>
        </div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>ביטול</button>
          <button className="btn bp" onClick={save} disabled={saving}>{saving?"שומר...":isEdit?"💾 עדכן משרה":"💾 שמור משרה"}</button>
        </div>
      </div>
    </div>
  );
}

function JobDetailModal({job, candidates, onClose, onEdit}) {
  const matched = candidates.map(c=>({...c,matchScore:calcScore(c,job)})).sort((a,b)=>b.matchScore-a.matchScore).slice(0,20);
  return (
    <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mo mo-wide">
        <div className="mh">
          <div>
            <div className="mt">{job.title} {job.is_active?<span className="active-dot"/>:<span className="inactive-dot"/>}</div>
            <div className="ms">{job.category} · {job.location} · {job.hourly_rate}₪/שעה{job.bonus?` · מענק ${job.bonus}₪`:""}</div>
          </div>
          <button className="mc" onClick={onClose}>×</button>
        </div>
        <div className="mbody">
          <div className="dg3">
            {[["גיל נדרש",job.min_age&&job.max_age?`${job.min_age}–${job.max_age}`:job.min_age?`${job.min_age}+`:"ללא הגבלה"],["השכלה",job.min_education||"ללא דרישה"],["ימי עבודה",job.work_days||"—"],["רקע צבאי",<span className={`tag ${job.requires_military?"ty":"tp"}`}>{job.requires_military?"נדרש":"לא נדרש"}</span>],["רישיון/קורס",<span className={`tag ${job.requires_license?"ty":"tp"}`}>{job.requires_license?"נדרש":"לא נדרש"}</span>],["רכב",<span className={`tag ${job.requires_car?"ty":"tp"}`}>{job.requires_car?"נדרש":"לא נדרש"}</span>]].map(([l,v],i)=>(
              <div key={i} className="df"><div className="dfl">{l}</div><div className="dfv">{v}</div></div>
            ))}
          </div>
          <div className="stit">מועמדים מתאימים ({matched.filter(c=>c.matchScore>=50).length})</div>
          <div className="tw">
            {matched.filter(c=>c.matchScore>=50).length===0&&<div className="empty">אין מועמדים מתאימים עדיין</div>}
            {matched.filter(c=>c.matchScore>=50).map(c=>(
              <div key={c.id} className="match-row">
                <div><span style={{fontWeight:600}}>{c.name}</span><span style={{color:"var(--text3)",fontSize:12,marginRight:8}}>{c.city}</span></div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span className={`pill ${sC(c.status)}`}>{c.status}</span>
                  <div className={`sw ${sTier(c.matchScore)}`} style={{width:100}}>
                    <div className="snum">{c.matchScore}</div>
                    <div className="sbg"><div className="sf" style={{width:`${c.matchScore}%`}}/></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>סגור</button>
          <button className="btn bw" onClick={()=>onEdit(job)}>✏️ ערוך משרה</button>
        </div>
      </div>
    </div>
  );
}

function SendModal({cands, jobs, onClose, onOk}) {
  const [msg, setMsg] = useState("שלום,\n\nמועמד/ים לראיון:\n\n"+cands.map(c=>{const job=jobs.find(j=>j.title===c.job_type);return`• ${c.name} | ${c.job_type} | ציון:${calcScore(c,job)} | ${c.phone}${c.age?" | גיל:"+c.age:""}`;}).join("\n")+"\n\nבברכה, הסנה מיתוג ושיווק");
  return (
    <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mo">
        <div className="mh"><div><div className="mt">שליחה למנהל גיוס</div><div className="ms">{cands.length} מועמד/ים</div></div><button className="mc" onClick={onClose}>×</button></div>
        <div className="mbody"><textarea className="rta" value={msg} onChange={e=>setMsg(e.target.value)}/></div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>ביטול</button>
          <button className="btn bg" onClick={onOk}>✈ שלח</button>
        </div>
      </div>
    </div>
  );
}
export default function App() {
  const [tab, setTab] = useState("candidates");
  const [cands, setCands] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sel, setSel] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [editCand, setEditCand] = useState(null);
  const [addCandOpen, setAddCandOpen] = useState(false);
  const [jobModal, setJobModal] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [addJobOpen, setAddJobOpen] = useState(false);
  const [sendQ, setSQ] = useState(null);
  const [toast, setToast] = useState(null);
  const [fJ, setFJ] = useState("הכל");
  const [fC, setFC] = useState("הכל");
  const [fS, setFS] = useState("הכל");
  const [fMn, setFMn] = useState("");
  const [fMx, setFMx] = useState("");

  const load = async () => {
    setLoading(true);
    const [c,j] = await Promise.all([
      api("/candidates?order=created_at.desc&limit=500"),
      api("/jobs?order=created_at.desc")
    ]);
    if (!c?.error) setCands((c||[]).map(x=>({...x,score:calcScore(x,(j||[]).find(jb=>jb.title===x.job_type))})));
    if (!j?.error) setJobs(j||[]);
    if (c?.error) setError(c.error.message);
    setLoading(false);
  };

  useEffect(()=>{load();},[]);

  const showT = m => {setToast(m);setTimeout(()=>setToast(null),3000);};
  const filt = cands.filter(c=>
    (fJ==="הכל"||c.job_type===fJ)&&
    (fC==="הכל"||c.city===fC)&&
    (fS==="הכל"||c.status===fS)&&
    (fMn===""||c.score>=+fMn)&&
    (fMx===""||c.score<=+fMx)
  );
  const cities = [...new Set(cands.map(c=>c.city).filter(Boolean))].sort();
  const stats = {t:cands.length,h:cands.filter(c=>c.score>=70).length,n:cands.filter(c=>c.status==="חדש").length,s:cands.filter(c=>c.status==="נשלח").length};
  const tog = (id,e) => {e.stopPropagation();setSel(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});};
  const togAll = () => sel.size===filt.length?setSel(new Set()):setSel(new Set(filt.map(c=>c.id)));
  const upd = u => {const job=jobs.find(j=>j.title===u.job_type);setCands(p=>p.map(c=>c.id===u.id?{...u,score:calcScore(u,job)}:c));setModal(u);};
  const doSend = async () => {
    const ids = new Set(sendQ.map(c=>c.id));
    await Promise.all([...ids].map(id=>api(`/candidates?id=eq.${id}`,{method:"PATCH",body:JSON.stringify({status:"נשלח"})})));
    setCands(p=>p.map(c=>ids.has(c.id)?{...c,status:"נשלח"}:c));
    setSel(new Set());setSQ(null);setModal(null);
    showT(`${sendQ.length} מועמד/ים נשלחו ✓`);
  };
  const saveJob = j => {
    setJobs(p=>p.find(x=>x.id===j.id)?p.map(x=>x.id===j.id?j:x):[j,...p]);
    showT(jobModal?"משרה עודכנה ✓":"משרה נוספה ✓");
    setJobModal(null);setAddJobOpen(false);
  };
  const saveCand = c => {
    const job=jobs.find(j=>j.title===c.job_type);
    const withScore={...c,score:calcScore(c,job)};
    setCands(p=>p.find(x=>x.id===c.id)?p.map(x=>x.id===c.id?withScore:x):[withScore,...p]);
    showT(editCand?"מועמד עודכן ✓":"מועמד נוסף ✓");
    setEditCand(null);setAddCandOpen(false);
  };
  const live = modal?cands.find(c=>c.id===modal.id)||modal:null;

  return (
    <><style>{css}</style>
    <div className="app">
      <div className="hdr">
        <div className="hdr-logo">
          <div className="hdr-icon">🛡</div>
          <div><div className="hdr-title">מערכת גיוס – אלדר אבטחה</div><div className="hdr-sub">מחובר ל-Supabase · נתונים בזמן אמת</div></div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div className="stats">
            {[["סה\"כ",stats.t,"var(--blue-light)"],["70+",stats.h,"var(--green)"],["חדשים",stats.n,"var(--yellow)"],["נשלחו",stats.s,"var(--purple)"]].map(([l,n,col])=>(
              <div key={l} className="sp"><div className="sn" style={{color:col}}>{n}</div><div className="sl">{l}</div></div>
            ))}
          </div>
          <button className="btn bi" onClick={load}>↺ רענן</button>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:16}}>
        <div className="tabs">
          <button className={`tab${tab==="candidates"?" active":""}`} onClick={()=>setTab("candidates")}>👤 מועמדים ({cands.length})</button>
          <button className={`tab${tab==="jobs"?" active":""}`} onClick={()=>setTab("jobs")}>📋 משרות ({jobs.length})</button>
        </div>
      {tab==="candidates"&&<><button className="btn bp" onClick={()=>setAddCandOpen(true)}>+ הוסף מועמד</button>
<label className="btn bi" style={{cursor:"pointer"}}>
<label className="btn bi" style={{cursor:"pointer"}}>
  📥 ייבא CSV
  <input type="file" accept=".csv" style={{display:"none"}} onChange={async e=>{
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split("\n").filter(l=>l.trim());
    const headers = lines[0].split(",").map(h=>h.trim().replace(/"/g,"").toLowerCase());
    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(",").map(v=>v.trim().replace(/"/g,""));
      const row = {};
      headers.forEach((h,idx) => row[h] = vals[idx]||"");
      const name = row.name || row["שם"] || "";
      const phone = row.phone || row["טלפון"] || "";
      const city = row.city || row["עיר"] || "";
      const job_type = row.job_type || row["משרה"] || "";
      if (!name && !phone) continue;
      const job = jobs.find(j=>j.title===job_type);
      const score = calcScore({military_background:false,has_license:false,has_car:false,nights_availability:"לא",shabbat_availability:"לא"}, job);
      await api("/candidates",{method:"POST",body:JSON.stringify({name,phone,city,job_type,status:"חדש",score})});
      imported++;
    }
    showT(`יובאו ${imported} מועמדים ✓`);
    load();
    e.target.value = "";
  }}/>
</label>
        {tab==="jobs"&&<button className="btn bp" onClick={()=>setAddJobOpen(true)}>+ הוסף משרה</button>}
      </div>

      {error&&<div className="err-banner">⚠️ {error}</div>}

      {tab==="candidates"&&<>
        <div className="filters">
          {[["משרה",fJ,setFJ,["הכל",...jobs.map(j=>j.title)]],["עיר",fC,setFC,["הכל",...cities]],["סטטוס",fS,setFS,["הכל",...STATUSES]]].map(([l,v,s,o])=>(
            <div key={l} className="fg"><div className="fl">{l}</div><select value={v} onChange={e=>s(e.target.value)}>{o.map(x=><option key={x}>{x}</option>)}</select></div>
          ))}
          <div className="fg"><div className="fl">ציון מינ'</div><input type="number" placeholder="0" value={fMn} onChange={e=>setFMn(e.target.value)}/></div>
          <div className="fg"><div className="fl">ציון מקס'</div><input type="number" placeholder="100" value={fMx} onChange={e=>setFMx(e.target.value)}/></div>
          <button className="rst" onClick={()=>{setFJ("הכל");setFC("הכל");setFS("הכל");setFMn("");setFMx("");}}>נקה</button>
        </div>
        <div className="abar">
          <div className="al">
            {sel.size>0&&<><span style={{fontSize:13,color:"var(--text2)"}}>{sel.size} נבחרו</span>
              <button className="btn bg" onClick={()=>setSQ(filt.filter(c=>sel.has(c.id)))}>✈ שלח נבחרים</button>
              <button className="btn bd" onClick={()=>setSel(new Set())}>בטל</button></>}
          </div>
          <div style={{fontSize:13,color:"var(--text3)"}}>{filt.length} מועמדים</div>
        </div>
        <div className="tw">
          <div className="th th-cands">
            <input type="checkbox" className="rck" checked={sel.size===filt.length&&filt.length>0} onChange={togAll}/>
            <div>שם</div><div>משרה</div><div>עיר</div><div>גיל</div><div>ימי עבודה</div><div>ציון</div><div>סטטוס</div><div>פעולות</div>
          </div>
          {loading&&<div className="loading"><div className="spin"/><div>טוען נתונים...</div></div>}
          {!loading&&filt.length===0&&<div className="empty"><div style={{fontSize:40,marginBottom:12}}>🎯</div><div style={{fontWeight:600,marginBottom:8}}>{cands.length===0?"המסד ריק כרגע":"לא נמצאו מועמדים"}</div></div>}
          {!loading&&filt.map(c=>(
            <div key={c.id} className="row row-cands" style={{background:sel.has(c.id)?"var(--blue-dim)":"unset"}} onClick={()=>setModal(c)}>
              <input type="checkbox" className="rck" checked={sel.has(c.id)} onChange={()=>{}} onClick={e=>tog(c.id,e)}/>
              <div><div className="cn">{c.name}</div><div className="cp">{c.phone}</div></div>
              <div><span className={`jb ${jC(c.job_type)}`}>{c.job_type||"לא צוין"}</span></div>
              <div style={{fontSize:13}}>{c.city||"—"}</div>
              <div style={{fontSize:13}}>{c.age?c.age+" שנים":"—"}</div>
              <div style={{fontSize:13}}>{c.work_days||"—"}</div>
              <div className={`sw ${sTier(c.score)}`}>
                <div className="snum">{c.score}</div>
                <div className="sbg"><div className="sf" style={{width:`${c.score}%`}}/></div>
              </div>
              <div><span className={`pill ${sC(c.status)}`}>{c.status}</span></div>
              <div style={{display:"flex",gap:5}} onClick={e=>e.stopPropagation()}>
                <button className="btn bi" onClick={()=>setEditCand(c)}>✏️</button>
                <button className="btn bg" style={{padding:"4px 7px"}} onClick={()=>setSQ([c])}>✈</button>
              </div>
            </div>
          ))}
        </div>
      </>}

      {tab==="jobs"&&<>
        <div className="tw">
          <div className="th th-jobs">
            <div>שם המשרה</div><div>קטגוריה</div><div>שכר/שעה</div><div>מענק</div><div>גיל</div><div>ימי עבודה</div><div>סטטוס</div><div>פעולות</div>
          </div>
          {loading&&<div className="loading"><div className="spin"/><div>טוען משרות...</div></div>}
          {!loading&&jobs.length===0&&<div className="empty"><div style={{fontSize:40,marginBottom:12}}>📋</div><div style={{fontWeight:600,marginBottom:8}}>אין משרות עדיין</div><div style={{fontSize:13}}>לחץ "+ הוסף משרה" להוספת המשרות הראשונות</div></div>}
          {!loading&&jobs.map(j=>(
            <div key={j.id} className="row row-jobs" onClick={()=>setJobDetail(j)}>
              <div><div className="cn">{j.title}</div><div style={{fontSize:12,color:"var(--text3)"}}>{j.location||"—"}</div></div>
              <div style={{fontSize:13}}>{j.category||"—"}</div>
              <div style={{fontSize:13,fontWeight:600,color:"var(--green)"}}>{j.hourly_rate?j.hourly_rate+"₪":"—"}</div>
              <div style={{fontSize:13}}>{j.bonus?j.bonus+"₪":"—"}</div>
              <div style={{fontSize:13}}>{j.min_age&&j.max_age?`${j.min_age}–${j.max_age}`:j.min_age?`${j.min_age}+`:"ללא"}</div>
              <div style={{fontSize:13}}>{j.work_days||"—"}</div>
              <div><span className={`pill ${j.is_active?"p2":"p3"}`}>{j.is_active?"פעילה":"לא פעילה"}</span></div>
              <div style={{display:"flex",gap:5}} onClick={e=>e.stopPropagation()}>
                <button className="btn bi" onClick={()=>setJobModal(j)}>✏️</button>
              </div>
            </div>
          ))}
        </div>
      </>}

      {live&&<CandModal c={live} jobs={jobs} onClose={()=>setModal(null)} onUpdate={upd} onSend={q=>setSQ(q)}/>}
      {(addCandOpen||editCand)&&<CandFormModal initial={editCand} jobs={jobs} onClose={()=>{setAddCandOpen(false);setEditCand(null);}} onSave={saveCand}/>}
      {(addJobOpen||jobModal)&&<JobModal initial={jobModal} onClose={()=>{setAddJobOpen(false);setJobModal(null);}} onSave={saveJob}/>}
      {jobDetail&&<JobDetailModal job={jobDetail} candidates={cands} onClose={()=>setJobDetail(null)} onEdit={j=>{setJobDetail(null);setJobModal(j);}}/>}
      {sendQ&&<SendModal cands={sendQ} jobs={jobs} onClose={()=>setSQ(null)} onOk={doSend}/>}
      {toast&&<div className="toast">{toast}</div>}
    </div></>
  );
}
