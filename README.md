## UClothes FE Application

This is the UClothes application. Below is an example of the .env file needed for the application to run correctly.

## Demo Link

You can access the live demo of the UClothes application at: https://uclothes.pl
```
for admin panel use https://uclothes.pl/admin/login 
user: admin
password: example
```
# Example .env.local to run the application
```
NEXT_PUBLIC_API_URL=UrlAddresForApi
# JWT Secret should be the same as in the API configuration
NEXT_PUBLIC_JWT_SECRET=YourSecretKeyHere
```
# To run the application
```
1. In console: next dev
2. go to localhost:3000
```
# Admin dashboard
```
If you want to access the admin dashboard, you need to create a user with an admin role in the database.
Then, go to `http://localhost:3000/admin/login` to log in. You will be redirected to the dashboard if the login is successful.
```
[![img.png](screenshots%2Fimg.png)](https://github.com/Brylson123/NextJS-uChlothes-frontend/blob/main/screenshots/img.png)
[![img.png](screenshots%2Fimg_1.png)](https://github.com/Brylson123/NextJS-uChlothes-frontend/blob/main/screenshots/img_1.png)
