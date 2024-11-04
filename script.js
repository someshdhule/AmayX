document.getElementById('domainForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const domain = document.getElementById('domain').value;
    generateCommands(domain);
});

function generateCommands(domain) {
    const commands = [
        { explanation: "Scan ports and services", command: `nmap -sV -Pn ${domain}` },
        { explanation: "Directory and file discovery", command: `dirb http://${domain}` },
        { explanation: "Fetch HTTP headers", command: `curl -I http://${domain}` },
        { explanation: "Recursively download website", command: `wget -r -l2 http://${domain}` },
        { explanation: "Brute-force directories", command: `gobuster dir -u http://${domain} -w /usr/share/wordlists/dirb/common.txt` },
        { explanation: "Web server vulnerability scan", command: `nikto -h ${domain}` },
        { explanation: "SQL injection and DBs", command: `sqlmap -u "http://${domain}/vuln?id=1" --dbs` },
        { explanation: "Domain registration info", command: `whois ${domain}` },
        { explanation: "Trace network path", command: `traceroute ${domain}` },
        { explanation: "Gather emails and subdomains", command: `theharvester -d ${domain} -b google` },
        { explanation: "High-speed port scanning", command: `masscan -p1-65535 ${domain}` },
        { explanation: "Directory brute-forcing", command: `feroxbuster -u http://${domain} -w /usr/share/wordlists/dirb/common.txt` },
        { explanation: "Check alive URLs", command: `httprobe < ${domain}` },
        { explanation: "Test login credentials", command: `curl -X POST http://${domain}/login -d "username=admin&password=admin"` },
        { explanation: "Test SSL/TLS config", command: `openssl s_client -connect ${domain}:443` },
        { explanation: "Launch exploits in Metasploit", command: `metasploit -e "use exploit/multi/http/your_exploit"` },
        { explanation: "Fuzzing for input validation", command: `fuzz -w /path/to/wordlist -u http://${domain}/path` },
        { explanation: "Search domain on Censys", command: `censys search "domain:${domain}"` },
        { explanation: "Discover subdomains", command: `sublist3r -d ${domain} -o subdomains.txt` },
        { explanation: "Enumerate subdomains", command: `amass enum -d ${domain}` },
        { explanation: "Find archived PDF files", command: `waybackurls ${domain} | grep -E ".pdf$"` },
        { explanation: "Check alive subdomains", command: `httpx -l subdomains.txt -o alive.txt` },
        { explanation: "Detailed vulnerability scan", command: `nikto -host http://${domain}` },
        { explanation: "Screenshot website", command: `aquatone -url http://${domain}` },
        { explanation: "Scan WordPress for vulnerabilities", command: `wpscan --url http://${domain} --enumerate vp` },
        { explanation: "Save Burp Suite report", command: `burpsuite -o ${domain}.xml` },
        { explanation: "Fuzz testing on path", command: `fuzz -w /path/to/wordlist -u http://${domain}/path` },
        { explanation: "Brute-force DNS subdomains", command: `gobuster dns -d ${domain} -w /usr/share/wordlists/dns.txt` },
        { explanation: "Perform DNS enumeration", command: `dnsrecon -d ${domain} -a` },
        { explanation: "Find archived PHP files", command: `waybackurls ${domain} | grep ".php"` },
        { explanation: "Retrieve robots.txt file", command: `curl -s http://${domain}/robots.txt` },
        { explanation: "Scan common web ports", command: `nmap -p 80,443 ${domain}` },
        { explanation: "Gather more subdomains", command: `theharvester -d ${domain} -b all` },
        { explanation: "Check alive subdomains", command: `httprobe < subdomains.txt` },
        { explanation: "Download website recursively", command: `wget -r -l2 --no-parent http://${domain}` },
        { explanation: "Dump database contents", command: `sqlmap -u "http://${domain}/page?id=1" --dump` },
        { explanation: "Discover subdomains", command: `subfinder -d ${domain} -o subdomains.txt` },
        { explanation: "Brute-force directories", command: `gobuster dir -u ${domain} -w /usr/share/wordlists/dirb/common.txt` },
        { explanation: "OS and service detection", command: `nmap -A -p 80,443 ${domain}` },
        { explanation: "Test API endpoints", command: `curl -X GET http://${domain}/api/v1/user` },
        { explanation: "Download without SSL check", command: `wget --no-check-certificate https://${domain}` },
        { explanation: "Human-readable whois info", command: `whois -H ${domain}` },
        { explanation: "Trace network hops", command: `traceroute -m 30 ${domain}` },
        { explanation: "Get HTTP status code", command: `curl -s -o /dev/null -w "%{http_code}" http://${domain}` },
        { explanation: "Fast directory brute-forcing", command: `feroxbuster -u http://${domain} -w /usr/share/wordlists/dirb/common.txt -t 20` },
        { explanation: "Stealth SYN scan", command: `nmap -sS -p- ${domain}` },
        { explanation: "Check for subdomain takeovers", command: `subjack -w subdomains.txt -t 100 -o results.txt -ssl` },
        { explanation: "Test login credentials", command: `curl -X POST http://${domain}/login -d "username=admin&password=admin"` },
        { explanation: "Fuzz specific URL", command: `fuzz -u http://${domain}/path -w /path/to/wordlist` },
        { explanation: "Dump all databases", command: `sqlmap -u "http://${domain}/path/to/vulnerable/page?id=1" --dump-all --batch` },
        { explanation: "Start simple HTTP server", command: `python3 -m http.server 8000` },
        { explanation: "Find vulnerabilities with Nuclei", command: `cat allurls.txt | grep -i "vuln" | nuclei -tags vuln` },
        { explanation: "Access secured API resource", command: `curl -s -X GET -H "Authorization: Bearer <token>" http://${domain}/api/v1/resource` },
        { explanation: "Discover and validate subdomains", command: `subfinder -d ${domain} -silent | httpx -silent` },
        { explanation: "Directory brute-forcing with threads", command: `gobuster dir -u ${domain} -w /usr/share/wordlists/dirb/common.txt -t 50` },
        { explanation: "Check HTTP/HTTPS availability", command: `httprobe -p http,https < subdomains.txt` },
        { explanation: "Gather intelligence data", command: `amass intel -d ${domain} -o intel.txt` },
        { explanation: "Simulate specific user agent", command: `curl -s -X GET -H "User-Agent: Mozilla/5.0" http://${domain}/` },
        { explanation: "Find archived JSON files", command: `waybackurls ${domain} | grep -E "\.json$"` },
        { explanation: "Retrieve sitemap for endpoints", command: `curl -s http://${domain}/sitemap.xml` },
        { explanation: "Enumerate HTTP services", command: `nmap -p 80,443,8080,8443 --script http-enum ${domain}` },
        { explanation: "Test SQL injection parameters", command: `sqlmap -u "http://${domain}/search?q=1' OR '1'='1" --risk=3 --level=5 --batch` },
        { explanation: "Directory brute-forcing with Ffuf", command: `ffuf -u http://${domain}/FUZZ -w /usr/share/wordlists/dirb/common.txt` },
        { explanation: "Save Nikto scan output", command: `nikto -h ${domain} -o nikto_report.html` },
        { explanation: "Directory brute-forcing with extensions", command: `gobuster dir -u ${domain} -w /usr/share/wordlists/dirb/common.txt -x php,html,txt` },
        { explanation: "Check health status of API", command: `curl -s -X GET http://${domain}/api/v1/health` }
    ];
    
    const commandList = document.getElementById('commandList');
    commandList.innerHTML = '';

    commands.forEach(item => {
        const commandDiv = document.createElement('div');
        commandDiv.classList.add('command');

        // Create a span for the explanation (tooltip)
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.innerText = item.explanation;

        // Create the command text
        const commandText = document.createElement('div');
        commandText.innerText = item.command;
        commandText.classList.add('command-text');
        commandText.appendChild(tooltip);
        
        // Append the command text and button to the command div
        commandDiv.appendChild(commandText);
        
        // Create a copy button
        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.innerText = 'Copy';
        copyButton.onclick = (event) => {
            copyToClipboard(item.command, commandText);
        };

        commandDiv.appendChild(copyButton);
        commandList.appendChild(commandDiv);
    });
}

function copyToClipboard(text, commandText) {
    navigator.clipboard.writeText(text).then(() => {
        // Create bubble element
        const bubble = document.createElement('div');
        bubble.classList.add('copy-bubble');
        bubble.innerText = 'Copied!';

        // Position the bubble above the command text
        const rect = commandText.getBoundingClientRect();
        bubble.style.left = `${rect.left + window.scrollX + rect.width / 2 - 50}px`; // Center bubble
        bubble.style.top = `${rect.top + window.scrollY - 30}px`; // Above the command
        
        document.body.appendChild(bubble);

        // Animate the bubble
        setTimeout(() => {
            bubble.classList.add('fade-out');
        }, 100);

        // Remove bubble after animation
        setTimeout(() => {
            bubble.remove();
        }, 500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
