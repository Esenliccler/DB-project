import sqlite3 as sql

class DBfuncs:
    #Creating every table that is needed in our website's backend
    def createTables():
        con = sql.connect('database.db')
        cur = con.cursor()
        cur.execute("""CREATE TABLE IF NOT EXISTS customers (
                surname TEXT,
                user_name TEXT,
                user_address TEXT,
                user_postcode INTEGER,
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