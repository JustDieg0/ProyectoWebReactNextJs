import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        correo: { label: 'Email', type: 'email' },
        contrasena: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.correo || !credentials.contrasena) return null

        try {
          const res = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              correo: credentials.correo,
              contrasena: credentials.contrasena,
            }),
          })

          const data = await res.json()

          if (!res.ok || !data.token || !data.user) {
            throw new Error(data.message || 'Autenticación fallida')
          }

          return {
            id: data.user.id,
            nombres: data.user.name,
            correo: data.user.email,
            rol: data.user.rol,
            token: data.token,
          }
        } catch (error) {
          console.error('Error en authorize:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token
        token.id = user.id
        token.correo = user.correo
        token.nombres = user.nombres
        token.rol = user.rol
      }
      return token
    },
    async session({ session, token }) {
      session.token = token.token as string
      session.user = {
        id: token.id as string,
        nombres: token.nombres as string,
        correo: token.correo as string,
        rol: token.rol as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
