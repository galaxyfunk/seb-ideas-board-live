(async function(){
  const man=await (await fetch('cards-manifest.json',{cache:'no-store'})).json();
  const meta=await (await fetch(man.meta,{cache:'no-store'})).json();
  const cards=await Promise.all(man.cards.map(async id=>{
    const r=await fetch('cards/'+id+'.json',{cache:'no-store'});
    if(!r.ok) throw new Error('card '+id+' '+r.status);
    return r.json();
  }));
  window.__BOARD_DATA__=Object.assign({}, meta, {cards});
  for (const src of ['board-app-0.js','board-app-1.js','board-app-2.js']) {
    await new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.onload=resolve;
      s.onerror=()=>reject(new Error('fail '+src));
      document.body.appendChild(s);
    });
  }
})();
