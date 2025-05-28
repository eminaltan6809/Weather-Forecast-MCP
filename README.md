# Weather Forecast MCP

A Model Context Protocol (MCP) server that provides weather forecast data using the Open-Meteo API.

## Tools

### get_temperature

Gets the current temperature for a given location.

Parameters:
- `latitude`: Geographic latitude (number)
- `longitude`: Geographic longitude (number)

Returns:
- `temperature`: Current temperature in Celsius
- `error`: Error message if the request fails

## Deployment

This MCP server is configured for deployment on Smithery.ai. The deployment uses:
- Python 3.11
- FastAPI for the HTTP server
- Open-Meteo API for weather data

## Configuration

No additional configuration is required as this MCP server uses the free Open-Meteo API.

## Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python server.py
```

The server will be available at http://localhost:8000 