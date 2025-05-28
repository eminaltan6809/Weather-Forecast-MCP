FROM python:3.11-slim

WORKDIR /app
COPY . .
RUN pip install requests fastapi uvicorn

CMD ["python", "server.py"]