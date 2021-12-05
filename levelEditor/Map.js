class GameMap{
    
    constructor(mapDiv,itemsDiv,editInputs,rangeInputs){
        this.mapDiv=mapDiv;
        this.itemsDiv=itemsDiv;
        this.editInputs=editInputs;
        this.rangeInputs=rangeInputs;
        this.items=[];
        this.selectedItem=-1;
        GameMap.map=this;
    }
    addItem(x,y,w,h,a){
        let item=new Item(x,y,w,h,a);
        this.items.push(item);
        this.mapDiv.appendChild(item.div);
        this.addToItemsDiv(item);
    }
    addToItemsDiv(item){
        let divItemList=document.createElement("div");
        divItemList.classList.add("item");
        divItemList.innerHTML="Item "+this.itemsDiv.children.length;
        divItemList.addEventListener("click",function(e){
            let itemClicked=e.target;
            let children=GameMap.map.itemsDiv.children;
            let index=0;

            for(let i=0;i<children.length;i++){
                if(children[i]==itemClicked){
                    index=i;
                }
            }
            GameMap.map.selectItem(index);

           });
        this.itemsDiv.appendChild(divItemList);
    }
    selectItem(index){
        this.selectedItem=index;
        this.updateInputs();
    }
    updateInputs(){
        if(this.selectedItem==-1)return;
        this.editInputs[0].value=this.items[this.selectedItem].x;
        this.editInputs[1].value=this.items[this.selectedItem].y;
        this.editInputs[2].value=this.items[this.selectedItem].w;
        this.editInputs[3].value=this.items[this.selectedItem].h;
        this.rangeInputs[0].value=this.items[this.selectedItem].a;
    }
    changeItem(){
        if(this.selectedItem==-1)return;
        let x=this.editInputs[0].value;
        let y=this.editInputs[1].value;
        let w=this.editInputs[2].value;
        let h=this.editInputs[3].value;
        let a=this.rangeInputs[0].value;
        this.items[this.selectedItem].update(x,y,w,h,a);
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