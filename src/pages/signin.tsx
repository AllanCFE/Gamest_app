import { getProviders, signIn, getSession } from "next-auth/react";
import styles from '@/styles/SignIn.module.css';
import Image from "next/image";
import { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import GamestLogo from '../../public/Logos/Gamest.png'
import loginImage from '../../public/login_img.png'
import GoogleLogo from '../../public/SignIn/Google.png'

/*
Object.values(providers).map((provider) => (
  <span className={styles.logo}>
    <Image src="/vercel.svg" alt={provider.id} width={90} height={20} onClick={() => signIn(provider.id)}/>
  </span>
))
*/
export default function SignIn({ providers }) {
  /*Object.values(providers).map((provider) => (
    console.log(provider)
  ))*/

  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div className={styles.holder}>
        
        <div className={styles.left}>
            <div className={styles.logo}>
                <Image src={GamestLogo} alt="logo" style={{objectFit: 'contain', maxWidth: '100%', maxHeight: '8vh'}}/>
            </div>

            <div className={styles.form}>
              <form>

                <div className={styles.inputDiv}>
                  <label htmlFor="email" className={styles.label}>
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    className={styles.inputSpace}
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
                  />
                </div>
                <span className={styles.forgotPassword}>
                  <a href="/retrievePassword">Esqueci minha senha</a>
                </span>

                <div className={styles.buttonarea}>
                  <button className={styles.loginButton} type="submit">Login</button>
                </div>

                <span className={styles.registerArea}>
                  Ainda não tem uma conta? <a href="/signup"> Cadastre-se aqui </a>
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
              {Object.values(providers).map((provider) => (
                <div className={provider.name != "Credentials" ? styles.providerLoginButton : styles.hide}>
                  <span className={styles.providerLogo}>
                      {provider.name != "Credentials" ? 
                        <Image src={GoogleLogo} alt="google_logo" style={{objectFit: 'contain', maxWidth: '30px', maxHeight: '30px'}}/> : ""
                      }
                  </span>
                  <span>
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

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const {req,res} = context
  const session = await getSession({req})

  if(session && res){
    res.writeHead(302, { Location: '/test' })
    res.end()
  }
  return {
    props: { providers },
  }
}