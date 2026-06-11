// login and signin
export const syncUser = async (name: string, email: string) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sync`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email
        }),
    });

    return response.json();

}


// get users
export const getUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

// get tasks
export const getTasks = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
};

// create new task
export const createTask = async (taskData: {
  title: string;
  description: string;
  created_by: string;
  assigned_to: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return response.json();
};

// mark task as completed
export async function completeTask(
  taskId: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/complete`,
    {
      method: "PATCH",
    }
  );

  return response.json();
}