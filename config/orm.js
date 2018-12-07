// import mysql connection
const connection = require('../config/connection.js');

// query helper function
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// object with all SQL Statment functions
var orm = {
    all: (tableInput, cb) => {
        var queryString = "SELECT * FROM " + tableInput + ';';
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
//----------------------------------------------------------
    create: (table, cols, vals, cb) => {
        console.log(vals);
        console.log(printQuestionMarks(vals.length));  
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUE (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
//----------------------------------------------------------
    update: (table, objColVals, condition, cb) => {
        var queryString = "UPDATE " + table;

        queryString += " SET "
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
//----------------------------------------------------------
    delete: (table, condition, cb) => {
        var queryString = " DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, res) =>{
            if (err) throw err;
            cb(res);
        });
    }
};

module.exports = orm;