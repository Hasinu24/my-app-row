from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any

# Define the request body model
class VehicleInput(BaseModel):
    vehicle1: str
    vehicle2: str

# Create the FastAPI app
app = FastAPI()

@app.post("/api/v1/analyze-vehicles")
async def analyze_vehicles(vehicles: VehicleInput):
    """
    This endpoint mocks the response from the n8n workflow.
    It returns a hardcoded comparison and a list of fake vehicle ads.
    """
    # Mocked data mimicking the n8n workflow output
    mock_response = {
        "expert_comparison": {
            "title": f"Expert Comparison: {vehicles.vehicle1} vs. {vehicles.vehicle2}",
            "summary": f"This is a detailed comparison between the {vehicles.vehicle1} and the {vehicles.vehicle2}, covering aspects like performance, fuel economy, and reliability.",
            "vehicles": [
                {
                    "name": vehicles.vehicle1,
                    "specs": {
                        "Engine": "1.5L 4-Cylinder",
                        "Horsepower": "106 hp",
                        "Fuel Economy": "32 MPG combined",
                        "Common Issues": "Minor electrical problems reported."
                    },
                    "pros": ["Excellent fuel economy", "High reliability ratings"],
                    "cons": ["Slow acceleration", "Basic interior"]
                },
                {
                    "name": vehicles.vehicle2,
                    "specs": {
                        "Engine": "1.2L 4-Cylinder Turbo",
                        "Horsepower": "110 hp",
                        "Fuel Economy": "30 MPG combined",
                        "Common Issues": "Turbo lag reported at low RPMs."
                    },
                    "pros": ["Peppy turbocharged engine", "Stylish design"],
                    "cons": ["Slightly lower fuel economy", "Less cargo space"]
                }
            ]
        },
        "local_market_ads": [
            {
                "vehicle_name": vehicles.vehicle1,
                "title": f"{vehicles.vehicle1} 2018 for Sale",
                "price": "LKR 6,500,000",
                "year": 2018,
                "mileage_km": 45000,
                "location": "Colombo",
                "url": "https://ikman.lk/en/ad/toyota-vitz-2018-for-sale-colombo"
            },
            {
                "vehicle_name": vehicles.vehicle1,
                "title": f"Used {vehicles.vehicle1} 2019",
                "price": "LKR 7,200,000",
                "year": 2019,
                "mileage_km": 30000,
                "location": "Kandy",
                "url": "https://riyasewana.com/buy/toyota-vitz-for-sale-kandy-123"
            },
            {
                "vehicle_name": vehicles.vehicle2,
                "title": f"{vehicles.vehicle2} 2020 Model",
                "price": "LKR 7,800,000",
                "year": 2020,
                "mileage_km": 25000,
                "location": "Galle",
                "url": "https://patpat.lk/vehicle/suzuki-swift-2020-galle"
            }
        ]
    }
    return mock_response
