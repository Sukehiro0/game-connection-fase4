import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // 1. Recebe os dados
    const body = await request.json();
    const { email, username, password } = body;

    // 2. Validação básica
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: 'Faltam dados obrigatórios (email, usuário ou senha).' },
        { status: 400 }
      );
    }

    // 3. BLINDAGEM SÊNIOR: Verifica se o email OU o username já existem
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (userExists) {
      // Descobre quem foi o culpado do conflito para dar o feedback correto
      const conflito = userExists.email === email ? 'E-mail' : 'Nickname';
      return NextResponse.json(
        { message: `Este ${conflito} já está em uso por outro Player.` },
        { status: 409 }
      );
    }

    // 4. Segurança
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Salva no Supabase 
    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      }
    });

    // 6. Sucesso
    return NextResponse.json(
      { 
        message: 'Achievement Desbloqueado: Cadastro realizado com sucesso!', 
        user: { id: newUser.id, username: newUser.username, email: newUser.email }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { message: 'Erro interno no servidor. O Player 2 não pôde ser criado.' },
      { status: 500 }
    );
  }
}