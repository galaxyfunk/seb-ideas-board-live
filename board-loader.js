(async function(){
  try {
    const css = await (await fetch('styles.css',{cache:'no-store'})).text();
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    const js = await (await fetch('board-app.js',{cache:'no-store'})).text();
    (0, eval)(js);
  } catch (err) {
    console.error(err);
    document.body.innerHTML = '<main style="font-family:system-ui;padding:2rem"><h1>Seb Ideas Board</h1><p>Failed to load board: '+String(err)+'</p></main>';
  }
})();
