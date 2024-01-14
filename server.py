from flask import Flask, request, Response, render_template, jsonify
from db_funcs import *

app = Flask(__name__)

#function/route to register customer
@app.route('/register_customer', methods=['POST'])
def registerCustomer():
    data = request.get_json()

    surname = data.get('surname')
    name = data.get('name')
    address = data.get('address')
    postcode = data.get('postcode')
    username = data.get('username')
    password = data.get('password')

    if DBfuncs.registerCustomer(surname, name, address, postcode, username, password) is not False:
        response = {'status': 'success', 'message': 'Registration successful. Redirecting to login page.'}
    else:
        response = {'status': 'error', 'message': 'Username already exists. Please choose a different username.'}
    return jsonify(response)

#function/route to restaurant customer
@app.route('/register_restaurant', methods=['GET', 'POST'])
def register_Customer():
    data = request.get_json()

    res_name = data.get('res_name')
    address = data.get('address')
    postcode = data.get('postcode')
    password = data.get('password')

    if DBfuncs.registerRestaurant(res_name, address, postcode, password) is not False:
        response = {'status': 'success', 'message': 'Registration successful. Redirecting to login page.'}
    else:
        response = {'status': 'error', 'message': 'Restaurant name already exists. Please choose a different username.'}
    return jsonify(response)

@app.route('/login', methods = ['GET', 'POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if DBfuncs.loginCustomerCheck(username, password) is not False:
        response = {'status': 'success', 'message': 'Logged in as Customer. Redirecting to restaurant list.'}
    elif DBfuncs.loginRestaurantCheck(username, password) is not False:
        response = {'status': 'success', 'message': 'Logged in as Restaurant. Redirecting to editor page.'}
    else:
        response = {'status': 'error', 'message': 'Check your username and password.'}
    return jsonify(response) 

if __name__ == '__main__':
    app.run(debug=True)