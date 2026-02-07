
// Load configuration
const API_URL = window.API_BASE_URL + "/expenses" || "https://expense-tracker-sjh1.onrender.com/api/expenses";



const token = localStorage.getItem("token");
const userEmail = localStorage.getItem("userEmail");

if (!token) {
  window.location.href = "login.html";
}

// Display user email
if (userEmail) {
  document.addEventListener("DOMContentLoaded", function() {
    const userEmailEl = document.getElementById("userEmail");
    if (userEmailEl) {
      userEmailEl.innerText = userEmail;
    }
  });
}

let editingExpenseId = null;
let allExpenses = [];
let selectedMonthYear = "all";


function getHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token")
  };
}

function addExpense() {
  const title = document.getElementById("title").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const category = document.getElementById("category").value.trim();
  const date = document.getElementById("date").value.trim();

  if (!title || !amount || !category || !date) {
    alert("Please fill in all fields");
    return;
  }

  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  const expense = {
    title,
    amount: parseFloat(amount),
    category,
    date
  };

  fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(expense)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    console.log("Expense added:", data);
    clearForm();
    fetchExpenses();
  })
  .catch(err => {
    console.error("Error adding expense:", err);
    alert("Failed to add expense: " + err.message);
  });
}

function fetchExpenses() {
  fetch(API_URL , { headers: getHeaders() })
    .then(res => res.json())
    .then(data => {

      allExpenses = data;

      populateMonthDropdown(allExpenses);
      applyMonthFilter();
    })
    .catch(err => console.error(err));
}

function populateMonthDropdown(expenses) {
  const dropdown = document.getElementById("monthFilter");

  const months = new Set();

  expenses.forEach(exp => {
    if (exp.date) {
      const d = new Date(exp.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      months.add(key);
    }
  });

  dropdown.innerHTML = `<option value="all">All</option>`;

  [...months]
    .sort((a, b) => b.localeCompare(a))
    .forEach(key => {
      const [year, month] = key.split("-");
      const date = new Date(year, month);
      const label = date.toLocaleString("en-IN", {
        month: "long",
        year: "numeric"
      });

      dropdown.innerHTML += `
        <option value="${key}">${label}</option>
      `;
    });
}


function applyMonthFilter() {
  let filteredExpenses = [...allExpenses];

  if (selectedMonthYear !== "all") {
    const [year, month] = selectedMonthYear.split("-");

    filteredExpenses = filteredExpenses.filter(exp => {
      if (!exp.date) return false;
      const d = new Date(exp.date);
      return (
        d.getFullYear() == year &&
        d.getMonth() == month
      );
    });
  }

  renderExpenses(filteredExpenses);
}

function renderExpenses(data) {

  // Sort latest first
  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  calculateTotal(data);

  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>No expenses for this month.</p>";
    return;
  }

  const grouped = {};

  data.forEach(exp => {
    const dateKey = new Date(exp.date).toLocaleDateString("en-IN");
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(exp);
  });

  for (const date in grouped) {
    list.innerHTML += `
      <div class="date-group">
        <div class="date-header">📅 ${date}</div>
        ${grouped[date].map(exp => `
          <div class="expense-item">
            <div>
              <strong>${exp.title}</strong>
              <span class="category">${exp.category}</span>
            </div>
            <div class="right">
              ₹${exp.amount}
              <button onclick="editExpense(${exp.id}, '${exp.title}', ${exp.amount}, '${exp.category}', '${exp.date}')">✏️</button>
              <button onclick="deleteExpense(${exp.id})">❌</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Logout handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      window.location.href = "login.html";
    });
  }

  document.getElementById("monthFilter").addEventListener("change", function () {
    selectedMonthYear = this.value;
    applyMonthFilter();
  });

  document.getElementById("addBtn").onclick = function () {
    if (editingExpenseId === null) {
      addExpense();
    } else {
      updateExpense(editingExpenseId);
    }
  };

  // Load expenses on page load
  fetchExpenses();
});

function editExpense(id, title, amount, category, date) {

  const formattedDate = date ? date.split("T")[0] : "";

  document.getElementById("title").value = title;
  document.getElementById("amount").value = amount;
  document.getElementById("category").value = category;
  document.getElementById("date").value = formattedDate;

  editingExpenseId = id;

  const btn = document.getElementById("addBtn");
  btn.innerText = "Update Expense";
}


function updateExpense(id) {
  const updatedExpense = {
    title: document.getElementById("title").value,
    amount: document.getElementById("amount").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value
  };

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(updatedExpense)
  })
  .then(() => {
    editingExpenseId = null;
    document.getElementById("addBtn").innerText = "Add Expense";
    clearForm();
    fetchExpenses();
  });
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}


function calculateTotal(expenses) {
  let total = 0;
  expenses.forEach(exp => {
    total += Number(exp.amount);
  });
  document.getElementById("total").innerText = `Total: ₹${total}`;
}


function deleteExpense(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  })
  .then(() => {
    fetchExpenses(); // refresh list
  });
}
