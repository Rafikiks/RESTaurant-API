# README - API Documentation

This README provides an overview of how to launch and use the API, as well as a description of its features.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Items](#items)
  - [Formulas](#formulas)
  - [Categories](#categories)
- [Support](#support)

---

## Getting Started

To run the API, follow these steps:

1. **Prerequisites**  
   Ensure that you have **Node.js** and **npm** installed on your machine.

2. **Clone the repository**  
   Clone this repository to your local machine:

   - **HTTPS**: `git clone https://github.com/Rafikiks/RESTaurant-API.git`
   - **SSH**: `git clone git@github.com:Rafikiks/RESTaurant-API.git`
   - **GitHub CLI**: `gh repo clone Rafikiks/RESTaurant-API`

3. **Navigate to the project directory**

   ```bash
   cd api-project
   ```

4. **Install dependencies**

   ```bash
   npm install
   npm i express mysql basic-auth
   ```

5. **Start the API**

   ```bash
   npm start
   ```

6. **Access the API**  
   Open your browser and go to [http://localhost:3000/](http://localhost:3000/) (or your chosen default port). Your Express project should now be running.

---

## API Endpoints

### Items

The API provides the following endpoints for managing items:

- **Get All Items**

  - **Endpoint**: `GET /items`
  - **Description**: Retrieves a list of all items in the database.

- **Get Filtered Items**

  - **Endpoint**: `GET /items?parameters`
  - **Description**: Displays items matching the specified filters.

- **Get Item by ID**

  - **Endpoint**: `GET /items/:id_item`
  - **Description**: Retrieves details of a specific item using its ID.

- **Add New Item**

  - **Endpoint**: `POST /items`
  - **Description**: Adds a new item to the database. Only administrators can perform this action.

- **Update Item**

  - **Endpoint**: `PUT /items/:id_item`
  - **Description**: Updates an existing item by its ID. Only administrators can perform this action.

- **Delete Item**
  - **Endpoint**: `DELETE /items/:id_item`
  - **Description**: Deletes an item from the database by its ID. Only administrators can perform this action.

### Formulas

The API provides similar CRUD operations for managing formulas:

- **Get All Formulas**

  - **Endpoint**: `GET /formulas`
  - **Description**: Retrieves a list of all formulas in the database.

- **Get Filtered Formulas**

  - **Endpoint**: `GET /formulas?parameters`
  - **Description**: Displays formulas matching specified filters.

- **Get Formula by ID**

  - **Endpoint**: `GET /formulas/:id_formula`
  - **Description**: Retrieves details of a specific formula by its ID.

- **Add New Formula**

  - **Endpoint**: `POST /formulas`
  - **Description**: Adds a new formula to the database. Only administrators can perform this action.

- **Update Formula**

  - **Endpoint**: `PUT /formulas/:id_formula`
  - **Description**: Updates an existing formula by its ID. Only administrators can perform this action.

- **Delete Formula**
  - **Endpoint**: `DELETE /formulas/:id_formula`
  - **Description**: Deletes a formula from the database by its ID. Only administrators can perform this action.

### Categories

You can also manage categories using the API:

- **Get All Categories**

  - **Endpoint**: `GET /categories`
  - **Description**: Retrieves a list of all categories in the database.

- **Get Category by ID**

  - **Endpoint**: `GET /categories/:id_category`
  - **Description**: Retrieves details of a specific category by its ID.

- **Add New Category**

  - **Endpoint**: `POST /categories`
  - **Description**: Adds a new category to the database. Only administrators can perform this action.

- **Update Category**

  - **Endpoint**: `PUT /categories/:id_category`
  - **Description**: Updates an existing category by its ID. Only administrators can perform this action.

- **Delete Category**
  - **Endpoint**: `DELETE /categories/:id_category`
  - **Description**: Deletes a category from the database by its ID. Only administrators can perform this action.

You can interact with these endpoints using tools like Postman, specifying the required data and HTTP methods (GET, POST, PUT, DELETE) to manage your items, formulas, and categories in the API.

---

## Support

If you have any questions or need further assistance, feel free to reach out:

- **Email**: kylian.razafitsalama@epitech.digital

---
