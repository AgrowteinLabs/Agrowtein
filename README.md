# Agrowtein API Documentation

This documentation provides an overview of the Agrowtein API endpoints, their URLs, supported operations, and the expected request bodies referencing the corresponding database models.

## Base URL
- The base URL for the API is: https://agrowteinlabs.onrender.com
- All requests (excluding some GET requests) will return a json with a message field.
For example the createUser endpoint will return a json like : 
    res.status(201).json({ message: "User created successfully." });
    OR
    res.status(409).json({ message: "User already exists." });
    If error:
    res.status(500).json({ message: "Error creating user." });

## User Routes

### Get All Users

- URL: `/api/v1/users`
- Method: GET
- Description: Retrieves all users from the database.
- Request Body: N/A

### Get User by ID

- URL: `/api/v1/users/:userId`
- Method: GET
- Description: Retrieves a user by their ID from the database.
- Request Body: N/A
- Parameters: `userId` (string)

### Create User

- URL: `/api/v1/users`
- Method: POST
- Description: Creates a new user in the database.
- Request Body:
    - `fullName` (string, required): The full name of the user.
    - `email` (string, required, unique): The email address of the user.
    - `password` (string, required): The password of the user.
    - `phoneNumber` (string, required): The phone number of the user.
    - `address` (object):
        - `city` (string): The city of the user's address.
        - `state` (string): The state of the user's address.
        - `country` (string): The country of the user's address.
        - `postalCode` (string): The postal code of the user's address.
    - `dayOfRegistration` (date, default: current date): The date of user registration.
    - `role` (string, enum: ["user", "admin"], default: "user"): The role of the user.
    - `termsAgreement` (boolean): Indicates if the user has agreed to the terms.
    - `privacyPolicyAgreement` (boolean): Indicates if the user has agreed to the privacy policy.

### Update User

- URL: `/api/v1/users/:userId`
- Method: PUT
- Description: Updates an existing user in the database.
- Request Body (All the fields are optional to update , so can include any of these fields to update except the password and email.)
    - `fullName` (string): The full name of the user.
    - `phoneNumber` (string, required): The phone number of the user.
    - `address` (object):
        - `city` (string): The city of the user's address.
        - `state` (string): The state of the user's address.
        - `country` (string): The country of the user's address.
        - `postalCode` (string): The postal code of the user's address.
    - `dayOfRegistration` (date, default: current date): The date of user registration.
    - `role` (string, enum: ["user", "admin"], default: "user"): The role of the user.
    - `termsAgreement` (boolean): Indicates if the user has agreed to the terms.
    - `privacyPolicyAgreement` (boolean): Indicates if the user has agreed to the privacy policy.
- Parameters: `userId` (string)

- Note: The password cannot be updated through this endpoint. Use the `/api/v1/users/:userId/newpassword:

### Update User Password

- URL: /api/v1/users/:userId/newpassword
- Method: PUT
- Description: Updates the password of an existing user in the database.
- Request Body:
    - `password` (string, required): The new password of the user.
- Parameters: `userId` (string)

### Delete User

- URL: `/api/v1/users/:userId`
- Method: DELETE
- Description: Deletes a user from the database.
- Request Body: N/A
- Parameters: `userId` (string)

## Product Routes

### Get All Products

- URL: `/api/v1/products`
- Method: GET
- Description: Retrieves all products from the database.
- Request Body: N/A

### Get Product by ID

- URL: `/api/v1/products/:productId`
- Method: GET
- Description: Retrieves a product by its ID from the database.
- Request Body: N/A
- Parameters: `productId` (string)

### Get Product by SerialNumber

- URL: `/api/v1/products/serial/:serialNumber`
- Method: GET
- Description: Retrieves a product by its serial number from the database.
- Request Body: N/A
- Parameters: `serialNumber` (string)

### Get Products by User

- URL: `/api/v1/products/user/:userId`
- Method: GET
- Description: Retrieves all products associated with a specific user from the database.
- Request Body: N/A
- Parameters: `userId` (string)

### Create Product

- URL: `/api/v1/products`
- Method: POST
- Description: Creates a new product in the database.
- Request Body:
    - `name` (string, required): The name of the product.
    - `description` (string, required): The description of the product.
    - `userId` (string, required): The ID of the user associated with the product.
    - `state` (string, enum: ["ON", "OFF", "ERROR"], default: "OFF"): The state of the product. // The state field is not required , it is automatically updated based on the mc input and is OFF by       default.
    - `location` (string): The location of the product.
    - `productType` (string): The type of the product.
    - `modelNumber` (string): The model number of the product.
    - `serialNumber` (string, required): The serial number of the product.
    - `sensor` (array of object IDs): The sensors associated with the product.
        - `state` (string, enum: ["ON", "OFF", "ERROR"], default: "OFF"): The state of the sensor. // The state field is not required , it is automatically updated based on the mc input and is OFF by default.
    - `usageMetrics` (string): The usage metrics of the product.
    - `installationDate` (date, default: current date): The installation date of the product.
- example : 
        const exampleProduct = {
            name: "Example Product",
            description: "This is an example product",
            userId: "60a7e0e9c4e8a10015a6e8e1",
            state: "ON", 
            location: "New York",
            productType: "Pump",
            modelNumber: "12345",
            serialNumber: "ABC123",
            sensor: [
                {
                _id: "60a7e0e9c4e8a10015a6e8e2",
                state: "ON", 
                },
                {
                _id: "60a7e0e9c4e8a10015a6e8e3",
                state: "OFF",
                },
            ],
            usageMetrics: "Some metrics",
            installationDate: new Date("2022-01-01"), // Inserts present date by deafult , modify as needed
            };

### Update Product

- URL: `/api/v1/products/:productId`
- Method: PUT
- Description: Updates an existing product in the database.
- Request Body (All the fields are optional to update , so can include any of these fields to update):
    - `name` (string, required): The name of the product.
    - `description` (string, required): The description of the product.
    - `userId` (string, required): The ID of the user associated with the product.
    - `state` (string, enum: ["ON", "OFF", "ERROR"], default: "OFF"): The state of the product. // The state field is not required , it is automatically updated based on the mc input and is OFF by       default.
    - `location` (string): The location of the product.
    - `productType` (string): The type of the product.
    - `modelNumber` (string): The model number of the product.
    - `serialNumber` (string, required): The serial number of the product.
    - `sensor` (array of object IDs): The sensors associated with the product.
        - `state` (string, enum: ["ON", "OFF", "ERROR"], default: "OFF"): The state of the sensor. // The state field is not required , it is automatically updated based on the mc input and is OFF by default.
    - `usageMetrics` (string): The usage metrics of the product.
    - `installationDate` (date, default: current date): The installation date of the product.
- Parameters: `productId` (string)

### Delete Product

- URL: `/api/v1/products/:productId`
- Method: DELETE
- Description: Deletes a product from the database.
- Request Body: N/A
- Parameters: `productId` (string)

## Sensor Routes

### Get All Sensors

- URL: `/api/v1/sensors`
- Method: GET
- Description: Retrieves all sensors from the database.
- Request Body: N/A

### Get Sensor by ID

- URL: `/api/v1/sensors/:sensorId`
- Method: GET
- Description: Retrieves a sensor by its ID from the database.
- Request Body: N/A
- Parameters: `sensorId` (string)

### Create Sensor

- URL: `/api/v1/sensors`
- Method: POST
- Description: Creates a new sensor in the database.
- Request Body:
    - `name` (string, required): The name of the sensor.
    - `description` (string, required): The description of the sensor.
    - `unit` (string, required): The unit of measurement for the sensor.
    - `state` (string, enum: ["ON", "OFF", "ERROR"], default: "OFF"): The status of the sensor. // The state field is not required , it is automatically updated based on the mc input and is OFF by default.

### Update Sensor

- URL: `/api/v1/sensors/:sensorId`
- Method: PUT
- Description: Updates an existing sensor in the database.
- Request Body:
    - `name` (string): The name of the sensor.
    - `description` (string): The description of the sensor.
    - `unit` (string): The unit of measurement for the sensor.
    - `state` (string, enum: ["ON", "OFF", "ERROR"], default: "OFF"): The status of the sensor. // The state field is not required , it is automatically updated based on the mc input and is OFF by default.
- Parameters: `sensorId` (string)

### Delete Sensor

- URL: `/api/v1/sensors/:sensorId`
- Method: DELETE
- Description: Deletes a sensor from the database.
- Request Body: N/A
- Parameters: `sensorId` (string)

## Sensor Data Routes

### Get Data by Product

- URL: `/api/v1/data/:productId`
- Method: GET
- Description: Retrieves sensor data for a specific product from the database.
- Request Body: N/A
- Parameters: `productId` (string)

### Get Data by Date

// This endpoints expects the startdate and date inside the request body as startDtae and endDate. Can also change it to accept as req.query as well as axios.params.
- URL: `/api/v1/data/:productId/date`
- Method: GET
- Description: Retrieves sensor data for a specific product by date from the database.
- Request Body: 
    - `startDate` (Date): The start date for retrieving sensor data.
    - `endDate` (Date): The end date for retrieving sensor data.
- Parameters: `productId` (string)

### Create Data

- URL: `/api/v1/data`
- Method: POST
- Description: Creates new sensor data in the database.
- Request Body:
    - `productId` (string, required): The ID of the product associated with the sensor data.
    - `value` (number, required): The sensor data value.
    - `timestamp` (date , default: Date.now()): The timestamp of the sensor data.
    - `phValue` (string): The pH value of the sensor data.
    - `temperature` (number): The temperature value of the sensor data.
    - `humidity` (number): The humidity value of the sensor data.
    - `voltage` (string): The voltage value of the sensor data.
    - `pressure` (string): The pressure value of the sensor data.
    - `waterLevel` (string): The water level value of the sensor data.
    - `weather` (object):
        - `windspeed` (string): The wind speed value of the sensor data.
        - `winddirection` (string): The wind direction value of the sensor data.
        - `weathercondition` (string): The weather condition value of the sensor data.
        - `uvindex` (string): The UV index value of the sensor data.
        - `visibility` (string): The visibility value of the sensor data.

Please note that the authentication and authorisation is not yet setted up.
