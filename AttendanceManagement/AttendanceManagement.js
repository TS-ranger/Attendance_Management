document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    document.querySelector("#tbody").innerHTML = "";
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var rollNo = document.querySelector("#rollNo").value;

    var studentObj = {
        name: name,
        rollNo: rollNo
    }

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    displayFun(studentDataArr);
}

function displayFun(studentDataArr) {
    var count = 1;
    studentDataArr.map(function (item, index) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = count++;
        var td2 = document.createElement("td");
        td2.innerHTML = item.name;
        var td5 = document.createElement("td");
        td5.innerHTML = item.rollNo;
        var td6 = document.createElement("td");
        var btn1 = document.createElement("button");
        btn1.innerHTML = "P";
        btn1.addEventListener("click", function () {
            td6.innerHTML = "<button>Present</button>";
        });
        var btn2 = document.createElement("button");
        btn2.innerHTML = "A";
        btn2.addEventListener("click", function () {
            td6.innerHTML = "<button id='absent'>Absent</button>";
        });
        td6.classList.add("td6");
        td6.append(btn1, btn2);

        var td7 = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteStudent(index);
        });
        td7.append(deleteBtn);

        tr.append(td1, td2, td5, td6, td7);

        document.querySelector("#tbody").append(tr);
    });
}

function deleteStudent(index) {
    studentDataArr.splice(index, 1);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#tbody").innerHTML = "";
    displayFun(studentDataArr);
}

displayFun(studentDataArr);