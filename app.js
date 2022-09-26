let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

addToDoButton.addEventListener('click', function(){
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling')
    paragraph.innerText = inputField.value;
    toDoContainer.appendChild(paragraph); //actually save what we input
    inputField.value = ""; //this removes the input val from inputField
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
    })
    paragraph.addEventListener('dblclick', function(){ //dbl means double
        toDoContainer.removeChild(paragraph);
    })
    
})