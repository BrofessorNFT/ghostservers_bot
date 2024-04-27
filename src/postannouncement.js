import fetch from 'node-fetch';
/**

 * 
 * @param {object} messageData An object containing data from a Discord message.
 * @returns {Promise<object>} The response from API.
 */
export default async function sendMessageData(messageData) {
  const API_URL = process.env.API_URL; 
  const API_KEY = process.env.GG_API_KEY; 

  if (!API_URL || !API_KEY) {
    throw new Error("API URL or API key is not set in environment variables.");
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  };
  const body = JSON.stringify({
    author: messageData.author,
    content: messageData.content,

    guildId: messageData.guildId,
    guildName: messageData.guildName,
    channelName: messageData.channelName,
    timestamp: messageData.timestamp,
  });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Data successfully sent to calvaria API:', responseData);
    return { status: 200, message: "Data successfully sent to your API", data: responseData };
  } catch (error) {
    console.error('Failed to send data to your API:', error);
    return { status: 500, message: "Failed to send data to your API", data: null };
  }
}