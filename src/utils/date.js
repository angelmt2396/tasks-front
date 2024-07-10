export const formatDateToInput = (dateString) => {
    if(!dateString) return '';
    return dateString.slice(0, 16);
}

export const formatDateToView = (dateString) => {
    if(!dateString) return '';
    return `${dateString.slice(0, 16).replace(/-/g, '/').replace('T', ' ')}`;
}