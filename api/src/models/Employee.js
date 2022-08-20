const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['manager', 'member'],
        default: 'member',
        required: true,
    },
});

const EmployeeModel = model('Employee', employeeSchema);

module.exports = EmployeeModel;
