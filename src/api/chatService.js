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
  if (message === "Show me the dominoes menu")
    return {
      type: "image",
      isMenu: true,
    };
  else return "Sorry! I didn't understand";
};

export default chatService;
