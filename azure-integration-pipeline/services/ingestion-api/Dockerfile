# Build from the pipeline root:
#   docker build -f services/ingestion-api/Dockerfile .
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/app

WORKDIR /app

COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY services/ingestion-api/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt \
    && chmod 755 /usr/local/bin/docker-entrypoint.sh \
    && addgroup --system app \
    && adduser --system --ingroup app app \
    && rm /tmp/requirements.txt

COPY shared /app/shared
COPY services/ingestion-api/app /app/app
COPY services/ingestion-api/main.py /app/main.py

USER app
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health')"

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--no-access-log"]
