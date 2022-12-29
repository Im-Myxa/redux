import httpServise from "./http.service";

const todosEndpoint = "todos/";
const todosServise = {
  fetch: async () => {
    const { data } = await httpServise.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
    return data;
  },
  create: async (taskId) => {
    const { data } = await httpServise.post(todosEndpoint, {
      id: taskId,
      title: "Тут новая задача",
      completed: false,
    });
    return data;
  },
};

export default todosServise;
