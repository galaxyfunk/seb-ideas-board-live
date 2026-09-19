(async function(){
  try {
    const cssParts = await Promise.all(['styles-a.css','styles-b.css'].map(u => fetch(u,{cache:'no-store'}).then(r=>{
      if(!r.ok) throw new Error(u+' '+r.status);
      return r.text();
    })));
    const st = document.createElement('style');
    st.textContent = cssParts.join('');
    document.head.appendChild(st);
    const parts = await Promise.all([...Array(5).keys()].map(i => fetch('board-app-'+i+'.js',{cache:'no-store'}).then(r=>{
      if(!r.ok) throw new Error('board-app-'+i+'.js '+r.status);
      return r.text();
    })));
    (0, eval)(parts.join(''));
  } catch (err) {
    console.error(err);
    document.body.innerHTML = '<main style="font-family:system-ui;padding:2rem"><h1>Seb Ideas Board</h1><p>Failed to load board: '+String(err)+'</p></main>';
  }
})();
