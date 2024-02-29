(function () {
  // prettier-ignore
  const lowercaseLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
  // prettier-ignore
  const uppercaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  // prettier-ignore
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  // prettier-ignore
  const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
  const htmlEl = document.querySelector('html');
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const rangeInput = document.getElementById('range-input');
  const rangeInputDisplay = document.getElementById('range-input-display');
  const uppercaseLettersInput = document.getElementById('uppercase-letters-input');
  const numbersInput = document.getElementById('numbers-input');
  const symbolsInput = document.getElementById('symbols-input');
  const passwordBtn = document.getElementById('password-btn');
  const passwordResult = document.getElementById('password-result');
  const copyBtn = document.getElementById('copy-btn');
  const copyBtnMessage = document.getElementById('copy-message');

  themeBtn.addEventListener('click', (event) => {
    if (themeIcon.classList.contains('fa-moon')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      htmlEl.classList.add('dark-mode');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      htmlEl.classList.remove('dark-mode');
    }
  });

  rangeInput.addEventListener('input', (event) => {
    updatePasswordLengthDisplay();
  });

  passwordBtn.addEventListener('click', () => {
    const characters = getCharacterSet();
    let password = '';

    for (let i = 1; i <= Number(rangeInput.value); i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }

    passwordResult.textContent = password;
    passwordResult.parentElement.classList.remove('u-hidden');
  });

  copyBtn.addEventListener('click', async () => {
    let copiedSuccessfully = true;

    try {
      await navigator.clipboard.writeText(passwordResult.textContent);
    } catch (error) {
      console.error('Error trying to use navigator.clipboard.writeText()', error);
      copiedSuccessfully = false;
    }

    if (copiedSuccessfully) {
      showCopiedMessage('Copied to clipboard');
    } else {
      showCopiedMessage('Error copying to clipboard');
    }

    setTimeout(() => {
      hideCopiedMessage();
    }, 1500);
  });

  document.onvisibilitychange = () => {
    if (document.visibilityState === 'hidden') {
      localStorage.setItem(
        'userSettings',
        JSON.stringify({
          passwordLength: rangeInput.value,
          uppercaseLetters: uppercaseLettersInput.checked,
          numbers: numbersInput.checked,
          symbols: symbolsInput.checked,
        })
      );
    }
  };

  function getInitialUserSettingsState() {
    const localStorageUserSettings = JSON.parse(localStorage.getItem('userSettings'));

    if (localStorageUserSettings != null) {
      rangeInput.value = localStorageUserSettings.passwordLength;
      uppercaseLettersInput.checked = localStorageUserSettings.uppercaseLetters;
      numbersInput.checked = localStorageUserSettings.numbers;
      symbolsInput.checked = localStorageUserSettings.symbols;
    }

    updatePasswordLengthDisplay();
  }

  function updatePasswordLengthDisplay() {
    rangeInputDisplay.textContent = rangeInput.value;
  }

  function getCharacterSet() {
    let characters = lowercaseLetters;

    if (uppercaseLettersInput.checked) {
      characters = characters.concat(uppercaseLetters);
    }
    if (numbersInput.checked) {
      characters = characters.concat(numbers);
    }
    if (symbolsInput.checked) {
      characters = characters.concat(symbols);
    }

    return characters;
  }

  function showCopiedMessage(message) {
    copyBtnMessage.textContent = message;
    copyBtnMessage.classList.remove('u-hidden');
  }

  function hideCopiedMessage() {
    copyBtnMessage.classList.add('u-hidden');
    // Allow fading animation to complete before removing text.
    setTimeout(() => {
      copyBtnMessage.textContent = '';
    }, 300);
  }

  getInitialUserSettingsState();
})();
