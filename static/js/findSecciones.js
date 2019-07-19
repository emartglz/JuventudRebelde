//const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())

fetch('/js/urlSecciones.json').then((res) => {
	res.text().then((data) => {
		var frag = document.createDocumentFragment()
		var hasBegun = true;
		JSON.parse(data).urls.forEach((u) => {
			try {
                var url = new URL(u);
                console.log(url);
			}
			catch (e) {
				console.error('URL invalid');
				return
            }

            //const t = (entry, tname) => entry.getElementsByTagName(tname)[0];
            //const date = entry => new Date(t(entry, 'updated').textContent).getDate();
            //const html2txt = html => html.replace(/<(?:.|\n)*?>/gm, '');
            //const content = entry => html2txt(t(entry, 'content').textContent).slice(0, 200);
                
            fetch(`/get_url?url=${url}`)
              .then(response => response.text())
              .then(html => {
              const parser = new DOMParser();
              const htmlDoc = parser.parseFromString(html,"text/html");
              console.log(htmlDoc);
            
              var divTags= htmlDoc.getElementsByTagName('div')
              var searchText= "CANALES RSS DE JUVENTUD REBELDE"

           
              var found;
              console.log(divTags.length);

              for (var i = 0; i < divTags.length; i++) {
                
                if (divTags[i].textContent.toString().includes(searchText)) {
                 found = divTags[i];               
            
                      }
                  }
                 var lists=found.getElementsByTagName("li");
                 console.log(lists);
                
                 var menu= document.getElementById("side-menu");  
                 for(var i=0; i<lists.length;i++){
                    var sublist= lists[i]
                    var h4= sublist.getElementsByTagName('h4')[0];
                    var Section= h4.innerText;                    
                   
                   // <li><a href="#" class="waves-effect" class="secciones">
                   // <i class= "material-icons">import_contacts</i>Noticias</a></li>

                    var header= document.createElement('li')
                    var n1= document.createElement('a')
                    
                    n1.className="subheader";
                    n1.innerText=Section;  
                    var n2=document.createElement('i');
                    n2.className="material-icons";
                    switch(Section)
                    {
                       case "Noticias":
                       {
                        n2.innerText="import_contacts";
                        break;
                       }
                       case "Columnas":
                       {
                        n2.innerText="view_week";
                        break;
                       }
                       case "Suplementos":
                       {
                        n2.innerText="polymer";
                        break;
                       }
                       default :
                       {
                        n2.innerText="layers";
                        break;
                       }
                      
                    }
                    n1.appendChild(n2);
                    header.appendChild(n1);
                   
                    var ul= document.createElement('ul');
                  
                     ul.style= "margin-left: 10px";
                  
                    var aList= sublist.getElementsByTagName('a');
                     for (let index = 0; index < aList.length; index++) {
                       const element = aList[index]
                    
                       var string= element.getElementsByTagName('p')[0].innerText;
                      if(string.length>25){
                       string= string.substring(0,20);
                       string+="...";}
                       var liNew= document.createElement('li');

                       var aLi = document.createElement('a');
                       aLi.className="waves-effect";
                       //este cacho no estaba antes
                       
                       //hast aqui llega el cacho
                       aLi.href= "#";
                       aLi.onclick= function(){
                        
                        var elem = document.querySelectorAll('.sidenav')[0];
                        var instance = M.Sidenav.getInstance(elem);
                        instance.close();
                        

                         var url = element.href;
                         const t = (entry, tname) => entry.getElementsByTagName(tname)[0];
                         const date = entry => new Date(t(entry, 'updated').textContent).toUTCString();
                         const html2txt = html => html.replace(/<(?:.|\n)*?>/gm, '');
                         const content = entry => html2txt(t(entry, 'content').textContent).slice(0, 200);
                                     
                         fetch(`/get_url?url=${url}`)
                           .then(response => response.text())
                           .then(xml => {
                           const parser = new DOMParser();
                           const xmlDoc = parser.parseFromString(xml,"text/xml");
             
                           const html = Array.from(xmlDoc.getElementsByTagName('entry')).map(entry => `
                             <div class="entry card-panel recipes white row">
                               
                               <div class="timestamp">${date(entry)}</div>
                               <a href="${t(entry, 'link').getAttribute('href')}">
                                 <div class="entry-title">${t(entry, 'title').innerHTML.replace(/<!\[CDATA\[(.*)\]\]>/g, "$1")}</div>
                               </a>
                               <div class="content">${content(entry)}&hellip;</div>
                             </div>`);
             
             
                           console.log(document.getElementById('items'))
                           document.getElementById('items').innerHTML = html.join('');
                           
                           var m =document.getElementById('menu-icon');
                           m.style.animation="fixed";
                           document.body.style.background='url("/static/img/fondo.png") no-repeat';
                           document.body.style.backgroundSize= 'cover';
                           document.body.style.backgroundPosition='center,top';
                           document.body.style.backgroundAttachment='fixed';
                         })
                        
                       }
                       
                       var icon= document.createElement('i');
                       icon.className="material-icons";
                       switch(string)
                       {
                          case "Generales":
                          {
                            icon.innerText="public";
                            break;
                          }

                          case "Cuba":
                          {
                            icon.innerText="gps_fixed";
                            break;
                          }

                          case "Internacionales":
                          {
                            icon.innerText="gps_not_fixed";
                            break;
                          }

                          case "Deportes":
                          {
                            icon.innerText="rowing";
                            break;
                          }

                          case "Cultura":
                          {
                            icon.innerText="palette";
                            break;
                          }

                          case "Ciencia y Técnica":
                          {
                            icon.innerText="personal_video";
                            break;
                          }

                          case "Opinión":
                          {
                            icon.innerText="poll";
                            break;
                          }

                          default :
                          {                           
                              icon.innerText="layers";
                              break;                            
                          }
                       } 
                       aLi.innerText=string;  
                       aLi.appendChild(icon);
                                             
                       liNew.appendChild(aLi); 
                       ul.appendChild(liNew)
                     }
                    header.appendChild(ul);
                     
                    menu.appendChild(header);

                   
                    var separador= document.createElement('li');
                    var separador1= document.createElement('div');
                    separador1.className= "divider";
                    separador.appendChild(separador1);
                    menu.appendChild(separador);


                 }

            
            })

        })
    })
})
            

