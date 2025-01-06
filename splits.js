document.addEventListener('DOMContentLoaded', () => {
  const splitButtons = document.querySelectorAll('.split-button');
  
  splitButtons.forEach(button => {
      button.addEventListener('click', () => {
          const splitType = button.getAttribute('data-split');
          const content = document.getElementById(`${splitType}-content`);
          
          // Close all other split contents
          document.querySelectorAll('.split-content').forEach(el => {
              if (el !== content) {
                  el.classList.remove('active');
              }
          });
          
          // Toggle current split content
          content.classList.toggle('active');
          
          // Add animation class
          if (content.classList.contains('active')) {
              content.style.animation = 'none';
              content.offsetHeight; // Trigger reflow
              content.style.animation = 'slideDown 0.3s ease-out';
          }
      });
  });
});