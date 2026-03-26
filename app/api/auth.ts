import { authClient } from "@/lib/authClient";

export async function login(body: {email: string, password: string} ) {
    try {
        const response = await authClient.signIn.email({
                email: body.email,
                password: body.password
        })     
        if(response.error) {
                throw new Error(response.error.message)
        }
    } catch (error) {
        console.error(error) 
    }

}

export async function register(body: {email: string, password: string, name: string}) {
    try {
        const response = await authClient.signUp.email({
                email: body.email,
                password: body.password,
                name: body.name
        })     
        if(response.error) {
                throw new Error(response.error.message)
        }
    } catch (error) {
        console.error(error) 
    }

}