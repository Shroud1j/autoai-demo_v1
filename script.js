async function generate() {
  const prompt = document.getElementById('prompt').value;
  const output = document.getElementById('output');

  if (!prompt.trim()) {
    output.innerText = 'Please type something first.';
    return;
  }

  output.innerText = 'Thinking...';

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    output.innerText = data.output || 'No response.';
  } catch (error) {
    output.innerText = 'Error: ' + error.message;
  }
}
