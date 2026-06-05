const express = require('express');
const app = express();
const port = 3000;
const {sequelize} = require('./coonection');
const Department = require('./models/department');
const Employee = require('./models/employee');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');




app.use(express.json());
app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);



Department.hasMany(Employee, { foreignKey: 'departmentId' });
Employee.belongsTo(Department, { foreignKey: 'departmentId' });     



 
sequelize.sync().then((res) => {
    
}).catch((err) => { 
    console.log(err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

