import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// import dotenv from "dotenv";
// dotenv.config();

const template =
  "What would be a good company name for a company that makes {product}?";
const promptTemplate = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

const chain = new LLMChain({
  llm: model,
  prompt: promptTemplate,
});

export const handler = async (event, context) => {
  try {
    const res = await chain.call({
      // product: "colorful socks",
      product: event.input,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    };
  }
};
