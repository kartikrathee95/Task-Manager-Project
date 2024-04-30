# Task-Manager-v.1
Express Task Manager API
This is a simple Express.js API for managing tasks. It allows you to perform CRUD operations (Create, Read, Update, Delete) on tasks with different priorities.

Getting Started
To get started with the API, follow these steps:

Clone the repository:
bash
Copy code
git clone https://github.com/kartikrathee95/Task-Manager-v.1.git
Install dependencies:

cd Task-Manager-Project

npm install

Start the server:

npm start

The server will start running on http://localhost:3000.

run tests: npm run test

Endpoints

# Get All Tasks
URL: /tasks
Method: GET
Description: Get a list of all tasks.
Query Parameters:
completed: Filter tasks by completion status (true or false).
sort: Sort tasks by creation date (createdAt).

# Create a Task

URL: /tasks
Method: POST
Description: Create a new task.
Request Body: JSON object with the following fields:
title: Title of the task (required).
description: Description of the task (required).
completed: Completion status of the task (true or false, required).
priority: Priority of the task (low, medium, or high, required).

# Update a Task

URL: /tasks/:id
Method: PUT
Description: Update an existing task by ID.
Request Body: JSON object with the fields to be updated.

# Method: DELETE
Delete a Task
URL: /tasks/:id
Description: Delete a task by ID.


# Get Tasks by Priority

URL: /tasks/priority/:level
Method: GET
Description: Get tasks by priority level (low, medium, or high).

# while testing using postman, make sure to include header: Content_Type: application/json, while running POST and PUT requests

