import { createElement } from "react"
import { type IconBaseProps } from "react-icons"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

export type IconName = keyof typeof icons
const icons = {
    likeEmpty:  AiOutlineHeart,
    likeFilled: AiFillHeart
}

export const Icon = ({ name, ...restProps } : {name: IconName} & IconBaseProps) => {
    return createElement(icons[name], restProps)
}