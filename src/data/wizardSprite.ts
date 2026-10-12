// Undertale-style pixel wizard (Maria). Each character in the grid is one pixel, see `wizardPalette`.
// Used by the character sheet portrait and the skills runner game.
export const wizardSprite = [
    '.........KK.........',
    '........KCCK........',
    '........KCCK........',
    '.......KCCCCK.......',
    '.......KCYCCK.......',
    '......KCCCCCCK......',
    '......KCCCCYCK......',
    '.....KCCCCCCCCK.....',
    '....KYYYYYYYYYYK....',
    '..KKCCCCCCCCCCCCKK..',
    '.KCCCCCCCCCCCCCCCCK.',
    '..KKKHHHHHHHHHHKKK..',
    '...KHHSSSSSSSSHHK...',
    '...KHSSSSSSSSSSHK...',
    '...KHSSESSSSESSHK...',
    '...KHSPSSSSSSPSHK...',
    '...KHSSMSSSSMSSHK...',
    '...KHSSSMMMMSSSHK...',
    '...KHKSSSSSSSSKHK...',
    '...KHHKKSSSSKKHHK...',
    '....KKCCCSSCCCKK....',
    '...KCCCCCYYCCCCCK...',
    '..KCCCCCCCCCCCCCCK..',
    '.KCCcCCCCCCCCCCcCCK.',
    '.KCCcCCCCCCCCCCcCCK.',
    'KCCCcCCCCCCCCCCcCCCK',
    'KCCCcCCCCCCCCCCcCCCK',
];

export const wizardPalette: Record<string, string> = {
    K: '#2b2620', // outline
    C: '#5b4a9e', // hat & cloak
    c: '#3f3373', // cloak folds
    Y: '#e6c35c', // stars, hat band & clasp
    H: '#e8c27a', // hair
    S: '#f6d3b8', // skin
    P: '#f2a6a0', // cheeks
    E: '#2b2620', // eyes
    M: '#2b2620', // smile
};
