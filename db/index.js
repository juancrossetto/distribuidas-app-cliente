/*SQLite Queries */
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("mybudget.db");
import {
  getCurrentDate,
  formatDate,
  getResult,
  getCurrentDateISO8601,
  addMonthCurrentDate,
  formatDateStringToMilliseconds,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getEmailUserLogged,
} from "../utils/index";
var moment = require("moment"); // require

const getEmail = async () => {
  return await getEmailUserLogged();
};

const createTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists incomes (id integer primary key AUTOINCREMENT, amount int, bankAccount text, bankAccountDescription text
        , category text , paymentMethod text, email text, date text);`
        );
        tx.executeSql(
          `create table if not exists expenses (id integer primary key AUTOINCREMENT, amount int, paymentType text, paymentId text
           , bankAccountDescription text, expenseType text, detail text, category text, fees text, date text, area text, voucher text, email text);`
        );
        tx.executeSql(
          `create table if not exists bankaccounts (id integer primary key AUTOINCREMENT, balance int, cbu text, entity text, debitCard text, alias text,  date text, email text);`
        );
        tx.executeSql(
          `create table if not exists creditcards (id integer primary key AUTOINCREMENT, number int, entity text, name text, expiry text, closeDateSummary text, dueDateSummary text, date text, email text);`
        );
        tx.executeSql(
          `create table if not exists loans (id integer primary key AUTOINCREMENT, amount int, type text, paymentMethod text, fees text,bankAccount text, bankAccountDescription text, date text, email text);`
        );
        tx.executeSql(
          `create table if not exists budgets (id integer primary key AUTOINCREMENT, amount int, category text, type text, date text, email text);`
        );
        tx.executeSql(
          `create table if not exists investments (id integer primary key AUTOINCREMENT, amount int, type text, specie text, expiry text, specieQuantity int, days int, deposited text, interestRate int
            , bankAccount text, bankAccountDescription text, automaticRenovation text, email text, date text, dueDate text);`
        );
        tx.executeSql(
          `create table if not exists bankaccountmovements (id integer primary key AUTOINCREMENT, amount int, bankAccount text, bankAccountBalance int, type text, email text, date text);`
        );
        tx.executeSql(
          `create table if not exists creditcardmovements (id integer primary key AUTOINCREMENT, creditCardNumber int, numberFee int, amount int, expense text, paid text, email text, dueDate text);`
        );
        tx.executeSql(
          `create table if not exists loanmovements (id integer primary key AUTOINCREMENT, bankAccount text, numberFee int, amount int, loan text, paid text, email text, dueDate text);`
        );
      },
      (_, error) => {
        console.log("Error de DB Creando Tablas", error);
        reject(error);
      },
      (_, success) => {
        resolve(success);
      }
    );
  });
};

const dropTablesAsync = async (table) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `drop table IF EXISTS ${table}`,
        [],
        (_, result) => {
          console.log(`Tabla ${table} Borrada correctamente`);
          resolve(result);
        },
        (_, error) => {
          console.log(`Error Dropeando tabla ${table}`);
          reject(error);
        }
      );
    });
  });
};

const dropDataBaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "drop database mybudget",
        [],
        (_, result) => {
          console.log("BD MyBudget borrada correctamente");
          resolve(result);
        },
        (_, error) => {
          console.log("Error Dropeando BD");
          reject(error);
        }
      );
    });
  });
};

const insertIncomeInMemoryAsync = async (income) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into incomes (amount, bankAccount, bankAccountDescription, category, paymentMethod, email, date)
          values (${income.amount},'${income.bankAccount}','${income.bankAccountDescription}','${income.category}',
            '${income.paymentMethod}','${income.email}',${income.date})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log("Error de DB al insertar Ingreso", error, t);
        resolve(getResult("Error de DB al insertar Ingreso", false));
      },
      (t, success) => {
        resolve(getResult("Ingreso creado correctamente en SQLite", true));
      }
    );
  });
};

const insertExpenseInMemoryAsync = async (expense) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into expenses (amount, paymentType, paymentId, bankAccountDescription, expenseType, detail, category, fees, area, voucher, email, date)
            values (${expense.amount},'${expense.paymentType}','${expense.paymentId}','${expense.bankAccountDescription}','${expense.expenseType}','${expense.detail}','${expense.category}','${expense.fees}',
            '${expense.area}','${expense.voucher}','${expense.email}',${expense.date})`;
        // console.log("query", query);
        tx.executeSql(query, [], (_, { rows: { _array } }) => {
          // console.log("_array", _array);
          // setExpenseId(_array.id);
        });
      },
      (t, error) => {
        console.log("Error de DB al insertar Egreso", error, t);
        resolve(getResult("Error de DB al insertar Egreso", false));
      },
      (t, success) => {
        // if (expense.paymentType === "TRC") {
        //   // Crear un movimiento por cada cuota
        //   const feeAmount = expense.amount / expense.fees;
        //   for (let fee = 1; fee <= expense.fees; fee++) {
        //     insertCreditCardMovementInMemoryAsync(
        //       expense.paymentId,
        //       fee,
        //       feeAmount,
        //       expense.id,
        //       "false",
        //       expense.email,
        //       addMonthCurrentDate(fee)
        //     );
        //   }
        // }
        resolve(getResult("Egreso creado correctamente en SQLite", true));
      }
    );
  });
};

const insertBankAccountInMemoryAsync = async (bankAccount) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into bankaccounts (balance, cbu, entity, debitCard, alias, email, date)
            values (${bankAccount.balance},'${bankAccount.cbu}','${bankAccount.entity}','${bankAccount.debitCard}','${bankAccount.alias}','${bankAccount.email}',${bankAccount.date})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log("Error de DB al insertar Cuenta Bancaria", error, t);
        resolve(getResult("Error de DB al insertar Cuenta Bancaria", false));
      },
      (t, success) => {
        resolve(
          getResult("Cuenta Bancaria creada correctamente en SQLite", true)
        );
      }
    );
  });
};

const insertCreditCardInMemoryAsync = async (creditCard) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into creditcards (number, entity, name, expiry, closeDateSummary, dueDateSummary, email, date)
            values (${creditCard.number},'${creditCard.entity}','${creditCard.name}','${creditCard.expiry}','${creditCard.closeDateSummary}','${creditCard.dueDateSummary}','${creditCard.email}',${creditCard.date})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log("Error de DB al insertar Tarjeta de Credito", error, t);
        resolve(getResult("Error de DB al insertar Tarjeta de Credito", false));
      },
      (t, success) => {
        resolve(
          getResult("Tarjeta de Credito creada correctamente en SQLite", true)
        );
      }
    );
  });
};

const insertLoanInMemoryAsync = async (loan) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into loans (amount, type, paymentMethod, fees, bankAccount, bankAccountDescription, email, date)
            values (${loan.amount},'${loan.type}','${loan.paymentMethod}','${loan.fees}','${loan.bankAccount}','${loan.bankAccountDescription}','${loan.email}',${loan.date})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log("Error de DB al insertar Prestamo", error, t);
        resolve(getResult("Error de DB al insertar Prestamo", false));
      },
      (t, success) => {
        resolve(getResult("Prestamo creado correctamente en SQLite", true));
      }
    );
  });
};

const insertBudgetInMemoryAsync = async (budget) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into budgets (amount, category, type, email, date)
            values (${budget.amount},'${budget.category}','${budget.type}','${budget.email}',${budget.date})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log("Error de DB al insertar Presupuesto", error, t);
        resolve(getResult("Error de DB al insertar Presupuesto", false));
      },
      (t, success) => {
        resolve(getResult("Presupuesto creado correctamente en SQLite", true));
      }
    );
  });
};

const insertInvestmentInMemoryAsync = async (inv) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into investments (amount, type, specie, specieQuantity, days, deposited, interestRate, bankAccount, bankAccountDescription, automaticRenovation, email, date, dueDate)
            values (${inv.amount},'${inv.type}','${inv.specie}',${inv.specieQuantity},${inv.days}, '${inv.deposited}',${inv.interestRate},'${inv.bankAccount}','${inv.bankAccountDescription}'
            ,'${inv.automaticRenovation}','${inv.email}',${inv.date},${inv.dueDate})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log("Error de DB al insertar Inversión", error, t);
        resolve(getResult("Error de DB al insertar Inversión", false));
      },
      (t, success) => {
        resolve(getResult("Inversión creado correctamente en SQLite", true));
      }
    );
  });
};

const insertBankAccountMovementInMemoryAsync = async (
  email,
  amount,
  bankAccount,
  bankAccountBalance,
  type,
  date
) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `insert into bankaccountmovements (amount, bankAccount, bankAccountBalance, type, email, date)       
             values (${amount},'${bankAccount}',${bankAccountBalance},'${type}','${email}',${date})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log(
          "Error de DB al insertar Movimiento en Cuenta Bancaria",
          error,
          t
        );
        resolve(
          getResult(
            "Error de DB al Insertar Movimiento e Cuenta Bancaria",
            false
          )
        );
      },
      (t, success) => {
        resolve(
          getResult(
            "Movimiento en Cuenta Bancaria creado correctamente en Memoria",
            true
          )
        );
      }
    );
  });
};

const insertCreditCardMovementInMemoryAsync = async (
  creditCardNumber,
  numberFee,
  amount,
  expense,
  paid,
  email,
  dueDate
) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        // const dueDateMilliseconds = formatDateStringToMilliseconds(
        //   dueDate,
        //   "DD-MM-YYYY"
        // );
        const query = `insert into creditcardmovements (creditCardNumber, numberFee, amount, expense, paid, email, dueDate)       
             values (${creditCardNumber},${numberFee},${amount},${expense},'${paid}','${email}',${dueDate})`;
        // console.log("query mov tarjeta credito", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log(
          "Error de DB al insertar Movimiento de Tarjeta de Credito",
          error,
          t
        );
        resolve(
          getResult(
            "Error de DB al insertar Movimiento de Tarjeta de Credito",
            false
          )
        );
      },
      (t, success) => {
        // console.log("movimiento tarjeta inserto ok");
        resolve(
          getResult(
            "Movimiento de Tarjeta de Credito creado correctamente en  Memoria",
            true
          )
        );
      }
    );
  });
};

const insertLoanMovementInMemoryAsync = async (
  bankAccount,
  numberFee,
  amount,
  loan,
  paid,
  email,
  dueDate
) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        // const dueDateMilliseconds = formatDateStringToMilliseconds(
        //   dueDate,
        //   "DD-MM-YYYY"
        // );
        const query = `insert into loanmovements (bankAccount, numberFee, amount, loan, paid, email, dueDate)       
             values ('${bankAccount}',${numberFee},${amount},${loan},'${paid}','${email}',${dueDate})`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log("Error de DB al insertar Movimiento de Préstamo", error, t);
        resolve(
          getResult("Error de DB al insertar Movimiento de Préstamo", false)
        );
      },
      (t, success) => {
        resolve(
          getResult(
            "Movimiento de Préstamo creado correctamente en  Memoria",
            true
          )
        );
      }
    );
  });
};

const updateCreditCardDatesAsync = async (
  id,
  dueDateSummary,
  closeDateSummary
) => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `UPDATE creditcards SET  dueDateSummary = '${dueDateSummary}', closeDateSummary = '${closeDateSummary}' WHERE id = ${id}`;
        // console.log("query", query);
        tx.executeSql(query);
      },
      (t, error) => {
        console.log(
          "Error de DB al actualizar Fechas de Tarjeta de Credito",
          error,
          t
        );
        resolve(
          getResult(
            "Error de DB al actualizar Fechas de Tarjeta de Credito",
            false
          )
        );
      },
      (t, success) => {
        resolve(
          getResult(
            "Fechas de Tarjeta de Credito actualizadas correctamente en Memoria",
            true
          )
        );
      }
    );
  });
};

const updateBankAccountBalanceAsync = async (
  bankAccountId,
  amount,
  type,
  email,
  bankAccountBalance
) => {
  // const newBalance =
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        const query = `UPDATE bankaccounts SET  balance = balance + ${amount} WHERE id = ${bankAccountId}`;
        // console.log("query", query);
        tx.executeSql(query);
        insertBankAccountMovementInMemoryAsync(
          email,
          amount,
          bankAccountId,
          bankAccountBalance,
          type,
          getCurrentDateISO8601()
        );
      },
      (t, error) => {
        console.log(
          "Error de DB al actualizar El saldo de la cuenta bancaria",
          error,
          t
        );
        resolve(
          getResult(
            "Error de DB al actualizar El saldo de la cuenta bancaria",
            false
          )
        );
      },
      (t, success) => {
        resolve(
          getResult(
            "El saldo de la cuenta bancaria fue actualizado correctamente en Memoria",
            true
          )
        );
      }
    );
  });
};

const genericSelectAsync = async (setFunc, table, query = "") => {
  const email = await getEmail();
  await db.transaction(
    async (tx) => {
      await tx.executeSql(
        `select * from ${table} WHERE email = '${email}' ${query} `,
        [],
        async (_, { rows: { _array } }) => {
          await setFunc(_array);
        }
      );
    },
    (t, error) => {
      console.log(`Error de DB obteniendo ${table}`, error, t);
    },
    (_t, _success) => {
      //   console.log("Ingresos obtenidos desde SQLite");
    }
  );
};

const selectExpenseIdAsync = async (table, where = "") => {
  const email = await getEmail();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from ${table} WHERE email = '${email}' ${where}`,
        [],
        (_, result) => {
          // console.log(`${table} obtenidos desde SQLite`);
          resolve(result?.rows?._array[0]?.id);
        },
        (_, err) => {
          console.log(`Error de DB obteniendo ${table}`, err, _);
          reject(0);
        }
      );
    });
  });
};

const getTotalAmountCreditCardAsync = async (setFunc, email, number) => {
  await db.transaction(
    (tx) => {
      const firstDayMonth = getFirstDayOfMonth();
      const lastDayMonth = getLastDayOfMonth();
      tx.executeSql(
        `SELECT creditCardNumber, email, SUM(amount) as totalAmount FROM creditcardmovements 
        WHERE email = '${email}' and creditCardNumber = ${number} and date(dueDate/1000, 'unixepoch')
        BETWEEN  ('${firstDayMonth}') and  ('${lastDayMonth}')  GROUP BY creditCardNumber, email`,
        [],
        (_, { rows: { _array } }) => {
          setFunc(_array);
        }
      );
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo el total de la tarjeta de credito}`,
        error,
        t
      );
    },
    (_t, _success) => {
      //   console.log("Ingresos obtenidos desde SQLite");
    }
  );
};

const getInversionesVencidasSemanaAsync = async (setFunc, email) => {
  await db.transaction(
    (tx) => {
      const firstDay = getFirstDayOfWeek();
      const lastDay = getLastDayOfWeek();
      const query = `select id, type, amount, date(dueDate/1000, 'unixepoch') as dueDate from investments
      where email = '${email}'  and date(dueDate/1000, 'unixepoch')
       BETWEEN  ('${firstDay}') and  ('${lastDay}')`;
      // console.log(query);
      tx.executeSql(query, [], (_, { rows: { _array } }) => {
        setFunc(_array);
      });
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo Inversiones a vencer/vencidas`,
        error,
        t
      );
    },
    (_t, _success) => {}
  );
};

const getTarjetasCreditoVencidasSemanaAsync = async (setFunc, email) => {
  await db.transaction(
    (tx) => {
      const firstDay = getFirstDayOfWeek();
      const lastDay = getLastDayOfWeek();
      const query = `select id,numberFee, amount, date(dueDate/1000, 'unixepoch') as dueDate from creditcardmovements
      where email = '${email}' and date(dueDate/1000, 'unixepoch')
      BETWEEN  ('${firstDay}') and  ('${lastDay}')`;
      // console.log(query);
      tx.executeSql(query, [], (_, { rows: { _array } }) => {
        setFunc(_array);
      });
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo Cuotas a vencer/vencidas de Tarjeta de Crédito}`,
        error,
        t
      );
    },
    (_t, _success) => {}
  );
};

const getCuotasPrestamoVencidasSemanaAsync = async (setFunc, email) => {
  await db.transaction(
    (tx) => {
      const firstDay = getFirstDayOfWeek();
      const lastDay = getLastDayOfWeek();
      const query = `select id,numberFee, amount, date(dueDate/1000, 'unixepoch') as dueDate from loanmovements
      where email = '${email}' and date(dueDate/1000, 'unixepoch')
      BETWEEN  ('${firstDay}') and  ('${lastDay}')`;
      // console.log(query);
      tx.executeSql(query, [], (_, { rows: { _array } }) => {
        setFunc(_array);
      });
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo Cuotas a vencer/vencidas de Prestamo}`,
        error,
        t
      );
    },
    (_t, _success) => {}
  );
};

const getAmountSpentAsync = async (setFunc, email) => {
  await db.transaction(
    (tx) => {
      const firstDayMonth = getFirstDayOfMonth();
      const lastDayMonth = getLastDayOfMonth();
      tx.executeSql(
        `SELECT paymentType, email, SUM(amount) as totalAmount FROM expenses  WHERE email = '${email}'
        and date(date/1000, 'unixepoch')
        BETWEEN  ('${firstDayMonth}') and  ('${lastDayMonth}') GROUP BY paymentType, email`,
        [],
        (_, { rows: { _array } }) => {
          setFunc(_array);
        }
      );
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo el total de la tarjeta de credito}`,
        error,
        t
      );
    },
    (_t, _success) => {}
  );
};

const getBankAccountMovementsAsync = async (
  setFunc,
  bankAccount,
  email,
  dateFrom,
  dateTo
) => {
  await db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM bankaccountmovements  WHERE email = '${email}'
        and bankAccount = '${bankAccount}'
        and date(date/1000, 'unixepoch')
        BETWEEN  ('${dateFrom}') and  ('${dateTo}') ORDER BY date ASC`,
        [],
        (_, { rows: { _array } }) => {
          setFunc(_array);
        }
      );
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo los movimientos de la cuenta bancaria`,
        error,
        t
      );
    },
    (_t, _success) => {}
  );
};

const getMonthSumGenericAsync = async (
  setFunc,
  month,
  year,
  email,
  table,
  query
) => {
  await db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT  strftime('%m', date / 1000, 'unixepoch') as month, strftime('%Y', date / 1000, 'unixepoch') as year, email, sum(amount) as amount 
        FROM ${table} WHERE email = '${email}'
        and strftime('%m', date / 1000, 'unixepoch') = '${month}'
        and strftime('%Y', date / 1000, 'unixepoch')  = '${year}'
        `,
        // and strftime('%m', date) = '10' ${query}`,
        [],
        (_, { rows: { _array } }) => {
          setFunc(_array);
        }
      );
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo los movimientos de la cuenta bancaria`,
        error,
        t
      );
    },
    (_t, _success) => {}
  );
};
const getMonthSumGenericWithTypeAsync = async (
  setFunc,
  month,
  year,
  email,
  table,
  query
) => {
  await db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT strftime('%m', date) as month, type, sum(amount) as amount
         FROM ${table} WHERE email = '${email}'
         and strftime('%m', date / 1000, 'unixepoch') = '${month}'
        and strftime('%Y', date / 1000, 'unixepoch')  = '${year}'
        GROUP BY type`,
        [],
        (_, { rows: { _array } }) => {
          setFunc(_array);
        }
      );
    },
    (t, error) => {
      console.log(
        `Error de DB obteniendo los movimientos de la cuenta bancaria`,
        error,
        t
      );
    },
    (_t, _success) => {}
  );
};

export {
  createTablesAsync,
  insertIncomeInMemoryAsync,
  insertExpenseInMemoryAsync,
  insertBankAccountInMemoryAsync,
  insertCreditCardInMemoryAsync,
  insertLoanInMemoryAsync,
  insertBudgetInMemoryAsync,
  insertInvestmentInMemoryAsync,
  insertBankAccountMovementInMemoryAsync,
  insertCreditCardMovementInMemoryAsync,
  insertLoanMovementInMemoryAsync,
  genericSelectAsync,
  dropDataBaseAsync,
  dropTablesAsync,
  updateCreditCardDatesAsync,
  updateBankAccountBalanceAsync,
  selectExpenseIdAsync,
  getTotalAmountCreditCardAsync,
  getInversionesVencidasSemanaAsync,
  getTarjetasCreditoVencidasSemanaAsync,
  getCuotasPrestamoVencidasSemanaAsync,
  getAmountSpentAsync,
  getBankAccountMovementsAsync,
  getMonthSumGenericAsync,
  getMonthSumGenericWithTypeAsync,
};
