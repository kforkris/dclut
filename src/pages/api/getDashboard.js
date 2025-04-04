// pages/api/dashboard.js
import { blinkitDashboardData } from "@/utils/constant";
import CubejsApi from "@cubejs-client/core";

// Cube.js API Configuration
const CUBEJS_API_URL =
  "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1/load";
const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiNDkiLCJleHAiOjE3NDM0OTYyMTIsImlzcyI6ImN1YmVjbG91ZCJ9.luqfkt0CQW_B01j5oAvl_8hicbFzPmyLXfvEZYJbej4";

const cubejsApi = CubejsApi(CUBEJS_TOKEN, { apiUrl: CUBEJS_API_URL });

export default async function handler(req, res) {
  try {
    // Deep clone to avoid mutating original
    const dashboardData = JSON.parse(JSON.stringify(blinkitDashboardData));

    for (let card of dashboardData.cards) {
      if (card.active && Array.isArray(card.query) && card.query.length > 0) {
        card.data = [];

        for (let query of card.query) {
          try {
            const updatedQuery = { ...query };

            if (
              updatedQuery?.timeDimensions &&
              updatedQuery.timeDimensions.length > 0
            ) {
              updatedQuery.timeDimensions[0].dateRange = [
                "2025-02-01",
                "2025-02-28",
              ];
            }

            const response = await cubejsApi.load(updatedQuery);
            card.data.push(response.rawData());
          } catch (queryErr) {
            console.error(
              `❌ Error fetching query for ${card.title}:`,
              queryErr
            );
            card.data.push([]); // Fallback
          }
        }
      }
    }

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("❌ Cube.js fetch error:", error.message);
    console.error("Full error object:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
