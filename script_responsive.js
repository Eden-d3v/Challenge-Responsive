const encryptorMap = {
  "a": "ai",
  "e": "enter",
  "i": "imes",
  "o": "ober",
  "u": "ufat",
};

const decryptorMap = {
  "ai": "a",
  "enter": "e",
  "imes": "i",
  "ober": "o",
  "ufat": "u",
};

const encryptVar = (text) => text.replace(/[aeiou]/g, letter => encryptorMap[letter]);
const decryptVar = (text) => text.replace(/ai|enter|imes|ober|ufat/g, word => decryptorMap[word]);

const enterText$ = document.getElementById('enter-text');
const decrypt$ = document.getElementById('decrypt');

function insertWhiteBlock(text, decrypt$) {
  if (decrypt$) {
    decrypt$.innerHTML = `
      <p>${text}</p>
      <button class="btn copiar">Copiar</button>
    `;
  }
}

function changeDisplay(element, display) {
  element.style.display = display;
}

function validateData(data) {
  const regex = /^[a-z\s]+$/;
  return !regex.test(data)
}

function resetPage() {
  enterText$.value = '';
  decrypt$.innerHTML = '';
  changeDisplay(document.getElementById('block'), 'flex');
  changeDisplay(decrypt$, 'none');
  
  enterText$.focus();
}

const resetBtn$ = document.getElementById('btn-cln');
resetBtn$.addEventListener('click', resetPage);

function copyToClipboard(button) {
  const resultText = button.parentNode.querySelector('p').textContent;
  navigator.clipboard.writeText(resultText)
    .then(() => {
      console.log('Texto copiado al portapapeles: ' + resultText);
    })
    .catch((error) => {
      console.error('Error al copiar al portapapeles: ' + error);
    });
}

function encryptionProcess(enterText$, decrypt$) {
  const buttons$ = document.querySelector('.buttons-encrypt');
  buttons$.addEventListener('click',(e) => {
    const encryptBtn = e.target.classList.contains('en');
    const decryptBtn = e.target.classList.contains('de');
    if (!enterText$.value) return;
    if (validateData(enterText$.value)) {
      enterText$.focus();
      alert('¡Asegúrate de solo utilizar letras minúsculas sin caracteres especiales o números!');
      return;  
    }

    if (encryptBtn || decryptBtn) {
      if (encryptBtn) {
        const encryptedText = encryptVar(enterText$.value);
        insertWhiteBlock(encryptedText, decrypt$);
      }
      if (decryptBtn) {
        const decryptedText = decryptVar(enterText$.value);
        insertWhiteBlock(decryptedText, decrypt$);
      }
      changeDisplay(document.getElementById('block'), 'none');
      changeDisplay(decrypt$, 'block');
      enterText$.value = '';
    }
    enterText$.focus();

    const copyButton = decrypt$.querySelector('.copiar');
    copyButton.addEventListener('click', () => {
      copyToClipboard(copyButton);
    });
  });
}

encryptionProcess(enterText$, decrypt$);

function darkMode() {
  const darkModeSwitch = document.querySelector('.switchB');
  darkModeSwitch.addEventListener('change', () => {
    if (darkModeSwitch.checked) {
      console.log('modo oscuro activado')
      document.querySelector('body').classList.add('dark-mode');
    } else {
      document.querySelector('body').classList.remove('dark-mode');
    }
  });
}

window.addEventListener("load",() => {
  darkMode();
})