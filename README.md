<h1>RESTAURANT MANAGER</h1>


The purpose of this app is to serve as a visual support for a sales representative to approach restaurant owners with the aim of selling a management application. 

The FRONT-end was created in REACT TYPESCRIPT and styled in TAILWIND while the BACK-end was made in EXPRESS with a MYSQL database. 

<h1>FRONT</h1>

<h2>Public pages</h2>

The front includes 3 "public pages" accessible to all and several "private pages" restricted to logged in users. The 3 public pages purport to look like what might be a minimal and simple restaurant's static website with a

Home page 
<img width="1766" alt="home" src="https://github.com/user-attachments/assets/ab47e3fd-8c7d-4164-857d-b775b87d07f3">


Menu page 
<img width="1360" alt="menu-2" src="https://github.com/user-attachments/assets/f95601ef-5816-4478-aff1-b7ceebeb1a35">

Contact - booking page
<img width="1767" alt="about" src="https://github.com/user-attachments/assets/2d43a7b5-5d68-40c8-9c4c-d950fcbb8560">

The design was voluntarily kept basic as it needed to be easily modified so that a middle eastern touch can - depeding on the approached reastaurant - become say asian, french or italian with just a few new background images. The dishes displayed in the menu page can be replaced through the interface on the dashboard in the "private pages"

The "connexion guest" button on the Home page leads to a login form allowing the user to register as a guest and gain access to the "private pages" in READ ONLY mode. There is a similar page for the staff to login.

GuestLogin page
<img width="1763" alt="guestLogin" src="https://github.com/user-attachments/assets/e9630ac4-58c6-4e83-93d1-6b2028de50c1">

<h2>Private pages</h2> 

Depending on his role, an logged in employee will land on a restaurant page, a kitchen page or a dashboard page.

Restaurant
<img width="1775" alt="resto" src="https://github.com/user-attachments/assets/c0d58ce5-921f-424b-9941-516ecc48d246">

Kitchen 
<img width="1374" alt="kitchen" src="https://github.com/user-attachments/assets/948905d8-2a4c-48d8-a977-0025127e1151">

Dashboard
<img width="1383" alt="dashboard" src="https://github.com/user-attachments/assets/98d6c18b-9664-4754-ad00-042e6019b61f">

<h2>How it works</h2>

<h3>Orders</h3>

Let's start by the waiter/ress taking an order at the restaurant with a tablet. In order to imitate writing down a customer's order, pressing the "New order" button will trigger a function that randomly picks a number of customers as well as drinks and dishes. The selected items show in a MUI-Accordion on the Restaurant page.

<img width="442" alt="newOrder" src="https://github.com/user-attachments/assets/412f1603-bbec-4383-929a-1a0d6ff75ad2">

Once the order is successfully submitted, it becomes visible in the dashboard where a notification appears 

<img width="387" alt="notif" src="https://github.com/user-attachments/assets/bca41560-ae3c-4440-89c3-8255c3660cb2">

and on the kitchen page where the cook can validate it if all the dishes are available.

<img width="403" alt="orderKitchen" src="https://github.com/user-attachments/assets/94876e23-c75a-4814-b8fd-3656c9164b76">

Validating the order will update its status to "ok" as can be seen in the "Commandes clients" tab of the dashboard

<img width="1093" alt="order" src="https://github.com/user-attachments/assets/cde03bd2-b249-4902-b612-64f0cd69e8a6">

where clicking on the "search" icon displays the contents of the order.

<img width="1378" alt="orderDetail" src="https://github.com/user-attachments/assets/d831a700-5b1c-4cb6-9ac6-0b7982e00ed6">

The ordered items are then substracted from the current stock ( Stock tab of the dashboard ). The available stock is displayed in a MUI - Accordion. 

<img width="1387" alt="stock" src="https://github.com/user-attachments/assets/ea94c4ae-ce8b-4eec-8794-68625ecb7893"> 

In the "Comptabilité" tab, a new financial report is created and adds the income from the order to the total available funds. 

<img width="1375" alt="finance" src="https://github.com/user-attachments/assets/25410a68-71db-4835-919c-4b3dafae8437">

<h3>Purchases</h3> 

In order to replenish the stock, the manager has the possiblity to create a purchase order using the New Purchase form of the "Réappros en attente" tab of the dashboard. The maximum available budget is displayed at the top of the page and is updated each time a quantity is increased.

<img width="1144" alt="newPurchase" src="https://github.com/user-attachments/assets/686357ed-37d1-4a86-8162-486d6de63be9">


Once the purchase is successfully submitted, it appears in the list of the pending purchases in the dashboard.

<img width="703" alt="pendingPurchase" src="https://github.com/user-attachments/assets/b9ffefb5-e42f-410f-9e7f-8ffb4ec8dffe">


Clicking on the edit icon will cause the purchase form to be rendered where a toggle button can change the status from pending ( "Non livrée") to delivered ( "Livrée").

<img width="1171" alt="delivered" src="https://github.com/user-attachments/assets/99e9ac41-dea7-478d-8ded-15a3898f1977">


The purchase order then disappears from the pending list and is now displayed on the delivered purchase orders list in the "Réappros livrés" tab of the dashboard with a delivery date.

<img width="734" alt="deliveredPurchase" src="https://github.com/user-attachments/assets/f0f257dd-14ad-4089-8182-971c2119118f">


On this list, there is a "search" icon that allows the user to see the contents of the purchase order. It is not possible to modify or delete a delivered purchase.

<img width="1136" alt="purchaseDetail" src="https://github.com/user-attachments/assets/c77b3555-d4c2-4700-b169-deb5ec60a649">


When a purchase order is delivered, the stock is automatically updated and a new financial report is generated substracting the total price of the purchase from the available funds ("total € dispo").

<img width="1022" alt="updatedFinance" src="https://github.com/user-attachments/assets/4e3e630f-78a8-4176-9afb-7dcb21a93538">

<h3>Staff and roles</h3>

In the "Employés actifs" tab of the staff section in the dashboard, the admin can use the "Ajouter un employé" form to create a new employee with a role ( admin, waiter, cook ), a roster and a status ( active or inactive ).

Depending on the status, an employee will show in the active or the inactive staff list. It is only possible to delete an employee in the "Inactifs" list.

Roles and rosters can be created and managed in the Rôles and Horaires staff tabs of the dashboard.












