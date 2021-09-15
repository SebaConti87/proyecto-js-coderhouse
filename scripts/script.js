//Array de usuarios registrados.
let usuarios = [];
//Chequeo de usuarios registrados en el localStorage hasta el momento.
let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

//Usuarios creados por mi para que no haya un solo usuario cada vez que le haga refresh a la página.
usuarios.push(
  {
    id: 1,
    nickname: "Carlitos",
    edad: 20,
    email: "carlitos20@gmail.com",
    lenguaje: "javascript",
  },
  {
    id: 2,
    nickname: "Pepito123",
    edad: 18,
    email: "pepito@gmail.com",
    lenguaje: "python",
  },
  {
    id: 3,
    nickname: "Cacho",
    edad: 45,
    email: "cacho@gmail.com",
    lenguaje: "java",
  },
  {
    id: 4,
    nickname: "Pipo",
    edad: 34,
    email: "pipo90@gmail.com",
    lenguaje: "c++",
  },
  {
    id: 5,
    nickname: "Miguel",
    edad: 25,
    email: "miguelito@gmail.com",
    lenguaje: "javascript",
  },
  {
    id: 6,
    nickname: "Tucu",
    edad: 16,
    email: "tucutucu@gmail.com",
    lenguaje: "python",
  }
);

//Validación que sirve para no sobreescribir el localStorage
if (listaUsuarios != null) {
  usuarios = listaUsuarios;
}

//Sube el array usuarios al localStorage
localStorage.setItem("usuarios", JSON.stringify(usuarios));

//Botón para crear usuario nuevo.
let btnCrear = document.getElementById("btnCrear");
if (btnCrear) btnCrear.addEventListener("click", crearUsuario);

//Función para crear usuario con los datos del formulario.
function crearUsuario(e) {
  e.preventDefault();

  let nick = document.getElementById("nickname").value;
  let password = document.getElementById("pass").value;
  let repetirPassword = document.getElementById("pass2").value;
  let edad = parseInt(document.getElementById("edad").value);
  let email = document.getElementById("email").value;
  let lenguaje = document.getElementById("lenguaje").value;

  //Validación de password
  function validarPass(password, repetirPassword) {
    if (password != repetirPassword) {
      alert("Ingrese el password correcto en ambos campos.");
    }
  }

  validarPass(password, repetirPassword);

  //Validación de campos completos.
  if (nick != "" && edad != "" && email != "") {
    let card = document.getElementById("card");
    let formulario = document.getElementById("container-general");
    let cardNombre = document.getElementById("nickCard");
    let cardEdad = document.getElementById("edadCard");
    let cardEmail = document.getElementById("emailCard");

    //Agrega los datos recién cargados a la card
    cardNombre.innerHTML = nick;
    cardEdad.innerHTML = edad;
    cardEmail.innerHTML = email;

    switch (lenguaje) {
      case "javascript":
        $("#foto-lenguaje").attr("src", "images/javascript.png");
        break;
      case "python":
        $("#foto-lenguaje").attr("src", "images/python.png");
        break;
      case "java":
        $("#foto-lenguaje").attr("src", "images/java.png");
        break;
      case "c++":
        $("#foto-lenguaje").attr("src", "images/c++.png");
        break;
      default:
        console.log("Se asignó automaticamente Javascript");
    }

    //Oculta el formulario y hace visible la card modificando el classList de los elementos.
    card.classList.remove("hiddenCard");

    formulario.classList.add("esconder-elemento");

    //Le asigna un id al usuario nuevo
    let contador = usuarios.length + 1;
    let id = contador;
    //Crea usuario y se agrega al array Usuarios
    let usuarioNuevo = new Usuario(id, nick, edad, email, lenguaje);
    usuarios.push(usuarioNuevo);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  //Lista de usuarios mostrados por consola.
  for (let i = 0; i < usuarios.length; i++) {
    console.log("Usuario " + (i + 1) + ": " + usuarios[i].nickname);
  }

  //Aplicando el método length para contar los usuarios registrados.
  console.log(`Tenemos registrados ${usuarios.length} usuarios.`);
}

//Función para crear una tabla con los usuarios registrados hasta el momento. (Se ejecuta al cargar la página usuarios-registrados.html)

function mostrarTablaUsuarios() {
  let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));

  for (const usuario of usuariosRegistrados) {
    let celda = document.createElement("tr");

    celda.setAttribute("id", usuario.id);
    celda.innerHTML = `
    <td>${usuario.id}</td>
    <td>${usuario.nickname}</td>
    <td>${usuario.edad}</td>
    <td>${usuario.email}</td>
          <td class="text-center"><button type="button" class="boton">Ver perfil</button></td>
    `;
    document.getElementById("tbody").appendChild(celda);
  }
}

//Clase para crear usuarios
class Usuario {
  constructor(id, nickname, edad, email, lenguaje) {
    this.id = id;
    this.nickname = nickname;
    this.edad = edad;
    this.email = email;
    this.lenguaje = lenguaje;
  }
}

//Función para ordenar los usuarios por edad de menor a mayor usando el método sort()
// let usuariosOrdenados = usuarios.sort(function (a, b) {
//   return a.edad - b.edad;
// });
// console.log(usuariosOrdenados);

//Función para elegir un usuario de la lista y mostrar su card
$(document).on("click", ".boton", function () {
  //Captura el número de la fila para saber qué usuario mostrar
  let usuarioSeleccionado = $(".boton").index(this);

  //Esconde la tabla
  $(".tabla").hide("fast");

  //Muestra la card
  $("#card").removeClass("hiddenCard");

  //Agrega los datos del usuario a la card
  $("#cardNick").html(usuarios[usuarioSeleccionado].nickname);
  $("#cardEdad").html(usuarios[usuarioSeleccionado].edad);
  $("#cardEmail").html(usuarios[usuarioSeleccionado].email);

  //URL a la que se envían los datos con AJAX
  const apiPosts = "https://jsonplaceholder.typicode.com/posts";

  //Info a enviar
  const dataUser = {
    nombre: usuarios[usuarioSeleccionado].nickname,
    edad: usuarios[usuarioSeleccionado].edad,
    email: usuarios[usuarioSeleccionado].email,
  };

  //Enviamos con método POST de AJAX el usuario seleccionado
  $.ajax({
    method: "POST",
    url: apiPosts,
    data: dataUser,
    success: function (response) {
      console.log(
        `Usuario ${usuarios[usuarioSeleccionado].nickname} cargado con éxito.`
      );
    },
  });

  //Asigna foto del lenguaje del usuario a la card
  switch (usuarios[usuarioSeleccionado].lenguaje) {
    case "javascript":
      $("#foto-lenguaje").attr("src", "images/javascript.png");
      break;
    case "python":
      $("#foto-lenguaje").attr("src", "images/python.png");
      break;
    case "java":
      $("#foto-lenguaje").attr("src", "images/java.png");
      break;
    case "c++":
      $("#foto-lenguaje").attr("src", "images/c++.png");
      break;
    default:
      console.log("Se asignó automaticamente Javascript");
  }
});

//Función que sirve para volver a mostrar la tabla y ocultar la card sin tener que cargar toda la página nuevamente.
$(document).on("click", "#verLista", function () {
  //Esconde la tabla
  $(".tabla").show("fast");

  //Muestra la card
  $("#card").addClass("hiddenCard");
});
