
export const MOVIES_DATA = [];

export const dataLoading = { state : 'Loading' };

export function updateData(moviesData) {
    const dataLength = MOVIES_DATA.length;

    for (let i = 0; i < dataLength; i += 1) {
        MOVIES_DATA.pop();
    };

    for (let i = 0; i < moviesData.length; i += 1) {
        MOVIES_DATA.push(moviesData[i]);
    }
}