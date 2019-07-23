const news = document.querySelector('.news');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
});
function f(doc, url){
  var a = doc.getElementsByTagName('div')
  for(var i = 0; i < a.length; i++)
  {
      if(a[i].className.includes('suplemento-news'))
      {
        var t = a[i];
        var h = t.getElementsByTagName('h4')
        for(var j = 0; j < h.length; j++)
        {
          if(h[j].innerHTML.includes('Comparte esta noticia'))
          {
            var erase = h[j];
            erase.parentElement.parentElement.remove();
          }
        }
        var more = document.createElement('a')
        more.href = url
        more.className = 'more';
        more.innerHTML = "<h4>Visita la noticia en el sitio original y comenta.</h4>"
        a[i].appendChild(more);
        return a[i];
      }
      
  }
  for(var i = 0; i < a.length; i++)
  {
      if(a[i].className.includes('news-content'))
      {
        var t = a[i];
        var h = t.getElementsByTagName('h4')
        for(var j = 0; j < h.length; j++)
        {
          if(h[j].innerHTML.includes('Comparte esta noticia'))
          {
            var erase = h[j];
            erase.parentElement.parentElement.remove();
          }
        }
        var more = document.createElement('a')
        more.href = url;
        more.className = 'more';
        more.innerHTML = "<h4>Visita la noticia en el sitio original y comenta.</h4>"
        a[i].appendChild(more);
        return a[i];
      }
  }
}

news.addEventListener('click', evt => {
  // console.log(evt.target)
  evt.preventDefault();
  if(evt.target.parentElement.parentElement.className.includes('recipes'))
  {
    url = evt.target.parentElement.href
    // console.log(url);
    fetch(`/get_url?url=${url}`)
      .then(response => response.text())
      .then(html => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(html,"text/html");

        // console.log(f(htmlDoc))

      document.getElementById('items').innerHTML = f(htmlDoc, url).innerHTML;
      document.body.style.background='none';
    });
  }
  else if(evt.target.parentElement.className.includes('more'))
  {
    var link = evt.target.parentElement.href;
    window.open(link);
  }
});
