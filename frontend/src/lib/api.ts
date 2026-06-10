
export const syncUser = async (name: string, email: string) => {

    const response = await fetch(`${process.env.API_URI}/users/sync`, {
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