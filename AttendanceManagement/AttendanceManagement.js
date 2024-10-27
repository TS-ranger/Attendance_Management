const students = {};

document.getElementById('form1').addEventListener('submit', function(event) {
event.preventDefault();

const name = document.getElementById('name').value;
const rollNo = document.getElementById('rollNo').value;

if (!students[rollNo]) {
    students[rollNo] = { name, rollNo, attendance: {} };
}

document.getElementById('form1').reset();
displayAttendance(new Date().toISOString().split('T')[0]);
});

document.getElementById('tbody').addEventListener('click', function(event) {
const row = event.target.closest('tr');
const rollNo = row.querySelector('.rollNo-cell').textContent;
const date = document.getElementById('viewDate').value || new Date().toISOString().split('T')[0];

if (event.target.classList.contains('btn-present')) {
    row.style.backgroundColor = 'lightgreen';
    students[rollNo].attendance[date] = 'Present';
} else if (event.target.classList.contains('btn-absent')) {
    row.style.backgroundColor = 'lightcoral';
    students[rollNo].attendance[date] = 'Absent';
} else if (event.target.classList.contains('btn-delete')) {
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
    delete students[rollNo];
    row.remove();
    }
}
});

document.getElementById('viewButton').addEventListener('click', function() {
const viewDate = document.getElementById('viewDate').value;
displayAttendance(viewDate);
});

function displayAttendance(date) {
const tbody = document.getElementById('tbody');
tbody.innerHTML = '';

Object.values(students).forEach((student, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${student.name}</td>
    <td class="rollNo-cell">${student.rollNo}</td>
    <td>${date}</td>
    <td>
        <button class="btn-present">Present</button>
        <button class="btn-absent">Absent</button>
    </td>
    <td><button class="btn-delete">Delete</button></td>
    `;
    
    if (student.attendance[date] === 'Present') {
    row.style.backgroundColor = 'lightgreen';
    } else if (student.attendance[date] === 'Absent') {
    row.style.backgroundColor = 'lightcoral';
    }

    tbody.appendChild(row);
});
}