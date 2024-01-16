import sqlite3 as sql

class DBfuncs:
    #Creating every table that is needed in our website's backend
    def createTables():
        con = sql.connect('database.db')
        con.execute("PRAGMA foreign_keys = ON")
        cur = con.cursor()
        cur.execute("""CREATE TABLE IF NOT EXISTS customers (
                surname TEXT NOT NULL,
                name TEXT NOT NULL,
                address TEXT NOT NULL,
                postcode INTEGER NOT NULL,
                username TEXT PRIMARY KEY,
                password TEXT NOT NULL                      
            )""")
        cur.execute("""CREATE TABLE IF NOT EXISTS restaurants (
                res_name TEXT PRIMARY KEY,
                address TEXT NOT NULL,
                postcode INTEGER NOT NULL,
                password TEXT NOT NULL,
                picture BLOB                           
            )""")
        cur.execute("""CREATE TABLE IF NOT EXISTS menu_items(
                res_name TEXT NOT NULL,
                name TEXT NOT NULL,
                ingredients TEXT NOT NULL, 
                type TEXT CHECK(TYPE IN('Main', 'Side', 'Desert', 'Drink')) NOT NULL,
                price INTEGER NOT NULL,
                FOREIGN KEY(res_name) REFERENCES restaurants(res_name)       
            )""")
        con.commit()
        con.close()

    #Customer registration to the DB
    def registerCustomer(surname, name, address, postcode, username, password):
        con = sql.connect('database.db')
        cur = con.cursor()
        response = False
        cur.execute("SELECT EXISTS (SELECT * FROM customers WHERE username=?)", (username,))
        result = cur.fetchone()[0]
        if not bool(result):
            cur.execute("INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?)", (surname, name, address, postcode, username, password))
            response = True
        con.commit()
        con.close()
        return response

    #Restaurant registration to the DB
    def registerRestaurant(res_name, address, postcode, password, img_path = None):
        con = sql.connect('database.db')
        cur = con.cursor()
        response = False
        sqlite_insert_blob_query = """ INSERT INTO restaurants
                                  (res_name, address, postcode, password, picture) VALUES (?, ?, ?, ?, ?)"""
        data_tuple = (res_name, address, postcode, password, img_path)
        cur.execute("SELECT EXISTS (SELECT * FROM restaurants WHERE res_name=?)", (res_name,))
        result = cur.fetchone()[0]
        if not bool(result):
            cur.execute(sqlite_insert_blob_query, data_tuple)
            response = True
        con.commit()
        con.close()
        return response

    #Credentials check for customer login
    def loginCustomerCheck(username, password):
        con = sql.connect('database.db')
        cur = con.cursor()
        cur.execute("SELECT EXISTS (SELECT 1 FROM customers WHERE username=? AND password=?)", (username, password))
        result = cur.fetchone()[0]
        con.close()
        return True if bool(result) == True else False
    
    #Credentials check for restaurant login
    def loginRestaurantCheck(res_name, password):
        con = sql.connect('database.db')
        cur = con.cursor()
        cur.execute("SELECT EXISTS (SELECT 1 FROM restaurants WHERE res_name=? AND password=?)", (res_name, password))
        result = cur.fetchone()[0]  
        con.close()
        return True if bool(result) == True else False  
    
    #Adding menu item to Restaurant Menu
    def addNewItem(res_name, name, ingredients, type, price):
        try:
            con = sql.connect('database.db')
            con.execute("PRAGMA foreign_keys = ON")
            cur = con.cursor() 
            cur.execute("INSERT INTO menu_items VALUES (?, ?, ?, ?, ?)", (res_name, name, ingredients, type, price))
            con.commit()
            con.close()
            return True
        except sql.Error as Err:
            print("SQLite Error: ", Err)
            return False

if __name__ == "__main__":
    DBfuncs.createTables()