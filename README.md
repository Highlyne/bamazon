# bamazon
Catalog type storefront

## Overview

Bamanzon is an Amazon-like storefront utilizing MySQL to manage the database. The app takes in orders from customers and depletes stock from the store's inventory. There is also a Manager only side which allows for a set of administrative options.

Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage.

Bamazon operates on a sigle database using a table to record Products.  The table headings are:

 * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

###Customer View

Customers are able to view a list of all of the items available for sale. The list shows ids, names, and prices of products for sale by department.  Below are a view examples:

Customer are prompted with three messages.
   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy. 
   * The total purchase amount is shown and the customer is given the option to complete the transaction or cancel.
   * After the transaction is complete the avaiable stock is updated.


**Insufficient Stock**

If Bamazon has insufficient stock to complete the customer's request the customer will be given a message and the opportunity to select another quanity.


- - -

### Manager View (Next Level)

Manager CLI gives a list a set of menu options:

  * View Products for Sale
    - list every available item: the item IDs, names, prices, and quantities.

    * View Low Inventory
      -list all items with an inventory count lower than five.
    
    * Add to Inventory
      -displays a prompt that will let the manager "add more" of any item currently in the store.
  
    
    * Add New Product
      -allows the manager to add a completely new product to the store.

- - -


