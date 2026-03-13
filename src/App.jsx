import { useState, useEffect } from "react";

const SUPABASE_URL = "https://dirqvqxjkjeatptbvxje.supabase.co";
const SUPABASE_KEY = "sb_publishable_uxwd6Irhi2b9FWJgTohDLA_dm05Ei_I";

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
.app{max-width:1200px;margin:0 auto;padding:20px}
.hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:12px}
.hdr-logo{display:flex;align-items:center;gap:10px}
.hdr-icon{width:40px;height:40px;background:linear-gradient(135deg,var(--blue),#0d4a9e);border-radius:10px;display:grid;place-items:center;font-size:18px}
.hdr-title{font-size:18px;font-weight:700}
.hdr-sub{font-size:12px;color:var(--text3)}
.stats{display:flex;gap:10px;flex-wrap:wrap}
.sp{text-align:center;padding:8px 14px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
.sn{font-size:20px;font-weight:700}.sl{font-size:11px;color:var(--text3)}
.filters{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;align-items:flex-end}
.fg{display:flex;flex-direction:column;gap:3px}
.fl{font-size:11px;color:var(--text3);font-weight:500}
select,input[type=number]{background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:var(--radius);padding:6px 10px;font-family:'Heebo',sans-serif;font-size:13px;outline:none;direction:rtl}
select:focus,input:focus{border-color:var(--blue)}
input[type=number]{width:75px}
.rst{background:none;border:1px solid var(--border);color:var(--text3);border-radius:var(--radius);padding:6px 12px;font-family:'Heebo',sans-serif;font-size:13px;cursor:pointer}
.rst:hover{color:var(--text)}
.abar{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;min-height:30px}
.al{display:flex;gap:8px;align-items:center}
.tw{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden}
.th{display:grid;grid-template-columns:32px 1.8fr 1.3fr .9fr .8fr 105px 82px 90px;padding:9px 14px;background:var(--surface2);border-bottom:1px solid var(--border);font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;gap:8px;align-items:center}
.row{display:grid;grid-template-columns:32px 1.8fr 1.3fr .9fr .8fr 105px 82px 90px;padding:10px 14px;border-bottom:1px solid var(--border);align-items:center;cursor:pointer;gap:8px;transition:background .1s}
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
.empty{padding:60px;text-align:center;color:var(--text3);font-size:14px}
.loading{padding:60px;text-align:center;color:var(--text3)}
.spin{width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--blue);border-radius:50%;animation:sp .7s linear infinite;margin:0 auto 12px}
@keyframes sp{to{transform:rotate(360deg)}}
.mb{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px}
.mo{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);width:100%;max-width:640px;max-height:90vh;overflow-y:auto;animation:su .2s ease}
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
.stit{font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.rta{width:100%;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:var(--radius);padding:11px;font-family:'Heebo',sans-serif;font-size:13px;line-height:1.7;resize:vertical;min-height:160px;outline:none;direction:rtl}.rta:focus{border-color:var(--blue)}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--green);color:#000;font-weight:700;padding:9px 20px;border-radius:var(--radius);font-size:13px;z-index:200;pointer-events:none}
.err-banner{background:var(--red-dim);border:1px solid #f8514933;border-radius:var(--radius);padding:12px 16px;margin-bottom:16px;font-size:13px;color:var(--red)}
.add-form{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px;margin-bottom:20px}
.form-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}
.form-field{display:flex;flex-direction:column;gap:4px}
.form-label{font-size:11px;color:var(--text3);font-weight:600;text-transform:uppercase}
.form-input{background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:var(--radius);padding:8px 12px;font-family:'Heebo',sans-serif;font-size:13px;outline:none;direction:rtl}
.form-input:focus{border-color:var(--blue)}
.cb-row{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:12px}
.cb-item{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text2);cursor:pointer}
`;

const JOBS = ["חמוש – מועדונים","סדרן ספורט – מועדונים","בודק ביטחוני – מועדונים","חמוש – פארקים","סדרן ספורט – פארקים","בודק ביטחוני – פארקים","תמך – תל אביב","תקשוב – באר שבע"];
const STATUSES = ["חדש","בבדיקה","נשלח","נדחה"];

const jC = j => !j?"j3":j.startsWith("חמ")?"j0":j.startsWith("סד")?"j1":j.startsWith("בו")?"j2":"j3";
const sC = s => s==="חדש"?"p0":s==="בבדיקה"?"p1":s==="נשלח"?"p2":"p3";
const calcScore = c => Math.min(100,(c.military_background?20:0)+(c.has_license?25:0)+(c.nights_availability==="כן"?20:c.nights_availability==="חלקי"?10:0)+(c.shabbat_availability==="כן"?20:c.shabbat_availability==="חלקי"?10:0)+(c.has_car?15:0));
const sTier = s => s>=70?"sh":s>=45?"sm":"sl2";
const sCirc = s => s>=70?"sch":s>=45?"scm":"scl";
const tC = v => v==="כן"?"ty":v==="חלקי"?"tp":"tn";

async function callAI(c) {
  const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:`אתה מנהל גיוס בחברת אבטחה ישראלית. נתח את המועמד ותן המלצה קצרה.\nשם: ${c.name} | משרה: ${c.job_type} | עיר: ${c.city}\nרקע צבאי: ${c.military_background?"כן":"לא"} | רישיון: ${c.has_license?"כן":"לא"} | רכב: ${c.has_car?"כן":"לא"}\nלילות: ${c.nights_availability} | שבתות: ${c.shabbat_availability} | ציון: ${c.score}/100\nכתוב 3 שורות: 1.המלצה 2.חוזקות 3.נקודות לבדיקה`}]})});
  const d = await r.json();
  return d.content?.[0]?.text || "שגיאה.";
}

function Modal({c, onClose, onUpdate, onSend}) {
  const [loading, setL] = useState(false);
  const [ai, setAi] = useState(c.ai_analysis);
  const [status, setStatus] = useState(c.status);
  const score = calcScore(c);
  const tier = score>=70?"מועמד מצוין – מומלץ לראיון":score>=45?"סביר – ראוי לבדיקה":"חלש – לבחינה זהירה";

  const doAI = async () => {
    setL(true);
    const r = await callAI({...c, score});
    setAi(r);
    await api(`/candidates?id=eq.${c.id}`,{method:"PATCH",body:JSON.stringify({ai_analysis:r})});
    onUpdate({...c, ai_analysis:r});
    setL(false);
  };

  const changeStatus = async s => {
    setStatus(s);
    await api(`/candidates?id=eq.${c.id}`,{method:"PATCH",body:JSON.stringify({status:s})});
    onUpdate({...c, status:s});
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
            <div className="sdesc"><strong>{tier}</strong>רקע צבאי, רישיון, זמינות ונסיעות</div>
          </div>
          <div className="stit">פרטים</div>
          <div className="dg">
            {[
              ["טלפון",<span style={{direction:"ltr",display:"block",textAlign:"right"}}>{c.phone}</span>],
              ["עיר",c.city||"—"],
              ["רקע צבאי",<span className={`tag ${c.military_background?"ty":"tn"}`}>{c.military_background?"✓ כן":"✗ לא"}</span>],
              ["רישיון/קורס",<span className={`tag ${c.has_license?"ty":"tn"}`}>{c.has_license?"✓ יש":"✗ אין"}</span>],
              ["לילות",<span className={`tag ${tC(c.nights_availability||"לא")}`}>{c.nights_availability||"לא"}</span>],
              ["שבתות",<span className={`tag ${tC(c.shabbat_availability||"לא")}`}>{c.shabbat_availability||"לא"}</span>],
              ["רכב",<span className={`tag ${c.has_car?"ty":"tn"}`}>{c.has_car?"✓ יש":"✗ אין"}</span>],
            ].map(([l,v],i)=>(
              <div key={i} className="df"><div className="dfl">{l}</div><div className="dfv">{v}</div></div>
            ))}
            <div className="df">
              <div className="dfl">סטטוס</div>
              <div className="dfv">
                <select value={status} onChange={e=>changeStatus(e.target.value)} style={{background:"var(--surface3)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:"6px",padding:"3px 8px",fontSize:"12px",direction:"rtl"}}>
                  {STATUSES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="aib">
            <div className="ait">⚡ ניתוח AI</div>
            {!ai&&!loading&&<button className="btn bp" onClick={doAI}>נתח עם AI</button>}
            {loading&&<div className="ail"><span className="spin2"/>מנתח...</div>}
            {ai&&<div className="aitxt">{ai}</div>}
          </div>
        </div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>סגור</button>
          <button className="btn bg" onClick={()=>{onSend([c]);onClose();}}>✈ שלח למנהל גיוס</button>
        </div>
      </div>
    </div>
  );
}

function AddModal({onClose, onAdd}) {
  const [form, setForm] = useState({name:"",phone:"",job_type:JOBS[0],city:"",military_background:false,has_license:false,has_car:false,nights_availability:"לא",shabbat_availability:"לא",status:"חדש",notes:""});
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const save = async () => {
    if (!form.name||!form.phone){setErr("שם וטלפון הם שדות חובה");return;}
    setSaving(true);
    const score = calcScore(form);
    const result = await api("/candidates",{method:"POST",body:JSON.stringify({...form,score})});
    if (result?.error||!Array.isArray(result)){setErr("שגיאה בשמירה – נסה שוב");setSaving(false);return;}
    onAdd(result[0]);
    onClose();
  };

  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  return (
    <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mo">
        <div className="mh"><div><div className="mt">הוספת מועמד ידנית</div></div><button className="mc" onClick={onClose}>×</button></div>
        <div className="mbody">
          {err&&<div className="err-banner">{err}</div>}
          <div className="form-grid">
            {[["name","שם מלא"],["phone","טלפון"],["city","עיר"]].map(([k,l])=>(
              <div key={k} className="form-field">
                <div className="form-label">{l}</div>
                <input className="form-input" value={form[k]} onChange={e=>f(k,e.target.value)} placeholder={l}/>
              </div>
            ))}
          </div>
          <div className="form-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
            <div className="form-field">
              <div className="form-label">משרה</div>
              <select className="form-input" value={form.job_type} onChange={e=>f("job_type",e.target.value)}>
                {JOBS.map(j=><option key={j}>{j}</option>)}
              </select>
            </div>
            <div className="form-field">
              <div className="form-label">סטטוס</div>
              <select className="form-input" value={form.status} onChange={e=>f("status",e.target.value)}>
                {STATUSES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
            <div className="form-field">
              <div className="form-label">זמינות לילות</div>
              <select className="form-input" value={form.nights_availability} onChange={e=>f("nights_availability",e.target.value)}>
                {["כן","לא","חלקי"].map(x=><option key={x}>{x}</option>)}
              </select>
            </div>
            <div className="form-field">
              <div className="form-label">זמינות שבתות</div>
              <select className="form-input" value={form.shabbat_availability} onChange={e=>f("shabbat_availability",e.target.value)}>
                {["כן","לא","חלקי"].map(x=><option key={x}>{x}</option>)}
              </select>
            </div>
          </div>
          <div className="cb-row">
            {[["military_background","רקע צבאי"],["has_license","רישיון/קורס"],["has_car","רכב"]].map(([k,l])=>(
              <label key={k} className="cb-item">
                <input type="checkbox" checked={form[k]} onChange={e=>f(k,e.target.checked)} style={{accentColor:"var(--blue)"}}/>
                {l}
              </label>
            ))}
          </div>
          <div className="form-field">
            <div className="form-label">הערות</div>
            <textarea className="rta" style={{minHeight:80}} value={form.notes} onChange={e=>f("notes",e.target.value)} placeholder="הערות נוספות..."/>
          </div>
        </div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>ביטול</button>
          <button className="btn bp" onClick={save} disabled={saving}>{saving?"שומר...":"💾 שמור מועמד"}</button>
        </div>
      </div>
    </div>
  );
}

function SendModal({cands, onClose, onOk}) {
  const [msg, setMsg] = useState(
    "שלום,\n\nמועמד/ים לראיון:\n\n"+
    cands.map(c=>`• ${c.name} | ${c.job_type} | ציון:${calcScore(c)} | ${c.phone}`).join("\n")+
    "\n\nבברכה, הסנה מיתוג ושיווק"
  );
  return (
    <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mo">
        <div className="mh"><div><div className="mt">שליחה למנהל גיוס</div><div className="ms">{cands.length} מועמד/ים</div></div><button className="mc" onClick={onClose}>×</button></div>
        <div className="mbody">
          <textarea className="rta" value={msg} onChange={e=>setMsg(e.target.value)}/>
          <div style={{fontSize:12,color:"var(--text3)",marginTop:8}}>* בגרסת ייצור ישלח אוטומטית ל-WhatsApp</div>
        </div>
        <div className="mf">
          <button className="btn bi" onClick={onClose}>ביטול</button>
          <button className="btn bg" onClick={onOk}>✈ שלח</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cands, setCands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sel, setSel] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [sendQ, setSQ] = useState(null);
  const [toast, setToast] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [fJ, setFJ] = useState("הכל");
  const [fC, setFC] = useState("הכל");
  const [fS, setFS] = useState("הכל");
  const [fMn, setFMn] = useState("");
  const [fMx, setFMx] = useState("");

  useEffect(() => {
    api("/candidates?order=created_at.desc&limit=200")
      .then(data => {
        if (data?.error){setError("שגיאה: "+data.error.message);setLoading(false);return;}
        setCands((data||[]).map(c=>({...c,score:calcScore(c)})));
        setLoading(false);
      })
      .catch(()=>{setError("לא ניתן להתחבר ל-Supabase");setLoading(false);});
  }, []);

  const showT = m => {setToast(m);setTimeout(()=>setToast(null),3000);};
  const filt = cands.filter(c=>
    (fJ==="הכל"||c.job_type===fJ)&&
    (fC==="הכל"||c.city===fC)&&
    (fS==="הכל"||c.status===fS)&&
    (fMn===""||calcScore(c)>=+fMn)&&
    (fMx===""||calcScore(c)<=+fMx)
  );
  const cities = [...new Set(cands.map(c=>c.city).filter(Boolean))].sort();
  const stats = {t:cands.length,h:cands.filter(c=>calcScore(c)>=70).length,n:cands.filter(c=>c.status==="חדש").length,s:cands.filter(c=>c.status==="נשלח").length};
  const tog = (id,e) => {e.stopPropagation();setSel(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});};
  const togAll = () => sel.size===filt.length?setSel(new Set()):setSel(new Set(filt.map(c=>c.id)));
  const upd = u => {setCands(p=>p.map(c=>c.id===u.id?{...u,score:calcScore(u)}:c));setModal(u);};
  const addCand = c => {setCands(p=>[{...c,score:calcScore(c)},...p]);showT("מועמד נוסף בהצלחה ✓");};
  const doSend = async () => {
    const ids = new Set(sendQ.map(c=>c.id));
    await Promise.all([...ids].map(id=>api(`/candidates?id=eq.${id}`,{method:"PATCH",body:JSON.stringify({status:"נשלח"})})));
    setCands(p=>p.map(c=>ids.has(c.id)?{...c,status:"נשלח"}:c));
    setSel(new Set());setSQ(null);setModal(null);
    showT(`${sendQ.length} מועמד/ים נשלחו ✓`);
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
          <button className="btn bp" onClick={()=>setAddOpen(true)}>+ הוסף מועמד</button>
          <button className="btn bi" onClick={()=>{setLoading(true);api("/candidates?order=created_at.desc&limit=200").then(d=>{setCands((d||[]).map(c=>({...c,score:calcScore(c)})));setLoading(false);});}}>↺ רענן</button>
        </div>
      </div>

      {error&&<div className="err-banner">⚠️ {error}</div>}

      <div className="filters">
        {[["משרה",fJ,setFJ,["הכל",...JOBS]],["עיר",fC,setFC,["הכל",...cities]],["סטטוס",fS,setFS,["הכל",...STATUSES]]].map(([l,v,s,o])=>(
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
        <div className="th">
          <input type="checkbox" className="rck" checked={sel.size===filt.length&&filt.length>0} onChange={togAll}/>
          <div>שם</div><div>משרה</div><div>עיר</div><div>תאריך</div><div>ציון</div><div>סטטוס</div><div>פעולות</div>
        </div>

        {loading&&<div className="loading"><div className="spin"/><div>מתחבר ל-Supabase...</div></div>}

        {!loading&&filt.length===0&&(
          <div className="empty">
            {cands.length===0?<>
              <div style={{fontSize:40,marginBottom:12}}>🎯</div>
              <div style={{fontWeight:600,marginBottom:8}}>המסד ריק כרגע</div>
              <div style={{fontSize:13}}>לחץ "+ הוסף מועמד" להוספה ידנית</div>
            </>:<>
              <div style={{fontSize:36,marginBottom:12}}>🔍</div>
              <div>לא נמצאו מועמדים לפי הסינון</div>
            </>}
          </div>
        )}

        {!loading&&filt.map(c=>(
          <div key={c.id} className={`row${sel.has(c.id)?" sel":""}`} onClick={()=>setModal(c)}>
            <input type="checkbox" className="rck" checked={sel.has(c.id)} onChange={()=>{}} onClick={e=>tog(c.id,e)}/>
            <div><div className="cn">{c.name}</div><div className="cp">{c.phone}</div></div>
            <div><span className={`jb ${jC(c.job_type)}`}>{c.job_type||"לא צוין"}</span></div>
            <div style={{fontSize:13}}>{c.city||"—"}</div>
            <div className="dc">{new Date(c.created_at).toLocaleDateString("he-IL")}</div>
            <div className={`sw ${sTier(c.score)}`}>
              <div className="snum">{c.score}</div>
              <div className="sbg"><div className="sf" style={{width:`${c.score}%`}}/></div>
            </div>
            <div><span className={`pill ${sC(c.status)}`}>{c.status}</span></div>
            <div style={{display:"flex",gap:5}} onClick={e=>e.stopPropagation()}>
              <button className="btn bi" onClick={()=>setModal(c)}>👤</button>
              <button className="btn bg" style={{padding:"4px 7px"}} onClick={()=>setSQ([c])}>✈</button>
            </div>
          </div>
        ))}
      </div>

      {live&&<Modal c={live} onClose={()=>setModal(null)} onUpdate={upd} onSend={q=>setSQ(q)}/>}
      {sendQ&&<SendModal cands={sendQ} onClose={()=>setSQ(null)} onOk={doSend}/>}
      {addOpen&&<AddModal onClose={()=>setAddOpen(false)} onAdd={addCand}/>}
      {toast&&<div className="toast">{toast}</div>}
    </div></>
  );
}
