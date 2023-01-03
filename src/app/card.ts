export class Card {
    id!:number;
    value!:string; //nom du fichier image
    visibility!:string; // "" ou "visible"

    constructor(id:number,value:string,visibility:string){
        this.id=id
        this.value=value
        this.visibility=visibility
    }
}
