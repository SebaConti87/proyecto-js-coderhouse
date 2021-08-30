//Array de usuarios registrados.
let usuarios = [];
//Chequeo de usuarios registrados en el localStorage hasta el momento.
let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

//Usuarios creados por mi para que no haya un solo usuario cada vez que le haga refresh a la página.
usuarios.push(
  { nickname: "Carlitos", edad: 20, email: "carlitos20@gmail.com" },
  { nickname: "Pepito123", edad: 18, email: "pepito@gmail.com" },
  { nickname: "Cacho", edad: 45, email: "cacho@gmail.com" },
  { nickname: "Pipo", edad: 34, email: "pipo90@gmail.com" },
  { nickname: "Miguel", edad: 25, email: "miguelito@gmail.com" },
  { nickname: "Tucu", edad: 16, email: "tucutucu@gmail.com" }
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

    let bienvenida = document.createElement("h2");
    bienvenida.innerText = `Bienvenido ${nick}`;
    document.body.appendChild(bienvenida);
    bienvenida.classList.add("titulo");

    //Agrega los datos recién cargados a la card
    cardNombre.innerHTML = nick;
    cardEdad.innerHTML = edad;
    cardEmail.innerHTML = email;

    //Oculta el formulario y hace visible la card modificando el classList de los elementos.

    card.classList.remove("hiddenCard");

    formulario.classList.add("esconder-formulario");

    //Crea usuario y se agrega al array Usuarios
    let usuarioNuevo = new Usuario(nick, edad, email);
    usuarios.push(usuarioNuevo);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  let btnVerUsuarios = document.getElementById("verusuarios");
  btnVerUsuarios.addEventListener("click", verUsuarios);

  function verUsuarios() {
    console.log("holaaa");
  }

  //Lista de usuarios mostrados por consola.
  for (let i = 0; i < usuarios.length; i++) {
    console.log("Usuario " + (i + 1) + ": " + usuarios[i].nickname);
  }

  //Aplicando el método length para contar los usuarios registrados.
  console.log(`Tenemos registrados ${usuarios.length} usuarios.`);
}

//Clase para crear usuarios
class Usuario {
  constructor(nickname, edad, email) {
    this.nickname = nickname;
    this.edad = edad;
    this.email = email;
  }
}

//Función para ordenar los usuarios por edad de menor a mayor usando el método sort()
let usuariosOrdenados = usuarios.sort(function (a, b) {
  return a.edad - b.edad;
});
// console.log(usuariosOrdenados);
