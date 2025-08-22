#!/bin/bash
# This script builds the backend Docker container and deploys it to Cloud Run.

# Exit immediately if any command fails
set -e

echo "--- Building backend container ---"
gcloud builds submit backend --config backend/cloudbuild.yaml --project app-project-468120

echo "--- Deploying backend service to Cloud Run ---"
gcloud run deploy backend-service \
  --image gcr.io/app-project-468120/backend-service \
  --platform managed \
  --region us-central1 \
  --project app-project-468120

echo "--- Backend deployment script finished successfully! ---"
