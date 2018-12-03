// import mysql connection
const connection = require('../config/connection.js');

// query helper function
var prinntQuestionMarks = (num) => {
    var arr = [];
    for(i = 0; i < arr.length; i++) {
        arr.push('?');
    }
    return arr.toString();
}

// helper function converts to SQL syntax
var objToSql = (ob) => {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob,key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
        arr.push(key + '+' + value);
        }
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
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUE (";
        queryString += prinntQuestionMarks(vals.length);
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
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, res) =>{
            if (err) throw err;
            cb(res);
        });
    }
};

module.exports = orm;