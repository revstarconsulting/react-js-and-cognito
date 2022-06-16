import moment from 'moment'


export const formatFullDate = ( preDate) => {
    return moment(preDate).format('ll [at] h:mm a');
}

export const formatDate = ( preDate) => {
    return moment(preDate).format('LL');
}

export const formatEspecial = ( preDate,format) => {
    return moment(preDate).format(format);
}