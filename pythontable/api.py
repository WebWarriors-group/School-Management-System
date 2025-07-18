# from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import List
# from timetable_generator import generate_timetable

# app = FastAPI()

# class Assignment(BaseModel):
#     class_: str
#     subject: str
#     teacher: str
#     periods_per_week: int

# class RequestData(BaseModel):
#     classes: List[str]
#     assignments: List[Assignment]
#     days: List[str]
#     periods_per_day: int

# @app.post("/timetable")
# def create_timetable(data: RequestData):
#     return generate_timetable(data)


from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from timetable_generator import generate_timetable  # import your function

app = FastAPI()

class Assignment(BaseModel):
    class_: str
    subject: str
    teacher: str
    periods_per_week: int

class RequestData(BaseModel):
    classes: List[str]
    assignments: List[Assignment]
    days: List[str]
    periods_per_day: int

@app.post("/timetable")
def create_timetable(data: RequestData):
    # Call your external generate_timetable function passing the parsed data
    return generate_timetable(data)
