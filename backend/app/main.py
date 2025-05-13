from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.resume_customizer import customize_resume

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/customize")
async def customize(request: Request):
    body = await request.json()
    resume = body.get("resume")
    job_description = body.get("job_description")
    return await customize_resume(resume, job_description)
