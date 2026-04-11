import 'dotenv/config';

const getOpenAiAPIResponse = async (message) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }] //fixed
            }
          ]
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.candidates && data.candidates.length > 0
        ? data.candidates[0].content.parts[0].text
        : "No response";

    return reply; // return instead of res.send

  } catch (err) {
    console.error(err);
    throw err; // throw instead of res.status
  }
};

export default getOpenAiAPIResponse;