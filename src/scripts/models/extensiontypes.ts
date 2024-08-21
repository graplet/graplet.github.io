import { FC } from "react"

export type DisplayExtension = {
  name : string
  description : string
}

export type Extension = {
  tabs : { name : string, component: FC ,suffix : string, icon: string}[]
}