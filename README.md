<H1 align ="center" > A Blogging WriteWave Web App  </h1>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Screenshots](#screenshots)
  * [Author](#author)
  * [License](#license)


## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd Frontend
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
```

In the second terminal

- cd Backend and Set environment variables in config.env under ./config
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---

NODE_ENV = production

PORT =5000

URI =http://localhost:3000

MONGO_URI =

ACCESS_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=

REFRESH_TOKEN_EXPIRY=10d

RESET_PASSWORD_EXPIRE =  

SMTP_HOST = "smtp.gmail.com"

SMTP_PORT = 

SMTP_USERNAME = 

SMTP_PASSWORD =

SMTP_FROM_EMAIL = 

CONTACT_US_EMAIL =

FRONTEND_URL=http://localhost:5173


```


```
# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```

##  Key Features

- User registration and login
- Authentication using JWT Tokens
- CRUD operations (Blog create, read, update and delete)
- Upload user ımages and blog ımages  to the server
- Liking  blog and Comment on blog
- Toast loading effect
- Responsive Design

<br/>

##  Technologies used

This project was created using the following technologies.

####  Frontend 

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks  ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Tailwind CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface
- [CK-Editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Rich Text Editor 
- [React icons](https://react-icons.github.io/react-icons/) -
 Small library that helps you add icons  to your react apps.

####  Backend 

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers 
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [Nodemailer](https://nodemailer.com/about/) - Send e-mails from Node.js
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [multer](https://www.npmjs.com/package/multer) - Node.js middleware for uploading files 
- [slugify](https://www.npmjs.com/package/slugify) - For encoding titles into a URL-friendly format
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware


####  Database 

 - [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections.
 
 ##  Screenshots 
 
![1](https://github.com/PrinceInScripts/Blog-App/assets/124567410/e48235b7-b08d-4b7d-a27b-c2e0bc3bb730)
![2](https://github.com/PrinceInScripts/Blog-App/assets/124567410/7796d939-5447-458e-95f0-914f2847a883)
![3](https://github.com/PrinceInScripts/Blog-App/assets/124567410/05008552-d641-44b3-ae38-f4c0987ea5e7)
![4](https://github.com/PrinceInScripts/Blog-App/assets/124567410/e8fbfaec-eb69-4c1f-a76d-3b9b51229bb0)
![5](https://github.com/PrinceInScripts/Blog-App/assets/124567410/6c199423-3bae-4031-b77b-67ace93dcd70)
![6](https://github.com/PrinceInScripts/Blog-App/assets/124567410/3fb4e5ed-ced5-4af2-81d9-497e7d933c27)
![7](https://github.com/PrinceInScripts/Blog-App/assets/124567410/f5b61c2a-7b8a-482e-929c-99b99cd0aa41)
![8](https://github.com/PrinceInScripts/Blog-App/assets/124567410/6fe66d3b-31a3-4ed0-9c47-9a0973b36a9c)
![9](https://github.com/PrinceInScripts/Blog-App/assets/124567410/86ed789d-5455-4c7c-810d-f1e01202b761)
![10](https://github.com/PrinceInScripts/Blog-App/assets/124567410/3f4aa329-9442-4950-928c-450870470120)
![11](https://github.com/PrinceInScripts/Blog-App/assets/124567410/ca9c6a1a-e7ac-4d39-bf9c-05f2c1e1dd6f)
![12](https://github.com/PrinceInScripts/Blog-App/assets/124567410/9384dca3-952f-440f-95e4-8f87987b58e0)
![13](https://github.com/PrinceInScripts/Blog-App/assets/124567410/40116980-f610-4045-b34c-4c7ec2b7c7c6)
![14](https://github.com/PrinceInScripts/Blog-App/assets/124567410/03c125ba-73ad-4694-be11-32b9ad442121)
![15](https://github.com/PrinceInScripts/Blog-App/assets/124567410/48f3dfbe-142e-4a93-a89f-362ad64cd21c)
![16](https://github.com/PrinceInScripts/Blog-App/assets/124567410/33da439e-7c6f-4b64-8a66-d4613ffb8be8)
![17](https://github.com/PrinceInScripts/Blog-App/assets/124567410/6c72f9ea-cc57-49b4-bce2-5caba50a583f)
![18](https://github.com/PrinceInScripts/Blog-App/assets/124567410/45b75924-4075-47fc-a1e6-cd0b9e3d7f4a)
![19](https://github.com/PrinceInScripts/Blog-App/assets/124567410/33cfe765-8c1b-4ab4-81b2-887f7891cd90)
![20](https://github.com/PrinceInScripts/Blog-App/assets/124567410/3b6cffa9-d84e-418a-bcc2-7fd1442d5b5e)