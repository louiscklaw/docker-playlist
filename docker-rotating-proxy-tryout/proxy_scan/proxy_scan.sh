#!/bin/bash

install_service() {
# give a service name as arg, install it if not present.

	service="$1" 	 # service name argument
	path="$(which "$1")" # get path

	if [ -z "$path" ]; then

		# if not in path try to install
		dnf install -y "$service"

		# if the service being installed is tor configure it
		# run the configuration function
		if [ "$service" = 'tor' ]; then
			config_tor
		fi
	fi
}


get_proxies() {
# site scrape two sites containing lists
# of proxies, parse and return the IP and port

# after some testing, it looks like the proxy sites
# in the get_proxies() function might not work

	# assign urls to variables
	free_url='https://free-proxy-list.net/'
	us_url='https://us-proxy.org/'

	urls="$free_url $us_url" # list of urls
	curl='curl -s' 		 # curl set to silent

	# iterate through URLs, pull the code into memory
	# remove everything that isnt an IP and port
	for url in $urls; do
		$curl "$url"|		      # put sites into heap
			sed 's/<tr>/\n/g'|    # put table elements into new lines
			grep class=\'hm\'|    # throw away everything other than hm class
			grep anonymous|       # throw away everthing not labeled anon
			tr "<>" " "|          # remove gt lt symbols
			awk {'print $2, $5'}| # get IP and Port columns from text stream
			grep -v ' 80'|        # remove http proxies
			sed 's/^/socks4 /g'   # line up for proxychains config
	done|sort|uniq		              # remove duplicates
}


config_proxychains() {
# build confguration file for proxy chains

	local this_conf='/etc/proxychains.conf' # proxy chains config file
	echo "" > ${this_conf} 		        # clear config file

	# these two config properties are interesting if not using tor
	#echo "random_chain" 		 >> ${this_conf} # proxy selection
	#echo "chain_len=3"              >> ${this_conf} # proxy chain len

	echo "static_chain" 		 >> ${this_conf} # proxy selection
	echo "proxy_dns"		 >> ${this_conf} # send DNS via proxy
	echo "tcp_read_time_out 15000"   >> ${this_conf} # session w/o data timeout
	echo "tcp_connect_time_out 8000" >> ${this_conf} # connection attempt timeout
	echo "[ProxyList]"               >> ${this_conf} # specify proxy list section
	echo "socks4 127.0.0.1 9050"     >> ${this_conf} # TOR

	#get_proxies|grep -v ' 80'       >> ${this_conf} # use scraped proxies
}


config_tor() {
# build configuration file for tor
	local this_conf='/etc/tor/torrc'                 # tor config file

	echo ""                           > ${this_conf} # clear config file
	echo "ExitPolicy reject *:*"     >> ${this_conf} # NOT AN EXIT NODE
	echo "BridgeRelay 0"             >> ${this_conf} # NOT A BRIDGE
	echo "PublishServerDescriptor 0" >> ${this_conf} # DO NOT PUBLISH

	service tor restart # restart tor service to pick up new config
	echo "tor is establishing routes, wait 1.5 minutes"
	sleep 90 	    # give tor time to find and establish routes
}


check_tor() {
# check if tor is in the process stack, configure and start if not

	proc=$(ps aux|grep torrc|grep -v grep)
	# if tor is not running configure and start it
	if [ -z "$proc" ]; then
		echo "tor is not running"
		config_tor
	fi
}


check_root() {
# check if user running this is root
# if not give instructions and exit
	if ((${EUID:-0} || "$(id -u)")); then
		echo "This script must be run as root: sudo $0"
		exit 1
	fi
}


main() {
# flow control

	# proxychains config, tor config, and apt require uid0
	check_root

	# list of required software
	services='nmap proxychains curl tor'

	# iterate through software list
	# and install if needed
	for service in $services; do
		install_service "$service"
	done

	# start tor if not running
	check_tor

	# configure proxy chains
	config_proxychains
}


main
