document.addEventListener('DOMContentLoaded', () => {
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay() - 1];


  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const dayContainers = document.querySelectorAll('.day-container');

      data.forEach(item => {
        const container = Array.from(dayContainers).find(
          dayContainer => dayContainer.getAttribute('data-day') === item.day
        );
        if (container) {
          const dailyGraphic = container.querySelector('.daily-graphic');
          dailyGraphic.style.height = `${item.amount * 2}px`;

          const amountDisplay = container.querySelector('.amount-display');
          amountDisplay.innerText = `$${item.amount.toFixed(2)}`;

          if (item.day === currentDay) {
            console.log('Current day found:', item.day);
            dailyGraphic.classList.add('current-day');
          }

          dailyGraphic.addEventListener('mouseenter', () => {
            amountDisplay.classList.remove('inactive');
          });

          dailyGraphic.addEventListener('mouseleave', () => {
            amountDisplay.classList.add('inactive');
          });
        }
      });
    })
  .catch(error => {
    console.error('Error al cargar el archivo JSON', error);
  });
});



