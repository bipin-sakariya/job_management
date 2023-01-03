export const getDifferenceInDays = (date: Date) => {
    let diffrence = new Date(date).valueOf() - new Date().valueOf()
    const diffInMs = Math.abs(diffrence);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const seconds = Math.floor(diffInMs / 1000);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);

    if (days < 1) {
        if (hours < 1) {
            if (minutes < 1) {
                return `${seconds}s ago`;
            } else {
                return `${minutes}m ago`;
            }
        } else {
            return `${hours}h ago`;
        }
    } else {
        if (days > 31) {
            if (months > 12) {
                return `${years}y ago`;
            } else {
                return `${months}M ago`;
            }
        } else {
            return `${days}d ago`;
        }
    }
};