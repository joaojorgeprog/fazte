import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    pages: {
        signIn: "/"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              code : { label: "email", type: "email" },
              code : { label: "password", type: "password" }
            },
            async authorize(credentials) {
                console.log("credentials")
                console.log(credentials)
                if(!credentials) {
                    return null;
                }

              const res = await fetch("http://localhost:4000/admin/user/login", {
                method: "POST",
                body: JSON.stringify({
                  "email": credentials.email,
                  "password": credentials.password
              }),
                headers: { "Content-Type": "application/json" },
              });

              console.log("teste")
      
              // Verifique se a resposta é válida
              if (!res.ok) {
                console.error("Erro na autenticação:", res.statusText);
                return null; // Retorna null se houver erro
              }
      
              const user = await res.json();
              if (user && user.accessToken  && user.refreshToken && user.expires_in) {
                console.log("session qui")
                console.log(user)
                //localStorage.setItem('token', user.accessToken);
                return user; // Retorna o usuário se a autenticação for bem-sucedida
              }
              return null; // Retorna null se não houver usuário
             
            },
          })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // Expiração da sessão em 60 segundos * 15 minutos
    },
    jwt: {
        maxAge: 60 * 60, // Expiração do token em 60 segundos * 15 minutos
    },
    callbacks: {
        async jwt({ token, user }) {
            // Armazena os tokens no primeiro login
            console.log("callback funtion")
            //console.log(user)
            //console.log(token)
            if (user) {
                token.role = user.role;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                //token.accessTokenExpires = Date.now() + user.expires_in * 1000; // Supondo que `expires_in` seja em segundos
            }

            return token;

           
        },
        async session({ session, token }) {
            //console.log("session funciton")
            //console.log(token)
            //console.log(session.user)
            session.accessToken = token.accessToken;
            session.error = token.error;
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            session.user.email = token.email;
            session.user.role = token.role;
            //console.log(session)
            return session;
        },
    }
}