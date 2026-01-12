// to run the application, run the command: ts-node src/app.ts
import inquirer from "inquirer";

async function bootsrap() {
  console.log("Starting application...");
  inquirer
    .prompt([
      /* Pass your questions in here */
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

bootsrap();
