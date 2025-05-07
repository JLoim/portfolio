// JavaScript for dice roller, improv prompt generator, and icon hover descriptions

document.addEventListener('DOMContentLoaded', function() {
  // Dice Roller
  const rollBtn = document.getElementById('roll-btn');
  const diceType = document.getElementById('dice-type');
  const diceCount = document.getElementById('dice-count');
  const diceResult = document.getElementById('dice-result');
  const diceHistory = document.getElementById('dice-history');
  let history = [];

  rollBtn.addEventListener('click', function() {
    const type = parseInt(diceType.value);
    const count = parseInt(diceCount.value);
    let rolls = [];
    let sum = 0;
    for (let i = 0; i < count; i++) {
      let roll = Math.floor(Math.random() * type) + 1;
      rolls.push(roll);
      sum += roll;
    }
    diceResult.textContent = `Rolled: [${rolls.join(', ')}] (Total: ${sum})`;
    history.unshift(`d${type} x${count}: [${rolls.join(', ')}]`);
    if (history.length > 5) history.pop();
    diceHistory.textContent = 'History: ' + history.join(' | ');
  });

  // Improv Prompt Generator
  const promptBtn = document.getElementById('prompt-btn');
  const promptResult = document.getElementById('prompt-result');
  const improvPrompts = [
    "Two people stuck in an elevator.",
    "An alien trying to understand human emotions.",
    "A wizard who can't remember their spell.",
    "A detective who is afraid of the dark.",
    "A job interview with a twist.",
    "A time traveler in the wrong era.",
    "A bard who only speaks in song lyrics.",
    "A villain with a silly weakness.",
    "A hero with stage fright.",
    "A negotiation between pirates and robots."
  ];
  promptBtn.addEventListener('click', function() {
    const idx = Math.floor(Math.random() * improvPrompts.length);
    promptResult.textContent = improvPrompts[idx];
  });

  // Personal Pursuits Icon Hover
  const pursuitIcons = document.querySelectorAll('.pursuit-icon');
  const pursuitDesc = document.getElementById('pursuit-desc');
  pursuitIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      pursuitDesc.textContent = icon.getAttribute('data-desc');
    });
    icon.addEventListener('mouseleave', function() {
      pursuitDesc.textContent = '';
    });
  });
});
