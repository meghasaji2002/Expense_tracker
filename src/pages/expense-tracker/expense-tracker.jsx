import React, { useEffect, useState } from 'react'
import './expense-tracker.css'
import { useDispatch, useSelector } from 'react-redux'
import { createExpense, deleteExpense, fetchExpenses, updateExpense } from '../../redux/slices/expenseSlice';
import { logout } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';

function ExpenseTracker() {
    const [guid, setGuid] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [creditDebit, setCreditDebit] = useState("CR");
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const { expenseList } = useSelector(state => state.expense);
    const { userDetails } = useSelector(state => state.auth);
    const [currentBalance, setCurrentBalance] = useState(0);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [expenseData, setExpenseData] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    useEffect(() => {
        setExpenseData(expenseList);
    }, [expenseList])

    useEffect(() => {
        const creditList = expenseList.filter(item => item.type === "CR");
        const debitList = expenseList.filter(item => item.type === "DB");
        const creditSum = creditList.reduce((a, b) => a + b.amount, 0);
        const debitSum = debitList.reduce((a, b) => a + b.amount, 0);
        const currentBalance = creditSum - debitSum;
        setCurrentBalance(currentBalance)
    }, [expenseList]);

    useEffect(() => {
        const fromTime = new Date(dateFrom).getTime();
        const toTime = new Date(dateTo).getTime();
        if (fromTime < toTime) {
            const expenseData = expenseList.filter((item) => {
                const time = new Date(item.date).getTime();
                return time >= fromTime && time <= toTime;
            });
            setExpenseData(expenseData);
        }
    }, [dateFrom, dateTo, expenseList])

    const handleSubmit = () => {
        const values = {
            date,
            time,
            type: creditDebit,
            amount,
            comment,
            userId: userDetails.guid
        }
        dispatch(guid ? updateExpense({ guid, ...values }) : createExpense(values)).then((data) => {
            if (data.payload.status === 200) {
                dispatch(fetchExpenses());
                resetForm();
            }
        })
    }

    const resetForm = () => {
        setGuid(null);
        setDate("");
        setTime("");
        setCreditDebit("CR");
        setAmount(0);
        setComment("");
    }

    const handleEdit = (values) => {
        setGuid(values?.guid);
        setDate(values?.date);
        setTime(values?.time);
        setCreditDebit(values?.type);
        setAmount(values?.amount);
        setComment(values?.comment);
    }

    const handleDelete = (values) => {
        dispatch(deleteExpense(values)).then((data) => {
            if (data.payload.status === 200) {
                dispatch(fetchExpenses());
                resetForm();
            }
        })
    }

    const renderExpenseList = () => {
        return expenseList.length ? <div className='transaction-list'>
            {expenseList.map((item) => {
                return <div key={item.guid} className={`transaction-item ${item.type === "CR" ? 'type-cr' : 'type-db'}`} >
                    <div className='transaction-item-box'>
                        <div className='transaction-item-date-comment'>
                            <div className='transaction-item-date'>{item.date} {item.time}</div>
                            <div className='transaction-item-comment'>
                                {item.comment}
                            </div>
                        </div>
                        <button type='button' className='edit-button ' onClick={() => handleEdit(item)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type='button' className='delete-button ' onClick={() => handleDelete(item)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                    <div className='transaction-item-balance-amount'>
                        <div className='transaction-item-balance'>{item.itemBalance}</div>
                        <div className='transaction-item-amount'>{item.amount}
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                    </div>
                </div>
            })}
        </div> : null;
    }

    const renderTable = (type) => {
        const data = expenseData.filter(item => item.type === type);
        let totalAmount = 0;
        return <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>{type === 'CR' ? "Credits" : "Debits"}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => {
                    totalAmount = totalAmount + item.amount;
                    return <tr key={item.guid}>
                        <td className='td-date-time'>{item.date} {item.time}</td>
                        <td className='td-comment'>{item.comment}</td>
                        <td className='td-amount'>{item.amount}</td>
                    </tr>
                })}

            </tbody>
            <tfoot>
                <tr>
                    <td className='tfoot-td-1' colSpan={2}>
                        total
                    </td>
                    <td className='tfoot-td-2'>
                        {totalAmount}
                    </td>
                </tr>
            </tfoot>
        </table>
    }

    const handleLogOut = () => {
        dispatch(logout())
    }

    return (
        <div className='page-wrap'>
            {menuOpen &&
                <div className='menu-wrap'>
                    <Link className='link' to="/">
                        Home
                    </Link>
                    <Link className='link' to="/expenses">
                        Expenses
                    </Link>
                    {userDetails?.userType === "Admin" &&
                        <Link className='link' to="/users">
                            Users
                        </Link>}
                </div>}
            <div className='page-dashboard page'>
                <header>
                    <div onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}>
                        {menuOpen ? <i class="fa-solid fa-xmark fs-3"></i> :
                            <i class="fa-solid fa-bars fs-3"></i>}
                    </div>
                    <div className='page-header'>
                        <i className="fa-solid fa-wallet fs-3"></i>
                        <h3>Wallet Watch</h3>
                    </div>
                    <div className='date-range-box'>
                        <div>
                            <input placeholder='From Date' onChange={(e) => setDateFrom(e.target.value)} value={dateFrom} type="date" className='input-field' />
                            <img src="" alt="" />
                        </div>
                        <div>
                            <input placeholder='To Date' onChange={(e) => setDateTo(e.target.value)} value={dateTo} type="date" className='input-field' />
                            <img src="" alt="" />
                        </div>
                    </div>



                    <div className='current-balance'>
                        <div className='current-balance-label'>
                            Current Balance
                        </div>
                        <div className='current-balance-amount'>
                            {currentBalance}
                        </div>
                    </div>
                    <button onClick={handleLogOut} type='button' title='logout' className='logout-button button-primary'><i className="fa-solid fa-right-from-bracket"></i></button>

                </header>
                <section>
                    <div className='expense-tracker'>
                        <div className='add-expense-form'>
                            <div className='input-date-time'>
                                <input placeholder='date' className='input-date input-field' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                <input placeholder='time' className='input-time input-field' type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>
                            <div className='input-credit-debit-amount'>
                                <button className={`CR-button button-${creditDebit === 'CR' ? 'primary' : 'secondary'}`} onClick={() => setCreditDebit("CR")}>CR</button>
                                <button className={`DB-button button-${creditDebit === 'DB' ? 'primary' : 'secondary'}`} onClick={() => setCreditDebit("DB")}>DB</button>
                                <input placeholder='amount' className='expense-amount input-field' type="number" max={currentBalance} value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </div>
                            <div className='input-comment-submit'>
                                <input placeholder='comment' className='input-comment input-field' type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                                <button onClick={resetForm} className='reset-button button-secondary'><i className="fa-solid fa-xmark"></i></button>
                                <button className='add-button button-primary' type='button' onClick={handleSubmit}>
                                    {guid ? "Edit" : "Add"}
                                </button>
                            </div>
                        </div>
                        <div className='recent-transactions'>
                            <h3>Recent Transactions</h3>
                            {renderExpenseList()}
                        </div>
                    </div>
                    <div className='expense-details'>
                        <div className='expense-credits'>
                            {renderTable("CR")}
                        </div>
                        <div className='expense-debits'>
                            {renderTable("DB")}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ExpenseTracker