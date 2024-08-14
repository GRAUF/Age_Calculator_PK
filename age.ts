#! /usr/bin/env node
// age calculator:

import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import chalkAnimation from 'chalk-animation';
import { differenceInDays, differenceInMonths, differenceInYears, parse } from 'date-fns';

console.log(chalk.green(figlet.textSync(' Age Calculator 2024 ', { horizontalLayout: 'full' })));
console.log(`\n`);

// Function to calculate the total hours given total days
const calculateTotalHours = (totalDays: number): number => {
  return totalDays * 24;
};

// Function to calculate age details
const calculateAgeDetails = (dob: Date): { days: number, weeks: number, months: number, years: number, hours: number } => {
  const now = new Date();
  const totalYears = differenceInYears(now, dob);
  const totalMonths = differenceInMonths(now, dob);
  const totalDays = differenceInDays(now, dob);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = calculateTotalHours(totalDays);

  return {
    days: totalDays,
    weeks: totalWeeks,
    months: totalMonths,
    years: totalYears,
    hours: totalHours,
  };
};

// Function to display age details in a table format
const displayAgeDetails = (name: string, ageDetails: { days: number, weeks: number, months: number, years: number, hours: number }) => {
  console.log(chalk.blue(`\nHello Dear, ${name}! your Age details are Here:\n`));
  console.table({
    'Total Days': ageDetails.days,
    'Total Weeks': ageDetails.weeks,
    'Total Months': ageDetails.months,
    'Total Years': ageDetails.years,
    'Total Hours': ageDetails.hours,
  });
};

const main = async () => {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is your Name?',
  });

  const { day, month, year } = await inquirer.prompt([
    {
      type: 'input',
      name: 'day',
      message: 'Enter your Birth day (DD):',
      validate: (input) => /^[0-9]{1,2}$/.test(input) && Number(input) > 0 && Number(input) <= 31,
    },
    {
      type: 'input',
      name: 'month',
      message: 'Enter your Birth Month (MM):',
      validate: (input) => /^[0-9]{1,2}$/.test(input) && Number(input) > 0 && Number(input) <= 12,
    },
    {
      type: 'input',
      name: 'year',
      message: 'Enter your birth year (YYYY):',
      validate: (input) => /^[0-9]{4}$/.test(input) && Number(input) > 1000 && Number(input) <= new Date().getFullYear(),
    },
  ]);

  const dob = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());

  // Start a rainbow animation while calculating
  const animation = chalkAnimation.rainbow('Calculating your age please wait....');
  setTimeout(() => {
    animation.stop(); // Stop the animation after 3 seconds

    const ageDetails = calculateAgeDetails(dob);
    displayAgeDetails(name, ageDetails);
  }, 3000);
};
console.log(chalk.blue.bold("^^^ You can Calculate your Age with full details! ^^^"));
console.log(`\n`);
main();
