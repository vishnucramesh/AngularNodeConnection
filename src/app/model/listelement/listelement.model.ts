import { element } from "protractor";

export interface ListElement {
    name?:string,
    temp?:string,
    element?:Array<string>,
    valid?:Array<boolean>
}