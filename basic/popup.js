document.getElementById('clickMe').addEventListener('click', () => {
    if (document.getElementById('message').textContent === 'Hello (Created using Vanilla JS)!') {
        document.getElementById('message').textContent = 'Hello World!';
    } else {
        document.getElementById('message').textContent = 'Hello (Created using Vanilla JS)!';
    }
});
