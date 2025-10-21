document.addEventListener("DOMContentLoaded", function () {
    // Дата свадьбы (25 октября 2025, 12:00 по местному времени)
    const weddingDate = new Date("2025-11-11T12:00:00");

    function updateTimer() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            document.querySelector(".time__body").innerHTML = "<p class='time__title'>Свято вже почалося! 🎉</p>";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        // const seconds = Math.floor((diff / 1000) % 60);

        const values = [days, hours, minutes];

        document.querySelectorAll(".time__item .time__big").forEach((el, index) => {
            el.textContent = String(values[index]).padStart(2, "0");
        });
    }

    // Запускаем сразу
    updateTimer();
    // Обновляем каждую секунду
    const timerInterval = setInterval(updateTimer, 1000);
});


  
document.getElementById("main-form").addEventListener("submit", function(e) {
  e.preventDefault(); // отменяем перезагрузку

  let form = this;
  let formData = new FormData(form);

  // === Валидация ===
  let name = formData.get("name").trim();
  let presence = formData.get("presence");

  if (!name) {
    alert("Будь ласка, введіть ім'я та прізвище.");
    return;
  }

  if (!presence) {
    alert("Будь ласка, виберіть варіант присутності.");
    return;
  }

  // === Отправка ===
  fetch(form.action, {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    if (result.okSend) {
      alert(result.okSend);
      form.reset();
    } else if (result.err) {
      alert(result.err);
    }
  })
  .catch(error => {
    alert("Сталася помилка при відправці.");
    console.error(error);
  });
});
 

