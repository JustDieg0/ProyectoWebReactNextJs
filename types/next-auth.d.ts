import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    token: string
    user: {
      id: string
      nombres: string
      correo: string
      rol: string
    }
  }

  interface User {
    id: string
    nombres: string
    correo: string
    rol: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string
    id: string
    correo: string
    nombres: string
    rol: string
  }
}
