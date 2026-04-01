// app.js

// Fetch business data from config.json
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        // Display services
        const servicesContainer = document.getElementById('services');
        data.services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service');
            serviceElement.innerHTML = `<h3>${service.name}</h3><p>${service.description}</p>`;
            servicesContainer.appendChild(serviceElement);
        });

        // Display team members
        const teamContainer = document.getElementById('team');
        data.team.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.classList.add('team-member');
            memberElement.innerHTML = `<h3>${member.name}</h3><p>${member.role}</p>`;
            teamContainer.appendChild(memberElement);
        });

        // Display opening hours
        const hoursContainer = document.getElementById('opening-hours');
        const hoursElement = document.createElement('div');
        hoursElement.innerHTML = '<h3>Opening Hours</h3>' + data.opening_hours.map(hour => `<p>${hour.day}: ${hour.hours}</p>`).join('');
        hoursContainer.appendChild(hoursElement);
    })
    .catch(error => console.error('Error loading business data:', error));