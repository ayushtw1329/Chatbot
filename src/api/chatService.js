const chatService = {
  getChatbotResponse: async (message) => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        const value = handleRequest(message);
        resolve(value);
      }, 2000);
    });
  },
};

const handleRequest = (message) => {
  if (
    (message && message.toLowerCase() === "hi") ||
    message.toLowerCase() === "hello"
  )
    return "Welcome to Pizzazza!";
  if (message === "help") return "How may i help you";
  if (message === "Show me the dominos menu")
    return {
      type: "image",
      isMenu: true,
    };
  else return "Sorry! I didn't understand";
};

export const getTextFromAudio = async (audioString) => {
  try {
    const res = await fetch("https://inference.vakyansh.in/alt/asr/en", {
      method: "POST",
      cors: "no-cors",
      body: JSON.stringify({
        audio: [
          {
            audioContent: audioString,
          },
        ],
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const getBotResponse = async (text) => {
  try {
    const res = await fetch("http://localhost:3000/chatbot", {
      method: "POST",
      cors: "no-cors",
      body: JSON.stringify({
        message: 'hello',
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

export default chatService;
