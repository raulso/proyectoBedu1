function iniciar(){
        var btnSubmit = document.getElementById("btnSubmit");
        var btnMostrar= document.getElementById("btnMostrar");
        
        btnSubmit.addEventListener("click",function(event){
              event.preventDefault();   
             
              var tag = 0;
              var userName = document.getElementById("nombre_usuario");
              var level = document.getElementById("nivel_usuario");
              var optionValueLevel = level.options[level.selectedIndex].text;
              var dateAdd = document.getElementById("fecha_alta");
              var photo = document.getElementById("foto_usuario");

              empty(userName)?"":tag=1;
              empty(level)?"":tag=1;
              empty(dateAdd)?"":tag=1;
              empty(photo)?"":tag=1;
            
              if(tag === 0){
                uploadInfo(photo.value, userName.value, optionValueLevel, dateAdd.value);
              }
        });

        btnMostrar.addEventListener("click",function(event){
              event.preventDefault();
              printer();
        });
}

//funcion recorrer arreglo users y crea contenido de acuerdo a su tamaño 
var printer = function(){
  document.getElementById("contenedor-perfil").innerHTML="";
    users.forEach(function(element,index){
      createTag(element,index);
    })
}

var users = [];
//objeto constructor
var User = function(photo, userName, level, dateAdd ){
      this.photo = photo;
      this.userName = userName;
      this.level = level;
      this.dateAdd = dateAdd;
}

//Subir datos del objeto User y añadirlos al arreglo users
function uploadInfo(photo, userName, level, dateAdd){
      var newUser = new User(photo, userName, level, dateAdd);
      users.push(newUser);
      document.body.getElementsByTagName("form")[0].reset();
      document.getElementById("divCount").innerHTML = users.length;
}
//crea la tarjeta para cargar la informacion proporcionada con el formulario
var createTag =  function(array, index){
      var sect = document.getElementById("contenedor-perfil");
      var article = document.createElement("article");
      var h4 = document.createElement("h4");
      h4.innerText = "Datos Generales"
      
      article.className = "div-perfil";
      sect.appendChild(article);
      article.appendChild(h4);
     
      var titles = ["Fotografia", "Usuario","Nivel","Fecha alta"];
      var counter = 0;
      for(var i in array){
            addData(article,array[i],titles[counter]);
            counter++;
      }

      var btnImg = document.createElement("button");
      btnImg.innerText = "Borrar";
      btnImg.style="background-color:#691B32;color:white;border-radius:8px";
      article.appendChild(btnImg);
     
      btnImg.addEventListener("click", function(){
            removeTag(index);
      })

}


//Agrega los datos al contenedor 
var addData = function(tagParent,dat, titles){
    var divRow = document.createElement("div");
  
    if(titles === "Fotografia"){
        var img1 = document.createElement("img");
        img1.src = dat;
        img1.alt = titles;
        tagParent.appendChild(img1);
    }else{
        divRow.className="div-info-usuario";
        var divEti = document.createElement("div");
        divEti.className = "etiqueta-info";
        divEti.innerHTML = titles;

        var divResult = document.createElement("div");
        divResult.className = "result-info";
        divResult.innerHTML = dat; 
        divRow.appendChild(divEti);
        divRow.appendChild(divResult);
        tagParent.appendChild(divRow);
    }
 }

//Elimina contender de acuerdo al index proporcionado 
var removeTag = function(index){
  users.splice(index,1);
  printer();
  document.getElementById("divCount").innerHTML = users.length;
}

//validar campos no vacio
function empty(inp){
    if( inp.value.length === 0){
      inp.className = "vacio";
      return false;
    }else{
      inp.classList.remove("vacio");
      return true;
      
    }
}