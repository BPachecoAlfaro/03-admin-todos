import { auth } from "@/auth";
import { prisma } from "@/prisma";
import bcrypt from 'bcryptjs';

export const getUserSessionServer = async() => {
	const session = await auth();

	return session?.user;
}

export const signInEmailPassword = async( email: string | unknown , password: string | unknown) => {


	if ( typeof email !== 'string') return;
	if ( typeof password !== 'string') return;
	if ( !email || !password) return null;

	const user = await prisma.user.findUnique({where: {email}});

	if (!user) {
		createUser(email, password);
		return;
	}

	if ( !bcrypt.compareSync(password, user.password ?? '')) {
		return null;
	}

	return user;
	

}

const createUser = async(email: string, password: string) => {
	
	const user = await prisma.user.create({
		data: {
			email: email,
			password: bcrypt.hashSync(password),
			name: email.split('@')[0],
		}
	});

	return user;

}