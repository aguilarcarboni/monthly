# Use an official Python runtime as the base image
FROM python:3.9-slim

# Add labels for metadata
LABEL maintainer="aguilarcarboni"
LABEL name="software-engineering-project-api"
LABEL version="1.0"

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Copy the .env file into the container
COPY .env .

# Set environment variables from .env file
ENV $(cat .env | xargs)

# Expose the port the app runs on
EXPOSE ${API_PORT}

# Run the application with Gunicorn
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${API_PORT} run:laserfocus"]