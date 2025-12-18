import styles from './style.module.css'

type Props = {
    msg: string
    isLogin: boolean
}

export default function IconGroup(props: Props) {
    return(
        <div className={styles.externalServicesWrap} style={props.isLogin ? props.msg ? {marginTop: '24px'} : {marginTop: '48px'} : props.msg ? {marginTop: '16px'} : {marginTop: '40px'}}>
            <img src="google.svg" alt="Google" />
            <img src="apple.svg" alt="Google" />
            <img src="x.svg" alt="Google" />
        </div>
    )
}