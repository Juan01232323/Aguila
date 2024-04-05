document.addEventListener('DOMContentLoaded', (event) => {
    const flipCards = document.querySelectorAll('.flip-card');
  
    flipCards.forEach(card => {
      card.addEventListener('click', function() {
        var innerCard = this.querySelector('.flip-card-inner');
        if (innerCard.style.transform == 'rotateY(180deg)') {
          innerCard.style.transform = 'rotateY(0deg)';
        } else {
          innerCard.style.transform = 'rotateY(180deg)';
        }
      });
    });
  });
  
