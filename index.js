// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timeIn) {
    const [date, hour] = timeIn.split(" ");

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee, timeOut) {
    const [date, hour] = timeOut.split(" ");

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour:parseInt(hour, 10),
        date: date
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    } else {
        return 0;
    }
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents
    .map(event => wagesEarnedOnDate(employee, event.date))
    .reduce((total, wage) => total + wage, 0);
}

function calculatePayroll(employees) {
    return employees
    .map(employee => allWagesFor(employee))
    .reduce((total, wages) => total + wages, 0);
}
