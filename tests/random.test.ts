import { NewSeededRNG, SeededRNG, ReadRange, Shuffle } from "../src/app/random";

describe('Crypto Tests', () => {
    test('Select 3 Cards', () => {
        var Cards: Array<String> = Array<String>(72);
        for (var i = 0; i < Cards.length; i++) {
            Cards[i] = `Card ${i}`;
        }

        const seed = new Uint8Array(32);
        seed.set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
            13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, 26, 27, 28, 29, 30, 31], 0);
        let rng = NewSeededRNG(seed);

        const selections = Shuffle(Cards.length, rng);

        expect(selections.length).toBe(Cards.length);
        
        for (var i = 0; i < Cards.length; i++) {
            const s: number = selections[i]!;
            console.log(`${i}: ${Cards[s]}`);
        }
    })
});