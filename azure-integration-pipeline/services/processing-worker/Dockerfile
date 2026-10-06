# Build from the pipeline root:
#   docker build -f services/processing-worker/Dockerfile .
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/app

WORKDIR /app

COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY services/processing-worker/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt \
    && chmod 755 /usr/local/bin/docker-entrypoint.sh \
    && addgroup --system app \
    && adduser --system --ingroup app app \
    && rm /tmp/requirements.txt

COPY shared /app/shared
COPY services/processing-worker/pipeline /app/pipeline
COPY services/processing-worker/worker.py /app/worker.py

USER app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["python", "worker.py"]
