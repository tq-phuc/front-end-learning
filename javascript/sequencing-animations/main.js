const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];
  
const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// alice1.animate(aliceTumbling, aliceTiming).finished
//   .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
//   .then(() => alice3.animate(aliceTumbling, aliceTiming).finished)
//   .catch(error => console.error(`Error animating Alices: ${error}`));

async function playAnimation() {
  try {
    for(let alice of [alice1, alice2, alice3]) {
      let animation = alice.animate(aliceTumbling, aliceTiming);
      await animation.finished;
    }
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

playAnimation();
