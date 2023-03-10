const valueTotal = document.getElementById('valorTotal')
const numberPeople = document.getElementById('numeroPessoas')
const tip_custom = document.getElementById('tip-custom');
const button = document.querySelectorAll('.btn');
const error = document.querySelector('.error');
const tip_amount = document.querySelector('.price-amount')
const price_total = document.querySelector('.price-total')
const reset = document.getElementById('reset')

let billValue = 0;
let tipValue = 0.15;
let people = 1;

valueTotal.addEventListener('input', validateValueBill);

function validateValueBill(){
  if(valueTotal.value.includes(',')){
    valueTotal.value.replace(',','.')
  }
  billValue = parseFloat(valueTotal.value)
  calcule()
}

numberPeople.addEventListener('input', peopleValue)
tip_custom.addEventListener('input', tipCustomValue)
reset.addEventListener('click', resetButton)

button.forEach(btn => {
  btn.addEventListener('click',handleClick)
});

function handleClick(){
  button.forEach((btn) =>{
    btn.classList.remove('active');
    if(event.target.innerHTML === btn.innerHTML){
      btn.classList.add('active');
      tipValue = parseFloat(btn.innerHTML)/100
    }
  })
  calcule()
}

function peopleValue(){
  people = parseFloat(numberPeople.value)
  if (numberPeople.value < 0){
    error.innerHTML = 'number must be greater than zero'
    setTimeout(function(){
      error.innerHTML = ''
    },2000)
  } 
  calcule()
}

function tipCustomValue(){
  tipValue = parseFloat(tip_custom.value/100)
  button.forEach(btn => {
    btn.classList.remove('active');
  })
  if(tip_custom.value !== 0){
    calcule(); 
  }
}

function calcule(){
  let value_tip = (billValue * tipValue) / people;
  let totalAmount = billValue * (tipValue + 1) / people
  tip_amount.innerHTML = 'R$ ' +  value_tip.toFixed(2)
  price_total.innerHTML = 'R$ ' +  totalAmount.toFixed(2)
}

function resetButton(){
  valueTotal.value = 0.0;
  validateValueBill()
  button.forEach(btn =>{
    btn.classList.remove('active')
  })
  people = 1;
  numberPeople.value = ''
  tip_custom.value = ''
}