import React from "react";
import { connect } from "react-redux";
import expenses from "../reducers/expenses";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

//we import ExpenseListItem and parse it (...expense) by mapping through (props.expense) from state
const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1>
    {props.expenses.map((expense) => {
      return <ExpenseListItem key={expense.id} {...expense} />;
    })}
    <ExpenseListItem />
  </div>
);
//mapstateprops is just an input function to connect()
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  };
};
//connect is from hoc
export default connect(mapStateToProps)(ExpenseList);
