const DAYS_PER_MS = 1000 * 60 * 60 * 24;

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const pad = (num) => {
  const str = num.toString();

  if (str.length < 2) {
    return "0" + str;
  }
  else {
    return str;
  }
};

const dateUtil = {
  daysLeft(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);

    return Math.floor((date.getTime() - today.getTime()) / DAYS_PER_MS);
  },
  pretty(dateStr) {
    const date = new Date(dateStr);
    const daysDiff = dateUtil.daysLeft(dateStr);
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    if (0 <= daysDiff && daysDiff < 1) {
      return `Hoy a las ${timeStr}`;
    }
    else if (0 <= daysDiff && daysDiff < 2) {
      return `Mañana a las ${timeStr}`;
    }
    else {
      return `${date.getDate()} ${MONTHS[date.getMonth()]} a las ${timeStr}`;
    }
  },
  date(dateStr) {
    return (new Date(dateStr)).getDate().toString();
  },
  month(dateStr) {
    return MONTHS[(new Date(dateStr)).getMonth()].substr(0, 3);
  }
};

export default dateUtil;
