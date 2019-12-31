//classes
class Budget {
  constructor (budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }

  substractFromBudget(amount) {
    return this.budgetLeft -= amount;
  }
}

//Class for HTML
class HTML{
  //insert values into the buget fields
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount.budget}`;
    $budgetLeft.innerHTML = `${amount.budgetLeft}`;
  }

  //Add expense to list
  addExpenseToList(expense, amount){
    const expenseList = document.querySelector('#expenses ul');
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${expense}<span class="badge-primary badge-pill">$${amount}</span>`;
    expenseList.appendChild(li);
  }

  //Tracking budget balance
  trackBudget(amount) {
    const budgetRemainingBalc = budget.substractFromBudget(amount);
    $budgetLeft.innerHTML = `${budgetRemainingBalc}`;

    //check remaing balance
    if((budget.budget/4) > budgetRemainingBalc) {
      $budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
      $budgetLeft.parentElement.parentElement.classList.add('alert-danger');
    }else if ((budget.budget/2) > budgetRemainingBalc) {
        $budgetLeft.parentElement.parentElement.classList.remove('alert-success');
        $budgetLeft.parentElement.parentElement.classList.add('alert-warning');
    }
  }

  //Display message\
  printMessage(info, className){
    const messageDIV = document.createElement('DIV');
    messageDIV.classList.add('text-center', 'alert', className);
    messageDIV.appendChild(document.createTextNode(info));

    //insert into html
    document.querySelector('.primary').insertBefore(messageDIV, addExpenseForm);

    //Clear error message after 2secs
    setTimeout(function () {
      messageDIV.remove();
      addExpenseForm.reser();
    }, 2000);
  }
}


//variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      $budgetLeft = document.querySelector('span#left');

let budget, userBudget;


//Class instanciation varriables
const html = new HTML();

//event listeners
eventListeners();
function eventListeners() {
  //App init
  document.addEventListener('DOMContentLoaded', function() {
    userBudget = prompt('what\'s your budget for this week');
    //valid userBudget valid
    if(userBudget === null || userBudget ==='' || userBudget === 0){
      window.location.reload();
    }else {
      //if valid is correct then instanciate the budget class
      budget = new Budget(userBudget);
      html.insertBudget(budget);
    }
  });

  //Event listener to add new expense
  addExpenseForm.addEventListener('submit', function(event) {
    event.preventDefult;

    //Read the input values
    const expenseName = document.querySelector('#expense').value,
          amount = document.querySelector('#amount').value;
    //validate expenseName and amount
    if (expenseName === '' || amount ==='') {
      html.printMessage('An error occured!, All field are mandatory',
                            'alert-danger');
    } else {
      html.addExpenseToList(expenseName,amount);
      html.trackBudget(amount);
      html.printMessage('Added!',
                            'alert-success');
    }
  });
}
