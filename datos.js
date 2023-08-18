document.addEventListener("DOMContentLoaded", () => {

    // Respuesta que envia el formulario al backen y se almacena en la base de datos
    document.getElementById("formulario").addEventListener("submit", async function (event) {
        event.preventDefault();
        const userName = document.getElementById("nombre").value;
        const userEmail = document.getElementById("correo").value;
        const userPhone = document.getElementById("telefono").value;

        const userResponse = await fetch('https://localhost:7026/api/Usuario/Post-Usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre: userName,
                Correo: userEmail,
                Telefono: userPhone
            })
        });
        const userResult = await userResponse.json();

        const userTable = document.querySelector('[data-tabla]');
        const newRow = userTable.insertRow(-1);
        newRow.insertCell(0).textContent = userResult.Id;
        newRow.insertCell(1).textContent = userName;
        newRow.insertCell(2).textContent = userEmail;
        newRow.insertCell(3).textContent = userPhone;
        newRow.insertCell(4).textContent = "";
    });

    const bookButtons = document.querySelectorAll(".form-btn-books");
    bookButtons.forEach(button => {
        button.addEventListener("click", async function () {
            const bookTitle = button.closest(".article-card").querySelector(".card-text").textContent;

            const bookResponse = await fetch(`https://localhost:7026/api/Libros/Post-Libros?nombre=${bookTitle}`, {
                method: 'POST'
            });
            const bookResult = await bookResponse.json();

            // Actualizar el valor del libro que selecciona el usuario
            const userTable = document.querySelector('[data-tabla]');
            const lastRow = userTable.rows[userTable.rows.length - 1];
            lastRow.cells[4].textContent = bookTitle;
        });
    });


    async function getExistingUsers() {
        const response = await fetch('https://localhost:7026/api/Usuario/Get-Usuario');
        const users = await response.json();
        const userTable = document.querySelector('[data-tabla]');
        users.forEach(user => {
            const newRow = userTable.insertRow(-1);
            //newRow.insertCell(0).textContent = user.Id;
            newRow.insertCell(1).textContent = user.Nombre;
            newRow.insertCell(2).textContent = user.Correo;
            newRow.insertCell(3).textContent = user.Telefono;
            newRow.insertCell(4).textContent = "";
        });
    }


    async function getExistingBooks() {
        const response = await fetch('https://localhost:7026/api/Libros/Get-Libros');
        const books = await response.json();
        const bookSection = document.querySelector('.books-section');
    }

    getExistingUsers();
    getExistingBooks();
});
