import { ErrorPageComponent } from "../../components/ErrorPageComponent"
import image404 from '../../assets/images/404.png'
import style from './style.module.scss'

export const NotFoundPage = ({
    title = '404 Not Found',
    message = 'Sorry, the page you visited does not exist.'
}: {
    title?: string
    message?: string
}) => <ErrorPageComponent title={title} message={message} >
    <img src={image404} alt='404 not found page' className={style.image}/>
</ErrorPageComponent>