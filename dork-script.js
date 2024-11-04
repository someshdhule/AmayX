document.getElementById('dorkDomainForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const domain = document.getElementById('dorkDomain').value;
    generateDorks(domain);
});

function generateDorks(domain) {
    const dorks = [
        `site:${domain} inurl:admin`,
        `site:${domain} filetype:pdf`,
        `site:${domain} intitle:index.of`,
        `site:${domain} intext:"login"`,
        `site:${domain} "welcome" "to"`,
        `site:${domain} inurl:wp-content`,
        `site:${domain} "error in"`,
        `site:${domain} "powered by"`,
        `site:${domain} "index of /"`,
        `site:${domain} "configuration" "file"`,
        `site:${domain} inurl:"/php?id="`,
        `site:${domain} "db_name"`,
        `site:${domain} "404 Not Found"`,
        `site:${domain} "Not Found" inurl:admin`,
        `site:${domain} inurl:wp-admin`,
        `site:${domain} filetype:log`,
        `site:${domain} "MySQL error"`,
        `site:${domain} inurl:robots.txt`,
        `site:${domain} "Error Document"`,
        `site:${domain} "SQL syntax"`,
        `site:${domain} "You have an error in your SQL syntax"`,
        `site:${domain} "An error occurred while processing this directive"`,
        `site:${domain} "username" "password"`,
        `site:${domain} inurl:wp-login.php`,
        `site:${domain} inurl:"/search?q="`,
        `site:${domain} inurl:"/products/"`,
        `site:${domain} inurl:"/view/"`,
        `site:${domain} "database user"`,
        `site:${domain} "UNION SELECT"`,
        `site:${domain} "public_html"`,
        `site:${domain} inurl:php?file=`,
        `site:${domain} "Forbidden"`,
        `site:${domain} inurl:"/admin/"`,
        `site:${domain} "powered by WordPress"`,
        `site:${domain} "Joomla"`,
        `site:${domain} inurl:"/index.php?id="`,
        `site:${domain} "MongoDB"`,
        `site:${domain} "PHP Warning"`,
        `site:${domain} inurl:"/login"`,
        `site:${domain} inurl:"/checkout"`,
        `site:${domain} "error in your SQL syntax"`,
        `site:${domain} "SSL certificate error"`,
        `site:${domain} "Directory Listing"`,
        `site:${domain} "home" inurl:login`,
        `site:${domain} "powered by Django"`,
        `site:${domain} "root"`,
        `site:${domain} inurl:"/backup/"`,
        `site:${domain} "Microsoft Access"`,
        `site:${domain} "internal server error"`,
        `site:${domain} "502 Bad Gateway"`,
        `site:${domain} "500 Internal Server Error"`,
        `site:${domain} inurl:"/admin/backup/"`,
        `site:${domain} "View Database"`,
        `site:${domain} "Cannot connect to the database"`,
        `site:${domain} "file not found"`,
        `site:${domain} "Warning: mysqli"`,
        `site:${domain} "Vulnerability"`,
        `site:${domain} "File not found"`,
        `site:${domain} "No such file or directory"`
    ];
    const dorkList = document.getElementById('dorkList');
    dorkList.innerHTML = '';

    dorks.forEach(dork => {
        const dorkDiv = document.createElement('div');
        dorkDiv.classList.add('dork');
        dorkDiv.innerHTML = `<span>${dork}</span> <button class="copy-button" onclick="copyToClipboard('${dork}')">Copy</button>`;
        dorkList.appendChild(dorkDiv);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target;
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 1000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
