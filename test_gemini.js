const OpenAI = require('openai');
const fs = require('fs');

async function test() {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const keyLine = envContent.split('\n').find(l => l.startsWith('OPENAI_API_KEY='));
  const key = keyLine ? keyLine.split('=')[1].trim() : '';
  console.log('Key prefix:', key.substring(0, 4));
  
  const client = new OpenAI({ 
    apiKey: key, 
    baseURL: 'https://api.groq.com/openai/v1' 
  });
  
  try {
    const response = await client.chat.completions.create({ 
      model: 'llama-3.3-70b-versatile', 
      messages: [{ role: 'user', content: 'Say hello in JSON format like {"greeting": "hello"}' }], 
      temperature: 0.7, 
      max_tokens: 100,
      response_format: { type: "json_object" }
    });
    console.log('SUCCESS:', response.choices[0].message.content);
  } catch (e) {
    console.log('ERROR:', e.status, e.message, JSON.stringify(e.error || {}).substring(0, 500));
  }
}

test();
