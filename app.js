
let operations = [];

function loadOperations() {
    const tbody = document.getElementById('operationsBody');
    tbody.innerHTML = '';

    let operations = JSON.parse(localStorage.getItem('operations')) || [];

    operations.forEach((op, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${op.name}</td>
                <td>${op.description}</td>
                <td>
                    <button class="edit-btn" onclick="showEditModal(${index})">Edytuj</button>
                    <button class="delete-btn" onclick="deleteOperation(${index})">Usunąć</button>
                </td>
            </tr>
        `;
    });
}

function showAddModal() {
    document.getElementById('addModal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

function showEditModal(index) {
    const modal = document.getElementById('addModal');
    const nameInput = document.getElementById('operationName');
    const descInput = document.getElementById('operationDescription');

    nameInput.value = operations[index].name;
    descInput.value = operations[index].description;
    modal.style.display = 'block';
}

function saveOperation() {
    const name = document.getElementById('operationName').value;
    const description = document.getElementById('operationDescription').value;

    if (name && description) {
        operations.push({
            id: Date.now(),
            name: name,
            description: description
        });
        localStorage.setItem('operations', JSON.stringify(operations));
        loadOperations();
        closeAddModal();
    }
}

function deleteOperation(index) {
    operations.splice(index, 1);
    localStorage.setItem('operations', JSON.stringify(operations));
    loadOperations();
}

window.onload = loadOperations;