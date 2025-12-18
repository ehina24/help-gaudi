import styles from './style.module.css'

type Props = {
    msg: string
}

export default function IconGroup(props: Props) {
    return(
        <div className={styles.externalServicesWrap} style={props.msg ? {marginTop: '24px'} : {marginTop: '48px'}}>
            <img src="google.svg" alt="Google" />
            <img src="apple.svg" alt="Google" />
            <img src="x.svg" alt="Google" />
        </div>
    )
}