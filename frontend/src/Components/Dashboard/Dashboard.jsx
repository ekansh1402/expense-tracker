import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {dollar}
                {Math.min(...incomes.map((item) => item.amount))}
              </p>
              <p>
                {dollar}
                {Math.max(...incomes.map((item) => item.amount))}
              </p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {dollar}
                {Math.min(...expenses.map((item) => item.amount))}
              </p>
              <p>
                {dollar}
                {Math.max(...expenses.map((item) => item.amount))}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(
      12,
      1fr
    ); /* Changed to allow more granular control */
    gap: 2rem;
    width: 100%;

    .chart-con {
      grid-column: 1 / 8; /* Adjusting to take more space */
      height: 400px;

      .amount-con {
        display: grid;
        grid-template-columns: repeat(
          3,
          1fr
        ); /* Simplified to three equal columns */
        gap: 2rem;
        margin-top: 2rem;

        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          text-align: center;
            display flex;
            justify-content: center;
          p {
            font-size: 2.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: span 3; /* Balance takes the full row width */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          p {
            color: var(--color-green);
            opacity: 0.8;
            font-size: 2.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 8 / 13; /* Ensures it aligns correctly next to the chart */
      width: 100%;

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .salary-title {
        font-size: 1.5rem;

        span {
          font-size: 2rem;
        }
      }

      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-weight: 600;
          font-size: 1.8rem;
        }
      }
    }
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
`;

export default Dashboard;
