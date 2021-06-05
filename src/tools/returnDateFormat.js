export const returnDateFormat = (date) => {
    if(date!==undefined){
        let year = date.substring(0,4);
        let month = date.substring(5,7);
        let day = date.substring(8,10);

        return `${day}.${month}.${year}`
    }
};