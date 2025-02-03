document.addEventListener("DOMContentLoaded", loadExpenses);

function addExpense() {
    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;
    let category = document.getElementById("expense-category").value;

    if (name === "" || amount === "") {
        alert("Please enter both name and amount!");
        return;
    }

    let expense = {
        name: name,
        amount: parseFloat(amount),
        category: category
    };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";

    loadExpenses();
}

function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let expenseList = document.getElementById("expense-list");
    let totalAmount = 0;

    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${expense.name} - $${expense.amount} (${expense.category})
            <button onclick="deleteExpense(${index})">X</button>`;
        expenseList.appendChild(li);
        totalAmount += expense.amount;
    });

    document.getElementById("total-amount").innerText = totalAmount.toFixed(2);
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    loadExpenses();
}
