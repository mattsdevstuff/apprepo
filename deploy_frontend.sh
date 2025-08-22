#!/bin/bash
# This script builds the frontend Docker container and deploys it to Cloud Run.

# Exit immediately if any command fails
set -e

echo "--- Building frontend container ---"
gcloud builds submit --config cloudbuild.yaml

echo "--- Deploying frontend service to Cloud Run ---"
gcloud run deploy frontend-service \
  --image gcr.io/app-project-468120/frontend-service \
  --platform managed \
  --region us-central1 \
  --project app-project-468120

echo "--- Frontend deployment script finished successfully! ---"
