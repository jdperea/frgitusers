const searchUsers = async (query) => {
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${query}`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        throw error;
    }
};

const getUser = async (query) => {
    try {
        const response = await fetch(`https://api.github.com/users/${query}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
  
export default {
searchUsers,
getUser,
};
