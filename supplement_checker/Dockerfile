FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    SUPPLEMENT_DB_PATH=/data/profiles.db \
    SUPPLEMENT_OBJECT_ROOT=/data/objects \
    SUPPLEMENT_AUTH_DISABLED=false \
    SUPPLEMENT_OCR_MODE=demo

COPY supplement_checker/requirements.txt /app/supplement_checker/requirements.txt
RUN pip install --no-cache-dir -r /app/supplement_checker/requirements.txt

COPY supplement_checker /app/supplement_checker

RUN mkdir -p /data/objects

EXPOSE 8000

CMD ["uvicorn", "supplement_checker.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
