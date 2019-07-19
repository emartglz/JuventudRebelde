const news = document.querySelector('.news');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
});
function f(doc){

  // var temp = doc.getElementsByTagName('a')
  // for(var i = 0; i < temp.length; i++)
  // {
  //   temp[i].remove();
  // }

  var a = doc.getElementsByTagName('div')
  for(var i = 0; i < a.length; i++)
  {
      if(a[i].className.includes('suplemento-news'))
      return a[i];
  }
  for(var i = 0; i < a.length; i++)
  {
      if(a[i].className.includes('news-content'))
      return a[i];
  }
}

news.addEventListener('click', evt => {
  evt.preventDefault();
  
  url = evt.target.parentElement.href
  console.log(evt.target.parentElement.href);
  fetch(`/get_url?url=${url}`)
    .then(response => response.text())
    .then(html => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html,"text/html");

      console.log(f(htmlDoc))

    document.getElementById('items').innerHTML = f(htmlDoc).innerHTML;
    //document.body.onclick= function(){
      //document.body.style.background='url("/static/img/fondo3.jpg") no-repeat';
      document.body.style.background='none';
    //}
  });
});

// render new data
// const renderNew = (data, id) => {

//   const html = `
//     <div class="card-panel new white row" data-id="${id}">
//       <img src="/img/dish.png" alt="recipe thumb">
//       <div class="new-details">
//         <div class="new-title">${data.title}</div>
//         <div class="new-content">${data.content}</div>
//       </div>
//     </div>
//   `;
//   recipes.innerHTML += html;

// };