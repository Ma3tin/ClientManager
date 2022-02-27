window.onload = () => {
    fetch("http://167.172.175.168/78ed3834-66d7-4b50-a53f-b3db8b345afc/Clients")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let editModal = new bootstrap.Modal(document.getElementById("modal"))
            let detailModal = new bootstrap.Modal(document.getElementById("detailModal"))
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
                    let commentInput = document.getElementById("addComment")
                    addComment(commentInput.value, data[i].id)
                })
                li.innerHTML += `
                <span>${data[i].firstName + " " + data[i].lastName}</span>
                <span>${data[i].email}</span>
                `
                li.appendChild(deleteButton)
                li.appendChild(editButton)
                li.appendChild(detailButton)
                li.className = "list-group-item d-flex justify-content-between"
                document.getElementById("table").appendChild(li)
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
    fetch("http://167.172.175.168/78ed3834-66d7-4b50-a53f-b3db8b345afc/Clients", {
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
    fetch("http://167.172.175.168/78ed3834-66d7-4b50-a53f-b3db8b345afc/Clients/" + id, {
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
    fetch("http://167.172.175.168/78ed3834-66d7-4b50-a53f-b3db8b345afc/Clients/" + id, {
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
    fetch("http://167.172.175.168/78ed3834-66d7-4b50-a53f-b3db8b345afc/Clients/" + id + "/Comments", {
        method: "GET", headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log("Succes:", data)
            let modal = document.getElementById("comments")
            for (let i = 0; i < data.length; i++) {
                let span = document.createElement("span")
                span.innerText += data[i].body
                console.log(data[i].body)
                modal.appendChild(span)
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

function addComment(comment, id) {
    const data = {
        "body" : comment
    }
    fetch("http://167.172.175.168/78ed3834-66d7-4b50-a53f-b3db8b345afc/Clients/" + id + "/Comments", {
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