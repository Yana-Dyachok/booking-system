# Booking System
Develop a user management system with client and business roles. Clients can view businesses and book/manage appointments (date, time, duration).
- [Frontend deploy](https://booking-system-frontend-amber.vercel.app)
- [Backend deploy](https://booking-api-diachok.up.railway.app)

### How to install

1.  Clone this repository
```
git clone https://github.com/Yana-Dyachok/booking-system.git
```
2.  Move to the cloned repository
```
cd booking-system
```
3.  Move to the directory
```
cd frontend
```
4. Installing NPM modules
```
npm i
```

5.  Running application
```
npm run dev 
```
6. Open  http://localhost:3000 with your browser to see the result.

### N.B! Keep the server running during functionality review.
1.  Open new terminal
2.  Move to the directory
```
cd backend
```
3. Installing NPM modules
```
npm i
```
4.  Running application
```
npm run start
```

## The technology stack used:
- TypeScript
- React, React Hook Form, Next.js
- Nest.js, Node.js
- Prisma, PostgreSQL
- MUI (Material UI), MUI X Date, Time Pickers
- @tanstack/react-query, Axios, Zustand, Yup
- SASS, Styled component
- Eslint, Prettier, Husky

## Scripts
 Scripts                  |   instructions                         | Comands
--------------------------|:---------------------------------------|:-----------------------------
ESLint                    | check lint errors:                     | npm run lint 
Husky                     | setting up Git hooks:                  | npm run prepare
Next                      | compiles files and builds the app:     | npm run build 
//                        | create a local server for development: | npm run dev 
Prettier                  | checks and formats files:              | npm run format
Nest                      | compiles files and builds the app:     | npm run build
//                        | create a local server for development: | npm run start
Prisma                    | deploying created migrations:          | npm run migrate:deploy
Prisma                    | generated Prisma Client for db:        | npm run prisma:gen



### Task:
 1. You need to do Booking System.
 2. Technologies (you can choose): 
Front-end: React, React Native, Next.js
Back-end: Nest.js, Express.js, Next.js, Node.js, 
Database: PostgreSQL, MongoDB, MySQL
 3. Requirements:
- Ability to create, edit, delete, and view users.
- 2 types of users: client and business
- Clients should be able to view a list of business users and make appointments with them. Date, time and duration. 
- Clients should also have the ability to see and manage their own appointments (cancel or reschedule them).
