const transactions = [];


const addIncome=document.getElementById("add-income");
const addExpense=document.getElementById("add-expense");
const incomeModal=document.querySelector(".income-modal");
const expenseModal=document.querySelector(".expense-modal");

const incomeCloseBtn=document.querySelector(".i-close-Btn");
const expenseCloseBtn=document.querySelector(".e-close-Btn");

const totalExpense=document.getElementById("total-expense");
const totalIncome=document.getElementById("total-income");

const incomeAmount=document.getElementById("income-amount");
const incomeCategory=document.getElementById("income-category");
const incomeDescription=document.getElementById("income-description");
const incomeDate=document.getElementById("income-date");

const expenseAmount=document.getElementById("expense-amount");
const expenseCategory=document.getElementById("expense-category");
const expenseDescription=document.getElementById("expense-description");
const expenseDate=document.getElementById("expense-date");

const incomeAddBtn=document.getElementById("incomeAddBtn");
const expenseAddBtn=document.getElementById("expenseAddBtn");
const expenseCancelBtn=document.getElementById("expenseCancelBtn");
const incomeCancelBtn=document.getElementById("incomeCancelBtn");

const tableBody = document.getElementById("transaction-table");



function show(element){
    element.style.display="block";
}
function hidde(element){
  element.style.display="none";
}

addIncome.addEventListener("click",()=>show(incomeModal));
addExpense.addEventListener("click",()=>show(expenseModal));

incomeCloseBtn.addEventListener("click",()=>hidde(incomeModal));
expenseCloseBtn.addEventListener("click",()=>hidde(expenseModal));
incomeCancelBtn.addEventListener("click",()=>hidde(incomeModal));
expenseCancelBtn.addEventListener("click",()=>hidde(expenseModal));




window.addEventListener("click", (e) => {

    // close income modal if clicking outside
    if (e.target === incomeModal) {
        hidde(incomeModal);
    }

    // close expense modal if clicking outside
    if (e.target === expenseModal) {
        hidde(expenseModal);
    }

});

incomeAddBtn.addEventListener("click", () => {
    const amount=incomeAmount.value;
    const category=incomeCategory.value;
    const description=incomeDescription.value;
    const date=incomeDate.value;

    if (
        !amount ||
        !category ||
        !description ||
        !date
    ) {
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        date: date,
        category: category,
        amount: Number(amount),
        description: description,
        type: "Income",
        status: "Success"
    };

    transactions.push(transaction);

    updateTable();

    hidde(incomeModal);

    incomeAmount.value = "";
    incomeCategory.value = "";
    incomeDescription.value = "";
    incomeDate.value = "";
});

expenseAddBtn.addEventListener("click", () => {
    
    if (
        !expenseAmount.value ||
        !expenseCategory.value ||
        !expenseDescription.value ||
        !expenseDate.value
    ) {
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        date: expenseDate.value,
        category: expenseCategory.value,
        amount: Number(expenseAmount.value),
        type: "Expense",
        status: "Success"
    };

    transactions.push(transaction);
    updateTable();

    hidde(expenseModal);
      expenseAmount.value = "";
    expenseCategory.value = "";
    expenseDescription.value = "";
    expenseDate.value = "";
});

function updateTable() {
    let allIncome=0;
let allExpense=0;
    tableBody.innerHTML = "";

    transactions.forEach(transaction => {
        
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="t-date regular-text">${transaction.date}</td>
            <td class="tsubscription regular-text">${transaction.category}</td>
            <td class="t-amount regular-text">$${transaction.amount}</td>
            <td><span class="t-success">${transaction.status}</span></td>
            <td class="card-menu regular-text">
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </td>
        `;

        tableBody.appendChild(row);
        if (transaction.type === "Income") {
            allIncome += transaction.amount;
        } 
        else if (transaction.type === "Expense") {
            allExpense += transaction.amount;
        }
    });

    totalIncome.textContent=`$${allIncome.toLocaleString()}`;
    totalExpense.textContent=`$${allExpense.toLocaleString()}`;
}

function sortByAmountHighToLow() {
    transactions.sort((a, b) => b.amount - a.amount);
    updateTable();
}

function sortByDateNewest() {
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    updateTable();
}

document.querySelector(".period-change").addEventListener("click", () => {
    sortByDateNewest();
});

function filterIncome() {
    const filtered = transactions.filter(t => t.type === "Income");
    renderFiltered(filtered);
}

function filterExpense() {
    const filtered = transactions.filter(t => t.type === "Expense");
    renderFiltered(filtered);
}

