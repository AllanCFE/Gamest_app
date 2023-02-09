import { getProviders, signIn, getSession } from "next-auth/react"
import styles from '@/styles/Home.module.css'
import Image from "next/image"

export default function SignIn({ providers }) {
  Object.values(providers).map((provider) => (
    console.log(provider)
  ))
  return (
    <>
      <div className={styles.holder}>
        <div className={styles.left}>
          {
            Object.values(providers).map((provider) => (
              <span className={styles.logo}>
                <Image src="/vercel.svg" alt={provider.id} width={90} height={20} onClick={() => signIn(provider.id)}/>
              </span>
            ))
          }
        </div>
            
        <div className={styles.right}>
            <Image src="/login_img.png" alt="login_image" fill={true}/>
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