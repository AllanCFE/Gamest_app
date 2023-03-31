import styles from '@/styles/SignIn.module.css';

import Image from "next/image";
import Link from "next/link";

import { useState } from 'react';
import { getProviders, signIn, getSession } from "next-auth/react";


import GamestLogo from '../../public/Logos/Gamest.png'
import loginImage from '../../public/login_img.png'
import GoogleLogo from '../../public/SignIn/Google.png'

export default function SignIn({ providers }: { providers: any }) {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const handleEmailSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o comportamento padrão de submeter o formulário
  
    signIn("credentials", { ...formValues});
  };
  

  return (
    <>
      <div className={styles.holder}>
        
        <div className={styles.left}>
            <div className={styles.logo}>
                <Image src={GamestLogo} alt="logo" style={{objectFit: 'contain', maxHeight: '8vh'}}/>
            </div>

            <div className={styles.form}>
              <form onSubmit={handleEmailSignIn}>

                <div className={styles.inputDiv}>
                  <label htmlFor="email" className={styles.label}>
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    className={styles.inputSpace}
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputDiv}>
                  <label htmlFor="password"  className={styles.label}>
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className={styles.inputSpace}
                    value={formValues.password}
                    onChange={handleInputChange}
                  />
                </div>
                <span className={styles.forgotPassword}>
                  <Link href="/retrievepassword">Esqueci minha senha</Link>
                </span>

                <div className={styles.buttonarea}>
                  <button className={styles.loginButton} type="submit">Login</button>
                </div>

                <span className={styles.registerArea}>
                  Ainda não tem uma conta? <Link href="/signup">Cadastre-se aqui</Link>
                </span>

              </form>
            </div>

            <div className={styles.orSpace}>
              <span className={styles.horizontalBar}>
              </span>

              <span>
                ou
              </span>

              <span className={styles.horizontalBar}>
                
              </span>
            </div>

            <div className={styles.providersMenu}>
              {Object.values(providers).map((provider:any) => (
                <div key={provider} className={provider.name != "credentials" ? styles.providerLoginButton : styles.hide} onClick={() => signIn(provider.id, {callBackUrl: "/signin"})}>
                  <span className={styles.providerLogo} key={provider} >
                      {provider.name != "Credentials" ? 
                        <Image src={GoogleLogo} alt="google_logo" style={{objectFit: 'contain', maxWidth: '30px', maxHeight: '30px'}} key={provider} /> : ""
                      }
                  </span>
                  <span key={provider} >
                    Log In with {provider.name}
                  </span>
                </div>
              ))}
            </div>

        </div>
            
        <div className={styles.right}>
            <Image src={loginImage} alt="login_image" style={{objectFit: 'fill', maxWidth: '100%', maxHeight: '100%'}}/>
        </div>

      </div>

      <div className={styles.boxShadow}></div>
    </>
  )
}

export async function getServerSideProps(context:any) {
  // Defines interface mySession with the user object
  interface mySession {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: string;
      isNewUser?: boolean;
    };
  }

  const providers = await getProviders()
  const {req,res} = context
  const session = await (getSession({req}) as Promise<mySession>)

  if(session && res){
    if(session.user.isNewUser){
      res.writeHead(302, { Location: `/signup?provider=google` })
      res.end()
    } else {
      res.writeHead(302, { Location: `/${session?.user?.role}/dashboard` })
      res.end()
    }
  }
  return {
    props: { providers },
  }
}