const { sequelize, Sequelize } = require('../coonection');
const Employee = sequelize.define('employee', {
    employeeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
       allowNull: false
    },
    employeeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employeeEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Employee;
