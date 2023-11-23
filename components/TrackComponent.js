"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const TrackComponent = () => {
  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8888/tracks");
        setTrackData(response.data);
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {trackData && (
        <div>
            {JSON.stringify(trackData)}
        </div>
      )}
    </div>
  );
};

export default TrackComponent;
