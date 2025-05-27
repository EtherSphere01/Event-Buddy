# Installation Guideline

Installation process for the backend setup.

# Database Setup

- Create a database name with `event_buddy`
- Import the database file in PgAdmin (PostgreSql) from the `Database` folder. The database name is `event_buddy.sql` .
- The `event_buddy.sql` has all the necessary data in it.

## Backend Setup

- Go to the `event-buddy-server` folder and open the terminal in this folder.
- Run the following command to install all the packages:

```terminal
npm install
```

- After the installation open the folder in your favorite code editor.
- Run the following command to start the backend:

```terminal
npm run start:dev
```

- Make sure your backend is running on `localhost:3000` .

## Postman Setup:

To run the APIs of backend you can setup the postman. As this project use JWT Authentication. So its can be helpful to setup the postman and set the Authorization value (Bearer Token) to the header.

- Open the Postman application.
- Click on `import` at the top of your workspace.
- First Signin to set the `Bearer Token` . Sign in api is in the Authentications section.
- Signin as USER:

```json
{
  "email": "user@gmail.com",
  "password": "User@123"
}
```

- Signin as ADMIN

```json
{
  "email": "admin@gmail.com",
  "password": "admin@123"
}
```

- The `Beater Token` will set automatically.
- You can also create an account. And then signin with your email and password. NOTE: User Role_id: 1 for user role and Role_id: 2 for admin role.
- Setup is done.

### (Optional)

If you want to set the `Bearer Token` manually then,

- Signin with the email and password as given or create an account with your preferred role.(User or Admin).

## APIs Descriptions
