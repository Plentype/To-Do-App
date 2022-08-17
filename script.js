const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
taskInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        addListElement();
    }
})

dateInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        addListElement();
    }
})

function addListElement() {
    let checkMarkClicks = 0;
    const task = document.getElementById('task-input').value;
    if(task === ''){
        alert('You must enter a value!');
        return;
    }

    const todos = document.getElementById('items');
    let deadline = document.getElementById('date-input').value;
    
    const li = document.createElement('li');
    li.classList.add('todo-list');

    // Create the checkmark button
    const checkmark = document.createElement('i');
    checkmark.classList.add('fa-solid');
    checkmark.classList.add('fa-2xl');

    const checkButton = document.createElement('button');
    checkButton.appendChild(checkmark);
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', () => {
        if(checkMarkClicks % 2 === 0) {
            checkButton.querySelector('i').classList.add('fa-check');
            checkButton.parentElement.querySelector('h1').style.textDecorationLine = 'line-through';
            checkButton.parentElement.querySelector('h1').style.textDecorationColor = 'black';
            checkButton.parentElement.querySelector('h1').style.textDecorationStyle = 'solid';
            checkButton.parentElement.querySelector('h1').style.textDecorationThickness = '4px';
            checkMarkClicks++;
        } else {
            checkButton.parentElement.querySelector('h1').style.textDecoration = 'none';
            checkButton.querySelector('i').classList.remove('fa-check');
            checkMarkClicks++;
        }
    })

    // Create the task

        const taskDisplay = document.createElement('div');

        // Create the task text
        const todoInput = document.createElement('h1');
        todoInput.appendChild(document.createTextNode(task));
        todoInput.classList.add('task-desc');
        todoInput.setAttribute('title', task);

        // Create the deadline
        const dateAndTime = document.createElement('span');
        if(deadline !== '') {
            const calendarIcon = document.createElement('i');
            calendarIcon.classList.add('fa-solid');
            calendarIcon.classList.add('fa-calendar');
            calendarIcon.classList.add('fa-xl')

            const time = document.createElement('h1');
            const dateArray = deadline.split('T');
            const timeArray = dateArray[0].split('-');
            deadline = dateArray[1] + ' ' + timeArray[2] + '.' + timeArray[1] + '.' + timeArray[0];
            time.appendChild(document.createTextNode(deadline));
            dateAndTime.appendChild(calendarIcon);
            dateAndTime.appendChild(time);
            dateAndTime.classList.add('deadline-display');
        }

    // Create the remove button
    const removeButtonIcon = document.createElement('i');
    removeButtonIcon.classList.add('fa-solid');
    removeButtonIcon.classList.add('fa-trash-can');
    removeButtonIcon.classList.add('fa-xl');

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.appendChild(removeButtonIcon);

    removeButton.addEventListener('click', () => {
        removeButton.parentElement.remove();
    })

    // Wrap checkButton and todoInput in a div
    const spanWrapper = document.createElement('span');
    spanWrapper.appendChild(checkButton);
    spanWrapper.appendChild(todoInput);
    spanWrapper.classList.add('task-container');

    // Add all elements to the li
    li.appendChild(spanWrapper);
    if(dateAndTime.hasChildNodes())
        li.appendChild(dateAndTime);
    li.appendChild(removeButton);

    // Add li to ul
    document.getElementById('items').appendChild(li);

    // Clear input
    document.getElementById('task-input').value = '';
}