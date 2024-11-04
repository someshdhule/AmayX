document.getElementById('dorkForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const domain = document.getElementById('domain').value;
    
    // Fetch Google dorks from JSON
    const response = await fetch('dorks.json');
    const dorks = await response.json();
    
    // Replace {domain} placeholder with user input
    const basicDorks = dorks.basic.map(dork => dork.replace(/{domain}/g, domain));
    const advancedDorks = dorks.advanced.map(dork => dork.replace(/{domain}/g, domain));

    // Display Basic Google Dorks
    const basicOutputElement = document.getElementById('basicDorksOutput');
    basicOutputElement.innerHTML = "";  // Clear previous output
    basicDorks.forEach(dork => {
        const dorkLine = document.createElement("div");
        dorkLine.textContent = dork;
        basicOutputElement.appendChild(dorkLine);
    });

    // Display Advanced Google Dorks
    const advancedOutputElement = document.getElementById('advancedDorksOutput');
    advancedOutputElement.innerHTML = "";  // Clear previous output
    advancedDorks.forEach(dork => {
        const dorkLine = document.createElement("div");
        dorkLine.textContent = dork;
        advancedOutputElement.appendChild(dorkLine);
    });
});
