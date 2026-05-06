import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Importar o prisma.ts

export async function GET() {
  try {
    // 1. Cria um usuário de teste
    const newUser = await prisma.user.create({
      data: {
        email: 'lucas.guedes@gameconnection.com',
        username: 'Sukehiro',
        bio: 'Criador desse projeto aqui ó',
        discordTag: 'Sukehiro#0001',
        isToxic: false,
        favoriteGame: 'God of War serie'
      }
    });

    // 2. Se der certo, devolve os dados dele na tela
    return NextResponse.json({
      message: 'VITÓRIA! Banco de dados conectado com sucesso!',
      user: newUser
    });

  } catch (error) {
    // Se o usuário já existir ou der erro, busca todos os usuários para mostrar
    console.error("Erro ou usuário já existe:", error);
    const allUsers = await prisma.user.findMany();
    
    return NextResponse.json({
      message: 'Usuário provavelmente já criado. Aqui está a lista do banco:',
      users: allUsers
    });
  }
}