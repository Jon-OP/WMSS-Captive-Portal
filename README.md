# WMSS-Captive-Portal
Developer: Jonathan O.
TP Number: TP060491

Basic Python-Flask server built for a Kali Linux Virtual Machine used to create a Captive Portal for Wireless Penetration Testing.
Part of my Wireless and Mobile Security (WMSS) module in Asia Pacific University.

Potential users may opt to modify the IP Address in apu-wifi.com/Index.js file.

!!!Function!!!
1. Creates a Captive Portal that prompts users to input their wifi password.
2. Wifi Password is saved on a .txt file.
3. Python-Flask server calls a shell process to call Aircrack-ng to perform Password Dictionary attack.
4. Check whether WPA2 Handshake password is correctly guessed.
5. Display response to user, which is either Pass/Fail.

!!!Warning!!!
1. This Flask app focus on listening for /submit API Calls, where it writes an output to a .txt file, which is then used to call Aircrack-ng to perform
a Password Dictionary Attack with 1 Key Only. So, there is no input validation on the password entered by the User/Victim.
2. Website design is fairly basic as this assignment focuses on potential ways of cracking WPA2-PSK password other than Password Dictionary/Brute-Force
Attacks

!!!How to use!!!
1. Access Kali Linux desktop
  > cd Desktop
2. Download this git repository
  > git clone https://github.com/Jon-OP/WMSS-Captive-Portal.git
3. Move the HTML/CSS/JS file to /var/www
  > mv WMSS-Captive-Portal/apu-wifi.com /var/www
4. Modify the index.js file to point towards your Kali Linux virtual machine.
  > mousepad /var/www/apu-wifi.com/index.js
  > Modify under the fetch() function
5. Access back to the WMSS-Captive-Portal directory
  > cd /home/$USER/Desktop/WMSS-Captive-Portal
6. Optional: Create a Python Virtual Environment to avoid installing Packages Globally (Its my preferences to have virtual environments for different
activities/assignments.)
  > mkdir venv
  > python -m venv venv/
  > source venv/bin/activate
7. Install the required libraries
  > pip install -r requirements.txt
8. Run the Flask Server
  > python -m flask --app ./app.py run --host 0.0.0.0 -p 5000
9. Configure your Apache Server
  > mousepad /etc/apache2/sites-enabled/apu-wifi.com.conf
```
<VirtualHost *:80>
	ServerAdmin admin@apu-wifi.com
	ServerName apu-wifi.com
	DocumentRoot /var/www/apu-wifi.com
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/acces.log combined
	<Directory /var/www/apu-wifi>
		Options Indexes FollowSymLinks
		AllowOverride All
		Require all granted
	</Directory>
</VirtualHost>
```
10. Enable the configuration file, disable the default Apache2 configuration, and enable the rewrite module
  > a2ensite apu-wifi.com.conf
  > a2dissite 000-default.conf
  > a2enmod rewrite
11. Restart Apache2 and check whether the Apache2 website works as intended
  > systemctl restart Apache2
  > Browser -> Access ```localhost``` in Browser URL Bar
12. You can then connect a Wireless Adapter, enable Monitoring Mode, enable the evil twin access point (I used Airbase-ng)
13. Run the dns-connectivity-setup.sh script to set the IPTable rules
14. Run dnsmasq with the dnsmasq.conf file.
15. Hopefully it works.
