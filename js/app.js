
/**
 * se crea un mapa para mapear las subcadenas en la funcion replacer.
 * Se usa como otra manera de replaceAll en el metodo desencriptar
 */
const llaves = new Map();
llaves.set('ai', 'a');
llaves.set('enter', 'e');
llaves.set('imes', 'i');
llaves.set('ober', 'o');
llaves.set('ufat', 'u');

//opciones
const opEncriptar = 1;
const opDesencriptar = 2;
//funcion principal

const ejecutarOperacion = numOperacion => {
    if(validacionCorrecta()){
        seleccionarYEcutar(numOperacion);
    }
};

const seleccionarYEcutar = numOperacion => {
    switch(numOperacion){
        case opEncriptar: 
            encriptarYPintar();
            break;
        case opDesencriptar:
            desencriptarYPintar();
            break;
        default:
            console.log('Operacion no soportada');
            break;
    }
};

function encriptar() {
    let mensajeEntrante = getValueInputBy("caja-input");
    let mensajeEncriptado = mensajeEntrante
        .replaceAll('e', 'enter')
        .replaceAll('i', 'imes')
        .replaceAll('a', 'ai')
        .replaceAll('o', 'ober')
        .replaceAll('u', 'ufat');
    return mensajeEncriptado;
}

function replacer(match) {
    return llaves.get(match);
}
//desencripta un texto encriptado de la caja-input con el boton DESENCRIPTAR
function desencriptar() {
    let mensajeEntrante = getValueInputBy("caja-input");
    //Otra forma de reemplazar subcadenas usando un Map()
    return mensajeEntrante.replaceAll(/enter|imes|ai|ober|ufat/g, replacer);
}

//funcion generica para extraer el value de un elemento html
const getValueInputBy = idElement => document.getElementById(idElement).value;

function pintar(texto) {
    document.getElementById("caja-output").value = texto;
}
/*boton ENCRIPTAR*/
function encriptarYPintar() {
    let salida = encriptar();
    pintar(salida)
}

//desencripta el texto de la caja-ouput con el Boton DESENCRIPTAR
function desencriptarYPintar() {
    let mensajeDesencriptado = desencriptar();
    pintar(mensajeDesencriptado);
}

//validar si no hay mayusculas
function todoEsMinusculas(campo = document.getElementById("caja-input")) {
    var regex = /^[a-z \n]+$/; 
    if (regex.test(campo.value)) {
        return true;
    } else {
        return false;
    }
}

//validaciones de campo vacio y caracteres
function isEmtyField(campo = document.getElementById("caja-input")) {
    var regex = /^[\n\s]*$/g;
    if (regex.test(campo.value)) {
        return true;
    } else {
        return false;
    }
}

function validacionCorrecta() {
    let mensaje = '';
    let esCorrecto = true;
    
    if (isEmtyField()) {
        mensaje = 'Campo de texto vacio';
        esCorrecto = false;
        
        
    } else if (!todoEsMinusculas()) {
        mensaje = 'No se soportan las mayusculas, numeros o caracteres especiales';
        esCorrecto = false;
    }

    if(mensaje !== '') {
        regresarCursorInicio();  
        Swal.fire({
            icon: 'error',
            title: mensaje,
            width: 300,
            padding: "3em",
            color: "#716add",
            background: "#d3d3d3",
            backdrop: `
                rgba(0,0,000,0.6)
                left top
                no-repeat`
            
        })
        
    }

    return esCorrecto;
}

const input = document.getElementById('caja-input');
function regresarCursorInicio() {   
    input.selectionStart = 0;
    
    input.focus();
  }

  //copiar y pegar 
var historyCopy = '';
function copiarTexto(){
    renderPasteButton('visible');
    const textoTemporal = document.createElement('textarea');
    textoTemporal.textContent = getValueInputBy("caja-output");
    historyCopy = textoTemporal.textContent;
    document.body.appendChild(textoTemporal);
    textoTemporal.select();
    document.execCommand('copy');
    document.body.removeChild(textoTemporal);
}

// crea una funcion para pegar el texto copiado del portapapeles en caja-input
function pegarTexto(){
    let input = document.getElementById('caja-input');
    input.focus();
    input.value = historyCopy;
    document.getElementById('caja-output').value = '';
    renderPasteButton('hidden');
}

function limpiar(){
    document.getElementById('caja-input').value = '';
    document.getElementById('caja-output').value = '';
}

function renderPasteButton(option) {
    var x = document.getElementById('btn-paste');
    if (option === 'hidden') {
      x.style.visibility = 'hidden';
    } else {
        x.style.visibility = 'visible';
    }
  } 


