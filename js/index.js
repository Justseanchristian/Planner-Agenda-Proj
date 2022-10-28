const dateInput = document.querySelector('.dateInput');
const saveDate = document.querySelector('.saveTodos');
const dateInputSubmit = document.querySelector('.viewTodos');
const modalTitle = document.querySelector('.modalTitle');
const datesWithItems = [];

function saveDateFunc() {
    const dateInputUnformatted = new Date(dateInput.value + ':12:00:00');
    const dateFormatted = dateInputUnformatted.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })

    createModal(dateInput.value, dateFormatted);
}

dateInput.addEventListener('input', () => {
    saveDateFunc();
});

document.addEventListener('click', (e) => {
    const addTodoInput = document.querySelector('.newTodoInput-' + document.querySelector('.' + e.target.classList[3]).parentElement.parentElement.classList[0].slice('16', '26'));
    const addTodoBtn = document.querySelector('.addTodoBtn');

    if (e.target.classList.contains('addTodoBtn')) {
        if (addTodoInput.value !== '') {

            addTodo(addTodoInput.value, document.querySelector('.' + e.target.classList[3]).parentElement.parentElement.classList[0].slice('16', '26'));
            addTodoInput.value = '';
        }
    }

    if (e.target.classList.contains('removeTodoItem')) {
        document.querySelector('.' + e.target.classList[1]).parentElement.remove();
    }

});

// Create a new modal
function createModal(date, dateFormatted) {
    const modal = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('fade');
    modal.id = 'modal-' + date;
    modalDialog.classList.add('modal-dialog');
    modalContent.classList.add('modal-content');

    datesWithItems.push(date);

    modalContent.innerHTML = `
        <div class="modal-header">
            <h5 class="modalTitle">${dateFormatted}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <ol class="${'modal-todo-list-' + date}">
                <li>
                    <input class="newTodoInput newTodoInput-${date}" type="text">
                    <button class="addTodoBtn btn btn-primary uuid-${Math.floor(Math.random() * 10000000000)}">+</button>
                </li>
            </ol>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    `;

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    const btn = document.querySelector('.viewTodos');
    btn.setAttribute('data-bs-target', '#' + 'modal-' + date);

    document.querySelector('.container').appendChild(modal);
}

// Add todo function
function addTodo(content, date) {
    const todo = document.createElement('li');
    todo.classList.add('dynamicContent');
    todo.innerHTML = content + `<button class="removeTodoItem removeTodoItem-${Math.floor(Math.random() * 10000000000)} btn btn-sm btn-secondary m-1">X</button>`;

    document.querySelector('.modal-todo-list-' + date).prepend(todo);
}

// Makes input's default value today
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function setDate() {
    dateInput.value = new Date().toDateInputValue();
}

function saveData() {

    // for (let i = 0; i < document.querySelectorAll('.modal').length; i++) {
    //     if (document.querySelectorAll('.modal')[i].classList[2] == undefined) {  
    //         console.log('Data saved!');
    
    //         let currentWebpage = JSON.stringify(document.body.innerHTML);
    //         localStorage.setItem('current_webpage', currentWebpage);
    //     } else {
    //         document.querySelectorAll('.modal')[i].classList.remove('show');
    //         document.querySelector('.modal-backdrop').remove();

    //         console.log('Data saved!');
    
    //         let currentWebpage = JSON.stringify(document.body.innerHTML);
    //         localStorage.setItem('current_webpage', currentWebpage);
    //     }
    // }

    const data = [];

    for (let i = 0; i < datesWithItems.length; i++) {
        const todoListItemContent = [];

        for (let i = 0; i < document.querySelectorAll('.dynamicContent').length; i++) {
            todoListItemContent.push(document.querySelectorAll('.dynamicContent')[i].outerText.slice('0', '-1'));
        }

        data.push({ "date": datesWithItems[i], "todoList": todoListItemContent });

    }

    console.log(data);

}

function uploadSavedData() {
    // const savedData = JSON.parse(localStorage.getItem('current_webpage'));

    // if (savedData !== null) {
    //     document.body.innerHTML = savedData;
    //     console.log('All saved data was uploaded to the webpage!');
    // } else { console.log('No data was uploaded, because there is no saved data!') }
}