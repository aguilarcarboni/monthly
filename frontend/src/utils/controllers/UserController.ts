import { User } from "@/lib/types/User";
import { accessAPI } from "@/utils/api";

export class UserController {

    static async createUser(user: User) {
        console.log("Creating user:", user);
        const response = await accessAPI('/user_service/create', 'POST', {'user': user});
        console.log("Response from server:", response);
        if (response['status'] !== 'success') {
            throw new Error('Failed to create user');
        }
        return response;
    }

    static async deleteUser(userID: string) {
        const response = await accessAPI('/user_service/deleteUser', 'POST', { 'userID': userID });
        if (response['status'] !== 'success') {
            throw new Error('Failed to delete user');
        }
        return response;
    }

    static async findAll() {
        const response = await accessAPI('/user_service/findAll', 'GET');
        return response;
    }

}
