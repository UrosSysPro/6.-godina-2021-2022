class GameMap{
    constructor(mapDiv,itemsDiv){
        this.mapDiv=mapDiv;
        this.itemsDiv=itemsDiv;
        this.items=[];
    }
    addItem(x,y,w,h){
        let item=new Item(x,y,w,h);
        this.items.push(item);
        this.mapDiv.appendChild(item.div);
        addToItemsDiv(item);
    }
    addToItemsDiv(item){
        
    }
}


/*

{
    item[]
    addItem(x,y)
    removeItem(id)
    editItem(id)
    save()
}

*/