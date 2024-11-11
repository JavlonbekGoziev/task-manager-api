# Task Manager API

A simple **Task Manager API** built with **Node.js** and **Express.js**. This API allows users to manage tasks with basic **CRUD** (Create, Read, Update, Delete) operations. The tasks are stored in a local **JSON file** (`tasks.json`) and each task has an **ID**, **title**, **description**, **status**, and **due date**.

## Features

- **Create**, **Read**, **Update**, and **Delete** tasks
- Tasks are stored in a local **JSON file** (`tasks.json`)
- Each task has the following fields:
  - **id**: Unique identifier for the task
  - **title**: Title of the task
  - **description**: Brief description of the task
  - **status**: Current status of the task (e.g., Pending, In Progress, Completed)
  - **dueDate**: Due date for the task

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend
- **Express.js**: Web framework for building the API
- **File System (fs)**: To read and write task data from/to a local JSON file

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JavlonbekGoziev/task-manager-api.git
cd task-manager-api
