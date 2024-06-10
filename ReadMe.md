<!-- Start backend -->

1. Ensure you have docker deamon downloaded
2. Enusre you have the right env variables for frontend & backend
3. you can access pgAdmin on your browser at http://localhost:8888 login cred is attached to env
4. login and create a server host name, username, and password are in the server/env
5. cd server && docker-compose up --build
6. you can access the endpoints using the localhost://{PORT}/doc

<!-- Start frontend -->

1. Enusre you have the frontend env
   cd client && yarn start
