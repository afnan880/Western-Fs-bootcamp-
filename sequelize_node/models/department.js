const {sequelize ,Sequelize} = require('../coonection');

const Department = sequelize.define('Department',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
   

departmentName: {
    type: Sequelize.STRING,
    allowNull: false
}
});
module.exports = Department;