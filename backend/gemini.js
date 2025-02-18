import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI)


export const Gemini=async (pdf)=>{
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });


const result = await model.generateContent([
    {
        inlineData: {
            data: Buffer.from(pdf).toString("base64"),
            mimeType: "application/pdf",
        },
    },
    'Read the question paper and provide me  object first with question ,options ,answers and explaination for each question craft response such that it should be consistennt and can be splitted easily on front end by question option answer and explaination so give naming convention according to it as different paper will have different pattern but i need similar response',
]);
return result.response.text();
}


