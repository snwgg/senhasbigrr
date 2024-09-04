const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!><?¿';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');


botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;


for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}


function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function geraSenha() {
    let alfabeto = '';
    if (checkbox[1].checked) {  
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[2].checked) {  
        alfabeto += letrasMinusculas;
    }
    if (checkbox[3].checked) {  
        alfabeto += numeros;
    }
    if (checkbox[4].checked) { 
        alfabeto += simbolos;
    }
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha += alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

const botaoCopiarSenha = document.getElementById('copiar-senha');
botaoCopiarSenha.onclick = () => {
    const senha = campoSenha.value;
    navigator.clipboard.writeText(senha).then(() => {
        alert('Senha copiada!');
    });
};


function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = (2 ** Math.floor(entropia)) / (100e6 * 60 * 60 * 24);
}


const selectAllCheckbox = document.getElementById('selectAll');
selectAllCheckbox.addEventListener('change', () => {
    checkbox.forEach(cb => {
        if (cb !== selectAllCheckbox) {
            cb.checked = selectAllCheckbox.checked;
        }
    });
    geraSenha();
});
