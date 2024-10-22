import axios from 'axios';

export const getCategoriesData = async () => {
  try {
    // Fetch data from each category endpoint
    const [
      jobsResponse,
      furnitureResponse,
      sportsResponse,
      electronicsResponse,
      automotivesResponse,
      othersResponse,
    ] = await Promise.all([
      axios.get("https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/jobs/"),
      axios.get(
        "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/furniture/"
      ),
      axios.get(
        "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/sports/"
      ),
      axios.get(
        "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/electronics/"
      ),
      axios.get(
        "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/automotives/"
      ),
      axios.get(
        "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/others/"
      ),
    ]);

    return {
      jobs: jobsResponse.data,
      furniture: furnitureResponse.data,
      sports: sportsResponse.data,
      electronics: electronicsResponse.data,
      automotives: automotivesResponse.data,
      others: othersResponse.data,
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      jobs: [],
      furniture: [],
      sports: [],
      electronics: [],
      automotives: [],
      others: [],
    };
  }
};
