import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def customize_resume(resume: str, job_description: str):
    
    instructions = "You are a professional resume editor."
    input_text = f"Job Description:\n{job_description}\n\nResume:\n{resume}"
    
    response = client.responses.create(
        model="gpt-4o",
        instructions=instructions,
        input=input_text
    )
    
    customized_resume = response.output_text.strip() 
    return customized_resume