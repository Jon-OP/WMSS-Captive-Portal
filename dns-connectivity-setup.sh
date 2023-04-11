#! /bin/bash

echo Hello Universe

# Enable Interface
ifconfig at0 up
ifconfig at0 10.0.0.1 netmask 255.255.255.0

# Add Route
route add -net 10.0.0.0 netmask 255.255.255.0 gw 10.0.0.1

# IPTable Route to forward from Evil Twin Interface to Physical Interface
iptables -A FORWARD -i at0 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o at0 -j ACCEPT
iptables -t nat -A POSTROUTING -j MASQUERADE

# Enable IP Forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward