export const formatDateToInput = (dateString) => {
    if(!dateString) return '';
    return dateString.slice(0, 16);
}