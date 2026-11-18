// Класс описывает заявку на бронирование и хранит введённые гостем данные.
class BookingRequest {
  constructor({ name, phone, date, time, guests, occasion, comment }) {
    this.name = name;
    this.phone = phone;
    this.date = date;
    this.time = time;
    this.guests = Number(guests);
    this.occasion = occasion;
    this.comment = comment || 'Не указаны';
    this.createdAt = new Date();
  }

  // Форматированный вывод объекта в консоль.
  printToConsole() {
    console.group('Новая заявка на бронирование');
    console.log(`Гость: ${this.name}`);
    console.log(`Телефон: ${this.phone}`);
    console.log(`Дата и время: ${this.date} ${this.time}`);
    console.log(`Количество гостей: ${this.guests}`);
    console.log(`Повод: ${this.occasion}`);
    console.log(`Пожелания: ${this.comment}`);
    console.log(`Создана: ${this.createdAt.toLocaleString('ru-RU')}`);
    console.groupEnd();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#booking-form');
  const status = document.querySelector('#form-status');
  const dateInput = document.querySelector('#booking-date');
  dateInput.min = new Date().toISOString().slice(0, 10);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = Object.fromEntries(new FormData(form).entries());
    const request = new BookingRequest(values);
    request.printToConsole();

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Сервер вернул ошибку');
      status.textContent = 'Заявка успешно отправлена! Мы скоро свяжемся с вами.';
      form.reset();
    } catch (error) {
      status.textContent = 'Не удалось связаться с сервером. Проверьте, что сайт запущен командой npm start.';
      console.error('Ошибка отправки заявки:', error);
    }
  });
});
