let input = document.querySelector('.entered-list');
let addButton = document.querySelector('.add-list');
let task = document.querySelector('.tasks');

//add a button event listener

input.addEventListener('keyup', () => {
    if(input.ariaValueMax.trim() !== 0){
        addButton.classList.add('active')
    } else {
        addButton.classList.add('active')
    }
})