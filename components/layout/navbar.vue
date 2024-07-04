<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-center items-center">
      <div class="space-x-4">
        <NuxtLink to="/" class="text-gray-300 hover:text-white">Home</NuxtLink>
        <button
          class="text-gray-300 hover:text-white"
          @click="toggleAddNewModal()"
        >
          Add new
        </button>
        <button
          class="text-gray-300 hover:text-white"
          @click="toggleManageModal()"
        >
          Manage
        </button>
      </div>
    </div>
  </nav>
  <!-- Add New Modal -->
  <div
    id="small-modal"
    tabindex="-1"
    :class="{ hidden: !showAddNewModal }"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-700 bg-opacity-75"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Add New Link
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleAddNewModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="category"
                class="block text-gray-700 mb-2 flex justify-between"
              >
                Select a category
                <button
                  type="button"
                  @click="openCreateCategoryModal"
                  class="text-blue-500"
                >
                  Create a category
                </button>
              </label>
              <div class="relative">
                <select
                  id="category"
                  v-model="form.category"
                  class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                >
                  <option
                    v-for="(news, category) in allNews"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12l-6-6h12z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label for="link" class="block text-gray-700">Link</label>
              <input
                type="url"
                id="link"
                v-model="form.link"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Create Category Modal -->
  <div
    id="category-modal"
    tabindex="-1"
    :class="{ hidden: !showCreateCategoryModal }"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-700 bg-opacity-75 transition-opacity duration-700 ease-in-out"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Create Category
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleCreateCategoryModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <form @submit.prevent="createCategory">
            <div class="mb-4">
              <label for="categoryName" class="block text-gray-700"
                >Category Name</label
              >
              <input
                type="text"
                id="categoryName"
                v-model="newCategory.name"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Manage modal -->

  <!-- Manage modal -->
  <div
    tabindex="-1"
    :class="{ hidden: !showManageModal }"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-700 bg-opacity-75 transition-opacity duration-700 ease-in-out"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Manage News
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleManageModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4 max-hight-custom overflow-y-auto">
          <div v-for="(newsItems, category) in allNews" :key="category">
            <h4 class="text-lg font-medium text-gray-900">{{ category }}</h4>
            <table class="min-w-full bg-white">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b">Name</th>
                  <th class="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(item, index) in newsItems" :key="index">
                  <td class="py-2 px-4 border-b">{{ item.name }}</td>
                  <td class="py-2 px-4 border-b">
                    <button
                      @click="openEditModal(item)"
                      class="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteNews(item._id)"
                      class="text-red-500 hover:underline ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div
    tabindex="-1"
    :class="{ hidden: !showEditModal }"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-700 bg-opacity-75"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Edit News
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleEditModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <form @submit.prevent="updateNews()">
            <div class="mb-4">
              <label for="editName" class="block text-gray-700">Name</label>
              <input
                type="text"
                id="editName"
                v-model="editForm.name"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label for="editCategory" class="block text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                id="editCategory"
                v-model="editForm.category"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label for="editLink" class="block text-gray-700">Link</label>
              <input
                type="url"
                id="editLink"
                v-model="editForm.link"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useNewsStore } from "~/store/useNewsStore";

const showAddNewModal = ref(false);
const showManageModal = ref(false);
const showEditModal = ref(false);
const showCreateCategoryModal = ref(false);
const form = ref({
  name: "",
  category: "",
  link: "",
});
const newCategory = ref({
  name: "",
});
const editForm = ref({
  id: null,
  name: "",
  category: "",
  link: "",
});
const toggleAddNewModal = () => {
  showAddNewModal.value = !showAddNewModal.value;
};
const toggleManageModal = () => {
  showManageModal.value = !showManageModal.value;
};
const toggleCreateCategoryModal = () => {
  showCreateCategoryModal.value = !showCreateCategoryModal.value;
};
const openCreateCategoryModal = () => {
  toggleAddNewModal(); // Close the add new modal
  toggleCreateCategoryModal(); // Open the create category modal
};

const openEditModal = (item) => {
  editForm.value.id = item._id;
  editForm.value.name = item.name;
  editForm.value.category = item.category;
  editForm.value.link = item.link;
  toggleEditModal();
};

const toggleEditModal = () => {
  showEditModal.value = !showEditModal.value;
};

const {
  fetchNews,
  groupedNews,
  addNews,
  addCategory,
  updatedNews,
  deletedNews,
} = useNewsStore();

// onMounted(() => {
//   fetchNews();
// });

const allNews = computed(() => groupedNews());
watch(fetchNews(), () => {
  allNews.value = groupedNews();
});

const submitForm = () => {
  toggleAddNewModal();
  addNews({
    name: form.value.name,
    category: form.value.category,
    link: form.value.link,
  });
  form.value.name = "";
  form.value.category = "";
  form.value.link = "";
};

const createCategory = () => {
  addCategory(newCategory.value.name);
  newCategory.value.name = "";
  toggleCreateCategoryModal();
  toggleAddNewModal();
};
const updateNews = async () => {
  toggleEditModal();
  const dataForm = {
    name: editForm.value.name,
    category: editForm.value.category,
    link: editForm.value.link,
  };
  await updatedNews(dataForm, editForm.value.id);
};

const deleteNews = async (id) => {
  deletedNews(id);
};
</script>

<style scoped>
.max-hight-custom {
  max-height: 30rem;
}
</style>
