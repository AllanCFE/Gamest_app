import styles from '@/styles/RetrievePassword.module.css';

import Image from "next/image";
import Link from "next/link";

import { getProviders, signIn, getSession } from "next-auth/react";


import GamestLogo from '../../public/Logos/Gamest.png'
import loginImage from '../../public/login_img.png'
import GoogleLogo from '../../public/SignIn/Google.png'

export default function RetrievePassword({ providers }: { providers: any }) {

  return (
    <>
      <div className={styles.holder}>
        
        <div className={styles.left}>
            <div className={styles.logo}>
                <Image src={GamestLogo} alt="logo" style={{objectFit: 'contain', maxHeight: '8vh'}}/>
            </div>

            <div className={styles.form}>
                <h1 className={styles.centralText}>Forgot my password <span style={{whiteSpace: 'nowrap'}}>:(</span></h1>
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

                <div className={styles.buttonarea}>
                    <button className={styles.loginButton} type="submit">Submit</button>
                </div>

                </form>
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
  const providers = await getProviders()
  const {req,res} = context
  const session = await getSession({req})

  if(session && res){
    res.writeHead(302, { Location: '/company/dashboard' })
    res.end()
  }
  return {
    props: { providers },
  }
}