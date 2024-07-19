
const FetchData = async (dataOf, setState) => {
  try {
    const response = await fetch(`http://localhost:3000/${dataOf}`);
    if (!response.ok) {
      throw new Error("the host aint responding to my request");
    }
    const data = await response.json();

    setState(data);
  } catch (error) {
    console.log(error);
  }
  return 
};

export default FetchData;