export const getUserById = (id: any) => {
	return `User ID: ${id}`;
}

export const isSignIn = (headers: any) => {
	const cookies = headers.get("cookie");

	if (headers !== null)
		return true;
	return false;
}