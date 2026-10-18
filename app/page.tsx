import {flushSync} from 'react-dom';
import {registerAtlasTools} from './agent-tools';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Activity,ArrowUpRight,ChevronRight,Focus,GraduationCap,Info,Languages,Layers3,Pause,RotateCcw,RotateCw,Search,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {Combobox,ComboboxInput,ComboboxContent,ComboboxList,ComboboxItem,ComboboxEmpty} from '@/components/ui/combobox';
import AnatomyScene from './scene';
import QuizModal from './quiz-modal';
import {DEFAULT_VISIBLE,SYSTEMS,type Atlas,type Concept,type SceneState,type SystemId,type View} from './anatomy';
import {type Language,UI_TEXT,SYSTEMS_EN,SYSTEMS_ID,getExplanation,translateAnatomyName,formatConceptDisplayName,searchAtlasConcepts} from './i18n';
const initial:SceneState={explode:0,visible:DEFAULT_VISIBLE,selected:[],isolate:false,view:'three-quarter',rotate:false,reset:0};
export default function Home(){
 const detailTitle=useRef<HTMLHeadingElement>(null);
 const [lang,setLang]=useState<Language>(()=>{
  if(typeof window!=='undefined'){
   const saved=localStorage.getItem('human_atlas_lang');
   if(saved==='en'||saved==='id')return saved;
  }
  return 'id';
 });
 const toggleLang=()=>{
  const next=lang==='id'?'en':'id';
  setLang(next);
  if(typeof window!=='undefined')localStorage.setItem('human_atlas_lang',next);
 };
 const t=UI_TEXT[lang];
 const systems=useMemo(()=>{
  const map=lang==='id'?SYSTEMS_ID:SYSTEMS_EN;
  return SYSTEMS.map(s=>({...s,name:map[s.id]?.name??s.name,description:map[s.id]?.description??s.description}));
 },[lang]);

 const [atlas,setAtlas]=useState<Atlas|null>(null),[state,setState]=useState(initial),[progress,setProgress]=useState(0),[error,setError]=useState(''),[panel,setPanel]=useState<'layers'|'search'|null>(null),[details,setDetails]=useState(false),[about,setAbout]=useState(false),[query,setQuery]=useState(''),[chosen,setChosen]=useState<Concept|null>(null),[quizOpen,setQuizOpen]=useState(false);
 useEffect(()=>{const abort=new AbortController();setProgress(0);setError('');setAtlas(null);setChosen(null);setDetails(false);setState({...initial,visible:DEFAULT_VISIBLE});fetch('/models/atlas.json',{signal:abort.signal}).then(r=>{if(!r.ok)throw new Error('The anatomy catalogue could not be loaded.');return r.json();}).then(data=>setAtlas(data as Atlas)).catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>abort.abort();},[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='/'&&!(e.target instanceof HTMLInputElement)&&!(e.target instanceof HTMLTextAreaElement)){e.preventDefault();setPanel('search');setDetails(false);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
 const parts=useMemo(()=>new Map(atlas?.parts.map(p=>[p.id,p])),[atlas]);
 const counts=useMemo(()=>Object.fromEntries(systems.map(s=>[s.id,atlas?.parts.filter(p=>p.system===s.id).length??0])),[atlas,systems]);
 const activeSystems=systems.filter(s=>counts[s.id]>0);
 const selectedParts=state.selected.map(id=>parts.get(id)).filter(p=>!!p),selected=selectedParts[0],system=systems.find(s=>s.id===selected?.system);
 const visibleCount=atlas?.parts.filter(p=>state.isolate?state.selected.includes(p.id):state.visible.includes(p.system)||state.selected.includes(p.id)).length??0;
 const results=useMemo(()=>searchAtlasConcepts(atlas,query,lang),[atlas,query,lang]);
 const choose=(c:Concept)=>{setChosen(c);setState(s=>({...s,selected:c.elements,isolate:false,rotate:false}));setDetails(true);setPanel(null);};
 useEffect(()=>{if(!atlas)return;return registerAtlasTools(atlas,c=>flushSync(()=>choose(c)));},[atlas]);
 const choosePart=(id:string)=>{const p=parts.get(id);if(!p)return;setChosen({id:p.conceptId,name:p.name,elements:[id]});setState(s=>({...s,selected:[id],isolate:false,rotate:false}));setDetails(true);setPanel(null);};
 const toggle=(id:SystemId)=>{setDetails(false);setState(s=>({...s,selected:[],isolate:false,visible:s.visible.includes(id)?s.visible.filter(x=>x!==id):[...s.visible,id]}));};
 const reset=()=>{setState(s=>({...initial,visible:DEFAULT_VISIBLE,reset:s.reset+1}));setChosen(null);setDetails(false);setPanel(null);};
 const openPanel=(next:'layers'|'search')=>{setDetails(false);setPanel(p=>p===next?null:next);};
 const inspectFromQuiz=(term:string)=>{
  if(!atlas)return;
  const q=term.toLowerCase().trim();
  const match=atlas.concepts.find(c=>c.name.toLowerCase()===q)||atlas.concepts.find(c=>c.name.toLowerCase().includes(q));
  if(match)choose(match);
 };
 useEffect(()=>{
  if(!atlas||progress<100)return;
  const captureOrganSnapshots=async()=>{
   try{
    const testRes=await fetch('/api/check-snapshots');
    const {exists}=(await testRes.json()) as {exists:boolean};
    if(exists)return;
   }catch{}
   const organList:[string,string][]=[
    ['heart','heart'],
    ['femur','femur'],
    ['brain','brain'],
    ['liver','liver'],
    ['diaphragm','diaphragm'],
    ['urinary bladder','urinary-bladder'],
    ['aorta','aorta'],
    ['spleen','spleen'],
    ['thyroid cartilage','thyroid-cartilage'],
    ['chamber of eyeball','eyeball'],
    ['rib','rib'],
    ['stomach','stomach'],
    ['kidney','kidney'],
    ['skull','skull'],
    ['pancreas','pancreas']
   ];
   await new Promise(r=>setTimeout(r,1200));
   for(const [term,out] of organList){
    const q=term.toLowerCase().trim();
    const match=atlas.concepts.find(c=>c.name.toLowerCase()===q)||atlas.concepts.find(c=>c.name.toLowerCase().includes(q));
    if(match){
     setChosen(match);
     setState(s=>({...s,selected:match.elements,isolate:true,explode:0}));
     await new Promise(r=>setTimeout(r,750));
     const dataUrl=(window as any).__sceneCapture?.();
     if(dataUrl){
      await fetch('/api/save-snapshot',{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({name:out,dataUrl})
      });
     }
    }
   }
   setState(s=>({...initial,visible:DEFAULT_VISIBLE}));
   setChosen(null);
   setDetails(false);
  };
  captureOrganSnapshots();
 },[atlas,progress]);
 return <main className="studio">
  {atlas&&<AnatomyScene atlas={atlas} state={{...state,inspectorOpen:details&&selectedParts.length>0}} lang={lang} onSelect={choosePart} onProgress={n=>{setProgress(n);if(n===100)setError('');}} onError={setError}/>}
  <div className="vignette"/>
  <header className="identity"><div className="eyebrow"><span className="status-dot"/> {t.appEyebrow}</div><h1>{t.appTitle}<Badge variant="outline" className="edition">3D</Badge></h1><div className="identity-meta">{atlas?atlas.parts.length.toLocaleString():'2,234'} {t.modeledPieces} <span>·</span> BodyParts3D</div></header>
  <nav className="top-actions" aria-label="Explorer panels">
   <Button variant="ghost" className="lang-toggle-btn" onClick={toggleLang} aria-label={t.langToggle} title={t.langToggle}>
    <Languages size={17}/>
    <span className="lang-pill"><b className={lang==='id'?'active':''}>ID</b><i></i><b className={lang==='en'?'active':''}>EN</b></span>
   </Button>
   <Button variant="ghost" className="quiz-top-btn" onClick={()=>{setDetails(false);setPanel(null);setQuizOpen(true);}} aria-label={lang==='id'?'Kuis Anatomi':'Anatomy Quiz'} title={lang==='id'?'Kuis Anatomi Interaktif':'Interactive Anatomy Quiz'}>
    <GraduationCap size={18}/>
    <span>{lang==='id'?'Kuis Anatomi':'Anatomy Quiz'}</span>
   </Button>
   <Button variant="ghost" className={panel==='search'?'active':''} onClick={()=>openPanel('search')} aria-label={t.searchAria}><Search size={18}/><span>{t.searchButton}</span><kbd>{t.searchKbd}</kbd></Button>
   <Button variant="ghost" className="icon-button" aria-label={t.aboutButton} onClick={()=>{setDetails(false);setPanel(null);setAbout(true);}}><Info size={18}/></Button>
  </nav>
  <section className={`layers-panel glass ${panel==='layers'?'mobile-open':''}`} aria-label={t.systemsTitle}>
   <div className="panel-heading"><span>{t.systemsTitle}</span><Button variant="ghost" className="mobile-only icon-button" onClick={()=>setPanel(null)} aria-label={t.closeSystemsAria}><X size={18}/></Button><Badge variant="secondary" className="desktop-only small-number">{activeSystems.length}</Badge></div>
   <div className="layer-presets"><Button variant="ghost" aria-pressed={activeSystems.every(x=>state.visible.includes(x.id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:activeSystems.map(x=>x.id)}))}>{t.allPreset}</Button><Button variant="ghost" aria-pressed={state.visible.length===1&&state.visible[0]==='skeletal'} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['skeletal']}))}>{t.skeletonPreset}</Button><Button variant="ghost" aria-pressed={state.visible.length===6&&['cardiac','respiratory','digestive','urinary','endocrine','reproductive'].every(id=>state.visible.includes(id as SystemId))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['cardiac','respiratory','digestive','urinary','endocrine','reproductive']}))}>{t.organsPreset}</Button></div>
   <div className="system-list">{activeSystems.map(s=><div className={`system-row ${state.visible.includes(s.id)?'enabled':''}`} key={s.id}><Button variant="ghost" className="system-name" title={`${t.showOnlyPrefix} ${s.name.toLowerCase()}`} onClick={()=>setState(v=>({...v,visible:[s.id],isolate:false,selected:[]}))}><span className="system-dot" style={{background:s.color}}/>{s.name}<span className="system-count">{counts[s.id]}</span></Button><Switch checked={state.visible.includes(s.id)} onCheckedChange={()=>toggle(s.id)} aria-label={`${t.showPrefix} ${s.name.toLowerCase()}`} /></div>)}</div>
   <div className="panel-foot"><span>{visibleCount.toLocaleString()} {t.piecesVisible}</span><Button variant="ghost" onClick={()=>setState(s=>({...s,visible:[],selected:[],isolate:false}))}>{t.hideAll}</Button></div>
  </section>
  {panel==='search'&&<section className="search-panel glass" aria-label={t.searchPanelTitle}><div className="panel-heading"><span>{t.searchPanelTitle}</span><Button variant="ghost" className="icon-button" onClick={()=>setPanel(null)} aria-label={t.closeSearchAria}><X size={18}/></Button></div><Combobox<Concept> items={results} value={null} onValueChange={value=>{if(value)choose(value);}} inputValue={query} onInputValueChange={setQuery} itemToStringLabel={c=>lang==='id'?formatConceptDisplayName(c,lang):c.name} filter={null} open onOpenChange={open=>{if(!open)setPanel(null);}}><ComboboxInput autoFocus placeholder={t.searchPlaceholder} aria-label={t.searchAriaInput} showTrigger={false}/><ComboboxContent className="anatomy-search-results"><ComboboxEmpty>{t.noMatch}</ComboboxEmpty><ComboboxList>{(c:Concept)=><ComboboxItem key={c.id} value={c}><span className="search-result-name">{lang==='id'?formatConceptDisplayName(c,lang):c.name}</span><span className="small-number">{c.elements.length} {c.elements.length===1?t.pieceSingle:t.piecePlural}</span></ComboboxItem>}</ComboboxList></ComboboxContent></Combobox><p className="search-note">{query?t.searchNoteQuery:t.searchNoteEmpty}</p></section>}
  <nav className="view-controls glass" aria-label="Camera controls">{(['three-quarter','front','side','back'] as View[]).map((v,i)=><Button variant="ghost" key={v} className={state.view===v?'active':''} aria-pressed={state.view===v} disabled={state.explode>.8&&v!=='front'} onClick={()=>setState(s=>({...s,view:v,reset:s.reset+1,rotate:false}))} title={v==='three-quarter'?t.viewThreeQuarter:v==='front'?t.viewFront:v==='side'?t.viewSide:t.viewBack} aria-label={v==='three-quarter'?t.viewThreeQuarter:v==='front'?t.viewFront:v==='side'?t.viewSide:t.viewBack}><span>{['¾','F','S','B'][i]}</span></Button>)}<i/><Button variant="ghost" disabled={state.explode>=.4} aria-label={state.rotate?t.pauseRotation:t.rotateBody} title={t.autoRotate} className={state.rotate?'active':''} onClick={()=>setState(s=>({...s,rotate:!s.rotate}))}>{state.rotate?<Pause size={17}/>:<RotateCw size={18}/>}</Button><Button variant="ghost" aria-label={t.resetView} title={t.reset} onClick={reset}><RotateCcw size={17}/></Button></nav>
  <div className="scene-caption"><span className="caption-line"/><span>{state.isolate?(chosen?(lang==='id'?translateAnatomyName(chosen.name).toUpperCase():chosen.name):t.captionSelected):state.explode>.95?t.captionInventory:state.explode>.05?t.captionSeparated:t.captionAssembled}</span><span className="caption-line"/></div>
  <div className="bottom-dock glass"><Button variant="ghost" className="mobile-only dock-layers" onClick={()=>openPanel('layers')} aria-label={t.dockSystems}><Layers3 size={20}/><span>{t.dockSystems}</span></Button><div className="explode-control"><div className="explode-label"><label id="explode-label">{t.explodeAnatomy}</label><output>{Math.round(state.explode*100)}<span>%</span></output></div><Slider aria-labelledby="explode-label" min={0} max={100} step={1} value={[state.explode*100]} onValueChange={v=>setState(s=>({...s,explode:(Array.isArray(v)?v[0]:v)/100,view:(Array.isArray(v)?v[0]:v)>80?'front':s.view,rotate:false}))}/><div className="slider-endpoints"><span>{t.assembledLabel}</span><span>{t.everyPieceLabel}</span></div></div><Button variant="ghost" className="dock-reset" onClick={reset} aria-label={t.assembleAndReset}><RotateCcw size={18}/><span>{t.reset}</span></Button></div>
  <footer className="studio-footer"><span>{state.explode>.8?t.dragToPan:t.dragToOrbit} <b>·</b> {t.pinchToZoom} <b>·</b> {t.tapToInspect}</span><Button variant="ghost" onClick={()=>{setDetails(false);setPanel(null);setAbout(true);}}>{t.sourceCredits} <ArrowUpRight size={12}/></Button></footer>
  {progress<100&&!error&&<div className="loading glass" role="status"><Activity size={18}/><div><strong>{t.loadingPreparing}</strong><span>{progress}% · {t.loadingPieces.replace('{count}',atlas?.parts.length.toLocaleString()??'2,234')}</span><div className="loading-track"><i style={{width:`${progress}%`}}/></div></div></div>}
  {error&&<div className="loading glass error" role="alert"><p>{error}</p><Button variant="ghost" onClick={()=>location.reload()}>{t.reloadViewer}</Button></div>}
  <Sheet open={details&&selectedParts.length>0} modal={false} disablePointerDismissal onOpenChange={setDetails}><SheetContent initialFocus={detailTitle} className={`detail-sheet glass ${state.isolate?'is-isolated':''}`} showCloseButton={true}><div className="detail-header"><div className="detail-accent" style={{background:system?.color}}/><div className="eyebrow">{system?.name??t.anatomyEyebrow}</div><SheetTitle ref={detailTitle} tabIndex={-1} className="structure-title">{chosen&&(lang==='id'?translateAnatomyName(chosen.name):chosen.name)}</SheetTitle>{lang==='id'&&chosen&&translateAnatomyName(chosen.name).toLowerCase()!==chosen.name.toLowerCase()&&<span className="scientific-name">Terminologi Medis/Anatomi: <em>{chosen.name}</em></span>}</div><div className="detail-scroll" key={`${chosen?.id}-${state.isolate}-${lang}`}><SheetDescription className="structure-description">{chosen&&selected?getExplanation(chosen.name,selected.system,lang):''}</SheetDescription><span className="context-note">{t.systemOverviewNote}</span><div className="structure-meta"><span>{t.atlasReference}<strong>{chosen?.id}</strong></span><span>{t.selectedPieces}<strong>{state.selected.length.toLocaleString()}</strong></span></div>{selectedParts.length>1&&<div className="member-list"><h3>{t.includedStructures}</h3>{selectedParts.slice(0,50).map(p=><Button variant="ghost" key={p.id} onClick={()=>choosePart(p.id)}><span>{lang==='id'?`${translateAnatomyName(p.name)} (${p.name})`:p.name}</span><ChevronRight size={14}/></Button>)}{selectedParts.length>50&&<p>{t.andMorePieces.replace('{count}',String(selectedParts.length-50))}</p>}</div>}<a className="source-link" href="https://lifesciencedb.jp/bp3d/" target="_blank" rel="noreferrer">{t.viewAnatomicalSource} <ArrowUpRight size={14}/></a></div><div className="detail-actions"><Button className={`primary-action ${state.isolate?'active':''}`} onClick={()=>setState(s=>({...s,isolate:!s.isolate,explode:0}))}><Focus size={18}/>{state.isolate?t.showSurrounding:t.isolateStructure}<ChevronRight size={16}/></Button><Button variant="ghost" className="secondary-action" onClick={()=>{setState(s=>({...s,selected:[],isolate:false}));setDetails(false);}}>{t.clearSelection}</Button></div></SheetContent></Sheet>
  <Sheet open={about} onOpenChange={setAbout}><SheetContent className="about-sheet glass"><div className="eyebrow">{t.aboutEyebrow}</div><SheetTitle className="structure-title">{t.aboutTitle}</SheetTitle><SheetDescription>{t.aboutSubtitle}</SheetDescription><div className="about-copy"><p><strong>{t.aboutP1Strong}</strong><br/>{t.aboutP1}</p><p>{t.aboutP2}</p><p>{t.aboutP3}</p><h3>{t.aboutSourceHeading}</h3><p>{t.aboutSourceDesc}</p><a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html" target="_blank" rel="noreferrer">{t.aboutDatasetLicense} <ArrowUpRight size={14}/></a><a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noreferrer">{t.aboutOriginalGeometry} <ArrowUpRight size={14}/></a><a href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752" target="_blank" rel="noreferrer">{t.aboutReadPublication} <ArrowUpRight size={14}/></a></div></SheetContent></Sheet>
  <QuizModal isOpen={quizOpen} onClose={()=>setQuizOpen(false)} lang={lang} onInspectStructure={inspectFromQuiz}/>
 </main>;
}

