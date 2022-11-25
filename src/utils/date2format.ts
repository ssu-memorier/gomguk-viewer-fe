/**
 * date를 받아 YYYY-MM-DD 혹은 HH:DD 형식으로 변환하는 함수
 * 만약 년도,월,일이 일치한다면 HH:DD 형식으로 date를 변환해 반환하고
 * 그렇지 않다면 YYYY-MM-DD 형식으로 date를 변환해 반환한다
 *
 * @param date
 * @returns YYYY-MM-DD or HH:DD
 */
export default function date2format(date: Date) {
    if (isToday(date)) {
        const HH = `00${date.getHours()}`.slice(-2);
        const DD = `00${date.getMinutes()}`.slice(-2);
        return `${HH}:${DD}`;
    }

    const YYYY = `${date.getFullYear()}`;
    const MM = `00${date.getMonth() + 1}`.slice(-2);
    const DD = `00${date.getDate()}`.slice(-2);

    return `${YYYY}-${MM}-${DD}`;
}

function isToday(date: Date) {
    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
}
