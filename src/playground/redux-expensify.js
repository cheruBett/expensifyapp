import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

//
//...MY NOTES..
//we have object with expenses and filters
//we have actions like addExpense
//we have reducers
//we then create a store with combined reducers

//.....ACTION GENERATORS...//
//ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt,
  },
});
//REMOVE_EXPENSE
const removeExpense = (id, updates) => ({
  type: "REMOVE_EXPENSE",
  id,
  updates,
});
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});
//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});
//SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: "SET_START_DATE",
  startDate,
});
//SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: "SET_END_DATE",
  endDate,
});

//Expense reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        } else return expense;
      });
    default:
      return state;
  }
};
//filter reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "amount", //date or amount
  startDate: undefined,
  endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

////....Get Visible Expenses ....//

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;

      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") return a.createdAt < b.createdAt ? 1 : -1;
      if (sortBy === "amount") return a.amount < b.amount ? 1 : -1;
    });
};

//store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

//watch events
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

//dispatcher
const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 400, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Fries", amount: 200, createdAt: -1000 })
);
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 450 }));

// store.dispatch(setTextFilter("fries"));
// store.dispatch(setTextFilter());

// store.dispatch(sortByDate());

store.dispatch(sortByAmount());

// store.dispatch(startDate());

// store.dispatch(endDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1200));

//object
const demoState = {
  expenses: [
    {
      id: "awawergtretretreeee",
      description: "August rent",
      note: "This was the final payment for that address",
      amount: 54900,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
const ReduxExpensify = () => {
  return <div>good TO GO</div>;
};

export default ReduxExpensify;
