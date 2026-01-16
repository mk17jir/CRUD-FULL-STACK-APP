export const getProfileName = (name) => {
    if (!name) return '';

    const words = name.split(' ');
    let startWords = "";

    for (let index = 0; index < Math.min(words.length, 2); index++) {
     startWords += words[index][0];
    }

    return startWords;
}