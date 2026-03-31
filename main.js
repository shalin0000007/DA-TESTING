let count = 0;
const counter = document.getElementById('counter');

counter.addEventListener('click', () => {
    count++;
    counter.innerHTML = `Count is ${count}`;
    console.log(`Counter clicked! New count: ${count}`);
});
