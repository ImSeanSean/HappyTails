document.addEventListener('DOMContentLoaded', function() {
    fetch('paws.json')
        .then(response => response.json())
        .then(data => {
            const adoptionList = document.getElementById('adoption-list');
            data.forEach(pet => {
                const card = document.createElement('a');
                card.href = `/adopt/paw/paw.html?pet=${encodeURIComponent(pet.name)}`;
                card.className = 'adoption-card';
                card.id = encodeURIComponent(pet.name); 

                card.innerHTML = `
                    <div class="img">
                        <img src="${pet.image}" alt="${pet.name}">
                    </div>
                    <div class="details">
                        <div class="name">
                            <h2>${pet.name}</h2>
                        </div>
                        <div class="middle">
                            <p><b>Age:</b> ${pet.age}</p>
                            <p><b>Sex:</b> ${pet.sex}</p>
                        </div>
                        <div class="description">
                            <p>${pet.description}</p>
                        </div>
                    </div>
                `;

                adoptionList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching adoption data:', error));
});
