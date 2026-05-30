const OpenAI = require('openai');
const fs = require('fs');

async function test() {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const key = envContent.split('\n').find(l => l.startsWith('OPENAI_API_KEY=')).split('=')[1].trim();
  console.log('Key prefix:', key?.substring(0, 6));
  
  const client = new OpenAI({ 
    apiKey: key, 
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/' 
  });
  
  try {
    const response = await client.chat.completions.create({ 
      model: 'gemini-1.5-flash', 
      messages: [{ role: 'user', content: 'Say hello in JSON format like {"greeting": "hello"}' }], 
      temperature: 0.7, 
      max_tokens: 100 
    });
    console.log('SUCCESS (gemini-1.5-flash):', response.choices[0].message.content);
  } catch (e) {
    console.log('ERROR (gemini-1.5-flash):', e.status, e.message, JSON.stringify(e.error || {}).substring(0, 500));
  }

  try {
    const response = await client.chat.completions.create({ 
      model: 'gemini-2.5-flash', 
      messages: [{ role: 'user', content: 'Say hello in JSON format like {"greeting": "hello"}' }], 
      temperature: 0.7, 
      max_tokens: 100 
    });
    console.log('SUCCESS (gemini-2.5-flash):', response.choices[0].message.content);
  } catch (e) {
    console.log('ERROR (gemini-2.5-flash):', e.status, e.message, JSON.stringify(e.error || {}).substring(0, 500));
  }
}

test();
