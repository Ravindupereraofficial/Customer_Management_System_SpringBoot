function fetchCustomers() {
    return fetch("http://localhost:8080/customer/getAll")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load customers");
            return response.json();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to fetch customers. Please try again later.");
            return [];
        });
}

//----All-table-----------
function loadCustomers() {
    fetchCustomers().then(customers => {
        let tbody = document.getElementById("tbl-body");
        tbody.innerHTML = customers.map(customer => `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.salary}</td>
            </tr>
        `).join('');
    });
}

//-------Add-customer---------
function addCustomer(id, name, address, salary) {
    fetch("http://localhost:8080/customer/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, address, salary })
    })
    .then(response => {
        if (!response.ok) throw new Error(`Failed to add customer. Status: ${response.status}`);
        alert("Customer added successfully!");
        loadCustomers();
    })
    .catch(error => {
        alert("Failed to add customer.");
    });
}

//-------Search-customer---------
function searchCustomerById(id, tableBodyId) {
    fetch(`http://localhost:8080/customer/search/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to search customer");
            return response.json();
        })
        .then(customer => {
            displaySearchResults([customer], tableBodyId);
        })
        .catch(error => {
            console.error("Error searching customer:", error);
            alert("Customer not found. Please check the ID.");
        });
}
function displaySearchResults(results, tableBodyId) {
    let searchTbody = document.getElementById(tableBodyId);
    searchTbody.innerHTML = results.length ? results.map(customer => `
        <tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
        </tr>
    `).join('') : "<tr><td colspan='4'>No results found</td></tr>";
}

//-------Delete-customer---------
function deleteCustomerById(id) {
    fetch(`http://localhost:8080/customer/delete/${id}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete customer");
            alert("Customer deleted successfully!");
            loadCustomers();
            document.getElementById("delete-tbl-body").innerHTML = ""; 
        })
        .catch(error => {
            console.error("Error deleting customer:", error);
            alert("Failed to delete customer. Please try again.");
        });
}

//-------Delete-customer---------
function updateCustomer(id, name, address, salary) {
    fetch("http://localhost:8080/customer/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, address, salary })
    })
    .then(response => {
        if (!response.ok) throw new Error(`Failed to update customer. Status: ${response.status}`);
        alert("Customer updated successfully!");
        loadCustomers(); 
        document.getElementById("update-tbl-body").innerHTML = ""; 
        document.getElementById("update-form").reset(); 
    })
    .catch(error => {
        console.error("Error updating customer:", error);
        alert("Failed to update customer. Please check the console for details.");
    });
}

document.getElementById("customer-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let salary = document.getElementById("salary").value.trim();
    if (id && name && address && salary) addCustomer(id, name, address, salary);
    else alert("Please fill in all fields.");
});

document.getElementById("search-id-btn").addEventListener("click", function() {
    let searchId = document.getElementById("search-id-input").value.trim();
    if (searchId) searchCustomerById(searchId, "search-tbl-body");
    else alert("Please enter an ID to search.");
});

document.getElementById("delete-search-btn").addEventListener("click", function() {
    let deleteId = document.getElementById("delete-id-input").value.trim();
    if (deleteId) searchCustomerById(deleteId, "delete-tbl-body");
    else alert("Please enter an ID to search.");
});

document.getElementById("delete-id-btn").addEventListener("click", function() {
    let deleteId = document.getElementById("delete-id-input").value.trim();
    if (deleteId) deleteCustomerById(deleteId);
    else alert("Please enter an ID to delete.");
});

document.getElementById("update-search-btn").addEventListener("click", function() {
    let updateId = document.getElementById("update-id-input").value.trim();
    if (updateId) {
        searchCustomerById(updateId, "update-tbl-body")
            .then(customer => {
                if (customer) {
                    document.getElementById("update-name").value = customer.name;
                    document.getElementById("update-address").value = customer.address;
                    document.getElementById("update-salary").value = customer.salary;
                }
            });
    } else {
        alert("Please enter an ID to search.");
    }
});

//-------Update-customer---------
function updateCustomer(id, name, address, salary) {
    
    let updateData = {};
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (salary) updateData.salary = salary;

    fetch(`http://localhost:8080/customer/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData) 
    })
    .then(response => {
        if (!response.ok) throw new Error(`Failed to update customer. Status: ${response.status}`);
        alert("Customer updated successfully!");
        loadCustomers(); 
        document.getElementById("update-tbl-body").innerHTML = ""; 
        document.getElementById("update-form").reset(); 
    })
    .catch(error => {
        console.error("Error updating customer:", error);
        alert("Failed to update customer. Please check the console for details.");
    });
}

function searchCustomerForUpdate(id) {
    fetch(`http://localhost:8080/customer/search/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to search customer");
            return response.json();
        })
        .then(customer => {
           
            displaySearchResults([customer], "update-tbl-body");

            document.getElementById("update-name").value = customer.name;
            document.getElementById("update-address").value = customer.address;
            document.getElementById("update-salary").value = customer.salary;
        })
        .catch(error => {
            console.error("Error searching customer:", error);
            alert("Customer not found. Please check the ID.");
        });
}

document.getElementById("update-search-btn").addEventListener("click", function() {
    let updateId = document.getElementById("update-id-input").value.trim();
    if (updateId) {
        searchCustomerForUpdate(updateId);
    } else {
        alert("Please enter an ID to search.");
    }
});

loadCustomers();