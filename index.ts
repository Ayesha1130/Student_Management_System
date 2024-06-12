#! /usr/bin/env/node

import chalk from "chalk";
import inquirer from "inquirer";

// create a class that represents the current state of the application
class Student {
  static counter = 10000;
  id: number;
  name: string;
  balance: number;
  courses: string[];
// constructor 
  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.balance = 100;
    this.courses = [];
  }
  // add a method to enroll a student in a course
  enroll_course(course: string) {
    this.courses.push(course);
  }
  // add a method to view the balance of a student
  view_balance() {
    console.log(`balance for ${this.name} ${this.balance}`);
  }
  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(`$${amount} paid successfully ${this.name}`);
    console.log(`Remaining Balance: $${this.balance}`);
    
  }
  // add a method to view the status of a student
  show_status() {
    console.log(`ID: ${this.id}`);
    console.log(`Course: ${this.courses}`);
    console.log(`Name: ${this.name}`);
    console.log(`Balance: ${this.balance}`);
  }
}
// create a new instance of the Course object
class Student_menager {
  students: Student[];

  constructor() {
    this.students = [];
  }
  // add a method to add a new student to the application
  add_students(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(chalk.green(`Student: ${name} Added successfully ${student.id}`));
  }
  // add a method to enroll a student in a course
  enroll_students(student_id: number, course: string) {
    let student = this.find_student(student_id);
    if (student) {
      student.enroll_course(course);
      console.log(chalk.magenta(`${student.name} enroll in ${course} Successfully`));
    }
  }
  // add a method to view the balance of a student
  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balance();
    } else {
      console.log(chalk.red("Student not found"));
    }
  }
  // add a method to pay the fees of a student
  pay_student_fees(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fees(amount);
    } else {
      console.log("Student not found");
    }
  }
  // add a method to view the status of a student
  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    }
  }
  // method find student by id
  find_student(student_id: number) {
    return this.students.find(student => student.id === student_id);
  }
}
async function main() {
  console.log(chalk.magenta(
    "\nWelcome to Ayesha Iqbal`s OOP Project Student management system"
  ));
  console.log(chalk.green("-".repeat(60)));

  let student_manager = new Student_menager();
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option",
        choices: [
          "Add student",
          "Enroll student",
          "View student balance",
          "Pay fees",
          "Show Status",
          "Exit",
        ],
      },
    ]);
// using switch statement to determine which variables are available
    switch (choice.choice) {
      case "Add student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter student name",
          },
        ]);
        student_manager.add_students(name_input.name);

        break;

      case "Enroll student":
        let course_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
          {
            name: "courses",
            type: "input",
            message: "Enter a course name",
          },
        ]);
        student_manager.enroll_students(
          course_input.student_id,
          course_input.courses
        );
        break;
      case "View student balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;
      case "Pay fees":
        let fees_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter a amount",
          },
        ]);
        student_manager.pay_student_fees(
          fees_input.student_id,
          fees_input.amount
        );
        break;
      case "Show Status":
        let status_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
        ]);
        student_manager.show_student_status(status_input.student_id);
        break;
      case "Exit":
        console.log(chalk.yellow("Thanks for using this service"));
        process.exit();
    }
  }
}
main();

