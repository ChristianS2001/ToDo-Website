let enterTask = document.getElementById('toDoForm');
let filter = document.getElementById('filterToDo');
let sort = document.getElementById('sortToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
var count = 0;

filter.addEventListener('change', function(){
    if(filter.value == "completedItems") { //if you want only completed tasks
        for(let row of toDoContainer.children){//for each row in container
            if(row.getAttribute("data-status") == "incomplete"){ //if the current row is uncompleted
                row.style.display = "none"; //hide it
            } else {
                row.style.display = "flex"; //unhides the previously hidden rows
            }
        }
    }
    if(filter.value == "nonCompletedItems") { //if you want only tasks that are not completed
        for(let row of toDoContainer.children){//for each row in container
            if(row.getAttribute("data-status") == "completed"){ //if the current row is completed
                row.style.display = "none"; //hide it
            } else {
                row.style.display = "flex"; //unhides the previously hidden rows
            }
        }
    }
    if(filter.value == "allItems") { //if you want only tasks that are not completed
        for(let row of toDoContainer.children){//for each row in container
            row.style.display = "flex";
        }
    }
})

sort.addEventListener('change', function(){
    if (sort.value == "eToL") {
        //we want to make it lowest count row at top to highest count row at bottom
        var array = [];
        while(toDoContainer.firstChild){ //goes through whole list of rows till we reach the first row
            let row = toDoContainer.removeChild(toDoContainer.firstChild); //save the removed first child into row
            array.push(row); //add rows to an array
        }
        array.sort(function(rowA, rowB){ //sort appropiately
            if(Number(rowA.getAttribute("data-count")) > Number(rowB.getAttribute("data-count"))){ //if rowA less than rowB then return 1
                return 1;
            }
            if(Number(rowA.getAttribute("data-count")) < Number(rowB.getAttribute("data-count"))){//opposite of previous if statement
                return -1;
            }
            return 0; //if same keep order
        })
        for(let row of array){
            toDoContainer.appendChild(row); //putting the new rows in order properly
        }
    }
    if (sort.value == "lToE"){
        //we want to make it highest count row at top to lowest count row at bottom
        var array = [];
        while(toDoContainer.firstChild){
            let row = toDoContainer.removeChild(toDoContainer.firstChild);
            array.push(row);
        }
        array.sort(function(rowA, rowB){
            if(Number(rowA.getAttribute("data-count")) < Number(rowB.getAttribute("data-count"))){ //if rowA less than rowB then return 1
                return 1;
            }
            if(Number(rowA.getAttribute("data-count")) > Number(rowB.getAttribute("data-count"))){//opposite of previous if statement
                return -1;
            }
            return 0;//else return 0
        })
        for(let row of array){
            toDoContainer.appendChild(row); //putting the new rows in order properly
        }
    }
})

enterTask.addEventListener('submit', function(event){
    event.preventDefault(); //prevents us from reloading page + gives us enter function from inputText
    if(inputField.value.trim() == ""){
        return
    }
    var row = document.createElement('div'); //create the row
    var checkBoxButton = document.createElement('span');
    var paragraph = document.createElement('div'); //create the div for text in row
    var removeItemButton = document.createElement('button'); //create button
    removeItemButton.classList.add('removeItemButton-styling'); //give button styling
    row.classList.add('row-style'); //give the row style
    paragraph.classList.add('paragraph-styling'); //give the text in div style
    removeItemButton.innerText = "X";
    checkBoxButton.classList.add("material-symbols-outlined");
    checkBoxButton.innerText = "check_box_outline_blank"; //creates the checkbox icon
    checkBoxButton.style.color = "black"
    checkBoxButton.classList.add('checkBox-style');
    paragraph.innerText = inputField.value; //save string from inputField
    row.appendChild(checkBoxButton);
    row.appendChild(paragraph); //put this text in row
    toDoContainer.appendChild(row); //actually save what we input into the row
    row.appendChild(removeItemButton); //putting button on row
    inputField.value = ""; //this removes the input val from inputField
    count++
    row.setAttribute("data-count", count); //this is for the sort function later
    row.setAttribute("data-status", "incomplete");
    checkBoxButton.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
        row.style.background = "gray";
        checkBoxButton.innerText = "check_box"
        toDoContainer.removeChild(row); //remove row
        toDoContainer.appendChild(row); //put row at bottom of list
        row.setAttribute("data-status", "completed");
    })
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
        row.style.background = "gray";
        checkBoxButton.innerText = "check_box"
        toDoContainer.removeChild(row); //remove row
        toDoContainer.appendChild(row); //put row at bottom of list
        row.setAttribute("data-status", "completed");
    })
    //make it so when we click on task list text or check box we undo the checking
    checkBoxButton.addEventListener('dblclick', function(){
        toDoContainer.insertBefore(row, toDoContainer.firstChild);//move back to top of list
        paragraph.style.textDecoration = "none";
        row.style.background = "white";
        checkBoxButton.innerText = "check_box_outline_blank";
        row.setAttribute("data-status", "incomplete");
    })
    paragraph.addEventListener('dblclick', function(){ //making it undo again
        toDoContainer.insertBefore(row, toDoContainer.firstChild);
        paragraph.style.textDecoration = "none";
        row.style.background = "white";
        checkBoxButton.innerText = "check_box_outline_blank";
        row.setAttribute("data-status", "incomplete");
    })
    removeItemButton.addEventListener('click', function(){ //dbl means double
        toDoContainer.removeChild(row); //removes item from to-do list
    })
})