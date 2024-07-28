import { blake2b } from '@noble/hashes/blake2b';


export type SeededRNG = { 
    curState: Uint8Array;
    seed: Uint8Array;
    Forward: () => Uint8Array;
    RandomBytes: (numBytes: number) => Uint8Array;
}

export function NewSeededRNG(seed: Uint8Array): SeededRNG {
    var startState: Uint8Array = blake2b(seed);
    var rng: SeededRNG = {
        curState: startState,
        seed: seed,
        Forward: function(this: SeededRNG): Uint8Array {
            const nextState = blake2b(this.curState);
            this.curState = nextState;
            return nextState;
        },
        RandomBytes(this: SeededRNG, numBytes: number): Uint8Array {
            var stream: Uint8Array = new Uint8Array(numBytes);
            var count: number = 0;
            while (count < numBytes) {
                const bytesLeft = count - numBytes;
                const d: Uint8Array = this.Forward();
                stream.set(d, count);
                count += d.length;
            }
            return stream.subarray(0, numBytes);
        }
    }
    return rng;
}

export function ReadRange(start: number, end: number, rng: SeededRNG): number {
    const size = end - start;
    const max = 2**32 - 1;

    const extra = (max%size+1)%size;
    const limit = max - extra;
    // Loop until we read something inside the limit
    while(true) {
        const res = (new Uint32Array( rng.RandomBytes(4) ))[0];
        if (res! <= limit) {
            return (res! % size) + start
        }
    }
}

// Standard FY Shuffle algorithm
export function Shuffle(numCards: number, rng: SeededRNG): number[] {
    let cards = new Array(numCards);
    for (let i = 0; i < numCards; i++) {
        cards[i] = i;
    }

	for (let i = numCards - 1; i > 0; i--) {
		let j = ReadRange(0, i, rng);
		let swap = cards[j]
		cards[j] = cards[i]
		cards[i] = swap
	}
	return cards
}
