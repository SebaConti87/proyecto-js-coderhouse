//Clase para crear usuarios
class Usuario {
  constructor(id, nickname, edad, email, lenguaje) {
    this.id = id;
    this.nickname = nickname;
    this.edad = edad;
    this.email = email;
    this.lenguaje = lenguaje;
  }

  //Método para asociar un lenguaje e imagen a cada usuario.
  elegirLenguaje() {
    switch (this.lenguaje) {
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
  }
}

//Array de usuarios registrados.
let usuarios = [
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
  },
];

//Chequeo de usuarios registrados en el localStorage hasta el momento.
let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

//Validación que sirve para no sobreescribir el localStorage
if (listaUsuarios != null) {
  usuarios = listaUsuarios;
}

// Usar clase Usuario para usuarios hardcodeados
const usuariosHardcodeados = usuarios.map(
  (item) =>
    new Usuario(item.id, item.nick, item.edad, item.email, item.lenguaje)
);

//Pushea usuarios hardcodeados a usuarios
usuariosHardcodeados.push(usuarios);

//Sube el array usuarios al localStorage
localStorage.setItem("usuarios", JSON.stringify(usuarios));

//Botón para crear usuario nuevo utilizando getElement y addEventListener.
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

  //Validar password.
  if (password != repetirPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La contraseña deben ser iguales en ambos campos",
    });

    return;
  }

  //Validar edad sea un numero valido y menor a 100.
  if (isNaN(edad)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La edad debe ingresarse con números.",
    });
    return;
  } else {
    if (edad >= 100) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La edad debe ser menor a 100.",
      });
      return;
    }
  }

  //Validar email.
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes ingresar un email válido.",
    });
    return;
  }

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

    //Oculta el formulario y hace visible la card modificando el classList de los elementos.
    card.classList.remove("hiddenCard");

    formulario.classList.add("esconder-elemento");

    //Le asigna un id al usuario nuevo
    let contador = usuarios.length + 1;
    let id = contador;

    //Crea usuario y se agrega al array Usuarios
    let usuarioNuevo = new Usuario(id, nick, edad, email, lenguaje);
    usuarioNuevo.elegirLenguaje();
    usuarios.push(usuarioNuevo);

    //Actualiza la lista del localStorage con el último usuario registrado.
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos los campos deben estar completos.",
    });
  }
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
          <td class="text-center"><button type="button" class="btn btn-primary boton"><i class="fas fa-eye"></i></button></td>
    `;
    document.getElementById("tbody").appendChild(celda);
  }
}

//Función para elegir un usuario de la lista y mostrar su card
$(document).on("click", ".boton", function () {
  //Captura el número de la fila para saber qué usuario mostrar
  let usuarioSeleccionado = $(".boton").index(this);

  //Esconde la tabla.
  $(".tabla").hide("fast");

  //Muestra la card.
  $("#card").removeClass("hiddenCard");

  //Agrega los datos del usuario a la card.
  $("#cardNick").html(usuarios[usuarioSeleccionado].nickname);
  $("#cardEdad").html(usuarios[usuarioSeleccionado].edad);
  $("#cardEmail").html(usuarios[usuarioSeleccionado].email);

  //URL a la que se envían los datos con AJAX.
  const apiPosts = "https://jsonplaceholder.typicode.com/posts";

  //Info a enviar.
  const dataUser = {
    nombre: usuarios[usuarioSeleccionado].nickname,
    edad: usuarios[usuarioSeleccionado].edad,
    email: usuarios[usuarioSeleccionado].email,
  };

  //Enviamos con método POST de AJAX el usuario seleccionado.
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

  //Asigna foto del lenguaje del usuario a la card.
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
