//DECLARATIONS
const input = document.querySelector('#todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const favList = document.querySelector('.fav-list');
const filter = document.querySelector('.filter');
const editInput = document.querySelectorAll('.edit-input');
const colorInput = document.querySelector('#color-input');
const body = document.querySelector('body');

//BRING BACK LOCALSTORAGE ITEMS
const savedTodoList = JSON.parse(localStorage.getItem('savedTodos'));
const savedBgColor = JSON.parse(localStorage.getItem('savedColor'));

if(savedTodoList){
    savedTodoList.forEach(savedTodo =>{
        createSavedItem(savedTodo.todo, savedTodo.checked, savedTodo.favorite)
    })
}

if(savedBgColor){
    body.style.backgroundColor = savedBgColor;
    colorInput.value = savedBgColor;
}

//EVENTLISTENERS
todoBtn.addEventListener('click', newTodo);

input.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        newTodo();
    }
});

filter.addEventListener('change', filterOption);

colorInput.addEventListener('change', ()=>{
    body.style.backgroundColor = colorInput.value;
    updateLS();
});

//CREATE NEW TO-DO
function newTodo(e){
    if(input.value === ''){
        //CHECK IF VALID INPUT
        input.style.border = '2px solid red';
        setTimeout(()=>{input.style.border = '2px solid white'}, 1000);
    } else {
        //CONTAINER
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('item-container');
        //LI
        let todoLi = document.createElement('li');
        todoLi.classList.add('todo-li');
        todoLi.innerText = input.value;
        //CHECK BUTTON
        let check = document.createElement('button');
        check.innerHTML = '<i class="far fa-check-square"></i>';
        check.classList.add('check-button');
        //DELETE BUTTON
        let deleteB = document.createElement('button');
        deleteB.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteB.classList.add('delete-btn');
        //FAVORITE BUTTON
        let favB = document.createElement('button');
        favB.classList.add('fav-button');
        favB.innerHTML = '<i class="fas fa-star"></i>';
        //EDIT BUTTON
        let editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';
        //MOVE ONE UP BUTTON
        let upBtn = document.createElement('button');
        upBtn.classList.add('up-btn');
        upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        //MOVE ONE DOWN BUTTON
        let downBtn = document.createElement('button');
        downBtn.classList.add('down-btn');
        downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        //APPEND CONTENT TO CONTAINER
        todoDiv.appendChild(todoLi);
        todoDiv.appendChild(check);
        todoDiv.appendChild(deleteB);
        todoDiv.appendChild(favB);
        todoDiv.appendChild(upBtn);
        todoDiv.appendChild(downBtn);
        todoDiv.appendChild(editBtn);
        //ADD TO-DO TO THE LIST
        todoList.appendChild(todoDiv);
        //RESET THE INPUT VALUE
        input.value = '';
        updateLS()
    }
}


//CREATE LOCALSTORAGE ITEMS
function createSavedItem(liSavedText, savedCheck, savedFavorite){
    //CONTAINER
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('item-container');
    //LI
    let todoLi = document.createElement('li');
    todoLi.classList.add('todo-li');
    todoLi.innerText = liSavedText;
    //CHECK BUTTON
    let check = document.createElement('button');
    check.innerHTML = '<i class="far fa-check-square"></i>';
    check.classList.add('check-button');
    
    //DELETE BUTTON
    let deleteB = document.createElement('button');
    deleteB.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteB.classList.add('delete-btn');
    //FAVORITE BUTTON
    let favB = document.createElement('button');
    favB.classList.add('fav-button');
    favB.innerHTML = '<i class="fas fa-star"></i>';
    //EDIT BUTTON
    let editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<i class="far fa-edit"></i>';
    //MOVE ONE UP BUTTON
    let upBtn = document.createElement('button');
    upBtn.classList.add('up-btn');
    upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    //MOVE ONE DOWN BUTTON
    let downBtn = document.createElement('button');
    downBtn.classList.add('down-btn');
    downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    //APPEND CONTENT TO CONTAINER
    todoDiv.appendChild(todoLi);
    todoDiv.appendChild(check);
    todoDiv.appendChild(deleteB);
    todoDiv.appendChild(favB);
    todoDiv.appendChild(upBtn);
    todoDiv.appendChild(downBtn);
    todoDiv.appendChild(editBtn);

    
    //ADD TO-DO TO THE LIST
    todoList.appendChild(todoDiv);
    if(savedCheck === true){
        check.parentElement.classList.add('checked');
        check.style.backgroundColor = 'lime';
        check.parentElement.firstChild.innerHTML = `<s>${check.parentElement.firstChild.innerText}</s>`;
    }
    if(savedFavorite === true){
        favB.parentElement.classList.add('favorite');
        let favTodo = favB.parentElement;
        favB.style.backgroundColor = 'gold';
        favList.appendChild(favTodo);
    }
}





//EVENTLISTENER TO-DO CONTAINER //BASIC LIST
todoList.addEventListener('click', (e)=>{
    //DELETE TO-DO
    if(e.target.classList.contains('delete-btn')){
        e.target.parentElement.classList.add('fade');
        setTimeout(()=>{e.target.parentElement.remove(), updateLS()}, 500);

        //CHECK BUTTON
    } else if (e.target.classList.contains('check-button')){
        if(e.target.style.backgroundColor === ''){
            e.target.parentElement.classList.add('checked');
            e.target.style.backgroundColor = 'lime';
            e.target.parentElement.firstChild.innerHTML = `<s>${e.target.parentElement.firstChild.innerText}</s>`;
        } else if (e.target.style.backgroundColor === 'lime'){
            e.target.parentElement.classList.remove('checked');
            e.target.style.backgroundColor = '';
            e.target.parentElement.firstChild.innerHTML = e.target.parentElement.firstChild.innerText;
        }

        //EDIT BUTTON
    } else if (e.target.classList.contains('edit-btn')){
        e.target.parentElement.classList.remove('checked');

        let editInput = document.createElement('input');
        editInput.classList.add('edit-input');
        editInput.value = e.target.parentElement.firstChild.innerText;
        //CREATE NEW TO-DO AFTER EDIT ON ENTER
        editInput.addEventListener('keypress', (i)=>{
            if(i.key === 'Enter'){

                let todoLi = document.createElement('li');
                todoLi.classList.add('todo-li');
                todoLi.innerText = i.target.parentElement.firstChild.value;
            
                let check = document.createElement('button');
                check.innerHTML = '<i class="far fa-check-square"></i>';
                check.classList.add('check-button');
            
                let deleteB = document.createElement('button');
                deleteB.innerHTML = '<i class="fas fa-trash-alt"></i>';
                deleteB.classList.add('delete-btn');

                let favB = document.createElement('button');
                favB.classList.add('fav-button');
                favB.innerHTML = '<i class="fas fa-star"></i>';

                let editBtn = document.createElement('button');
                editBtn.classList.add('edit-btn');
                editBtn.innerHTML = '<i class="far fa-edit"></i>';

                let upBtn = document.createElement('button');
                upBtn.classList.add('up-btn');
                upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';

                let downBtn = document.createElement('button');
                downBtn.classList.add('down-btn');
                downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';

                i.target.parentElement.lastChild.remove()
            
                i.target.parentElement.appendChild(todoLi);
                i.target.parentElement.appendChild(check);
                i.target.parentElement.appendChild(deleteB);
                i.target.parentElement.appendChild(favB);
                i.target.parentElement.appendChild(upBtn);
                i.target.parentElement.appendChild(downBtn);
                i.target.parentElement.appendChild(editBtn);

                
                i.target.parentElement.firstChild.remove();
                updateLS();
            }
        })

        //CREATE NEW EDIT BUTTON
        let editCheck = document.createElement('button');
        editCheck.classList.add('edit-check');
        editCheck.innerHTML = '<i class="far fa-edit"></i>';

        //DELETE OLD TO-DO
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();

        //ADD EDITING ELEMENTS
        e.target.parentElement.appendChild(editInput);
        e.target.parentElement.appendChild(editCheck);
        e.target.parentElement.firstChild.remove();
        editInput.focus();


    //CREACT NEW TO-DO WITH EDIT CLICK
    } else if (e.target.classList.contains('edit-check')){

        let todoLi = document.createElement('li');
        todoLi.classList.add('todo-li');
        todoLi.innerText = e.target.parentElement.firstChild.value;
    
        let check = document.createElement('button');
        check.innerHTML = '<i class="far fa-check-square"></i>';
        check.classList.add('check-button');
    
        let deleteB = document.createElement('button');
        deleteB.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteB.classList.add('delete-btn');

        let favB = document.createElement('button');
        favB.classList.add('fav-button');
        favB.innerHTML = '<i class="fas fa-star"></i>';

        let editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';

        let upBtn = document.createElement('button');
        upBtn.classList.add('up-btn');
        upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';

        let downBtn = document.createElement('button');
        downBtn.classList.add('down-btn');
        downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    
        e.target.parentElement.appendChild(todoLi);
        e.target.parentElement.appendChild(check);
        e.target.parentElement.appendChild(deleteB);
        e.target.parentElement.appendChild(favB);
        e.target.parentElement.appendChild(upBtn);
        e.target.parentElement.appendChild(downBtn);
        e.target.parentElement.appendChild(editBtn);

        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();

    //FAVORTIE BUTTON
    } else if(e.target.classList.contains('fav-button')){
        if(e.target.parentElement.parentElement.classList.contains('fav-list')){
            e.target.parentElement.classList.remove('favorite');
            let norTodo = e.target.parentElement;
            e.target.style.backgroundColor = '';
            todoList.appendChild(norTodo);
        } else if (e.target.parentElement.parentElement.classList.contains('todo-list')){
            e.target.parentElement.classList.add('favorite');
            let favTodo = e.target.parentElement;
            e.target.style.backgroundColor = 'gold';
            favList.appendChild(favTodo);
        }
    
    //UP BUTTON
    } else if (e.target.classList.contains('up-btn')){
        let moveUp = e.target.parentElement;
        todoList.insertBefore(moveUp, moveUp.previousElementSibling);

    //DOWN BUTTON
    } else if (e.target.classList.contains('down-btn')){
        let moveDown = e.target.parentElement;
        todoList.insertBefore(moveDown.nextElementSibling, moveDown);
    }
    updateLS();
})


//SAME EVENTLISTENER BUT FOR FAVORITES LIST
favList.addEventListener('click', (e)=>{
    //DELETE BUTTON
    if(e.target.classList.contains('delete-btn')){
        e.target.parentElement.classList.add('fade');
        setTimeout(()=>{e.target.parentElement.remove(), updateLS()}, 500);

    //CHECK BUTTON
    } else if (e.target.classList.contains('check-button')){
        if(e.target.style.backgroundColor === ''){
            e.target.parentElement.classList.add('checked');
            e.target.style.backgroundColor = 'lime';
            e.target.parentElement.firstChild.innerHTML = `<s>${e.target.parentElement.firstChild.innerText}</s>`;
        } else if (e.target.style.backgroundColor === 'lime'){
            e.target.parentElement.classList.remove('checked');
            e.target.style.backgroundColor = '';
            e.target.parentElement.firstChild.innerHTML = e.target.parentElement.firstChild.innerText;
        }

    //EDIT BUTTON
    } else if (e.target.classList.contains('edit-btn')){
        e.target.parentElement.classList.remove('checked');
        let editInput = document.createElement('input');
        editInput.classList.add('edit-input');
        editInput.value = e.target.parentElement.firstChild.innerText;
        editInput.addEventListener('keypress', (i)=>{
            if(i.key === 'Enter'){
                let todoLi = document.createElement('li');
                todoLi.classList.add('todo-li');
                todoLi.innerText = i.target.parentElement.firstChild.value;
            
                let check = document.createElement('button');
                check.innerHTML = '<i class="far fa-check-square"></i>';
                check.classList.add('check-button');
            
                let deleteB = document.createElement('button');
                deleteB.innerHTML = '<i class="fas fa-trash-alt"></i>';
                deleteB.classList.add('delete-btn');

                let favB = document.createElement('button');
                favB.classList.add('fav-button');
                favB.innerHTML = '<i class="fas fa-star"></i>';
                favB.style.backgroundColor = 'gold';

                let editBtn = document.createElement('button');
                editBtn.classList.add('edit-btn');
                editBtn.innerHTML = '<i class="far fa-edit"></i>';

                let upBtn = document.createElement('button');
                upBtn.classList.add('up-btn');
                upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';

                let downBtn = document.createElement('button');
                downBtn.classList.add('down-btn');
                downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';

                i.target.parentElement.lastChild.remove();
            
                i.target.parentElement.appendChild(todoLi);
                i.target.parentElement.appendChild(check);
                i.target.parentElement.appendChild(deleteB);
                i.target.parentElement.appendChild(favB);
                i.target.parentElement.appendChild(upBtn);
                i.target.parentElement.appendChild(downBtn);
                i.target.parentElement.appendChild(editBtn);

                
                i.target.parentElement.firstChild.remove();
                updateLS();
            }
        })
        

        let editCheck = document.createElement('button');
        editCheck.classList.add('edit-check');
        editCheck.innerHTML = '<i class="far fa-edit"></i>';

        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();

        e.target.parentElement.appendChild(editInput);
        e.target.parentElement.appendChild(editCheck);
        e.target.parentElement.firstChild.remove();
        editInput.focus();

    } else if (e.target.classList.contains('edit-check')){

        let todoLi = document.createElement('li');
        todoLi.classList.add('todo-li');
        todoLi.innerText = e.target.parentElement.firstChild.value;
    
        let check = document.createElement('button');
        check.innerHTML = '<i class="far fa-check-square"></i>';
        check.classList.add('check-button');
    
        let deleteB = document.createElement('button');
        deleteB.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteB.classList.add('delete-btn');

        let favB = document.createElement('button');
        favB.classList.add('fav-button');
        favB.innerHTML = '<i class="fas fa-star"></i>';
        favB.style.backgroundColor = 'gold';

        let editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';

        let upBtn = document.createElement('button');
        upBtn.classList.add('up-btn');
        upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';

        let downBtn = document.createElement('button');
        downBtn.classList.add('down-btn');
        downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    
        e.target.parentElement.appendChild(todoLi);
        e.target.parentElement.appendChild(check);
        e.target.parentElement.appendChild(deleteB);
        e.target.parentElement.appendChild(favB);
        e.target.parentElement.appendChild(upBtn);
        e.target.parentElement.appendChild(downBtn);
        e.target.parentElement.appendChild(editBtn);

        e.target.parentElement.firstChild.remove();
        e.target.parentElement.firstChild.remove();

    //FAVORITE BUTTON
    } else if(e.target.classList.contains('fav-button')){
        if(e.target.parentElement.parentElement.classList.contains('fav-list')){
            e.target.parentElement.classList.remove('favorite');
            let norTodo = e.target.parentElement;
            e.target.style.backgroundColor = '';
            todoList.appendChild(norTodo);
        } else if (e.target.parentElement.parentElement.classList.contains('todo-list')){
            e.target.parentElement.classList.add('favorite');
            let favTodo = e.target.parentElement;
            e.target.style.backgroundColor = 'gold';
            favList.appendChild(favTodo);
        }

    //UP BUTTON
    } else if (e.target.classList.contains('up-btn')){
        let moveUp = e.target.parentElement;
        favList.insertBefore(moveUp, moveUp.previousElementSibling);

    //DOWN BUTTON
    } else if (e.target.classList.contains('down-btn')){
        let moveDown = e.target.parentElement;
        favList.insertBefore(moveDown.nextElementSibling, moveDown);
    }
    updateLS();
})


//FILTER DROPDOWN LIST
function filterOption(e){
    let todo = todoList.childNodes;
    let favdo = favList.childNodes;
    
    //COMPLETED
    if(e.target.value === 'completed'){
        todo.forEach(function(i){
            if(i.classList.contains('checked')){
                i.style.display = 'flex';
            } else {
                i.style.display = 'none';
            }
        })
        favdo.forEach(function(i){
            if(i.classList.contains('checked')){
                i.style.display = 'flex';
            } else {
                i.style.display = 'none';
            }
        })
    //ALL
    } else if (e.target.value === 'all'){
        todo.forEach((i)=>{
            i.style.display = 'flex'
        })
        favdo.forEach((i)=>{
            i.style.display = 'flex'
        })
    //FAVORITES
    } else if (e.target.value === 'favorites'){
        todo.forEach((i)=>{
            i.style.display = 'none'
        })
        favdo.forEach((i)=>{
            i.style.display = 'flex'
        })
    //TO-DO
    } else if(e.target.value === 'to-do'){
        todo.forEach((i)=>{
            if(i.classList.contains('checked')){
                i.style.display = 'none'
            } else {
                i.style.display = 'flex'
            }
        })
        favdo.forEach((i)=>{
            if(i.classList.contains('checked')){
                i.style.display = 'none'
            } else{
                i.style.display = 'flex'
            }
        })
    }
}

//UPDATE LOCALSTORAGE
const updateLS = ()=>{
    const savedLi = document.querySelectorAll('li');

    const savedTodos = [];
    savedLi.forEach(li =>{
        savedTodos.push(stodo = {
            todo: li.innerText,
            checked: li.parentElement.classList.contains('checked'),
            favorite: li.parentElement.classList.contains('favorite')
    })
    localStorage.setItem("savedTodos", JSON.stringify(savedTodos));

    const savedColor = colorInput.value

    localStorage.setItem("savedColor", JSON.stringify(savedColor));
})}

//MADE BY MARK JONKERS