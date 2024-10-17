import axios from 'axios';

export const getCategoriesData = async () => {
  try {
    // Fetch data from each category endpoint
    const [ 
      jobsResponse,
      furnitureResponse,
      sportsResponse,
      realEstateResponse,
      healthBeautyResponse,
    ] = await Promise.all([
      axios.get("https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/jobs/"),
      axios.get("http://localhost:8000/api/furniture/"),
      axios.get(
        "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/sports/"
      ),
      axios.get("http://localhost:8000/api/realestate/"),
      axios.get("http://localhost:8000/api/healthbeauty/"),
    ]);

    return {
      jobs: jobsResponse.data,
      furniture: furnitureResponse.data,
      sports: sportsResponse.data,
      realEstate: realEstateResponse.data,
      healthBeauty: healthBeautyResponse.data
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      jobs: [],
      furniture: [],
      sports: [],
      realEstate: [],
      healthBeauty: []
    };
  }
};
