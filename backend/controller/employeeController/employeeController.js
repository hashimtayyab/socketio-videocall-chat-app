const {
    addEmployee, 
    getEmployeesList, 
    getMyAddedEmployees, 
    loginAsEmployee, 
    getEmployeeById,
    getFellowEmployees} = require('../../services/employeeService/employeeService');
const jwt = require('jsonwebtoken');

class EmployeeController {

    async getEmployeesList(req ,res){
        try {
            const employees = await getEmployeesList();
            return res.json(employees);
        } catch (error) {
            console.log(error);
        }
    }
    async addEmployee(req, res) {
        try {
            const employee = await addEmployee(req);
            return res.status(200).json(employee);
        } catch (error) {
            console.log(error);
        }
    }

    async getMyAddedEmployees(req, res) {
        try {
            const employees = await getMyAddedEmployees(req);
            return res.status(200).json(employees);
        } catch (error) {
            console.log(error);
        }
    }

    async getEmployeeById(req, res) {
        try {
            const employee = await getEmployeeById(req);
            return res.status(200).json(employee);
        } catch (error) {
            console.log(error);
        }
    }

    async loginAsEmployee(req, res) {
        try {
            console.log(req.body.email);
            const employee = await loginAsEmployee(req);
            if(employee) {
                console.log('Employee Passed');
                return res.status(200).json(employee);
            }
            else{
                console.log('User Failed');
                return res.status(401).json({message: 'Invalid username or password'});
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getFellowEmployees(req, res) {
        try {
            const employee = await getFellowEmployees(req);
            if(employee) {
                return res.status(200).json(employee);
            }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new EmployeeController();