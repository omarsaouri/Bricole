const locationToString = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );
    const data = await response.json();
    if (data && data.address) {
      const formattedAddress = `${data.address.city}, ${data.address.country}`;
      return formattedAddress;
    } else {
      console.error('Error retrieving address');
      return null;
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default locationToString;
