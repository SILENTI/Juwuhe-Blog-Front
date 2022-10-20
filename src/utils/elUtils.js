import {ElNotification} from 'element-plus'

export function Notification(type,message){
    return ElNotification({
        title:type,
        message: message,
        type:type
    })
}
