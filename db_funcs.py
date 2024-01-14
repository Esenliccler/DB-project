import sqlite3 as sql

class DBfuncs:
    #Creating every table that is needed in our website's backend
    def createTables():
        con = sql.connect('database.db')
        cur = con.cursor()
        cur.execute("""CREATE TABLE IF NOT EXISTS customers (
                surname TEXT,
                name TEXT,
                address TEXT,
                postcode INTEGER,
                username TEXT,
                password TEXT                      
            )""")
        cur.execute("""CREATE TABLE IF NOT EXISTS restaurants (
                res_name TEXT,
                address TEXT,
                postcode INTEGER,
                password TEXT,
                picture BLOB                           
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

# if __name__ == "__main__":
#     DBfuncs.createTables()
#     DBfuncs.registerCustomer("Karadeniz2", "Umut", "ABC 6", 47055, "Umut_Karadeniz", 1234554321)
#     DBfuncs.registerCustomer("Karadeniz2", "Umut", "ABC 6", 47055, "Umut_Karadeniz1", 1234554321)
#     DBfuncs.registerCustomer("Karadeniz2", "Umut", "ABC 6", 47055, "Umut_Karadeniz", 1234554321)
#     DBfuncs.registerRestaurant("Al-Basha2", "ABC 7", 47055, 123321, "C:/Users/KaradenizNB/Desktop/abc.png")
#     DBfuncs.registerRestaurant("Al-Basha2", "ABC 7", 47055, 123321)
#     print(DBfuncs.loginCustomerCheck('Umut_Karadeniz', 1234554321))
#     print(DBfuncs.loginCustomerCheck('Umut_Karadeniz', 1234554322))
#     print(DBfuncs.loginCustomerCheck('Utku', 1234554321))
#     print(DBfuncs.loginRestaurantCheck('Al-Basha2', 123321))
#     print(DBfuncs.loginRestaurantCheck('Umut_Karadeniz', 1234554322))
#     print(DBfuncs.loginRestaurantCheck('Utku', 1234554321))