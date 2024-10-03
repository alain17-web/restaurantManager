<h1>RESTAURANT MANAGER</h1>


The purpose of this app is to serve as a visual support for a sales representative to approach restaurant owners with the aim of selling a management application. It is not an actual restaurant management tool. This app only tries to help demonstrate how such a tool -once fully custom-developed can make managing a restaurant less burdensome.

The FRONTEND was created in REACT TYPESCRIPT and styled in TAILWIND while the BACKEND was made in EXPRESS with a MySQL database. 

<h1>FRONTEND</h1>

<h2>Public pages</h2>

The front includes 3 "public pages" accessible to all and several "private pages" restricted to logged in users. The 3 public pages purport to look like what might be a minimal and simple restaurant's static website with a

Home page 
<img width="1766" alt="home" src="https://github.com/user-attachments/assets/ab47e3fd-8c7d-4164-857d-b775b87d07f3">


Menu page 
<img width="1360" alt="menu-2" src="https://github.com/user-attachments/assets/f95601ef-5816-4478-aff1-b7ceebeb1a35">

Contact - booking page
<img width="1767" alt="about" src="https://github.com/user-attachments/assets/2d43a7b5-5d68-40c8-9c4c-d950fcbb8560">

The design has been intentionally kept simple to allow for easy customization. Depending on the restaurant being approached, the theme can quickly be adapted from a Middle Eastern style to Asian, French, or Italian by swapping out background images. The dishes displayed on the menu page can also be replaced through the dashboard interface found in the private pages.

The "Connexion Guest" button on the Home page directs the user to a login form, where they can register as a guest and gain read-only access to the private pages. There is also a separate login page for restaurant staff.

GuestLogin page
<img width="1763" alt="guestLogin" src="https://github.com/user-attachments/assets/e9630ac4-58c6-4e83-93d1-6b2028de50c1">

<h2>Private pages</h2> 

Depending on their role, a logged-in employee will be directed to either a Restaurant Page, Kitchen Page, or Dashboard Page.

Restaurant
<img width="1775" alt="resto" src="https://github.com/user-attachments/assets/c0d58ce5-921f-424b-9941-516ecc48d246">

Kitchen 
<img width="1374" alt="kitchen" src="https://github.com/user-attachments/assets/948905d8-2a4c-48d8-a977-0025127e1151">

Dashboard
<img width="1383" alt="dashboard" src="https://github.com/user-attachments/assets/98d6c18b-9664-4754-ad00-042e6019b61f">

<h2>How it works</h2>

<h3>Orders</h3>

The process begins with the waiter or waitress taking an order at the restaurant using a tablet. To simulate the act of writing down a customer’s order, pressing the "New Order" button triggers a function that randomly generates the number of customers along with their selected drinks and dishes. These items are then displayed in an MUI Accordion on the Restaurant Page.

<img width="442" alt="newOrder" src="https://github.com/user-attachments/assets/412f1603-bbec-4383-929a-1a0d6ff75ad2">

Once the order is successfully submitted, it becomes visible on the Dashboard where a notification appears

<img width="387" alt="notif" src="https://github.com/user-attachments/assets/bca41560-ae3c-4440-89c3-8255c3660cb2">

and on the kitchen page where the cook can validate it if all the dishes are available.

<img width="403" alt="orderKitchen" src="https://github.com/user-attachments/assets/94876e23-c75a-4814-b8fd-3656c9164b76">

Validating the order will update its status to "ok" as can be seen in the "Commandes clients" tab of the Dashboard.

<img width="1093" alt="order" src="https://github.com/user-attachments/assets/cde03bd2-b249-4902-b612-64f0cd69e8a6">

In this tab, clicking on the search icon will display the contents of the order.

<img width="1378" alt="orderDetail" src="https://github.com/user-attachments/assets/d831a700-5b1c-4cb6-9ac6-0b7982e00ed6">

The ordered items are then subtracted from the current stock, which can be viewed in the Stock tab of the Dashboard. The available stock is displayed in an MUI Accordion. 

<img width="1387" alt="stock" src="https://github.com/user-attachments/assets/ea94c4ae-ce8b-4eec-8794-68625ecb7893"> 

In the "Comptabilité" tab, a new financial report is generated, which adds the income from the order to the total available funds.

<img width="1375" alt="finance" src="https://github.com/user-attachments/assets/25410a68-71db-4835-919c-4b3dafae8437">

<h3>Purchases</h3> 

To replenish stock, the manager can create a purchase order using the New Purchase form in the "Réappros en attente" tab of the Dashboard. The maximum available budget is displayed at the top of the page and is updated automatically each time a quantity is increased.

<img width="1144" alt="newPurchase" src="https://github.com/user-attachments/assets/686357ed-37d1-4a86-8162-486d6de63be9">


Once the purchase is successfully submitted, it appears in the pending purchases list in the dashboard.

<img width="703" alt="pendingPurchase" src="https://github.com/user-attachments/assets/b9ffefb5-e42f-410f-9e7f-8ffb4ec8dffe">


Clicking the edit icon opens the purchase form, where a toggle button allows the user to change the status from pending ("Non livrée") to delivered ("Livrée").

<img width="1171" alt="delivered" src="https://github.com/user-attachments/assets/99e9ac41-dea7-478d-8ded-15a3898f1977">


The purchase order then disappears from the pending list and is now displayed on the delivered purchase orders list in the "Réappros livrés" tab of the dashboard with a delivery date.

<img width="734" alt="deliveredPurchase" src="https://github.com/user-attachments/assets/f0f257dd-14ad-4089-8182-971c2119118f">


In this list, a search icon allows the user to view the contents of the purchase order. Modifying or deleting a delivered purchase is not permitted.

<img width="1136" alt="purchaseDetail" src="https://github.com/user-attachments/assets/c77b3555-d4c2-4700-b169-deb5ec60a649">


When a purchase order is delivered, the stock is automatically updated and a new financial report is generated, substracting the total price of the purchase from the available funds ("total € dispo").

<img width="1022" alt="updatedFinance" src="https://github.com/user-attachments/assets/4e3e630f-78a8-4176-9afb-7dcb21a93538">

<h3>Staff and roles</h3>

In the "Employés actifs" tab of the staff section in the Dashboard, the admin can use the "Ajouter un employé" form to create a new employee, assigning them a role (admin, waiter, cook), a roster, and a status (active or inactive).

<img width="1238" alt="newStaff" src="https://github.com/user-attachments/assets/bb339c42-4d40-4009-9414-7941564e47e0">


Depending on their status, employees will appear in either the active or inactive staff list.

<img width="1427" alt="staffList" src="https://github.com/user-attachments/assets/4bbc99ae-93ff-48bb-a5a3-027cf58bb0a7">



It is only possible to delete an employee in the "Inactifs" list.

<img width="887" alt="inactive" src="https://github.com/user-attachments/assets/557a248a-4db7-4c86-97ae-de663eddd06c">



Roles and rosters can be created and managed in the Rôles and Horaires staff tabs of the dashboard.

<img width="164" alt="rolesRostersTabs" src="https://github.com/user-attachments/assets/36fd50cf-13f0-4ba7-abb1-60808a67e188">

<h3>Dishes,drinks & categories</h3>

In a similar way, the dishes and drinks on the Menu can be managed from the dashboard. 

<img width="129" alt="drinksDishesTabs" src="https://github.com/user-attachments/assets/4ef71b2f-59b6-4ba6-8789-678319f728b6">


A drink or dish is always assigned to a category (e.g., dessert, wine). Categories are created and managed in the Dashboard.

<img width="495" alt="categories" src="https://github.com/user-attachments/assets/20df0def-f456-4587-b058-6891800d9b7f">



<h3>Login and authentication</h3>

The authentication process uses JSON Web Tokens (JWT). When signing in, either as a guest (in READ-ONLY mode on the GuestLogin page) or as an employee (on the Login pages), a token is generated. This token is destroyed upon signing out.

<img width="662" alt="login" src="https://github.com/user-attachments/assets/24b2e3cf-27d0-4664-917b-9466c7bf3f67">

<h1>BACKEND</h1>

The backend part of the app was built using the Node.js framework **Express**. To interact with the frontend and the **MySQL** database while keeping the logic separated for better readability and maintainability, I adopted a **modular approach** with the use of **service, controller, and route** files.

<h2>SERVICE files</h2> 

he service files contain the **core business logic** of the application. This logic includes data validation, data processing, and any rules or decisions that need to be applied. **Service functions** are created to handle **CRUD** operations but are not actually called within the service files themselves. Instead, they are exported to the controller files.

ex: The function addDish is created.

**_const dishService = {
//CREATE
addDish: async ({..._**

<h2>CONTROLLERS files</h2>

The controller files only handle **HTTP requests and responses**. The controller delegates more complex tasks to the service layer, which means the controller remains slim, only **responsible for routing, handling input, and calling the appropriate service methods**.

ex: _Here the addDish method is called

**_const dishResult = await dishService.addDish__**

<h3>Validators files</h3>

To ensure that the format of any added data is correct and aligns with what the database expects, a validator file (created with the JS library **YUP**) is imported into the controller. It checks that any new data matches the expected predefined format. 

ex: the dishValidator

**_const dishValidator = yup.object({
name: yup.string().required(),_**

<h2>ROUTES files</h2>

The route files define the endpoints that the application will respond to and map them to the relevant controller functions.

<h3>AUTHENTICATION MIDDLEWARE</h3>

The purpose of the authentication middleware is to protect specific routes by verifying the identity of users before allowing them access. Middleware sits between the client request and the route handler, intercepting requests to check whether a user has provided valid credentials (like a token) to prove he's authorized to use the resource.

ex: endpoint of addDish with the authentication middleware :

_**dishRouter.route('/addDish')
.post(
authenticate,
authorize([1]),
upload.single('img'),
dishController.addDish
)_**_

<h3>ROUTER</h3>

The router file acts as the central hub for routing in the application. It defines the major route paths (e.g., /dishes, /auth, /employees, etc.) and connects each path to the corresponding router file, which is responsible for handling requests specific to that resource.

ex: route path for dishes 

**_router.use('/dishes',dishRouter)_**

<h2>APP file</h2>

This is the main entry of the app and is  where the router file is imported. The app file defines how the app responds to various requests by setting up the main route handlers :

_**app.use('/api', router);**_

The app file is also responsible for configuring global middleware (e.g., body parsers, CORS, etc...) that applies to all incoming requests. These middleware functions handle things like parsing JSON bodies, handling CORS (Cross-Origin Resource Sharing) :

**_app.use(express.json());_**

**_app.use(cookieParser());_**

**_app.use(cors({..._**

Once everything is configured (routes, middleware, etc.), the app file starts the server and listens for incoming requests on the defined port.

<h2>IMAGES</h2>

In the **uploads** folder, the sub directory **img** contains the images of the dishes. Each image is assigned a unique ID generated by **UUID V4** and is handled by a **Multer** middleware.







