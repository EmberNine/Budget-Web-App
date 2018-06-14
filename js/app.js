//ReadMe: This App uses HTML, CSS, JavaScript and Bootstrap4 to create
//        a budget log where expenses and account balance is calculated.





//Classes
class Budget{
    constructor(budget){
        this.budget=Number(budget);
        this.budgetLeft =this.budget;
    }

    //subtract from budget
    subtractFromBudget(amount)
    {
        return this.budgetLeft-=amount;
    }
}

//everything related to HTML
class HTML{
    //inserts the budget when user submits
    insertBudget(amount){
        //inserts into HTML
        budgetTotal.innerHTML=`${amount}`;
        budgetLeft.innerHTML=`${amount}`;

    }

    //displays a message (whether correct or valid)
    printMessage(message, className)
    {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message)); 
         
        //insert into index.html
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);


        //clear the error
        setTimeout(function()
        {
            document.querySelector('.primary .alert').remove();
            
        },2000);
    }

    //displays the expenses from the form into the list        
    addExpenseToList(name, amount)
    {
        const expensesList = document.querySelector('#expenses ul');
        //create li
        const li = document.createElement('li');
        li.className ="list-group-item d-flex justify-content-between align-items-center";

        //create the template
        li.innerHTML=`
            ${name}
            <span class="badge badge-danger badge-pill">-$${amount}</span>
        `;
        //insert into HTML
         expensesList.appendChild(li);
    }

    //tracks budget
    trackBudget(amount)
    {
        const budgetLeftDollars = budget.subtractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        //check when 25% has been spent
        if((budget.budget/4)>budgetLeftDollars)
        {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');

        }else if((budget.budget/2)>budgetLeftDollars)
        {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }    
}

//Variables
const addExpenseForm = document.querySelector('#add-expense');
let budget, userBudget,
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');
    console.log(budgetLeft);

//instanciate the HTML class
html = new HTML();

//event Listeners
eventListeners();
function eventListeners()
{
    document.addEventListener('DOMContentLoaded', function(){
        //will ask the visitor what their weekly budget is
        userBudget = prompt('What is your budget for this week? ')
        //validation
        if(userBudget === null || userBudget === '' || userBudget == 0)
        {
            window.location.reload();
        }
        else
        {
            //if budget is valid the instanciate the budget class
            budget = new Budget(userBudget);
            
            //instanciate HTML class
            html.insertBudget(budget.budget);
        }
    });

    //When a new expense is added
    addExpenseForm.addEventListener('submit', function(e){
        //read in imput value from user
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;
        if (expense ==='' || amount === '')
        {
            html.printMessage('ERROR! All fields are mandatory!', 'alert-danger');
        }
        else{
            //adds the expenses into the list
            html.addExpenseToList(expenseName,amount);
            html.trackBudget(amount);
            html.printMessage('Added!', 'alert-success');
        }
    });
}