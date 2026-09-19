(async function(){
  let DATA;
  try {
    const p1=(await(await fetch('cards.b64.part1',{cache:'no-store'})).text()).trim();
    const p2=(await(await fetch('cards.b64.part2',{cache:'no-store'})).text()).trim();
    const b64=(p1+p2).trim();
    const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
    const text=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    DATA=JSON.parse(text);
  } catch(err) {
    console.warn('b64 parts failed, trying cards.json', err);
    const res=await fetch('cards.json',{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    DATA=await res.json();
  }
  window.__BOARD_DATA__=DATA;
  const s=document.createElement('script');
  s.src='board-app.js';
  document.body.appendChild(s);
})();
