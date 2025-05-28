from fastapi import FastAPI, HTTPException
from typing import Dict, Any
import uvicorn
from app import getliveTemp

app = FastAPI()

@app.get("/mcp")
async def list_tools() -> Dict[str, Any]:
    """List available tools in this MCP server."""
    return {
        "tools": [
            {
                "name": "get_temperature",
                "description": "Get the current temperature for a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "latitude": {
                            "type": "number",
                            "description": "Geographic latitude"
                        },
                        "longitude": {
                            "type": "number",
                            "description": "Geographic longitude"
                        }
                    },
                    "required": ["latitude", "longitude"]
                }
            }
        ]
    }

@app.post("/mcp")
async def execute_tool(request: Dict[str, Any]) -> Dict[str, Any]:
    """Execute the requested tool."""
    if request.get("tool") != "get_temperature":
        raise HTTPException(status_code=400, detail="Invalid tool name")
    
    params = request.get("parameters", {})
    latitude = params.get("latitude")
    longitude = params.get("longitude")
    
    if latitude is None or longitude is None:
        raise HTTPException(status_code=400, detail="Missing required parameters")
    
    try:
        result = getliveTemp(latitude, longitude)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)