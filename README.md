# User List Management and Email Sending API

## Overview

This project is a RESTful API for managing a list of users with customizable properties and sending emails to the users. It provides endpoints for creating lists, adding users via CSV upload, and sending emails to the users in a list.

## Features

- **List Creation:** Create lists with custom properties.
- **User Addition:** Add users to the list via CSV upload.
- **CSV Handling:** Efficiently handle large CSV files (10,000+ records).
- **Unique Emails:** Ensure unique emails within a list.
- **Error Handling:** Return detailed error reports for failed user additions.
- **Email Sending:** Send customized emails to all users in a list.
- **Unsubscribe:** Include an unsubscribe link in emails.

## Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Multer (for file uploads)
-   Nodemailer (for sending emails)

## Prerequisites

-   Node.js (>=14.x)
-   MongoDB

## Setup

1. Clone the repository:

```
git clone https://github.com/Kanai2003/User-List-Management-and-Email-Sending-API

cd user-list-management-api
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

Create a .env file in the root directory with the following contents:

env

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
MONGO_URI=mongodb://localhost:27017/your-database-name
```

Run the server:

```
npm run dev
```

The server will start on http://localhost:3000.

## API Documentation
Read on Postman : [Postman API](https://documenter.getpostman.com/view/27116622/2sA3QmDEwb)
## Hosted on Render
Access server code: [Base URI](https://user-list-management-and-email-sending-2h8r.onrender.com/)

## License
This project is licensed under the MIT License.
