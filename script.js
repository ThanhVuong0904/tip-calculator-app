
const dollarInput = document.querySelector('.dollar input');
const personInput = document.querySelector('.person input');
const priceTipAmount = document.querySelector('.price-tip-amount')
const priceTotal = document.querySelector('.price-total');
const percentValues = document.querySelectorAll('.box-per');
const customPer = document.querySelector('.custom-per');
const reset = document.querySelector('.reset');
const mess = document.querySelector('.mess')

const setDisableBtn = (button) => {
    button.setAttribute("disabled", true)
}
setDisableBtn(reset);

const removeDisableBtn = (button) => {
    button.removeAttribute("disabled", false)
}

const setError = (inputField) => {
    inputField.classList.add('outline-red');
    mess.style.display = 'block';
}

const removeError = (inputField) => {
    inputField.classList.remove('outline-red');
    mess.style.display = 'none';
}

const setGreen = (inputField) => {
    inputField.classList.add('outline-green')
}
const removeGreen = (inputField) => {
    inputField.classList.remove('outline-green')
}

const setReset = () => {
    customPer.setAttribute("placeholder","Custom")
    dollarInput.value = "0";
    personInput.value = "0";
    priceTipAmount.innerHTML = "0.00";
    priceTotal.innerHTML = "0.00";
    removeError(personInput);
    setDisableBtn(reset);
}

const focusEvent = (object) => {
    object.addEventListener('focus', function(){
        setGreen(object);
        object.setAttribute("placeholder", "")
    })
}

const blurEvent = (object) => {
    object.addEventListener('blur', function(){
        removeGreen(object);
        if(!object.value) {
            object.setAttribute("placeholder", "0")
        }
    })
}


var a = 0
var b = 0
//Tofixed 10.00
const setValues = (tipAmount, total) => {
    tipAmount.textContent = a.toFixed(2);
    total.textContent = b.toFixed(2);
}


const calculator = (person, tipAmount, dollar) =>{
    removeDisableBtn(reset);
    if(!person || person === '0') {
        setError(personInput);
        return false;
    }
    else {
        removeError(personInput);
        const tip = dollar * (tipAmount / 100);
        const tipOnePerson = tip / person;
        const totalOnePerson = (dollar / person) + tipOnePerson;
        setValues(priceTipAmount.innerHTML = tipOnePerson.toFixed(2), priceTotal.innerHTML = totalOnePerson.toFixed(2))
    }
}

customPer.addEventListener('keyup', function(e){
    removeDisableBtn(reset);
    if(!customPer.value !== "" && dollarInput.value && personInput.value) {
        calculator(personInput.value,customPer.value,dollarInput.value)
    }
    else
        setError(personInput)
})

dollarInput.addEventListener('keyup', function() {
    removeDisableBtn(reset)
    if(customPer.value !== "")
        calculator(personInput.value,customPer.value,dollarInput.value);
})

personInput.addEventListener('input', ()=>{
    if(!personInput.value || personInput.value == 0) {
        setError(personInput);
        return;
    }
    else
    if(customPer.value)
        calculator(personInput.value,customPer.value,dollarInput.value)
        removeError(personInput);
        setGreen(personInput);
})

percentValues.forEach(function(btnPercent){

    var getValuePercent = btnPercent.textContent.replace("%", "");
    btnPercent.addEventListener('click', function(){
        //remove hover
        btnPercent.classList.remove('box-per');
        btnPercent.classList.add('click')
        calculator(personInput.value, getValuePercent, dollarInput.value);
    })
    btnPercent.addEventListener('blur', function(){
        //add hover
        btnPercent.classList.add('box-per');
        btnPercent.classList.remove('click');
    })
})

reset.addEventListener('click', ()=> {
    setReset();
})

focusEvent(customPer);
blurEvent(customPer);

focusEvent(dollarInput);
blurEvent(dollarInput);

focusEvent(personInput);
blurEvent(personInput);









