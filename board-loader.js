(async function(){
  try {
    const parts = await Promise.all([0,1,2].map(i => fetch('j'+i+'.b64',{cache:'no-store'}).then(r=>r.text())));
    const b64 = parts.map(t => t.trim()).join('');
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const text = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    (0, eval)(text);
  } catch (err) {
    console.error(err);
    document.body.innerHTML = '<main style="font-family:system-ui;padding:2rem"><h1>Seb Ideas Board</h1><p>Failed to load board-loader: '+String(err)+'</p></main>';
  }
})();
