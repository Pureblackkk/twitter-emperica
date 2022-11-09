export function formatAMPM(date: Date) {
    return date.toLocaleString(['en-US'], { hour: 'numeric', hour12: true });
}

export function formatDateTime(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString(['en-US'], { month: 'short' });
    const year = date.getFullYear();
    return {
        day,
        month,
        year,
    }
}

export function formatDateFromNow(date: Date) {
    const dateDistance = (Number(new Date()) - Number(date)) / 1000;
    const minutes = Math.floor(dateDistance / 60);
    if (minutes < 60) {
        return `${minutes}min`;
    }
    const hours = Math.floor(dateDistance / 3600);
    if (hours < 24) {
        return `${hours}h`;
    }

    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    const { day, month } = formatDateTime(date);

    if (year === currentYear) {
        return `${month} ${day}`;
    } else {
        return `${month} ${day}, ${year}`;
    }

    
    
}



