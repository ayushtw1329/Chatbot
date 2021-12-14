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
    const res = await fetch("https://cbot1-api.herokuapp.com/chatbot", {
      method: "POST",
      cors: "no-cors",
      body: JSON.stringify({
        message: text,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    let finalResponse = { value: null, label: "" };
    if (data && data.message && data.message.response && data.message.type) {
      finalResponse.value =
        data.message.type.stringValue === "LIST"
          ? data.message.response.listValue.values
          : data.message.response.stringValue;
      finalResponse.label = data.message.type.stringValue;
    } else {
      finalResponse.label = "TEXT";
      finalResponse.value =
        "I am Sorry! Won't be able to find result related to current query.Our developers working to improve me";
    }
    return finalResponse;
  } catch (error) {
    console.log("Error", error);
  }
};

export const getTextToSpeech = async (text) => {
  try {
    const res = await fetch(
      `https://cbot1-api.herokuapp.com/hear?lang=en&text=${text}`,
      {
        method: "GET",
        cors: "no-cors",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.arrayBuffer();
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export default chatService;
