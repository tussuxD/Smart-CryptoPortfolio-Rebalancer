import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Define AI Model API endpoint
const AI_MODEL_URL = "http://localhost:5000"; // Base URL for AI model server

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { allocation, strategy } = body;

    if (!allocation || !strategy) {
      return NextResponse.json({ error: "Missing allocation or strategy" }, { status: 400 });
    }

    // Call the AI model API for rebalance
    const response = await axios.post(`${AI_MODEL_URL}/rebalance`, {
      allocation,
      strategy
    });

    // Return the AI model predictions and allocation recommendations
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("AI prediction error:", error);
    return NextResponse.json({ 
      error: "Failed to fetch AI predictions",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// GET endpoint to fetch AI-defined strategies
export async function GET() {
  try {
    // Call the AI model API to get strategies
    const response = await axios.get(`${AI_MODEL_URL}/strategies`);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to fetch AI strategies:", error);
    return NextResponse.json({
      error: "Failed to fetch AI-defined strategies",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
