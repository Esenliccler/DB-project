from flask import Flask, request, Response, render_template, jsonify
from db_funcs import *

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the Flask App!" # will be replaced by home page 

@app.route('/register', methods=['POST'])
def register_Customer():
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

@app.route('/login')
def login():
    return "Welcome to the login page!"  # will be replaced by login page 

if __name__ == '__main__':
    app.run(debug=True)