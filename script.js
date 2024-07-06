// Начальные значения
const maxEnergy = 1000;
let currentEnergy = maxEnergy;
let score = 0;

// Массив путей к изображениям монет
const coinImages = [
    'coin0.png',
    'coin1.png',
    'coin2.png',
    'coin3.png',
    'coin4.png',
    'coin5.png',
    'coin6.png',
    'coin7.png'
];

const levels = [
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Brilliant',
    'Diamond',
    'Master',
    'Legend'
];

// Функция обновления изображения монетки
function updateCoinImage() {
    const index = Math.min(Math.floor(score / 100), coinImages.length - 1);
    document.getElementById('coin').style.backgroundImage = `url('${coinImages[index]}')`;
    document.getElementById('coinImage').src = coinImages[index];
}

// Функция обновления отображения уровня энергии
function updateEnergyDisplay() {
    const energyLevel = (currentEnergy / maxEnergy) * 100;
    document.getElementById('energyLevel').style.width = energyLevel + '%';
    document.getElementById('energyCount').textContent = `${currentEnergy}/${maxEnergy}`;

    if (energyLevel <= 30) {
        document.getElementById('energyLevel').style.backgroundColor = '#f00'; // Красный цвет
    } else if (energyLevel <= 60) {
        document.getElementById('energyLevel').style.backgroundColor = '#ff0'; // Желтый цвет
    } else {
        document.getElementById('energyLevel').style.backgroundColor = '#0f0'; // Зеленый цвет
    }
}

// Функция обновления отображения уровня и прогресса
function updateLevelDisplay() {
    const levelIndex = Math.floor(score / 100);
    document.getElementById('levelName').textContent = levels[levelIndex] || levels[levels.length - 1];
    const progress = (score % 100) / 100 * 100;
    document.getElementById('progressLevel').style.width = progress + '%';
}

// Инициализация отображения энергии и уровня при загрузке страницы
updateEnergyDisplay();
updateLevelDisplay();

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
function handleCoinClick() {
    score++;
    document.getElementById('score').textContent = score;

    showFloatingText();
    updateCoinImage(); // Обновление монетки
    updateLevelDisplay(); // Обновление уровня и прогресса

    // Уменьшаем уровень энергии
    if (currentEnergy > 0) {
        currentEnergy--;
        updateEnergyDisplay();
    }

    // Вибрация при нажатии на монетку
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// Поддержка мультитач на монетке
document.getElementById('coin').addEventListener('touchstart', handleCoinClick);

// Восстанавливаем 1 единицу энергии каждые 5 секунд
setInterval(() => {
    if (currentEnergy < maxEnergy) {
        currentEnergy++;
        updateEnergyDisplay();
    }
}, 5000);

// Обработчик нажатия на кнопку Boost
document.getElementById('boostButton').addEventListener('click', () => {
    window.open('boost.html', '_blank');
});

// Анимация нажатия на монетку
document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    const scoreDisplay = document.getElementById('score');

    coin.addEventListener('click', function() {
        handleCoinClick();

        // Добавление анимации нажатия
        coin.classList.add('pressed');
        setTimeout(function() {
            coin.classList.remove('pressed');
        }, 200); // время в миллисекундах, в течение которого будет происходить анимация
    });
});
