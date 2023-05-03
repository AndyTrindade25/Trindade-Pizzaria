import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string,
    email: string,
    password: string;
}

//Criar usuário
class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        //Verificação
        if(!name) {
            throw new Error("Usuário inválido!")
        }

        //Verificação de emails
        if(!email) {
            throw new Error("E-mail inválido!")
        }

        const emailJaExiste = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(emailJaExiste){
            throw new Error("Já existe um mesmo email cadastrado!")
        }

        //Encriptografando a senha do usuário
        const passwordHash = await hash(password, 8)

        //Criando o usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            //O que retornar
            select: {
                id: true,
                name: true,
                email: true,
                
            }
        })

        return {ok: "Usuário cadastrado com sucesso!"};
    }
}

export { CreateUserService }