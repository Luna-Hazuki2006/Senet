let tabla = document.getElementById("tabla")

let chacales = []
let vidas = []

let movida = false

let grupos = [
    'chacales', 'vidas'
]

let Aaru = {
    chacales: 0, 
    vidas: 0
}

let actual = ''

function Crear() {
    for (let i = 0; i < 3; i++) {
        let tr = document.createElement("tr")
        switch (i + 1) {
            case 1:
                tr.id = "primera"
                break;
            case 2:
                tr.id = "segunda"
                break;
            case 3: 
                tr.id = "tercera"
                break;
            default:
                break;
        }
        for (let j = 0; j < 10; j++) {
            let td = document.createElement("td")
            tr.appendChild(td)
        }
        tabla.appendChild(tr)
    }
    Ordenar()
}

function Ordenar() {
    let td = []
    let tr = tabla.getElementsByTagName("tr")
    for (const lista of tr) {
        let nueva = []
        if (lista.id == "segunda") {
            for (const este of lista.children) {
                nueva.push(este)
            }
            nueva.reverse()
            for (const este of nueva) {
                td.push(este)
            }
        } else {
            for (const este of lista.children) {
                td.push(este)
            }
        }
    }
    console.log(td);
    for (let i = 0; i < td.length; i++) {
        td[i].id = i + 1
        if (td[i].id == 15) {
            td[i].classList.add("estanque")
        } else if (td[i].id == 26) {
            td[i].classList.add("corona")
        } else if (td[i].id == 27) {
            td[i].classList.add("rio")
        } else if (td[i].id == 28) {
            td[i].classList.add("pajaro")
        } else if (td[i].id == 29) {
            td[i].classList.add("halcon")
        } else if (td[i].id == 30) {
            td[i].classList.add("escarabajo")
        }
    }
}

function DarPiezas() {
    let tr = document.getElementById("primera")
    vidas = []
    celda = []
    Aaru.chacales = 0
    Aaru.vidas = 0
    for (const td of tr.children) {
        if ((td.id % 2) == 0) {
            let vida = {
                simbolo: "☥", 
                celda: td.id
            }
            vidas.push(vida)
        } else {
            let chacal = {
                simbolo: "𓃥", 
                celda: td.id
            }
            chacales.push(chacal)
        }
    }
    console.log(vidas);
    console.log(chacales);
    let turno = document.getElementById('turno')
    actual = grupos[1]
    turno.innerText = 'Turno: ' + actual
    movida = true
    let numero = document.getElementById('numero')
    numero.classList.add('continua')
    numero.classList.remove('parado')
    DarLugares()
}

function DarLugares() {
    let td = document.getElementsByTagName("td")
    let numero = document.getElementById('numero')
    let turno = document.getElementById('turno')
    let ganadores = document.getElementById('Aaru')
    turno.innerText = 'Turno: ' + actual
    for (const este of td) {
        este.innerText = ""
        este.removeEventListener('click', Mover)
        numero.classList.remove('continua')
        numero.classList.add('parado')
        ganadores.innerHTML = ''
    }
    ganadores.innerHTML = 'Chaquales en el Aaru: ' + Aaru.chacales + '<br>'
    ganadores.innerHTML += 'Vidas en el Aaru: ' + Aaru.vidas
    if (actual == grupos[1] && movida) {
        for (const este of vidas) {
            let uno = document.getElementById(este.celda)
            uno.innerText = este.simbolo
            uno.addEventListener('click', Mover)
        }
        for (const este of chacales) {
            let uno = document.getElementById(este.celda)
            uno.innerText = este.simbolo
        }
        numero.classList.add('continua')
        numero.classList.remove('parado')
    } 
    if (actual == grupos[0] && movida) {
        for (const este of chacales) {
            let uno = document.getElementById(este.celda)
            uno.innerText = este.simbolo
            uno.addEventListener('click', Mover)
        }
        for (const este of vidas) {
            let uno = document.getElementById(este.celda)
            uno.innerText = este.simbolo
        }
        numero.classList.add('continua')
        numero.classList.remove('parado')
    } 
    if (!movida) {
        for (const este of vidas) {
            let uno = document.getElementById(este.celda)
            uno.innerText = este.simbolo
        }
        for (const este of chacales) {
            let uno = document.getElementById(este.celda)
            uno.innerText = este.simbolo
        }
        numero.classList.remove('continua')
        numero.classList.add('parado')
    } 
    if (Aaru.chacales == 5) {
        ganadores.innerHTML += '<br><b>¡Ganaron los chacales!</b>'
    } else if (Aaru.vidas == 5) {
        ganadores.innerHTML += '<br><b>¡Ganaron las vidas!</b>'
    }
}

function Lanzar() {
    let numero = document.getElementById('numero')
    numero.innerText = Math.round(Math.random() * 5) + 1
    movida = true
    DarLugares()
}

function Mover(celda) {
    let id = celda.target.id
    console.log(id);
    let numero = document.getElementById('numero').innerText
    let nuevo = Number(id) + Number(numero)
    let destino = document.getElementById(nuevo)
    if (numero == 5) {
        return
    }
    if (chacales.find(x => x.celda == id)) {
        if (nuevo == 27) {
            let estanque = 15
            while (chacales.find(x => x.celda == estanque) || 
                    vidas.find(x => x.celda == estanque)) {
                estanque--
            }
            let final = chacales.findIndex(x => x.celda == id)
            chacales[final].celda = estanque
            movida = false
        } else if (nuevo == 30) {
            chacales = chacales.filter(x => x.celda != id)
            Aaru.chacales++
            movida = false
        } else if (nuevo > 30) {
            nuevo = Number(id) - Number(numero)
            while (chacales.find(x => x.celda == nuevo) || 
                    vidas.find(x => x.celda == nuevo)) {
                nuevo--
            }
            if (nuevo == 27) {
                nuevo = 15
                while (chacales.find(x => x.celda == nuevo) || 
                    vidas.find(x => x.celda == nuevo)) {
                    nuevo--
                }
            }
            let final = chacales.findIndex(x => x.celda == id)
            chacales[final].celda = nuevo
            movida = false
        } else if (vidas.find(x => x.celda == destino.id)) {
            if (!vidas.find(x => x.celda == destino.id - 1) && 
                !vidas.find(x => x.celda == Number(destino.id) + 1)
            ) {
                let lista = vidas.filter(x => x.celda >= id && x.celda <= destino.id)
                console.log(lista);
                let bloque = false
                for (const este of lista) {
                    if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                        lista.find(x => x.celda == Number(este.celda) + 2)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                            lista.find(x => x.celda == este.celda - 1)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == este.celda - 1) && 
                            lista.find(x => x.celda == este.celda - 2)) {
                        bloque = true
                        break
                    }
                }
                if (!bloque && destino.id != 26 && destino.id != 28 && destino.id != 29) {
                    let final = chacales.findIndex(x => x.celda == id)
                    let cazado = vidas.findIndex(x => x.celda == destino.id)
                    console.log(id);
                    console.log(destino);
                    vidas[cazado].celda = id
                    chacales[final].celda = destino.id
                    movida = false
                }
            }
        } else if (!chacales.find(x => x.celda == destino.id)) {
            if (vidas.find(x => x.celda >= id && x.celda <= destino.id)) {
                let lista = vidas.filter(x => x.celda >= id && x.celda <= destino.id)
                console.log(lista);
                let bloque = false
                for (const este of lista) {
                    if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                        lista.find(x => x.celda == Number(este.celda) + 2)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                            lista.find(x => x.celda == este.celda - 1)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == este.celda - 1) && 
                            lista.find(x => x.celda == este.celda - 2)) {
                        bloque = true
                        break
                    }
                }
                if (!bloque) {
                    let final = chacales.findIndex(x => x.celda == id)
                    chacales[final].celda = destino.id
                    movida = false
                }
            } else {
                let final = chacales.findIndex(x => x.celda == id)
                chacales[final].celda = destino.id
                movida = false
            }
        }
    } else if (vidas.find(x => x.celda == id)) {
        if (nuevo == 27) {
            let estanque = 15
            while (chacales.find(x => x.celda == estanque) || 
                    vidas.find(x => x.celda == estanque)) {
                estanque--
            }
            let final = vidas.findIndex(x => x.celda == id)
            vidas[final].celda = estanque
            movida = false
        } else if (nuevo == 30) {
            vidas = vidas.filter(x => x.celda != id)
            Aaru.vidas++
            movida = false
        } else if (nuevo > 30) {
            nuevo = Number(id) - Number(numero)
            while (chacales.find(x => x.celda == nuevo) || 
                    vidas.find(x => x.celda == nuevo)) {
                nuevo--
            }
            if (nuevo == 27) {
                nuevo = 15
                while (chacales.find(x => x.celda == nuevo) || 
                    vidas.find(x => x.celda == nuevo)) {
                    nuevo--
                }
            }
            let final = vidas.findIndex(x => x.celda == id)
            vidas[final].celda = nuevo
            movida = false
        } else if (chacales.find(x => x.celda == destino.id)) {
            if (!chacales.find(x => x.celda == destino.id - 1) && 
                !chacales.find(x => x.celda == Number(destino.id) + 1)
            ) {
                let lista = chacales.filter(x => x.celda >= id && x.celda <= destino.id)
                console.log(lista);
                let bloque = false
                for (const este of lista) {
                    if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                        lista.find(x => x.celda == Number(este.celda) + 2)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                            lista.find(x => x.celda == este.celda - 1)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == este.celda - 1) && 
                            lista.find(x => x.celda == este.celda - 2)) {
                        bloque = true
                        break
                    }
                }
                if (!bloque && destino.id != 26 && destino.id != 28 && destino.id != 29) {
                    let final = vidas.findIndex(x => x.celda == id)
                    let cazado = chacales.findIndex(x => x.celda == destino.id)
                    console.log(id);
                    console.log(destino);
                    chacales[cazado].celda = id
                    vidas[final].celda = destino.id
                    movida = false
                }
            }
        } else if (!vidas.find(x => x.celda == destino.id)) {
            if (chacales.find(x => x.celda >= id && x.celda <= destino.id)) {
                let lista = chacales.filter(x => x.celda >= id && x.celda <= destino.id)
                console.log(lista);
                let bloque = false
                for (const este of lista) {
                    if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                        lista.find(x => x.celda == Number(este.celda) + 2)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == Number(este.celda) + 1) && 
                            lista.find(x => x.celda == este.celda - 1)) {
                        bloque = true
                        break
                    } else if (lista.find(x => x.celda == este.celda - 1) && 
                            lista.find(x => x.celda == este.celda - 2)) {
                        bloque = true
                        break
                    }
                }
                if (!bloque) {
                    let final = vidas.findIndex(x => x.celda == id)
                    vidas[final].celda = destino.id
                    movida = false
                }
            } else {
                let final = vidas.findIndex(x => x.celda == id)
                vidas[final].celda = destino.id
                movida = false
            }
        }
    }
    let dado = document.getElementById('dado')
    if (movida) {
        dado.removeAttribute('onclick')
    } else {
        dado.setAttribute('onclick', 'Lanzar();')
    }
    if (numero == 2 || numero == 3) {
        if (actual == grupos[0]) actual = grupos[1]
        else if (actual == grupos[1]) actual = grupos[0]
    }
    DarLugares()
}

Crear()
DarPiezas()