window.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		addListElement();
	}
});

window.addEventListener('onbeforeunload', () => {
	const remainingTasks = document.getElementById('items').childNodes;
	localStorage.setItem('prev-tasks', JSON.stringify(remainingTasks));
	remainingTasks.forEach((temp) => {
		console.log(temp);
	});
});

window.onload = () => {
	let prevTasks = localStorage.getItem('prev-tasks');
	prevTasks = JSON.parse(prevTasks);
	const currTasks = document.getElementById('items');
	prevTasks.forEach((temp) => {
		currTasks.appendChild(temp);
	});
};

const now = new Date();
let day = now.getDate();
if (day < 10) day = '0' + day;
let month = now.getMonth() + 1;
if (month < 10) month = '0' + month;
const year = now.getFullYear();

const currTime = `${year}-${month}-${day}T00:00`;
document.getElementById('date-input').setAttribute('min', currTime);

function addListElement() {
	let checkMarkClicks = 0;
	const task = document.getElementById('task-input').value;
	if (task === '') {
		alert('You must enter a value!');
		return;
	}

	const todos = document.getElementById('items');
	let deadline = document.getElementById('date-input').value;

	const currentTime = new Date();
	currentTime.setHours(0, 0, 0, 0);
	if (new Date(deadline) < new Date(currentTime)) {
		alert('The date is invalid!');
		console.log(Date.parse(deadline));
		console.log(currentTime);
		document.getElementById('date-input').value = '';
		return;
	}

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
		if (checkMarkClicks % 2 === 0) {
			checkButton.querySelector('i').classList.add('fa-check');
			checkButton.parentElement.querySelector(
				'h1'
			).style.textDecorationLine = 'line-through';
			checkButton.parentElement.querySelector(
				'h1'
			).style.textDecorationColor = 'black';
			checkButton.parentElement.querySelector(
				'h1'
			).style.textDecorationStyle = 'solid';
			checkButton.parentElement.querySelector(
				'h1'
			).style.textDecorationThickness = '4px';
			checkMarkClicks++;
		} else {
			checkButton.parentElement.querySelector('h1').style.textDecoration =
				'none';
			checkButton.querySelector('i').classList.remove('fa-check');
			checkMarkClicks++;
		}
	});

	// Create the task

	const taskDisplay = document.createElement('div');

	// Create the task text
	const todoInput = document.createElement('h1');
	todoInput.appendChild(document.createTextNode(task));
	todoInput.classList.add('task-desc');
	todoInput.setAttribute('title', task);

	// Create the deadline
	const dateAndTime = document.createElement('span');
	if (deadline !== '') {
		const calendarIcon = document.createElement('i');
		calendarIcon.classList.add('fa-solid');
		calendarIcon.classList.add('fa-calendar');
		calendarIcon.classList.add('fa-lg');

		const time = document.createElement('h1');
		const dateArray = deadline.split('T');
		const timeArray = dateArray[0].split('-');
		deadline =
			dateArray[1] +
			' ' +
			timeArray[2] +
			'.' +
			timeArray[1] +
			'.' +
			timeArray[0];
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
	});

	// Wrap checkButton and todoInput in a div
	const spanWrapper = document.createElement('span');
	spanWrapper.appendChild(checkButton);
	spanWrapper.appendChild(todoInput);
	spanWrapper.classList.add('task-container');

	// Add all elements to the li
	li.appendChild(spanWrapper);
	if (dateAndTime.hasChildNodes()) li.appendChild(dateAndTime);
	li.appendChild(removeButton);

	// Add li to ul
	document.getElementById('items').appendChild(li);

	// Clear task input
	document.getElementById('task-input').value = '';

	// Clear date input
	document.getElementById('date-input').value = '';

	// // Scroll to the bottom of the page
	// window.scrollTo(0, document.body.scrollHeight);
}
