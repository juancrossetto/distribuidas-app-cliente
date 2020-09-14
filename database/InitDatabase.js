import React from "react";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");

export const InitDB = () => {
  console.log("asd db");
  db.transaction((tx) => {
    tx.executeSql(
      // "create table if not exists Incomes (id integer primary key not null, done int, value text);"
      `create table if not exists income (
            income_id int primary key not null,
            user_id int,
            type varchar(16),
            destination varchar(24),
            bank_account bool,
            amount double precision,
            income_date date
        )`
    );
    tx.executeSql(`insert into income values (?, ?, ?, ?, ?, ?, ?)`, [
      1,
      1,
      "extraordinario",
      "1",
      true,
      100,
      "2020-09-10",
    ]);
    tx.executeSql(`insert into income values (?, ?, ?, ?, ?, ?, ?)`, [
      2,
      1,
      "periodicos",
      "1",
      false,
      350,
      "2020-09-10",
    ]);
  });
};
