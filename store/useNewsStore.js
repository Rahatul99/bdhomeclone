import { defineStore } from "pinia";
import { ref } from "vue";

export const useNewsStore = defineStore("news", () => {
  const newsData = ref([]);
  const config = useRuntimeConfig();

  const fetchNews = async () => {
    try {
      const { data, error } = await useFetch(`${config.public.BASE_URL}/news`);
      if (data.value) {
        newsData.value = data.value;
      } else if (error.value) {
        console.error(error.value);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const addNews = async (newsItem) => {
    try {
      const { data, error } = await useFetch(
        `${config.public.BASE_URL}/addNew`,
        {
          method: "post",
          body: JSON.stringify(newsItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.value) {
        await fetchNews();
      } else if (error.value) {
        console.error("Error submitting form:", error.value);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const groupedNews = () => {
    return newsData.value.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const addCategory = (categoryName) => {
    newsData.value.push({ category: categoryName, news: [] });
    groupedNews();
  };

  const updatedNews = async (dataForm, id) => {
    try {
      const response = await fetch(
        `${config.public.BASE_URL}/updateNews/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(dataForm),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Error updating news:", data);
      } else {
        await fetchNews();
      }
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  const deletedNews = async (id) => {
    try {
      const response = await fetch(
        `${config.public.BASE_URL}/deleteNews/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Error deleting news", data);
      } else {
        await fetchNews();
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  return {
    fetchNews,
    addNews,
    groupedNews,
    newsData,
    addCategory,
    deletedNews,
    updatedNews,
  };
});
