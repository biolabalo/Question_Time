# QuestionTime Frontend Application

This repository contains the frontend solution for the QuestionTime (QT) application. QT is a platform for registered users to create and manage multiple-choice questions.

## Problem Statement

The task involved creating a user interface to interact with the provided backend APIs. The main functionalities included:

- Setting up questions with multiple-choice options.
- Displaying existing questions and their options.
- Allowing users to create new questions and edit existing ones.
- Ensuring a user-friendly experience on both desktop and mobile devices.

## Solution Overview

The frontend application is built using [Next.js](https://nextjs.org/) and [React.js](https://reactjs.org/). It interacts with the backend API provided by QT to manage questions and options.

## Features

- **Token Authentication:** Users are required to provide their email address to obtain a personal token, which is then used for subsequent API requests.
- **Question Management:** Users can view existing questions, create new questions, edit existing ones, and delete questions.
- **Option Management:** Users can add, remove, or edit options for each question.
- **Responsive Design:** The application is responsive and optimized for various screen sizes, providing a seamless experience across devices.

## Technologies Used

- Next.js
- React.js
- Axios
- Tailwind CSS
- sweetAlert

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/biolabalo/Question_Time.git



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More



- [Hosted App]( https://question-time-rho.vercel.app/) - Click the link to view the hosted app.


## Deploy on Vercel
