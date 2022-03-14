let detailModal

window.onload = () => {
    detailModal = new bootstrap.Modal(document.getElementById("detailModal"))
    let table = document.getElementById("table")
    table.innerText = ""

    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let editModal = new bootstrap.Modal(document.getElementById("modal"))
            for (let i = 0; i < data.length; i++) {
                let li = document.createElement("li")
                let deleteButton = document.createElement("button")
                deleteButton.innerText = "Delete"
                deleteButton.className = "btn btn-danger"
                deleteButton.addEventListener("click", () => {
                    del(data[i].id)
                })

                let editButton = document.createElement("button")
                editButton.innerText = "Edit"
                editButton.className = "btn btn-primary"
                editButton.id = "modal"
                editButton.addEventListener("click", () => {
                    editModal.show()
                    let firstNameTwo = document.getElementById("firstNameTwo")
                    firstNameTwo.value = data[i].firstName
                    let lastNameTwo = document.getElementById("lastNameTwo")
                    lastNameTwo.value = data[i].lastName
                    let emailTwo = document.getElementById("emailTwo")
                    emailTwo.value = data[i].email
                    let editUser = document.getElementById("editUser")
                    editUser.addEventListener("click", () => {
                        edit(firstNameTwo.value, lastNameTwo.value, emailTwo.value, data[i].id)
                    })

                })
                let detailButton = document.createElement("button")

                detailButton.innerText = "Details"
                detailButton.className = "btn btn-info"
                detailButton.id = "detailModal"
                detailButton.addEventListener("click", () => {
                    detailModal.show()
                    detail(data[i].id)
                })
                let commentButton = document.getElementById("add")
                commentButton.addEventListener("click", () => {
                    let weightInput = document.getElementById("weight")
                    let descriptionInput = document.getElementById("description")
                    let gradeInput = document.getElementById("grade")
                    addComment(weightInput.value,descriptionInput.value,gradeInput.value, data[i].id)
                })
                li.innerHTML += `
                <span>${data[i].firstName + " " + data[i].lastName}</span>
                <span>${data[i].email}</span>
                `
                li.appendChild(deleteButton)
                li.appendChild(editButton)
                li.appendChild(detailButton)
                li.className = "list-group-item d-flex justify-content-between"
                table.appendChild(li)
            }
        })
    let buttonSave = document.getElementById("newUser")
    buttonSave.addEventListener("click",() => {
        let firstName = document.getElementById("firstName").value
        let lastName = document.getElementById("lastName").value
        let email = document.getElementById("email").value
        post(firstName, lastName, email)
        let close = document.getElementById("close")
        close.click()
    })

}

function post(firstName, lastName, email) {
    const data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    }
    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Succes:", data)
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}


function del(id) {
    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students/" + id, {
        method: "DELETE", headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log("Succes:", data)
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

function edit(firstName, lastName, email, id) {
    const data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    }
    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students/" + id, {
        method: "PUT", headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Succes:", data)
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

function detail(id) {
    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students/" + id, {
        method: "GET", headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            data = data.grades
            console.log("Succes:", data)
            let modal = document.getElementById("comments")
            modal.innerText=""
            for (let i = 0; i < data.length; i++) {
                let span = document.createElement("span")
                span.innerText += data[i].grade + ` (${data[i].weight}) - ${data[i].description}`

                let del = document.createElement("span")
                del.className = "text-danger m-1 btn"
                del.innerText = "Smazat"
                del.addEventListener("click", () => {
                    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students/" + id + "/Grades/"+data[i].id, {
                        method: "DELETE"
                    }).then(res => {
                        detail(id)
                    })
                })

                let edit = document.createElement("span")
                edit.className = "text-info m-1 btn"
                edit.innerText = "Upravit"

                let weightInput = document.getElementById("weightInput")
                let descriptionInput = document.getElementById("descriptionInput")
                let gradeInput = document.getElementById("gradeInput")
                let editedBtn = document.getElementById("edited")
                let selected
                edit.addEventListener("click", () => {
                    let modalWindow = new bootstrap.Modal(document.getElementById("editGrade"))
                    detailModal.hide()
                    modalWindow.show()
                    weightInput.value = data[i].weight
                    gradeInput.value = data[i].grade
                    descriptionInput.value = data[i].description
                    selected = data[i].id
                })

                editedBtn.addEventListener("click", () => {
                    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students/" + id + "/Grades/"+selected, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            grade: gradeInput.value,
                            description: descriptionInput.value,
                            weight: weightInput.value
                        })
                    })
                })

                span.appendChild(del)
                span.appendChild(edit)
                console.log(data[i].body)
                modal.appendChild(span)
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

function addComment(weight, description, grade, id) {
    const data = {
        "weight": weight,
        "description": description,
        "grade": grade
    }
    fetch("http://159.223.27.219/78ed3834-66d7-4b50-a53f-b3db8b345afc/Students/" + id + "/Grades", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Succes:", data)
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}