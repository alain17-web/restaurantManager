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

Let's start by the waiter/ress taking an order at the restaurant with a tablet. Instead of an actual order form, pressing the "New order" button will trigger a function that randomly picks a number of customers as well as drinks and dishes. The selected items show in a MUI-Accordion

<img width="442" alt="newOrder" src="https://github.com/user-attachments/assets/412f1603-bbec-4383-929a-1a0d6ff75ad2">

Once the order is submitted, it is visible in the dashboard where a notification appears 

<img width="387" alt="notif" src="https://github.com/user-attachments/assets/bca41560-ae3c-4440-89c3-8255c3660cb2">

and on the kitchen page where the cook can validate it if all the dishes are available.

<img width="403" alt="orderKitchen" src="https://github.com/user-attachments/assets/94876e23-c75a-4814-b8fd-3656c9164b76">






