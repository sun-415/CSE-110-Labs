// a special type that allows you to define a set of named constants
export enum Label {
    personal = "personal",
    study = "study",
    work = "work",
    other = "other"
 }
 
 //type alias or props, an object that contains info about a note
 export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label | string;
 };

 export type GroceryItem = { 
   name: string; 
   isPurchased: boolean;
};