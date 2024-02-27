(function (){
    const lowercaseLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const uppercaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
    const htmlEl = document.querySelector('html')
    const themeBtn = document.getElementById('theme-btn')
    const themeIcon = document.getElementById('theme-icon')
    const rangeInput = document.getElementById('range-input')
    const rangeInputDisplay = document.getElementById('range-input-display')
    const uppercaseLettersInput = document.getElementById('uppercase-letters-input')
    const numbersInput = document.getElementById('numbers-input')
    const symbolsInput = document.getElementById('symbols-input')
    const passwordBtn = document.getElementById('password-btn')
    const passwordResult = document.getElementById('password-result')
    const copyBtn = document.getElementById('copy-btn')
    let passwordLength = 0
        
    themeBtn.addEventListener('click', (event) => {
        if (themeIcon.classList.contains('fa-moon')) {
            themeIcon.classList.remove('fa-moon')
            themeIcon.classList.add('fa-sun')
            htmlEl.classList.add('dark-mode')
        } else {
            themeIcon.classList.remove('fa-sun')
            themeIcon.classList.add('fa-moon')
            htmlEl.classList.remove('dark-mode')
        }
    })
    
    rangeInput.addEventListener('input', () => {
        updatePasswordLength()
    })
    
    passwordBtn.addEventListener('click', () => {
        const characters = getCharacterSet()
        let password = ''
        
        
        for (let i = 1; i <= passwordLength; i++) {
            password += characters[Math.floor(Math.random() * characters.length)]
        }
        
        passwordResult.textContent = password
        passwordResult.parentElement.classList.remove('u-hidden')
    })
    
    function updatePasswordLength() {
        const rangeInputValue = rangeInput.value
        
        passwordLength = Number(rangeInputValue)
        rangeInputDisplay.textContent = rangeInputValue
    }
    
    function getCharacterSet() {
        let characters = lowercaseLetters
        
        if (uppercaseLettersInput.checked) {
            characters = characters.concat(uppercaseLetters)
        }
        if (numbersInput.checked) {
            characters = characters.concat(numbers)
        }
        if (symbolsInput.checked) {
            characters = characters.concat(symbols)
        }
        
        return characters
    }
    
    async function getClipboardPermission() {
        try {
            const permission = await navigator.permissions.query({ name: 'clipboard-write' })
        
            if (permission.state === 'granted' || permission.state === 'prompt') {
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(passwordResult.textContent)
                })
            } else {
                copyBtn.classList.add('u-display-none')
            }   
        } catch (err) {
            console.error("Error checking clipboard permission:", err);
        }
    }
    
    updatePasswordLength()
    getClipboardPermission()
})()





