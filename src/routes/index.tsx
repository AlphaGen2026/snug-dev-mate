import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, ArrowRight, Bell, BrainCircuit, CalendarDays, Camera, Check,
  ChevronRight, CircleUserRound, FileCheck2, HeartPulse, Languages, LockKeyhole,
  Menu, MessageSquareText, Moon, PanelLeft, ScanLine, Search, ShieldCheck,
  Sparkles, Stethoscope, Sun, UploadCloud, UsersRound, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import chestScan from "@/assets/chest-scan.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediAI — Tibbiy qarorlar uchun aqlli yordam" },
      { name: "description", content: "Tibbiy tasvirlarni tahlil qilish, shifokor bilan bog‘lanish va sog‘liqni boshqarish uchun xavfsiz AI platformasi." },
      { property: "og:title", content: "MediAI — Tibbiy qarorlar uchun aqlli yordam" },
      { property: "og:description", content: "AI-assisted radiology and connected care in one secure healthcare workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MediAI,
});

type Language = "UZ" | "RU" | "EN";
type View = "overview" | "radiology" | "advisor" | "doctors" | "appointments";

const copy = {
  UZ: {
    nav: ["Imkoniyatlar", "Xavfsizlik", "Mutaxassislar"],
    login: "Kirish", demo: "Demoni ko‘rish", eyebrow: "TIBBIY YORDAMNING YANGI STANDARTI",
    titleA: "Sog‘lig‘ingiz haqida", titleB: "aniqroq qarorlar.",
    sub: "MediAI tibbiy tasvirlarni tahlil qiladi, muhim ma’lumotlarni tushuntiradi va sizni kerakli mutaxassis bilan bog‘laydi.",
    trust: "Ma’lumotlar himoyasi va tibbiy xavfsizlik tamoyillari asosida yaratilgan",
    workspace: "Klinik ish maydoni", morning: "Xayrli tong, Dilnoza", overview: "Umumiy ko‘rinish",
    scan: "AI Radiolog", advisor: "Tibbiy maslahatchi", doctors: "Shifokorlar", appointments: "Uchrashuvlar",
  },
  RU: {
    nav: ["Возможности", "Безопасность", "Специалисты"], login: "Войти", demo: "Смотреть демо",
    eyebrow: "НОВЫЙ СТАНДАРТ МЕДИЦИНСКОЙ ПОМОЩИ", titleA: "Более точные решения", titleB: "о вашем здоровье.",
    sub: "MediAI анализирует медицинские снимки, объясняет важные данные и связывает вас с нужным специалистом.",
    trust: "Создано на принципах защиты данных и медицинской безопасности", workspace: "Клиническое пространство",
    morning: "Доброе утро, Дильноза", overview: "Обзор", scan: "AI Радиолог", advisor: "Медсоветник", doctors: "Врачи", appointments: "Приёмы",
  },
  EN: {
    nav: ["Capabilities", "Security", "Specialists"], login: "Sign in", demo: "View demo",
    eyebrow: "A NEW STANDARD OF CONNECTED CARE", titleA: "Clearer decisions", titleB: "about your health.",
    sub: "MediAI analyzes medical imaging, explains essential information, and connects you with the right specialist.",
    trust: "Built around data protection and responsible medical AI", workspace: "Clinical workspace",
    morning: "Good morning, Dilnoza", overview: "Overview", scan: "AI Radiologist", advisor: "Medical advisor", doctors: "Doctors", appointments: "Appointments",
  },
};

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><HeartPulse size={20} strokeWidth={2.3} /></span>{!compact && <span className="font-display text-lg font-bold text-foreground">Medi<span className="text-primary">AI</span></span>}</div>;
}

function MediAI() {
  const [lang, setLang] = useState<Language>("UZ");
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const demoRef = useRef<HTMLElement>(null);
  const t = copy[lang];
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  const showDemo = () => demoRef.current?.scrollIntoView({ behavior: "smooth" });

  return <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {t.nav.map((item, i) => <button key={item} onClick={() => { const target = ["capabilities", "security", "specialists"][i]; if (target) document.getElementById(target)?.scrollIntoView({behavior:"smooth"}); }} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{item}</button>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex rounded-md border border-border bg-secondary p-0.5" aria-label="Language">
            {(["UZ","RU","EN"] as Language[]).map(l => <button key={l} onClick={() => setLang(l)} className={cn("h-8 rounded px-2.5 text-xs font-bold transition-colors", lang === l ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}>{l}</button>)}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? <Sun size={18}/> : <Moon size={18}/>}</Button>
          <Button variant="ghost">{t.login}</Button><Button onClick={showDemo}>{t.demo}<ArrowRight size={16}/></Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open menu">{mobileMenu ? <X/> : <Menu/>}</Button>
      </div>
      {mobileMenu && <div className="border-t border-border bg-background p-5 md:hidden"><div className="flex items-center justify-between"><div className="flex gap-2">{(["UZ","RU","EN"] as Language[]).map(l => <Button key={l} size="sm" variant={lang===l?"primary":"ghost"} onClick={()=>setLang(l)}>{l}</Button>)}</div><Button variant="ghost" size="icon" onClick={()=>setDark(!dark)}>{dark?<Sun/>:<Moon/>}</Button></div><Button onClick={()=>{showDemo();setMobileMenu(false)}} className="mt-4 w-full">{t.demo}</Button></div>}
    </header>

    <section className="relative bg-hero pt-18 text-hero-foreground">
      <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-primary"><span className="size-1.5 rounded-full bg-primary" />{t.eyebrow}</div>
          <h1 className="font-display text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">{t.titleA}<br/><span className="text-primary">{t.titleB}</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-hero-foreground/68 sm:text-lg">{t.sub}</p>
          <div className="mt-9 flex flex-wrap gap-3"><Button size="lg" onClick={showDemo}>{t.demo}<ArrowRight size={17}/></Button><Button size="lg" variant="dark" onClick={()=>document.getElementById("capabilities")?.scrollIntoView({behavior:"smooth"})}>Platforma haqida</Button></div>
          <div className="mt-8 flex max-w-lg items-start gap-3 border-t border-hero-foreground/12 pt-5 text-xs leading-5 text-hero-foreground/55"><ShieldCheck className="mt-0.5 shrink-0 text-primary" size={18}/><span>{t.trust}</span></div>
        </div>
        <HeroDiagnostic />
      </div>
      <div className="border-t border-hero-foreground/10"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 sm:grid-cols-4 lg:px-8">{[["3","AI tahlil moduli"],["24/7","Aqlli yordamchi"],["UZ · RU · EN","Uch tilda"],["256-bit","Ma’lumot himoyasi"]].map(([a,b])=><div key={b} className="border-l border-hero-foreground/10 px-5 py-6 last:border-r"><div className="font-display text-xl font-semibold">{a}</div><div className="mt-1 text-xs text-hero-foreground/50">{b}</div></div>)}</div></div>
    </section>

    <section id="capabilities" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div><p className="text-xs font-bold uppercase text-primary">Bitta xavfsiz platforma</p><h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-tight">Tibbiy yo‘lingizning har bosqichida aqlli yordam.</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Tahlildan shifokor konsultatsiyasigacha — muhim ma’lumotlar bir joyda, tushunarli va nazorat ostida.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{([
          [ScanLine,"AI Radiolog","Rentgen, MRT va UTT tasvirlari uchun dastlabki AI tahlili","3 turdagi tasvir"],
          [BrainCircuit,"Tibbiy maslahatchi","Alomatlarni tartibga solish va keyingi qadamni tushunish","Xavfsiz tavsiyalar"],
          [Stethoscope,"Mutaxassis bilan aloqa","Kerakli shifokorni toping va qabulga yoziling","Tasdiqlangan profil"],
          [LockKeyhole,"Himoyalangan tarix","Tahlil, uchrashuv va hujjatlaringiz yagona joyda","Maxfiy saqlash"],
        ] as Array<[LucideIcon,string,string,string]>).map(([Icon,title,desc,label])=><article key={title} className="group border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-md bg-accent text-primary"><Icon size={21}/></span><ChevronRight className="text-muted-foreground transition-transform group-hover:translate-x-1" size={18}/></div><h3 className="mt-6 font-display text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p><p className="mt-5 text-xs font-semibold text-primary">{label}</p></article>)}
        </div>
      </div>
    </section>

    <section ref={demoRef} id="demo" className="scroll-mt-16 border-y border-border bg-surface py-20">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8"><div className="mb-8 px-2 text-center"><span className="text-xs font-bold uppercase text-ai">Interaktiv mahsulot demosi</span><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">MediAI klinik ish maydoni</h2><p className="mt-3 text-sm text-muted-foreground">Bo‘limlarni tanlang va tibbiy tasvir tahlilini sinab ko‘ring.</p></div><ProductDemo t={t}/></div>
    </section>

    <section id="security" className="bg-hero py-20 text-hero-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8"><div><span className="text-xs font-bold uppercase text-primary">Mas’uliyatli tibbiy AI</span><h2 className="mt-4 max-w-xl font-display text-4xl font-semibold">AI yordam beradi. Yakuniy qarorni shifokor qabul qiladi.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-hero-foreground/60">MediAI natijalarni aniq tashxis sifatida emas, mutaxassis ko‘rib chiqishi kerak bo‘lgan yordamchi ma’lumot sifatida taqdim etadi.</p></div><div className="grid gap-3 sm:grid-cols-2">{([[ShieldCheck,"Maxfiylik birinchi o‘rinda"],[FileCheck2,"Nazorat qilinadigan natija"],[UsersRound,"Mutaxassisga yo‘naltirish"],[LockKeyhole,"Himoyalangan aloqa"]] as Array<[LucideIcon,string]>).map(([Icon,label])=><div key={label} className="flex items-center gap-4 border border-hero-foreground/10 bg-hero-foreground/5 p-5"><span className="grid size-10 place-items-center rounded-md bg-primary/15 text-primary"><Icon size={20}/></span><span className="text-sm font-semibold">{label}</span></div>)}</div></div></section>

    <section id="specialists" className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8"><div className="mx-auto max-w-2xl"><span className="text-xs font-bold uppercase text-primary">Sog‘liq uchun yaxlit yondashuv</span><h2 className="mt-4 font-display text-4xl font-semibold">Keyingi qadamni ishonch bilan tanlang.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Tasviringizni yuklang, AI yordamidagi xulosani ko‘ring va kerak bo‘lsa mutaxassisga murojaat qiling.</p><Button size="lg" className="mt-8" onClick={showDemo}>Demoni boshlash <ArrowRight size={17}/></Button></div></section>
    <footer className="border-t border-border py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:flex-row lg:px-8"><Logo/><p className="text-xs text-muted-foreground">© 2026 MediAI. AI natijalari tibbiy tashxis hisoblanmaydi.</p></div></footer>
  </main>;
}

function HeroDiagnostic() {
  return <div className="relative mx-auto w-full max-w-xl">
    <div className="absolute -inset-8 bg-primary/5 blur-3xl" />
    <div className="relative grid grid-cols-[1fr_130px] overflow-hidden rounded-lg border border-hero-foreground/12 bg-hero-foreground/5 shadow-2xl backdrop-blur-md sm:grid-cols-[1fr_180px]">
      <div className="relative aspect-[4/5] overflow-hidden border-r border-hero-foreground/10"><img src={chestScan} alt="Anonymized chest X-ray demo" width={1024} height={1024} className="h-full w-full object-cover"/><div className="absolute left-[22%] top-[25%] h-[40%] w-[23%] border border-primary/70 bg-primary/5"><span className="absolute -right-px -top-5 bg-primary px-2 py-1 text-[9px] font-bold text-primary-foreground">REGION 01</span></div><div className="absolute inset-x-0 bottom-0 bg-hero/85 p-3 text-[10px] text-hero-foreground/60 backdrop-blur"><span className="text-primary">●</span> CHEST PA · SAMPLE · ANONYMIZED</div></div>
      <div className="flex flex-col p-3 sm:p-5"><div className="flex items-center gap-2 border-b border-hero-foreground/10 pb-4"><BrainCircuit size={16} className="text-ai"/><span className="text-[10px] font-bold uppercase">AI analysis</span></div><div className="mt-5 space-y-5">{[["Image quality","Optimal"],["Regions checked","14 / 14"],["Review status","Complete"]].map(([a,b])=><div key={a}><p className="text-[9px] uppercase text-hero-foreground/40">{a}</p><p className="mt-1 text-xs font-semibold">{b}</p></div>)}</div><div className="mt-auto border-t border-hero-foreground/10 pt-4"><div className="flex items-center gap-2 text-[10px] text-primary"><Check size={13}/> Ready for review</div></div></div>
    </div>
    <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-md border border-hero-foreground/10 bg-hero px-4 py-3 shadow-xl"><span className="grid size-8 place-items-center rounded bg-primary/15 text-primary"><Activity size={16}/></span><div><div className="text-[9px] uppercase text-hero-foreground/40">Analysis time</div><div className="text-sm font-semibold">12.4 seconds</div></div></div>
  </div>;
}

const navIcons = { overview: Activity, radiology: ScanLine, advisor: BrainCircuit, doctors: Stethoscope, appointments: CalendarDays };

function ProductDemo({t}:{t:typeof copy.UZ}) {
  const [view,setView]=useState<View>("overview");
  const labels:Record<View,string>={overview:t.overview,radiology:t.scan,advisor:t.advisor,doctors:t.doctors,appointments:t.appointments};
  return <div className="relative min-h-[720px] overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
    <aside className="absolute inset-y-0 left-0 z-10 hidden w-60 flex-col border-r border-border bg-card p-4 md:flex"><Logo/><p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase text-muted-foreground">{t.workspace}</p><nav className="space-y-1">{(Object.keys(labels) as View[]).map(key=>{const Icon=navIcons[key];return <button key={key} onClick={()=>setView(key)} className={cn("flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",view===key?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-accent hover:text-foreground")}><Icon size={18}/>{labels[key]}</button>})}</nav><div className="mt-auto border-t border-border pt-4"><div className="flex items-center gap-3 px-2"><span className="grid size-9 place-items-center rounded-full bg-ai-soft text-ai"><CircleUserRound size={19}/></span><div><p className="text-xs font-semibold">Dilnoza Karimova</p><p className="text-[10px] text-muted-foreground">Patient account</p></div></div></div></aside>
    <div className="md:pl-60"><header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6"><div className="flex items-center gap-3"><PanelLeft size={19} className="md:hidden"/><span className="text-sm font-semibold">{labels[view]}</span></div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Search"><Search size={18}/></Button><Button variant="ghost" size="icon" aria-label="Notifications"><Bell size={18}/></Button><span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">DK</span></div></header>
      <div className="min-h-[654px] p-4 pb-24 sm:p-7 md:pb-7">{view==="overview"&&<Overview t={t} setView={setView}/>} {view==="radiology"&&<Radiology/>} {view==="advisor"&&<Advisor/>} {view==="doctors"&&<Doctors/>} {view==="appointments"&&<Appointments/>}</div>
    </div>
    <nav className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-background/95 p-1 backdrop-blur md:hidden">{(Object.keys(labels) as View[]).map(key=>{const Icon=navIcons[key];return <button key={key} onClick={()=>setView(key)} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded text-[9px] font-medium",view===key?"text-primary":"text-muted-foreground")}><Icon size={19}/><span className="max-w-full truncate">{labels[key]}</span></button>})}</nav>
  </div>;
}

function Overview({t,setView}:{t:typeof copy.UZ,setView:(v:View)=>void}) {
  return <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-medium text-primary">18 Sentabr, Juma</p><h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{t.morning}</h3><p className="mt-2 text-sm text-muted-foreground">Bugungi tibbiy holatingiz va keyingi qadamlar.</p></div><Button onClick={()=>setView("radiology")}><ScanLine size={17}/>Yangi tahlil</Button></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{([[ScanLine,"AI tahlillar","12","2 bu oy"],[CalendarDays,"Uchrashuvlar","03","1 ta yaqin"],[FileCheck2,"Retseptlar","04","Barchasi faol"],[MessageSquareText,"Xabarlar","02","Yangi xabar"]] as Array<[LucideIcon,string,string,string]>).map(([Icon,label,value,note])=><div key={label} className="border border-border bg-card p-4"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded bg-accent text-primary"><Icon size={18}/></span><span className="text-[10px] text-muted-foreground">{note}</span></div><p className="mt-5 text-xs text-muted-foreground">{label}</p><p className="mt-1 font-display text-2xl font-semibold">{value}</p></div>)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]"><section className="border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h4 className="font-display font-semibold">So‘nggi faollik</h4><p className="mt-1 text-xs text-muted-foreground">Sog‘liq tarixingizdagi yangiliklar</p></div><Button variant="ghost" size="sm">Barchasi</Button></div><div className="mt-5 space-y-1">{([[ScanLine,"Ko‘krak qafasi rentgeni","AI tahlili yakunlandi","Bugun, 09:42"],[Stethoscope,"Dr. Kamolova bilan konsultatsiya","Kardiologiya","Kecha, 16:30"],[FileCheck2,"Yangi elektron retsept","Dr. Rustamov","16 Sentabr"]] as Array<[LucideIcon,string,string,string]>).map(([Icon,title,sub,time])=><div key={title} className="flex items-center gap-3 border-b border-border py-3 last:border-0"><span className="grid size-9 shrink-0 place-items-center rounded bg-muted text-muted-foreground"><Icon size={17}/></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{title}</p><p className="mt-1 text-[10px] text-muted-foreground">{sub}</p></div><span className="text-[9px] text-muted-foreground">{time}</span></div>)}</div></section><section className="bg-hero p-5 text-hero-foreground"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-primary">Keyingi uchrashuv</span><CalendarDays size={18} className="text-primary"/></div><p className="mt-7 font-display text-lg font-semibold">Dr. Malika Kamolova</p><p className="mt-1 text-xs text-hero-foreground/50">Kardiolog · 12 yil tajriba</p><div className="mt-6 border-y border-hero-foreground/10 py-4"><p className="text-sm font-semibold">21 Sentabr · 10:30</p><p className="mt-1 text-[10px] text-hero-foreground/45">Video konsultatsiya · 30 daqiqa</p></div><Button className="mt-5 w-full" size="sm">Uchrashuvni ko‘rish</Button></section></div>
  </div>;
}

function Radiology(){const [scan,setScan]=useState("X-RAY");const [stage,setStage]=useState<"upload"|"processing"|"result">("upload");const input=useRef<HTMLInputElement>(null);const analyze=()=>{setStage("processing");window.setTimeout(()=>setStage("result"),1800)};return <div><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-xs font-bold text-ai"><Sparkles size={15}/>AI-ASSISTED ANALYSIS</div><h3 className="mt-2 font-display text-2xl font-semibold">Tibbiy tasvir tahlili</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">Tasvir turini tanlang va anonim namunani tahlil qiling.</p></div><span className="hidden rounded border border-border px-2 py-1 text-[10px] text-muted-foreground sm:block">DEMO MODE</span></div>
  <div className="mt-6 flex gap-2">{["X-RAY","MRI","ULTRASOUND"].map(s=><Button key={s} size="sm" variant={scan===s?"primary":"secondary"} onClick={()=>{setScan(s);setStage("upload")}}>{s}</Button>)}</div>
  {stage==="upload"&&<div className="mt-6 grid gap-5 lg:grid-cols-[1fr_.8fr]"><button onClick={()=>input.current?.click()} className="flex min-h-72 flex-col items-center justify-center border border-dashed border-primary/50 bg-accent/50 p-8 text-center transition-colors hover:bg-accent"><span className="grid size-14 place-items-center rounded-full bg-background text-primary shadow-sm"><UploadCloud size={25}/></span><p className="mt-5 text-sm font-semibold">{scan} tasvirini yuklang</p><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">DICOM, JPG yoki PNG · 20 MB gacha</p><span className="mt-5 text-xs font-semibold text-primary">Faylni tanlash</span><input ref={input} type="file" accept="image/*" className="hidden" onChange={analyze}/></button><div className="border border-border bg-card p-5"><h4 className="text-sm font-semibold">Yoki kameradan foydalaning</h4><p className="mt-2 text-xs leading-5 text-muted-foreground">Tibbiy tasvirni tekis joylashtiring va yorug‘lik aksini kamaytiring.</p><Button variant="secondary" className="mt-5 w-full" onClick={analyze}><Camera size={17}/>Kamerani ochish</Button><div className="mt-6 border-t border-border pt-5"><p className="text-[10px] font-bold uppercase text-muted-foreground">Tahlil bosqichlari</p>{["Tasvir sifatini tekshirish","Anatomik hududlarni ko‘rish","Yordamchi xulosani yaratish"].map((x,i)=><div key={x} className="mt-3 flex gap-3 text-xs"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-muted text-[9px] font-bold">{i+1}</span>{x}</div>)}</div></div></div>}
  {stage==="processing"&&<div className="mt-6 grid min-h-96 place-items-center border border-border bg-card text-center"><div><span className="mx-auto grid size-16 animate-pulse place-items-center rounded-full bg-ai-soft text-ai"><BrainCircuit size={28}/></span><h4 className="mt-5 font-display text-lg font-semibold">Tasvir tahlil qilinmoqda</h4><p className="mt-2 text-xs text-muted-foreground">Anatomik hududlar va tasvir sifati tekshirilmoqda...</p><div className="mx-auto mt-6 h-1.5 w-52 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/3 animate-pulse bg-primary"/></div></div></div>}
  {stage==="result"&&<div className="mt-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><div className="relative overflow-hidden bg-hero"><img src={chestScan} alt="Analyzed chest X-ray sample" width={1024} height={1024} className="h-full max-h-[460px] w-full object-contain"/><div className="absolute left-[26%] top-[25%] h-[36%] w-[22%] border border-primary"><span className="absolute -top-5 left-0 bg-primary px-2 py-1 text-[8px] font-bold text-primary-foreground">REVIEW AREA</span></div></div><div className="border border-border bg-card p-5"><div className="flex items-center gap-3 border-b border-border pb-4"><span className="grid size-9 place-items-center rounded bg-ai-soft text-ai"><Sparkles size={18}/></span><div><p className="text-xs font-bold">AI yordamidagi xulosa</p><p className="mt-0.5 text-[10px] text-success">Tahlil yakunlandi</p></div></div><div className="mt-5"><p className="text-[10px] font-bold uppercase text-muted-foreground">Potensial kuzatuv</p><p className="mt-2 text-sm font-semibold">Chap pastki o‘pka maydonida tekshiruv talab qiluvchi soha</p><p className="mt-3 text-xs leading-5 text-muted-foreground">Tasvir sifati yaxshi. Belgilangan hudud radiolog tomonidan professional ko‘rib chiqilishi tavsiya etiladi.</p></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="bg-muted p-3"><p className="text-[9px] uppercase text-muted-foreground">Ustuvorlik</p><p className="mt-1 text-xs font-semibold text-warning">O‘rta · Ko‘rib chiqish</p></div><div className="bg-muted p-3"><p className="text-[9px] uppercase text-muted-foreground">Mutaxassis</p><p className="mt-1 text-xs font-semibold">Radiolog</p></div></div><div className="mt-5 flex gap-2"><Button className="flex-1"><Stethoscope size={16}/>Shifokorga yuborish</Button><Button variant="secondary" onClick={()=>setStage("upload")}>Yangi tahlil</Button></div><div className="mt-5 flex gap-2 border-t border-border pt-4 text-[10px] leading-4 text-muted-foreground"><ShieldCheck size={15} className="shrink-0 text-primary"/><span>Bu tibbiy tashxis emas. Natija malakali mutaxassis tomonidan ko‘rib chiqilishi shart.</span></div></div></div>}
  </div>}

function Advisor(){return <Placeholder icon={BrainCircuit} tag="AI MEDICAL ADVISOR" title="Alomatlaringizni tushunarli tartibga soling." text="Yosh, alomat va mavjud natijalar asosida keyingi xavfsiz qadamlar uchun yordamchi ma’lumot oling." action="Yangi suhbatni boshlash"/>}
function Doctors(){return <div><HeaderBlock tag="MUTAXASSISLAR" title="Sizga mos shifokorni toping" text="Yo‘nalish va mavjud vaqt bo‘yicha mutaxassislarni ko‘ring."/><div className="mt-6 grid gap-3 sm:grid-cols-2">{[["MK","Dr. Malika Kamolova","Kardiolog","Bugun · 16:30"],["AR","Dr. Aziz Rustamov","Radiolog","Ertaga · 09:00"],["SN","Dr. Saida Nurmatova","Terapevt","20 Sentabr · 11:30"]].map(([a,n,s,time])=><div key={n} className="flex items-center gap-4 border border-border bg-card p-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-primary">{a}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{n}</p><p className="text-xs text-muted-foreground">{s}</p><p className="mt-2 text-[10px] font-semibold text-success">● {time}</p></div><Button size="icon" variant="secondary"><ChevronRight size={17}/></Button></div>)}</div></div>}
function Appointments(){return <div><HeaderBlock tag="QABULLAR" title="Uchrashuvlaringiz" text="Yaqin va o‘tgan konsultatsiyalarni boshqaring."/><div className="mt-6 border border-border bg-card"><div className="grid grid-cols-[72px_1fr] border-b border-border p-5"><div><p className="font-display text-2xl font-semibold text-primary">21</p><p className="text-[10px] uppercase text-muted-foreground">Sentabr</p></div><div className="border-l border-border pl-5"><span className="text-[10px] font-semibold text-success">TASDIQLANGAN · 10:30</span><h4 className="mt-2 text-sm font-semibold">Dr. Malika Kamolova</h4><p className="mt-1 text-xs text-muted-foreground">Kardiologiya · Video konsultatsiya</p><div className="mt-4 flex gap-2"><Button size="sm">Qo‘shilish</Button><Button size="sm" variant="secondary">Batafsil</Button></div></div></div></div></div>}
function HeaderBlock({tag,title,text}:{tag:string,title:string,text:string}){return <div><p className="text-[10px] font-bold text-primary">{tag}</p><h3 className="mt-2 font-display text-2xl font-semibold">{title}</h3><p className="mt-2 text-xs text-muted-foreground">{text}</p></div>}
function Placeholder({icon:Icon,tag,title,text,action}:{icon:typeof BrainCircuit,tag:string,title:string,text:string,action:string}){return <div><HeaderBlock tag={tag} title={title} text={text}/><div className="mt-7 grid min-h-80 place-items-center border border-border bg-card p-8 text-center"><div><span className="mx-auto grid size-14 place-items-center rounded-full bg-ai-soft text-ai"><Icon size={24}/></span><h4 className="mt-5 text-sm font-semibold">Sog‘lig‘ingiz haqida nimani tushunmoqchisiz?</h4><p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-muted-foreground">AI yordamchi ma’lumot beradi, lekin shifokor maslahatini almashtirmaydi.</p><Button className="mt-6">{action}<ArrowRight size={16}/></Button></div></div></div>}