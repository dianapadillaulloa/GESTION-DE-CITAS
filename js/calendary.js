let calendar = document.querySelector('.calendar');

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};

generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days');
    let calendar_header_month = calendar.querySelector('#month');
    let calendar_header_year = calendar.querySelector('#year');

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendar_days.innerHTML = ''; // Limpiar los días previos

    let currDate = new Date();
    if (!month) month = currDate.getMonth();
    if (!year) year = currDate.getFullYear();

    let curr_month = `${month_names[month]}`;
    calendar_header_month.innerHTML = curr_month;
    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - first_day.getDay() + 1;
            day.innerHTML += `<span></span>
                              <span></span>
                              <span></span>
                              <span></span>`;
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date');
            }
        }
        calendar_days.appendChild(day);
    }
};

// Configuración inicial
let currDate = new Date();
let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

// Botones de navegación
document.querySelector('#prev-month').onclick = () => {
    if (curr_month.value === 0) {
        curr_month.value = 11; // Volver a diciembre
        curr_year.value--; // Cambiar al año anterior
    } else {
        curr_month.value--;
    }
    generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#next-month').onclick = () => {
    if (curr_month.value === 11) {
        curr_month.value = 0; // Avanzar a enero
        curr_year.value++; // Cambiar al siguiente año
    } else {
        curr_month.value++;
    }
    generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#prev-year').onclick = () => {
    curr_year.value--;
    generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#next-year').onclick = () => {
    curr_year.value++;
    generateCalendar(curr_month.value, curr_year.value);
};

// Modo oscuro
let dark_mode_toggle = document.querySelector('.dark-mode-switch');
dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light');
    document.querySelector('body').classList.toggle('dark');
};
