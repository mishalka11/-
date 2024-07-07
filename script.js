// Начальные значения
const maxEnergy = 1000;
let currentEnergy = maxEnergy;
let score = 0;

// Массив путей к изображениям монет
const coinImages = [
    'coin0.png', // 0-100 монет
    'coin1.png', // 101-200 монет
    'coin2.png', // 201-300 монет
    'coin3.png', // 301-400 монет
    'coin4.png', // 401-500 монет
    'coin5.png', // 501-600 монет
    'coin6.png', // 601-700 монет
    'coin7.png'  // 701-800 монет
];

// Массив названий уровней
const levelNames = [
    'Bronze', // 0-100 монет
    'Silver', // 101-200 монет
    'Gold', // 201-300 монет
    'Platinum', // 301-400 монет
    'Diamond', // 401-500 монет
    'Master', // 501-600 монет
    'Grandmaster', // 601-700 монет
    'Legend'  // 701-800 монет
];

// Функция обновления изображения монетки и уровня
function updateCoinImageAndLevel() {
    const index = Math.min(Math.floor(score / 100), coinImages.length - 1);
    document.getElementById('coin').style.backgroundImage = `url('${coinImages[index]}')`;
    document.getElementById('coinImage').src = coinImages[index];

    const levelIndex = Math.min(Math.floor(score / 100), levelNames.length - 1);
    document.getElementById('levelName').textContent = levelNames[levelIndex];

    const nextLevelScore = (levelIndex + 1) * 100;
    const progress = (score % 100) / 100 * 100;
    document.getElementById('progressLevel').style.width = progress + '%';
}

// Функция обновления отображения уровня энергии
function updateEnergyDisplay() {
    const energyLevel = (currentEnergy / maxEnergy) * 100;
    const energyLevelElement = document.getElementById('energyLevel');
    energyLevelElement.style.width = energyLevel + '%';
    document.getElementById('energyCount').textContent = `${currentEnergy}/${maxEnergy}`;

    if (energyLevel <= 30) {
        energyLevelElement.style.backgroundColor = '#f00'; // Красный цвет
    } else if (energyLevel <= 60) {
        energyLevelElement.style.backgroundColor = '#ff0'; // Желтый цвет
    } else {
        energyLevelElement.style.backgroundColor = '#0f0'; // Зеленый цвет
    }
}

// Инициализация отображения энергии при загрузке страницы
updateEnergyDisplay();

// Функция для создания и анимации текста
function showFloatingText() {
    const coinElement = document.getElementById('coin');
    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text');
    floatingText.textContent = '+1';

    coinElement.appendChild(floatingText);

    floatingText.addEventListener('animationend', () => {
        coinElement.removeChild(floatingText);
    });
}

// Обработчик нажатия на монетку
document.getElementById('coin').addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;

    showFloatingText();
    updateCoinImageAndLevel(); // Обновление монетки и уровня

    // Уменьшаем уровень энергии
    if (currentEnergy > 0) {
        currentEnergy--;
        updateEnergyDisplay();
    }
});

// Восстанавливаем 1 единицу энергии каждые 5 секунд
setInterval(() => {
    if (currentEnergy < maxEnergy) {
        currentEnergy++;
        updateEnergyDisplay();
    }
}, 5000);

// Обработчик нажатия на кнопку Boost
document.getElementById('boostButton').addEventListener('click', () => {
    currentEnergy = Math.min(currentEnergy + 100, maxEnergy);
    updateEnergyDisplay();
});

// Анимация нажатия на монетку
document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    const scoreDisplay = document.getElementById('score');

    coin.addEventListener('click', function() {
        // Увеличение счетчика на 1
        score++;
        scoreDisplay.textContent = score;

        // Добавление анимации нажатия
        coin.classList.add('pressed');
        setTimeout(function() {
            coin.classList.remove('pressed');
        }, 200); // время в миллисекундах, в течение которого будет происходить анимация
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const boostsButton = document.getElementById('boostButton');
    const boostsModal = document.getElementById('boostsModal');
    const boostsCloseButton = document.getElementById('boostsCloseButton');
    const buyButtons = document.querySelectorAll('.buy-button');

    boostsButton.addEventListener('click', () => {
        boostsModal.style.display = 'block';
    });

    boostsCloseButton.addEventListener('click', () => {
        boostsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === boostsModal) {
            boostsModal.style.display = 'none';
        }
    });

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const boostId = event.target.getAttribute('data-boost');
            buyBoost(boostId);
        });
    });

    function buyBoost(boostId) {
        // Replace this with your actual buying logic
        console.log(`Bought boost ${boostId}`);
        // Decrease coins, update UI, etc.
    }
});

