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
  if (message === "hi") return "Welcome to dominoes!";
  if (message === "help") return "How may i help you";
  else return "dominoes:- " + message;
};

export default chatService;
