const genBtnEl = document.querySelector('.gen-btn');
const clearBtnEl = document.querySelector('.clear-btn');

const navbar = document.querySelector('.scroll-nav');
const navGenbtn = document.querySelector('.nav-gen-btn');
const navClearbtn = document.querySelector('.nav-clear-btn')

const cardContainerEl = document.querySelector('.card-container');
;

const imgUrls = {
    education: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    recreational: 'https://images.unsplash.com/photo-1613921303357-f6da6d0a37ec?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    social: 'https://images.unsplash.com/photo-1556484687-30636164638b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    charity: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    cooking: 'https://images.unsplash.com/photo-1605433247501-698725862cea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    relaxation: 'https://images.unsplash.com/photo-1604830926588-b51d5ddeba7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    busywork: 'https://images.unsplash.com/photo-1485116480018-f1aa5e621bbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    music: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

const getRandomActivity = async () => {
    try {
        const res = await fetch("https://corsproxy.io/?https://bored-api.appbrewery.com/random");
        if (!res.ok) {
            throw new Error('Netowrk response error')
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

const createActivityCard = (data) => {
    const { activity, type, duration, kidFriendly } = data;

    const imgSrc = imgUrls[type] || 'https://images.unsplash.com/photo-1489367874814-f5d040621dd8?q=80&w=2046&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.innerHTML = `
            <div class="card-img">
                <img src="${imgSrc}"
                    alt="${type}">
            </div>
            <div class="card-info">
                <p class="activity-name">${activity}</p>
                <p class="activity-details">Type: ${type}</p>
                <p class="activity-details">Duration: ${duration}</p>
                <p class="activity-details">Kid Friendly: ${kidFriendly}</p>
            </div>
            <span class="close-btn">&times;</span>
    `;
    cardContainerEl.append(cardEl);

    // Add close button to each created card
    const closeButton = cardEl.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        cardEl.remove();
    });

    // Scroll into view when new card is created
    cardEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function deleteCardsAndRemoveNavbar() {
    cardContainerEl.innerHTML = '';
    // Allow the DOM time to update
    setTimeout(() => {
        if (cardContainerEl.children.length === 0) {
            navbar.style.display = 'none'
        }
    }, 10);
}

function createScrollListener() {
    const firstCard = document.querySelector('.card');
    window.addEventListener('scroll', () => {
        const firstCardTop = firstCard.getBoundingClientRect().top;
        if (firstCardTop <= 0) {
            navbar.style.display = 'flex';
        } else {
            navbar.style.display = 'none';
        }
    })
}

genBtnEl.addEventListener('click', async () => {
    const data = await getRandomActivity();
    createActivityCard(data);
    // Set up scroll listener for navbar
    if (cardContainerEl.children.length > 0) {
        createScrollListener();
    }
});

navGenbtn.addEventListener('click', async () => {
    const data = await getRandomActivity();
    createActivityCard(data);
    createScrollListener();
});

clearBtnEl.addEventListener('click', () => {
    deleteCardsAndRemoveNavbar();
})

navClearbtn.addEventListener('click', () => {
    deleteCardsAndRemoveNavbar();
})





