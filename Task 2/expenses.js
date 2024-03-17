const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expenses-list');

// Get expenses from local storage (if available)
let expenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function displayExpenses() {
  expenseList.innerHTML = ''; // Clear existing list

  expenses.forEach((expense, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${expense.name}</span>
      <span>$${expense.amount}</span>
      <button data-index="${index}">Edit</button>
      <button data-index="${index}">Delete</button>
    `;
    expenseList.appendChild(listItem);
  });
}

displayExpenses();

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('expense-name').value.trim();
  const amount = parseFloat(document.getElementById('expense-amount').value);

  if (name === '' || isNaN(amount)) {
    alert('Please enter a valid expense name and amount.');
    return;
  }

  expenses.push({ name, amount }); // Add new expense

  localStorage.setItem('expenses', JSON.stringify(expenses)); // Save to local storage

  displayExpenses();

  expenseForm.reset(); // Clear form
});

expenseList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const index = parseInt(event.target.dataset.index);

    if (event.target.textContent === 'Edit') {
      const expenseToEdit = expenses[index];
      document.getElementById('expense-name').value = expenseToEdit.name;
      document.getElementById('expense-amount').value = expenseToEdit.amount;

      // Temporary submit listener for editing
      expenseForm.addEventListener('submit', (editEvent) => {
        editEvent.preventDefault();
        expenses[index] = {
          name: document.getElementById('expense-name').value,
          amount: parseFloat(document.getElementById('expense-amount').value),
        };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
        expenseForm.reset(); // Clear form after edit
        expenseForm.removeEventListener('submit', this); // Remove temporary listener
      });
    } else if (event.target.textContent === 'Delete') {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      displayExpenses();
    }
  }
});
