
//! Use the property (creationTime)
export const sortByTimeRecentToOldest = (video_array) => {
    const sortedArray = video_array.sort(
        (objA, objB) => objB.creationTime - objA.creationTime,
    );
    return sortedArray

}

export const sortByTimeOldestToRecent = (video_array) => {
    const sortedArray = video_array.sort(
        (objA, objB) => objA.creationTime - objB.creationTime,
    );
    return sortedArray
}

export const sortByLengthShortToLong = (video_array) => {
    const sortedArray = video_array.sort(
        (objA, objB) => objA.duration - objB.duration,
    );
    return sortedArray
}

export const sortByLengthLongToShort = (video_array) => {
    const sortedArray = video_array.sort(
        (objA, objB) => objB.duration - objA.duration,
    );
    return sortedArray
}

