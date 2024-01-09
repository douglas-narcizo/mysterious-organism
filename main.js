// An utility randomize function to simplify syntax
const randomize = num => Math.floor(Math.random() * num);

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[randomize(4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// P. aequor Factory function
const pAequorFactory = (specimenNum, dna) => {
  const specimen = {
    specimenNum,
    dna,
    mutate() {
      // Mutate one random base at the chain
      const mutatingDnaBase = randomize(15);
      let newBase = returnRandBase();
      while (newBase === this.dna[mutatingDnaBase]) {
        newBase = returnRandBase();
      }
      this.dna[mutatingDnaBase] = newBase;
      return this.dna;
    },
    compareDNA(otherPAequor) {
      let intersection = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          intersection++;
        }        
      }
      const percentage = intersection / this.dna.length * 100;  
      console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${Math.round(percentage)}% DNA in common`);
    },
    willLikelySurvive() {
      const survivalBases = this.dna.filter((currentBase) => 
        (currentBase === 'C' || currentBase === 'G')
      );
      return survivalBases.length / this.dna.length >= 0.6;
    },
    complementStrand() {
      return this.dna.map((base) => {
        switch (base) {
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'C':
            return 'G';
          case 'G':
            return 'C';
          default:
            break;
        }
      });
    }
  }; 
  return specimen;
};

// Generate 30 specimens of P. aequor
const pAequor = [];
for (let i = 0; i < 30; i++) {
  pAequor.push(pAequorFactory(i, mockUpStrand()));
};

// Test log the 30 generated specimens
console.log('Testing GENERATED SPECIMENS…\n============================');
for (let i = 0; i < 30; i++) {
  console.log(`#${pAequor[i].specimenNum} - ${pAequor[i].dna.join('')} - will ${pAequor[i].willLikelySurvive() ? '' : 'NOT '}likely survive`);
};

const testPAequor = randomize(30);

// Test DNA comparison
let testPAequor2 = randomize(30);
while (testPAequor2 === testPAequor) {
  testPAequor2 = randomize(30);
}; // selects a DIFFERENT specimen to compare
console.log('\nTesting DNA COMPARISON…\n=======================');
console.log(`#${pAequor[testPAequor].specimenNum} - dna: ${pAequor[testPAequor].dna.join('')}`);
console.log(`#${pAequor[testPAequor2].specimenNum} - dna: ${pAequor[testPAequor2].dna.join('')}`);
pAequor[testPAequor].compareDNA(pAequor[testPAequor2]);

// Test mutation method
console.log('\nTesting MUTATION…\n=================');
console.log('Before:');
console.log(`#${pAequor[testPAequor].specimenNum} - dna: ${pAequor[testPAequor].dna.join('')}`);
pAequor[testPAequor].mutate();
console.log('After:');
console.log(`#${pAequor[testPAequor].specimenNum} - dna: ${pAequor[testPAequor].dna.join('')}`);

// Test complement strand
console.log('\nTesting COMPLEMENT STRAND…\n==========================');
console.log(`Specimen #${pAequor[testPAequor].specimenNum} - dna: ${pAequor[testPAequor].dna.join('')}`);
console.log(`Complements with : ${pAequor[testPAequor].complementStrand().join('')}`);