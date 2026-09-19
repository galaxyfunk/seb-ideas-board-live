(async function(){
  async function gunzipParts(prefix, n){
    const parts = await Promise.all([...Array(n).keys()].map(i =>
      fetch(prefix+i+'.b64',{cache:'no-store'}).then(r => {
        if(!r.ok) throw new Error(prefix+i+'.b64 '+r.status);
        return r.text();
      })
    ));
    const b64 = parts.map(t => t.trim()).join('');
    const pad = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    const bytes = Uint8Array.from(atob(pad), c => c.charCodeAt(0));
    return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  }
  try {
    const css = await gunzipParts('t', 2);
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    const js = await gunzipParts('a', 4);
    (0, eval)(js);
  } catch (err) {
    console.error(err);
    document.body.innerHTML = '<main style="font-family:system-ui;padding:2rem"><h1>Seb Ideas Board</h1><p>Failed to load board: '+String(err)+'</p></main>';
  }
})();
